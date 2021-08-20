import { Directive, forwardRef, HostListener, Inject, Input, Optional } from "@angular/core";
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from "@angular/forms";
import { CURRENCY_MASK_CONFIG } from "./currency-mask.config";
import { InputHandler } from "./input.handler";
import * as i0 from "@angular/core";
export const CURRENCYMASKDIRECTIVE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CurrencyMaskDirective),
    multi: true
};
export class CurrencyMaskDirective {
    constructor(currencyMaskConfig, elementRef, keyValueDiffers) {
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
    ngAfterViewInit() {
        this.elementRef.nativeElement.style.textAlign = this.options.align ? this.options.align : this.optionsTemplate.align;
    }
    ngDoCheck() {
        if (this.keyValueDiffer.diff(this.options)) {
            this.elementRef.nativeElement.style.textAlign = this.options.align ? this.options.align : this.optionsTemplate.align;
            this.inputHandler.updateOptions(Object.assign({}, this.optionsTemplate, this.options));
        }
    }
    ngOnInit() {
        this.inputHandler = new InputHandler(this.elementRef.nativeElement, Object.assign({}, this.optionsTemplate, this.options));
    }
    handleBlur(event) {
        this.inputHandler.getOnModelTouched().apply(event);
    }
    handleClick(event) {
        this.inputHandler.handleClick(event, this.isChromeAndroid());
    }
    handleCut(event) {
        if (!this.isChromeAndroid()) {
            this.inputHandler.handleCut(event);
        }
    }
    handleInput(event) {
        if (this.isChromeAndroid()) {
            this.inputHandler.handleInput(event);
        }
    }
    handleKeydown(event) {
        if (!this.isChromeAndroid()) {
            this.inputHandler.handleKeydown(event);
        }
    }
    handleKeypress(event) {
        if (!this.isChromeAndroid()) {
            this.inputHandler.handleKeypress(event);
        }
    }
    handleKeyup(event) {
        if (!this.isChromeAndroid()) {
            this.inputHandler.handleKeyup(event);
        }
    }
    handlePaste(event) {
        if (!this.isChromeAndroid()) {
            this.inputHandler.handlePaste(event);
        }
    }
    isChromeAndroid() {
        return /chrome/i.test(navigator.userAgent) && /android/i.test(navigator.userAgent);
    }
    registerOnChange(callbackFunction) {
        this.inputHandler.setOnModelChange(callbackFunction);
    }
    registerOnTouched(callbackFunction) {
        this.inputHandler.setOnModelTouched(callbackFunction);
    }
    setDisabledState(value) {
        this.elementRef.nativeElement.disabled = value;
    }
    validate(abstractControl) {
        let result = {};
        if (abstractControl.value > this.max) {
            result.max = true;
        }
        if (abstractControl.value < this.min) {
            result.min = true;
        }
        return result != {} ? result : null;
    }
    writeValue(value) {
        this.inputHandler.setValue(value);
    }
}
CurrencyMaskDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.2", ngImport: i0, type: CurrencyMaskDirective, deps: [{ token: CURRENCY_MASK_CONFIG, optional: true }, { token: i0.ElementRef }, { token: i0.KeyValueDiffers }], target: i0.ɵɵFactoryTarget.Directive });
CurrencyMaskDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "12.2.2", type: CurrencyMaskDirective, selector: "[currencyMask]", inputs: { max: "max", min: "min", options: "options" }, host: { listeners: { "blur": "handleBlur($event)", "click": "handleClick($event)", "cut": "handleCut($event)", "input": "handleInput($event)", "keydown": "handleKeydown($event)", "keypress": "handleKeypress($event)", "keyup": "handleKeyup($event)", "paste": "handlePaste($event)" } }, providers: [
        CURRENCYMASKDIRECTIVE_VALUE_ACCESSOR,
        { provide: NG_VALIDATORS, useExisting: CurrencyMaskDirective, multi: true }
    ], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.2", ngImport: i0, type: CurrencyMaskDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: "[currencyMask]",
                    providers: [
                        CURRENCYMASKDIRECTIVE_VALUE_ACCESSOR,
                        { provide: NG_VALIDATORS, useExisting: CurrencyMaskDirective, multi: true }
                    ]
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [CURRENCY_MASK_CONFIG]
                }] }, { type: i0.ElementRef }, { type: i0.KeyValueDiffers }]; }, propDecorators: { max: [{
                type: Input
            }], min: [{
                type: Input
            }], options: [{
                type: Input
            }], handleBlur: [{
                type: HostListener,
                args: ["blur", ["$event"]]
            }], handleClick: [{
                type: HostListener,
                args: ["click", ["$event"]]
            }], handleCut: [{
                type: HostListener,
                args: ["cut", ["$event"]]
            }], handleInput: [{
                type: HostListener,
                args: ["input", ["$event"]]
            }], handleKeydown: [{
                type: HostListener,
                args: ["keydown", ["$event"]]
            }], handleKeypress: [{
                type: HostListener,
                args: ["keypress", ["$event"]]
            }], handleKeyup: [{
                type: HostListener,
                args: ["keyup", ["$event"]]
            }], handlePaste: [{
                type: HostListener,
                args: ["paste", ["$event"]]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVuY3ktbWFzay5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jdXJyZW5jeS1tYXNrL3NyYy9saWIvY3VycmVuY3ktbWFzay5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQixTQUFTLEVBQXVCLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBMkMsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFLLE9BQU8sRUFBeUMsYUFBYSxFQUFFLGlCQUFpQixFQUFhLE1BQU0sZ0JBQWdCLENBQUM7QUFDcEgsT0FBTyxFQUFzQixvQkFBb0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ2xGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7QUFFL0MsTUFBTSxDQUFDLE1BQU0sb0NBQW9DLEdBQVE7SUFDckQsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLHFCQUFxQixDQUFDO0lBQ3BELEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQztBQVNGLE1BQU0sT0FBTyxxQkFBcUI7SUFtQjlCLFlBQThELGtCQUFzQyxFQUFVLFVBQXNCLEVBQVUsZUFBZ0M7UUFBaEgsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUFVLGVBQVUsR0FBVixVQUFVLENBQVk7UUFBVSxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFmckssWUFBTyxHQUFRLEVBQUUsQ0FBQztRQUszQixvQkFBZSxHQUFHO1lBQ2QsS0FBSyxFQUFFLE9BQU87WUFDZCxhQUFhLEVBQUUsSUFBSTtZQUNuQixPQUFPLEVBQUUsR0FBRztZQUNaLFNBQVMsRUFBRSxDQUFDO1lBQ1osTUFBTSxFQUFFLElBQUk7WUFDWixNQUFNLEVBQUUsRUFBRTtZQUNWLFNBQVMsRUFBRSxHQUFHO1NBQ2pCLENBQUM7UUFHRSxJ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Q3BDLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUscUJBQXFCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTtLQUM5RTsyRkFFUSxxQkFBcUI7a0JBUGpDLFNBQVM7bUJBQUM7b0JBQ1AsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsU0FBUyxFQUFFO3dCQUNQLG9DQUFvQzt3QkFDcEMsRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLFdBQVcsdUJBQXVCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTtxQkFDOUU7aUJBQ0o7OzBCQW9CZ0IsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxvQkFBb0I7bUdBakIzQyxHQUFHO3NCQUFYLEtBQUs7Z0JBQ0csR0FBRztzQkFBWCxLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkF1Q04sVUFBVTtzQkFEVCxZQUFZO3VCQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFNaEMsV0FBVztzQkFEVixZQUFZO3VCQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFNakMsU0FBUztzQkFEUixZQUFZO3VCQUFDLEtBQUssRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFRL0IsV0FBVztzQkFEVixZQUFZO3VCQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFRakMsYUFBYTtzQkFEWixZQUFZO3VCQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFRbkMsY0FBYztzQkFEYixZQUFZO3VCQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFRcEMsV0FBVztzQkFEVixZQUFZO3VCQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFRakMsV0FBVztzQkFEVixZQUFZO3VCQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIERpcmVjdGl2ZSwgRG9DaGVjaywgRWxlbWVudFJlZiwgZm9yd2FyZFJlZiwgSG9zdExpc3RlbmVyLCBJbmplY3QsIElucHV0LCBLZXlWYWx1ZURpZmZlciwgS2V5VmFsdWVEaWZmZXJzLCBPbkluaXQsIE9wdGlvbmFsIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTElEQVRPUlMsIE5HX1ZBTFVFX0FDQ0VTU09SLCBWYWxpZGF0b3IgfSBmcm9tIFwiQGFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7IEN1cnJlbmN5TWFza0NvbmZpZywgQ1VSUkVOQ1lfTUFTS19DT05GSUcgfSBmcm9tIFwiLi9jdXJyZW5jeS1tYXNrLmNvbmZpZ1wiO1xuaW1wb3J0IHsgSW5wdXRIYW5kbGVyIH0gZnJvbSBcIi4vaW5wdXQuaGFuZGxlclwiO1xuXG5leHBvcnQgY29uc3QgQ1VSUkVOQ1lNQVNLRElSRUNUSVZFX1ZBTFVFX0FDQ0VTU09SOiBhbnkgPSB7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQ3VycmVuY3lNYXNrRGlyZWN0aXZlKSxcbiAgICBtdWx0aTogdHJ1ZVxufTtcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6IFwiW2N1cnJlbmN5TWFza11cIixcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgQ1VSUkVOQ1lNQVNLRElSRUNUSVZFX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgICB7IHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsIHVzZUV4aXN0aW5nOiBDdXJyZW5jeU1hc2tEaXJlY3RpdmUsIG11bHRpOiB0cnVlIH1cbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEN1cnJlbmN5TWFza0RpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBEb0NoZWNrLCBPbkluaXQsIFZhbGlkYXRvciB7XG5cbiAgICBASW5wdXQoKSBtYXg6IG51bWJlcjtcbiAgICBASW5wdXQoKSBtaW46IG51bWJlcjtcbiAgICBASW5wdXQoKSBvcHRpb25zOiBhbnkgPSB7fTtcblxuICAgIGlucHV0SGFuZGxlcjogSW5wdXRIYW5kbGVyO1xuICAgIGtleVZhbHVlRGlmZmVyOiBLZXlWYWx1ZURpZmZlcjxhbnksIGFueT47XG5cbiAgICBvcHRpb25zVGVtcGxhdGUgPSB7XG4gICAgICAgIGFsaWduOiBcInJpZ2h0XCIsXG4gICAgICAgIGFsbG93TmVnYXRpdmU6IHRydWUsXG4gICAgICAgIGRlY2ltYWw6IFwiLlwiLFxuICAgICAgICBwcmVjaXNpb246IDIsXG4gICAgICAgIHByZWZpeDogXCIkIFwiLFxuICAgICAgICBzdWZmaXg6IFwiXCIsXG4gICAgICAgIHRob3VzYW5kczogXCIsXCJcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQEluamVjdChDVVJSRU5DWV9NQVNLX0NPTkZJRykgcHJpdmF0ZSBjdXJyZW5jeU1hc2tDb25maWc6IEN1cnJlbmN5TWFza0NvbmZpZywgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIGtleVZhbHVlRGlmZmVyczogS2V5VmFsdWVEaWZmZXJzKSB7XG4gICAgICAgIGlmIChjdXJyZW5jeU1hc2tDb25maWcpIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9uc1RlbXBsYXRlID0gY3VycmVuY3lNYXNrQ29uZmlnO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5rZXlWYWx1ZURpZmZlciA9IGtleVZhbHVlRGlmZmVycy5maW5kKHt9KS5jcmVhdGUoKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnN0eWxlLnRleHRBbGlnbiA9IHRoaXMub3B0aW9ucy5hbGlnbiA/IHRoaXMub3B0aW9ucy5hbGlnbiA6IHRoaXMub3B0aW9uc1RlbXBsYXRlLmFsaWduO1xuICAgIH1cblxuICAgIG5nRG9DaGVjaygpIHtcbiAgICAgICAgaWYgKHRoaXMua2V5VmFsdWVEaWZmZXIuZGlmZih0aGlzLm9wdGlvbnMpKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zdHlsZS50ZXh0QWxpZ24gPSB0aGlzLm9wdGlvbnMuYWxpZ24gPyB0aGlzLm9wdGlvbnMuYWxpZ24gOiB0aGlzLm9wdGlvbnNUZW1wbGF0ZS5hbGlnbjtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRIYW5kbGVyLnVwZGF0ZU9wdGlvbnMoKDxhbnk+T2JqZWN0KS5hc3NpZ24oe30sIHRoaXMub3B0aW9uc1RlbXBsYXRlLCB0aGlzLm9wdGlvbnMpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmlucHV0SGFuZGxlciA9IG5ldyBJbnB1dEhhbmRsZXIodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICg8YW55Pk9iamVjdCkuYXNzaWduKHt9LCB0aGlzLm9wdGlvbnNUZW1wbGF0ZSwgdGhpcy5vcHRpb25zKSk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImJsdXJcIiwgW1wiJGV2ZW50XCJdKVxuICAgIGhhbmRsZUJsdXIoZXZlbnQ6IGFueSkge1xuICAgICAgICB0aGlzLmlucHV0SGFuZGxlci5nZXRPbk1vZGVsVG91Y2hlZCgpLmFwcGx5KGV2ZW50KTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKFwiY2xpY2tcIiwgW1wiJGV2ZW50XCJdKVxuICAgIGhhbmRsZUNsaWNrKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgdGhpcy5pbnB1dEhhbmRsZXIuaGFuZGxlQ2xpY2soZXZlbnQsIHRoaXMuaXNDaHJvbWVBbmRyb2lkKCkpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJjdXRcIiwgW1wiJGV2ZW50XCJdKVxuICAgIGhhbmRsZUN1dChldmVudDogYW55KSB7XG4gICAgICAgIGlmICghdGhpcy5pc0Nocm9tZUFuZHJvaWQoKSkge1xuICAgICAgICAgICAgdGhpcy5pbnB1dEhhbmRsZXIuaGFuZGxlQ3V0KGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJpbnB1dFwiLCBbXCIkZXZlbnRcIl0pXG4gICAgaGFuZGxlSW5wdXQoZXZlbnQ6IGFueSkge1xuICAgICAgICBpZiAodGhpcy5pc0Nocm9tZUFuZHJvaWQoKSkge1xuICAgICAgICAgICAgdGhpcy5pbnB1dEhhbmRsZXIuaGFuZGxlSW5wdXQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImtleWRvd25cIiwgW1wiJGV2ZW50XCJdKVxuICAgIGhhbmRsZUtleWRvd24oZXZlbnQ6IGFueSkge1xuICAgICAgICBpZiAoIXRoaXMuaXNDaHJvbWVBbmRyb2lkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRIYW5kbGVyLmhhbmRsZUtleWRvd24oZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImtleXByZXNzXCIsIFtcIiRldmVudFwiXSlcbiAgICBoYW5kbGVLZXlwcmVzcyhldmVudDogYW55KSB7XG4gICAgICAgIGlmICghdGhpcy5pc0Nocm9tZUFuZHJvaWQoKSkge1xuICAgICAgICAgICAgdGhpcy5pbnB1dEhhbmRsZXIuaGFuZGxlS2V5cHJlc3MoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImtleXVwXCIsIFtcIiRldmVudFwiXSlcbiAgICBoYW5kbGVLZXl1cChldmVudDogYW55KSB7XG4gICAgICAgIGlmICghdGhpcy5pc0Nocm9tZUFuZHJvaWQoKSkge1xuICAgICAgICAgICAgdGhpcy5pbnB1dEhhbmRsZXIuaGFuZGxlS2V5dXAoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcInBhc3RlXCIsIFtcIiRldmVudFwiXSlcbiAgICBoYW5kbGVQYXN0ZShldmVudDogYW55KSB7XG4gICAgICAgIGlmICghdGhpcy5pc0Nocm9tZUFuZHJvaWQoKSkge1xuICAgICAgICAgICAgdGhpcy5pbnB1dEhhbmRsZXIuaGFuZGxlUGFzdGUoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNDaHJvbWVBbmRyb2lkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gL2Nocm9tZS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgJiYgL2FuZHJvaWQvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoY2FsbGJhY2tGdW5jdGlvbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbnB1dEhhbmRsZXIuc2V0T25Nb2RlbENoYW5nZShjYWxsYmFja0Z1bmN0aW9uKTtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uVG91Y2hlZChjYWxsYmFja0Z1bmN0aW9uOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLmlucHV0SGFuZGxlci5zZXRPbk1vZGVsVG91Y2hlZChjYWxsYmFja0Z1bmN0aW9uKTtcbiAgICB9XG5cbiAgICBzZXREaXNhYmxlZFN0YXRlKHZhbHVlOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmRpc2FibGVkID0gdmFsdWU7XG4gICAgfVxuXG4gICAgdmFsaWRhdGUoYWJzdHJhY3RDb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiB7IFtrZXk6IHN0cmluZ106IGFueTsgfSB7XG4gICAgICAgIGxldCByZXN1bHQ6IGFueSA9IHt9O1xuXG4gICAgICAgIGlmIChhYnN0cmFjdENvbnRyb2wudmFsdWUgPiB0aGlzLm1heCkge1xuICAgICAgICAgICAgcmVzdWx0Lm1heCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYWJzdHJhY3RDb250cm9sLnZhbHVlIDwgdGhpcy5taW4pIHtcbiAgICAgICAgICAgIHJlc3VsdC5taW4gPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdCAhPSB7fSA/IHJlc3VsdCA6IG51bGw7XG4gICAgfVxuXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5wdXRIYW5kbGVyLnNldFZhbHVlKHZhbHVlKTtcbiAgICB9XG59Il19