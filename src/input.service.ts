import { InputManager } from './input.manager';

export class InputService {

    private inputManager: InputManager;

    constructor(private htmlInputElement: any, private options: any) {
        this.inputManager = new InputManager(htmlInputElement, this.options);
    }

    addNumber(key: number) {
        let keyChar = String.fromCharCode(key);
        let selectionStart = this.inputSelection.selectionStart;
        let selectionEnd = this.inputSelection.selectionEnd;
        this.rawValue = this.rawValue.substring(0, selectionStart) + keyChar + this.rawValue.substring(selectionEnd, this.rawValue.length);
        this.updateFieldValue(selectionStart + 1);
    }

    applyMask(isNumber: boolean, rawValue: string) {
        rawValue = isNumber ? new Number(rawValue).toFixed(2) : rawValue;  
        let {allowNegative, precision, thousands, decimal} = this.options;
        let onlyNumbers = rawValue.replace(/[^0-9]/g, "");
        let integerPart = onlyNumbers.slice(0, onlyNumbers.length - precision).replace(/^0*/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, thousands);

        if (integerPart == "") {
            integerPart = "0";
        }

        let newRawValue = integerPart;
        let decimalPart = onlyNumbers.slice(onlyNumbers.length - precision);
        let leadingZeros = new Array((precision + 1) - decimalPart.length).join("0");

        if (precision > 0) {
            newRawValue += decimal + leadingZeros + decimalPart;
        }

        let isZero = parseInt(integerPart) + parseInt(decimalPart) == 0;
        let operator = (rawValue.indexOf("-") > -1 && allowNegative && !isZero) ? "-" : "";
        return operator + this.options.prefix + newRawValue;
    }

    clearMask(rawValue: string) {
        let value = (rawValue || "0");
        value = value.replace(this.options.prefix, "").replace(new RegExp("\\" + this.options.thousands, "g"), "").replace(this.options.decimal, ".");
        return parseFloat(value);
    }

    changeToNegative() {
        if (this.options.allowNegative && this.rawValue != "" && this.rawValue.charAt(0) != "-" && this.value != 0) {
            this.rawValue = "-" + this.rawValue; 
        }
    }

    changeToPositive() {
        this.rawValue = this.rawValue.replace("-", "");
    }

    removeNumber(key: number) {
        let selectionStart = this.inputSelection.selectionStart;
        let selectionEnd = this.inputSelection.selectionEnd;

        if (selectionStart === selectionEnd) {
            if (key === 8) {
                let lastNumber = this.rawValue.split("").reverse().join("").search(/\d/);
                selectionStart = this.rawValue.length - lastNumber - 1;
                selectionEnd = selectionStart + 1;
            } else {
                selectionEnd += 1;
            }
        }

        this.rawValue = this.rawValue.substring(0, selectionStart) + this.rawValue.substring(selectionEnd, this.rawValue.length);
        this.updateFieldValue(selectionStart);
    }

    resetSelection() {
        if (this.htmlInputElement.setSelectionRange) {
            this.htmlInputElement.setSelectionRange(this.rawValue.length, this.rawValue.length);
        }
    }

    updateFieldValue(selectionStart?: number) {
        let newRawValue = this.applyMask(false, this.rawValue || "");
        selectionStart = selectionStart == undefined ? this.rawValue.length : selectionStart;
        this.inputManager.updateValueAndCursor(newRawValue, this.rawValue.length, selectionStart);
    }

    get canInputMoreNumbers() {
        return this.inputManager.canInputMoreNumbers;
    }

    get inputSelection() {
        return this.inputManager.inputSelection;
    }

    get rawValue() {
        return this.htmlInputElement && this.htmlInputElement.value;
    }

    set rawValue(value) {
        if (this.htmlInputElement) {
            this.htmlInputElement.value = value;
        }
    }

    get value() {
        return this.clearMask(this.rawValue);
    }

    set value(value: number) {
        this.rawValue = this.applyMask(true, "" + value);
    }
}