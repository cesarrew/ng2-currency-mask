(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ng2-currency-mask', ['exports', '@angular/core', '@angular/forms', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['ng2-currency-mask'] = {}, global.ng.core, global.ng.forms, global.ng.common));
}(this, (function (exports, i0, forms, common) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var i0__namespace = /*#__PURE__*/_interopNamespace(i0);

    var CURRENCY_MASK_CONFIG = new i0.InjectionToken("currency.mask.config");

    var InputManager = /** @class */ (function () {
        function InputManager(htmlInputElement) {
            this.htmlInputElement = htmlInputElement;
        }
        InputManager.prototype.setCursorAt = function (position) {
            if (this.htmlInputElement.setSelectionRange) {
                this.htmlInputElement.focus();
                this.htmlInputElement.setSelectionRange(position, position);
            }
            else if (this.htmlInputElement.createTextRange) {
                var textRange = this.htmlInputElement.createTextRange();
                textRange.collapse(true);
                textRange.moveEnd("character", position);
                textRange.moveStart("character", position);
                textRange.select();
            }
        };
        InputManager.prototype.updateValueAndCursor = function (newRawValue, oldLength, selectionStart) {
            this.rawValue = newRawValue;
            var newLength = newRawValue.length;
            selectionStart = selectionStart - (oldLength - newLength);
            this.setCursorAt(selectionStart);
        };
        Object.defineProperty(InputManager.prototype, "canInputMoreNumbers", {
            get: function () {
                var haventReachedMaxLength = !(this.rawValue.length >= this.htmlInputElement.maxLength && this.htmlInputElement.maxLength >= 0);
                var selectionStart = this.inputSelection.selectionStart;
                var selectionEnd = this.inputSelection.selectionEnd;
                var haveNumberSelected = (selectionStart != selectionEnd && this.htmlInputElement.value.substring(selectionStart, selectionEnd).match(/\d/)) ? true : false;
                var startWithZero = (this.htmlInputElement.value.substring(0, 1) == "0");
                return haventReachedMaxLength || haveNumberSelected || startWithZero;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(InputManager.prototype, "inputSelection", {
            get: function () {
                var selectionStart = 0;
                var selectionEnd = 0;
                if (typeof this.htmlInputElement.selectionStart == "number" && typeof this.htmlInputElement.selectionEnd == "number") {
                    selectionStart = this.htmlInputElement.selectionStart;
                    selectionEnd = this.htmlInputElement.selectionEnd;
                }
                else {
                    var range = document.getSelection().anchorNode;
                    if (range && range.firstChild == this.htmlInputElement) {
                        var lenght = this.htmlInputElement.value.length;
                        var normalizedValue = this.htmlInputElement.value.replace(/\r\n/g, "\n");
                        var startRange = this.htmlInputElement.createTextRange();
                        var endRange = this.htmlInputElement.createTextRange();
                        endRange.collapse(false);
                        if (startRange.compareEndPoints("StartToEnd", endRange) > -1) {
                            selectionStart = selectionEnd = lenght;
                        }
                        else {
                            selectionStart = -startRange.moveStart("character", -lenght);
                            selectionStart += normalizedValue.slice(0, selectionStart).split("\n").length - 1;
                            if (startRange.compareEndPoints("EndToEnd", endRange) > -1) {
                                selectionEnd = lenght;
                            }
                            else {
                                selectionEnd = -startRange.moveEnd("character", -lenght);
                                selectionEnd += normalizedValue.slice(0, selectionEnd).split("\n").length - 1;
                            }
                        }
                    }
                }
                return {
                    selectionStart: selectionStart,
                    selectionEnd: selectionEnd
                };
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(InputManager.prototype, "rawValue", {
            get: function () {
                return this.htmlInputElement && this.htmlInputElement.value;
            },
            set: function (value) {
                this._storedRawValue = value;
                if (this.htmlInputElement) {
                    this.htmlInputElement.value = value;
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(InputManager.prototype, "storedRawValue", {
            get: function () {
                return this._storedRawValue;
            },
            enumerable: false,
            configurable: true
        });
        return InputManager;
    }());

    var InputService = /** @class */ (function () {
        function InputService(htmlInputElement, options) {
            this.htmlInputElement = htmlInputElement;
            this.options = options;
            this.inputManager = new InputManager(htmlInputElement);
        }
        InputService.prototype.addNumber = function (keyCode) {
            if (!this.rawValue) {
                this.rawValue = this.applyMask(false, "0");
            }
            var keyChar = String.fromCharCode(keyCode);
            var selectionStart = this.inputSelection.selectionStart;
            var selectionEnd = this.inputSelection.selectionEnd;
            this.rawValue = this.rawValue.substring(0, selectionStart) + keyChar + this.rawValue.substring(selectionEnd, this.rawValue.length);
            this.updateFieldValue(selectionStart + 1);
        };
        InputService.prototype.applyMask = function (isNumber, rawValue) {
            var _a = this.options, allowNegative = _a.allowNegative, decimal = _a.decimal, precision = _a.precision, prefix = _a.prefix, suffix = _a.suffix, thousands = _a.thousands;
            rawValue = isNumber ? new Number(rawValue).toFixed(precision) : rawValue;
            var onlyNumbers = rawValue.replace(/[^0-9]/g, "");
            if (!onlyNumbers) {
                return "";
            }
            var integerPart = onlyNumbers.slice(0, onlyNumbers.length - precision).replace(/^0*/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, thousands);
            if (integerPart == "") {
                integerPart = "0";
            }
            var newRawValue = integerPart;
            var decimalPart = onlyNumbers.slice(onlyNumbers.length - precision);
            if (precision > 0) {
                decimalPart = "0".repeat(precision - decimalPart.length) + decimalPart;
                newRawValue += decimal + decimalPart;
            }
            var isZero = parseInt(integerPart) == 0 && (parseInt(decimalPart) == 0 || decimalPart == "");
            var operator = (rawValue.indexOf("-") > -1 && allowNegative && !isZero) ? "-" : "";
            return operator + prefix + newRawValue + suffix;
        };
        InputService.prototype.clearMask = function (rawValue) {
            if (rawValue == null || rawValue == "") {
                return null;
            }
            var value = rawValue.replace(this.options.prefix, "").replace(this.options.suffix, "");
            if (this.options.thousands) {
                value = value.replace(new RegExp("\\" + this.options.thousands, "g"), "");
            }
            if (this.options.decimal) {
                value = value.replace(this.options.decimal, ".");
            }
            return parseFloat(value);
        };
        InputService.prototype.changeToNegative = function () {
            if (this.options.allowNegative && this.rawValue != "" && this.rawValue.charAt(0) != "-" && this.value != 0) {
                var selectionStart = this.inputSelection.selectionStart;
                this.rawValue = "-" + this.rawValue;
                this.updateFieldValue(selectionStart + 1);
            }
        };
        InputService.prototype.changeToPositive = function () {
            var selectionStart = this.inputSelection.selectionStart;
            this.rawValue = this.rawValue.replace("-", "");
            this.updateFieldValue(selectionStart - 1);
        };
        InputService.prototype.fixCursorPosition = function (forceToEndPosition) {
            var currentCursorPosition = this.inputSelection.selectionStart;
            //if the current cursor position is after the number end position, it is moved to the end of the number, ignoring the prefix or suffix. this behavior can be forced with forceToEndPosition flag
            if (currentCursorPosition > this.getRawValueWithoutSuffixEndPosition() || forceToEndPosition) {
                this.inputManager.setCursorAt(this.getRawValueWithoutSuffixEndPosition());
                //if the current cursor position is before the number start position, it is moved to the start of the number, ignoring the prefix or suffix
            }
            else if (currentCursorPosition < this.getRawValueWithoutPrefixStartPosition()) {
                this.inputManager.setCursorAt(this.getRawValueWithoutPrefixStartPosition());
            }
        };
        InputService.prototype.getRawValueWithoutSuffixEndPosition = function () {
            return this.rawValue.length - this.options.suffix.length;
        };
        InputService.prototype.getRawValueWithoutPrefixStartPosition = function () {
            return this.value != null && this.value < 0 ? this.options.prefix.length + 1 : this.options.prefix.length;
        };
        InputService.prototype.removeNumber = function (keyCode) {
            var _a = this.options, decimal = _a.decimal, thousands = _a.thousands;
            var selectionEnd = this.inputSelection.selectionEnd;
            var selectionStart = this.inputSelection.selectionStart;
            if (selectionStart > this.rawValue.length - this.options.suffix.length) {
                selectionEnd = this.rawValue.length - this.options.suffix.length;
                selectionStart = this.rawValue.length - this.options.suffix.length;
            }
            //there is no selection
            if (selectionEnd == selectionStart) {
                //delete key and the target digit is a number
                if ((keyCode == 46 || keyCode == 63272) && /^\d+$/.test(this.rawValue.substring(selectionStart, selectionEnd + 1))) {
                    selectionEnd = selectionEnd + 1;
                }
                //delete key and the target digit is the decimal or thousands divider
                if ((keyCode == 46 || keyCode == 63272) && (this.rawValue.substring(selectionStart, selectionEnd + 1) == decimal || this.rawValue.substring(selectionStart, selectionEnd + 1) == thousands)) {
                    selectionEnd = selectionEnd + 2;
                    selectionStart = selectionStart + 1;
                }
                //backspace key and the target digit is a number
                if (keyCode == 8 && /^\d+$/.test(this.rawValue.substring(selectionStart - 1, selectionEnd))) {
                    selectionStart = selectionStart - 1;
                }
                //backspace key and the target digit is the decimal or thousands divider
                if (keyCode == 8 && (this.rawValue.substring(selectionStart - 1, selectionEnd) == decimal || this.rawValue.substring(selectionStart - 1, selectionEnd) == thousands)) {
                    selectionStart = selectionStart - 2;
                    selectionEnd = selectionEnd - 1;
                }
            }
            this.rawValue = this.rawValue.substring(0, selectionStart) + this.rawValue.substring(selectionEnd, this.rawValue.length);
            this.updateFieldValue(selectionStart);
        };
        InputService.prototype.updateFieldValue = function (selectionStart) {
            var newRawValue = this.applyMask(false, this.rawValue || "");
            selectionStart = selectionStart == undefined ? this.rawValue.length : selectionStart;
            this.inputManager.updateValueAndCursor(newRawValue, this.rawValue.length, selectionStart);
        };
        InputService.prototype.updateOptions = function (options) {
            var value = this.value;
            this.options = options;
            this.value = value;
        };
        Object.defineProperty(InputService.prototype, "canInputMoreNumbers", {
            get: function () {
                return this.inputManager.canInputMoreNumbers;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(InputService.prototype, "inputSelection", {
            get: function () {
                return this.inputManager.inputSelection;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(InputService.prototype, "rawValue", {
            get: function () {
                return this.inputManager.rawValue;
            },
            set: function (value) {
                this.inputManager.rawValue = value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(InputService.prototype, "storedRawValue", {
            get: function () {
                return this.inputManager.storedRawValue;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(InputService.prototype, "value", {
            get: function () {
                return this.clearMask(this.rawValue);
            },
            set: function (value) {
                this.rawValue = this.applyMask(true, "" + value);
            },
            enumerable: false,
            configurable: true
        });
        return InputService;
    }());

    var InputHandler = /** @class */ (function () {
        function InputHandler(htmlInputElement, options) {
            this.inputService = new InputService(htmlInputElement, options);
            this.htmlInputElement = htmlInputElement;
        }
        InputHandler.prototype.handleClick = function (event, chromeAndroid) {
            var selectionRangeLength = Math.abs(this.inputService.inputSelection.selectionEnd - this.inputService.inputSelection.selectionStart);
            //if there is no selection and the value is not null, the cursor position will be fixed. if the browser is chrome on android, the cursor will go to the end of the number.
            if (selectionRangeLength == 0 && !isNaN(this.inputService.value)) {
                this.inputService.fixCursorPosition(chromeAndroid);
            }
        };
        InputHandler.prototype.handleCut = function (event) {
            var _this = this;
            if (this.isReadOnly()) {
                return;
            }
            setTimeout(function () {
                _this.inputService.updateFieldValue();
                _this.setValue(_this.inputService.value);
                _this.onModelChange(_this.inputService.value);
            }, 0);
        };
        InputHandler.prototype.handleInput = function (event) {
            if (this.isReadOnly()) {
                return;
            }
            var keyCode = this.getNewKeyCode(this.inputService.storedRawValue, this.inputService.rawValue);
            var rawValueLength = this.inputService.rawValue.length;
            var rawValueSelectionEnd = this.inputService.inputSelection.selectionEnd;
            var rawValueWithoutSuffixEndPosition = this.inputService.getRawValueWithoutSuffixEndPosition();
            var storedRawValueLength = this.inputService.storedRawValue.length;
            this.inputService.rawValue = this.inputService.storedRawValue;
            if ((rawValueSelectionEnd != rawValueWithoutSuffixEndPosition || Math.abs(rawValueLength - storedRawValueLength) != 1) && storedRawValueLength != 0) {
                this.setCursorPosition(event);
                return;
            }
            if (rawValueLength < storedRawValueLength) {
                if (this.inputService.value != 0) {
                    this.inputService.removeNumber(8);
                }
                else {
                    this.setValue(null);
                }
            }
            if (rawValueLength > storedRawValueLength) {
                switch (keyCode) {
                    case 43:
                        this.inputService.changeToPositive();
                        break;
                    case 45:
                        this.inputService.changeToNegative();
                        break;
                    default:
                        if (!this.inputService.canInputMoreNumbers || (isNaN(this.inputService.value) && String.fromCharCode(keyCode).match(/\d/) == null)) {
                            return;
                        }
                        this.inputService.addNumber(keyCode);
                }
            }
            this.setCursorPosition(event);
            this.onModelChange(this.inputService.value);
        };
        InputHandler.prototype.handleKeydown = function (event) {
            if (this.isReadOnly()) {
                return;
            }
            var keyCode = event.which || event.charCode || event.keyCode;
            if (keyCode == 8 || keyCode == 46 || keyCode == 63272) {
                event.preventDefault();
                var selectionRangeLength = Math.abs(this.inputService.inputSelection.selectionEnd - this.inputService.inputSelection.selectionStart);
                if (selectionRangeLength == this.inputService.rawValue.length || this.inputService.value == 0) {
                    this.setValue(null);
                    this.onModelChange(this.inputService.value);
                }
                if (selectionRangeLength == 0 && !isNaN(this.inputService.value)) {
                    this.inputService.removeNumber(keyCode);
                    this.onModelChange(this.inputService.value);
                }
                if ((keyCode === 8 || keyCode === 46) && selectionRangeLength != 0 && !isNaN(this.inputService.value)) {
                    this.inputService.removeNumber(keyCode);
                    this.onModelChange(this.inputService.value);
                }
            }
        };
        InputHandler.prototype.handleKeypress = function (event) {
            if (this.isReadOnly()) {
                return;
            }
            var keyCode = event.which || event.charCode || event.keyCode;
            if (keyCode == undefined || [9, 13].indexOf(keyCode) != -1 || this.isArrowEndHomeKeyInFirefox(event)) {
                return;
            }
            switch (keyCode) {
                case 43:
                    this.inputService.changeToPositive();
                    break;
                case 45:
                    this.inputService.changeToNegative();
                    break;
                default:
                    if (this.inputService.canInputMoreNumbers && (!isNaN(this.inputService.value) || String.fromCharCode(keyCode).match(/\d/) != null)) {
                        this.inputService.addNumber(keyCode);
                    }
            }
            event.preventDefault();
            this.onModelChange(this.inputService.value);
        };
        InputHandler.prototype.handleKeyup = function (event) {
            this.inputService.fixCursorPosition();
        };
        InputHandler.prototype.handlePaste = function (event) {
            var _this = this;
            if (this.isReadOnly()) {
                return;
            }
            setTimeout(function () {
                _this.inputService.updateFieldValue();
                _this.setValue(_this.inputService.value);
                _this.onModelChange(_this.inputService.value);
            }, 1);
        };
        InputHandler.prototype.updateOptions = function (options) {
            this.inputService.updateOptions(options);
        };
        InputHandler.prototype.getOnModelChange = function () {
            return this.onModelChange;
        };
        InputHandler.prototype.setOnModelChange = function (callbackFunction) {
            this.onModelChange = callbackFunction;
        };
        InputHandler.prototype.getOnModelTouched = function () {
            return this.onModelTouched;
        };
        InputHandler.prototype.setOnModelTouched = function (callbackFunction) {
            this.onModelTouched = callbackFunction;
        };
        InputHandler.prototype.setValue = function (value) {
            this.inputService.value = value;
        };
        InputHandler.prototype.getNewKeyCode = function (oldString, newString) {
            if (oldString.length > newString.length) {
                return null;
            }
            for (var x = 0; x < newString.length; x++) {
                if (oldString.length == x || oldString[x] != newString[x]) {
                    return newString.charCodeAt(x);
                }
            }
            return null;
        };
        InputHandler.prototype.isArrowEndHomeKeyInFirefox = function (event) {
            if ([35, 36, 37, 38, 39, 40].indexOf(event.keyCode) != -1 && (event.charCode == undefined || event.charCode == 0)) {
                return true;
            }
            return false;
        };
        InputHandler.prototype.isReadOnly = function () {
            return this.htmlInputElement && this.htmlInputElement.readOnly;
        };
        InputHandler.prototype.setCursorPosition = function (event) {
            var rawValueWithoutSuffixEndPosition = this.inputService.getRawValueWithoutSuffixEndPosition();
            setTimeout(function () {
                event.target.setSelectionRange(rawValueWithoutSuffixEndPosition, rawValueWithoutSuffixEndPosition);
            }, 0);
        };
        return InputHandler;
    }());

    var CURRENCYMASKDIRECTIVE_VALUE_ACCESSOR = {
        provide: forms.NG_VALUE_ACCESSOR,
        useExisting: i0.forwardRef(function () { return CurrencyMaskDirective; }),
        multi: true
    };
    var CurrencyMaskDirective = /** @class */ (function () {
        function CurrencyMaskDirective(currencyMaskConfig, elementRef, keyValueDiffers) {
            this.currencyMaskConfig = currencyMaskConfig;
            this.elementRef = elementRef;
            this.keyValueDiffers = keyValueDiffers;
            this.options = {};
            this.optionsTemplate = {
                align: "right",
                allowNegative: true,
                decimal: ".",
                precision: 2,
                prefix: "$ ",
                suffix: "",
                thousands: ","
            };
            if (currencyMaskConfig) {
                this.optionsTemplate = currencyMaskConfig;
            }
            this.keyValueDiffer = keyValueDiffers.find({}).create();
        }
        CurrencyMaskDirective.prototype.ngAfterViewInit = function () {
            this.elementRef.nativeElement.style.textAlign = this.options.align ? this.options.align : this.optionsTemplate.align;
        };
        CurrencyMaskDirective.prototype.ngDoCheck = function () {
            if (this.keyValueDiffer.diff(this.options)) {
                this.elementRef.nativeElement.style.textAlign = this.options.align ? this.options.align : this.optionsTemplate.align;
                this.inputHandler.updateOptions(Object.assign({}, this.optionsTemplate, this.options));
            }
        };
        CurrencyMaskDirective.prototype.ngOnInit = function () {
            this.inputHandler = new InputHandler(this.elementRef.nativeElement, Object.assign({}, this.optionsTemplate, this.options));
        };
        CurrencyMaskDirective.prototype.handleBlur = function (event) {
            this.inputHandler.getOnModelTouched().apply(event);
        };
        CurrencyMaskDirective.prototype.handleClick = function (event) {
            this.inputHandler.handleClick(event, this.isChromeAndroid());
        };
        CurrencyMaskDirective.prototype.handleCut = function (event) {
            if (!this.isChromeAndroid()) {
                this.inputHandler.handleCut(event);
            }
        };
        CurrencyMaskDirective.prototype.handleInput = function (event) {
            if (this.isChromeAndroid()) {
                this.inputHandler.handleInput(event);
            }
        };
        CurrencyMaskDirective.prototype.handleKeydown = function (event) {
            if (!this.isChromeAndroid()) {
                this.inputHandler.handleKeydown(event);
            }
        };
        CurrencyMaskDirective.prototype.handleKeypress = function (event) {
            if (!this.isChromeAndroid()) {
                this.inputHandler.handleKeypress(event);
            }
        };
        CurrencyMaskDirective.prototype.handleKeyup = function (event) {
            if (!this.isChromeAndroid()) {
                this.inputHandler.handleKeyup(event);
            }
        };
        CurrencyMaskDirective.prototype.handlePaste = function (event) {
            if (!this.isChromeAndroid()) {
                this.inputHandler.handlePaste(event);
            }
        };
        CurrencyMaskDirective.prototype.isChromeAndroid = function () {
            return /chrome/i.test(navigator.userAgent) && /android/i.test(navigator.userAgent);
        };
        CurrencyMaskDirective.prototype.registerOnChange = function (callbackFunction) {
            this.inputHandler.setOnModelChange(callbackFunction);
        };
        CurrencyMaskDirective.prototype.registerOnTouched = function (callbackFunction) {
            this.inputHandler.setOnModelTouched(callbackFunction);
        };
        CurrencyMaskDirective.prototype.setDisabledState = function (value) {
            this.elementRef.nativeElement.disabled = value;
        };
        CurrencyMaskDirective.prototype.validate = function (abstractControl) {
            var result = {};
            if (abstractControl.value > this.max) {
                result.max = true;
            }
            if (abstractControl.value < this.min) {
                result.min = true;
            }
            return result != {} ? result : null;
        };
        CurrencyMaskDirective.prototype.writeValue = function (value) {
            this.inputHandler.setValue(value);
        };
        return CurrencyMaskDirective;
    }());
    CurrencyMaskDirective.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.2", ngImport: i0__namespace, type: CurrencyMaskDirective, deps: [{ token: CURRENCY_MASK_CONFIG, optional: true }, { token: i0__namespace.ElementRef }, { token: i0__namespace.KeyValueDiffers }], target: i0__namespace.ɵɵFactoryTarget.Directive });
    CurrencyMaskDirective.ɵdir = i0__namespace.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.2", type: CurrencyMaskDirective, selector: "[currencyMask]", inputs: { max: "max", min: "min", options: "options" }, host: { listeners: { "blur": "handleBlur($event)", "click": "handleClick($event)", "cut": "handleCut($event)", "input": "handleInput($event)", "keydown": "handleKeydown($event)", "keypress": "handleKeypress($event)", "keyup": "handleKeyup($event)", "paste": "handlePaste($event)" } }, providers: [
            CURRENCYMASKDIRECTIVE_VALUE_ACCESSOR,
            { provide: forms.NG_VALIDATORS, useExisting: CurrencyMaskDirective, multi: true }
        ], ngImport: i0__namespace });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.2", ngImport: i0__namespace, type: CurrencyMaskDirective, decorators: [{
                type: i0.Directive,
                args: [{
                        selector: "[currencyMask]",
                        providers: [
                            CURRENCYMASKDIRECTIVE_VALUE_ACCESSOR,
                            { provide: forms.NG_VALIDATORS, useExisting: CurrencyMaskDirective, multi: true }
                        ]
                    }]
            }], ctorParameters: function () {
            return [{ type: undefined, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Inject,
                            args: [CURRENCY_MASK_CONFIG]
                        }] }, { type: i0__namespace.ElementRef }, { type: i0__namespace.KeyValueDiffers }];
        }, propDecorators: { max: [{
                    type: i0.Input
                }], min: [{
                    type: i0.Input
                }], options: [{
                    type: i0.Input
                }], handleBlur: [{
                    type: i0.HostListener,
                    args: ["blur", ["$event"]]
                }], handleClick: [{
                    type: i0.HostListener,
                    args: ["click", ["$event"]]
                }], handleCut: [{
                    type: i0.HostListener,
                    args: ["cut", ["$event"]]
                }], handleInput: [{
                    type: i0.HostListener,
                    args: ["input", ["$event"]]
                }], handleKeydown: [{
                    type: i0.HostListener,
                    args: ["keydown", ["$event"]]
                }], handleKeypress: [{
                    type: i0.HostListener,
                    args: ["keypress", ["$event"]]
                }], handleKeyup: [{
                    type: i0.HostListener,
                    args: ["keyup", ["$event"]]
                }], handlePaste: [{
                    type: i0.HostListener,
                    args: ["paste", ["$event"]]
                }] } });

    var CurrencyMaskModule = /** @class */ (function () {
        function CurrencyMaskModule() {
        }
        return CurrencyMaskModule;
    }());
    CurrencyMaskModule.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.2", ngImport: i0__namespace, type: CurrencyMaskModule, deps: [], target: i0__namespace.ɵɵFactoryTarget.NgModule });
    CurrencyMaskModule.ɵmod = i0__namespace.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.2.2", ngImport: i0__namespace, type: CurrencyMaskModule, declarations: [CurrencyMaskDirective], imports: [common.CommonModule,
            forms.FormsModule], exports: [CurrencyMaskDirective] });
    CurrencyMaskModule.ɵinj = i0__namespace.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.2.2", ngImport: i0__namespace, type: CurrencyMaskModule, imports: [[
                common.CommonModule,
                forms.FormsModule
            ]] });
    i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.2", ngImport: i0__namespace, type: CurrencyMaskModule, decorators: [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            common.CommonModule,
                            forms.FormsModule
                        ],
                        declarations: [
                            CurrencyMaskDirective
                        ],
                        exports: [
                            CurrencyMaskDirective
                        ]
                    }]
            }] });

    /*
     * Public API Surface of currency-mask
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.CURRENCYMASKDIRECTIVE_VALUE_ACCESSOR = CURRENCYMASKDIRECTIVE_VALUE_ACCESSOR;
    exports.CURRENCY_MASK_CONFIG = CURRENCY_MASK_CONFIG;
    exports.CurrencyMaskDirective = CurrencyMaskDirective;
    exports.CurrencyMaskModule = CurrencyMaskModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ng2-currency-mask.umd.js.map
