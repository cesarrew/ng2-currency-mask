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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VycmVuY3ktbWFzay5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZzItY3VycmVuY3ktbWFzay9zcmMvbGliL2N1cnJlbmN5LW1hc2suZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBaUIsU0FBUyxFQUF1QixVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQTJDLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxSyxPQUFPLEVBQXlDLGFBQWEsRUFBRSxpQkFBaUIsRUFBYSxNQUFNLGdCQUFnQixDQUFDO0FBQ3BILE9BQU8sRUFBc0Isb0JBQW9CLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNsRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBRS9DLE1BQU0sQ0FBQyxNQUFNLG9DQUFvQyxHQUFRO0lBQ3JELE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztJQUNwRCxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7QUFTRixNQUFNLE9BQU8scUJBQXFCO0lBbUI5QixZQUE4RCxrQkFBc0MsRUFBVSxVQUFzQixFQUFVLGVBQWdDO1FBQWhILHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQVUsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBZnJLLFlBQU8sR0FBUSxFQUFFLENBQUM7UUFLM0Isb0JBQWUsR0FBRztZQUNkLEtBQUssRUFBRSxPQUFPO1lBQ2QsYUFBYSxFQUFFLElBQUk7WUFDbkIsT0FBTyxFQUFFLEdBQUc7WUFDWixTQUFTLEVBQUUsQ0FBQztZQUNaLE1BQU0sRUFBRSxJQUFJO1lBQ1osTUFBTSxFQUFFLEVBQUU7WUFDVixTQUFTLEVBQUUsR0FBRztTQUNqQixDQUFDO1FBR0UsSUFBSSxrQkFBa0IsRUFBRTtZQUNwQixJQUFJLENBQUMsZUFBZSxHQUFHLGtCQUFrQixDQUFDO1NBQzdDO1FBRUQsSUFBSSxDQUFDLGNBQWMsR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzVELENBQUM7SUFFRCxlQUFlO1FBQ1gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDO0lBQ3pILENBQUM7SUFFRCxTQUFTO1FBQ0wsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDeEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDO1lBQ3JILElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFPLE1BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7U0FDakc7SUFDTCxDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQVEsTUFBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUN0SSxDQUFDO0lBR0QsVUFBVSxDQUFDLEtBQVU7UUFDakIsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBR0QsV0FBVyxDQUFDLEtBQVU7UUFDbEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFHRCxTQUFTLENBQUMsS0FBVTtRQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3RDO0lBQ0wsQ0FBQztJQUdELFdBQVcsQ0FBQyxLQUFVO1FBQ2xCLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3hDO0lBQ0wsQ0FBQztJQUdELGFBQWEsQ0FBQyxLQUFVO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLEVBQUU7WUFDekIsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDMUM7SUFDTCxDQUFDO0lBR0QsY0FBYyxDQUFDLEtBQVU7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsRUFBRTtZQUN6QixJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMzQztJQUNMLENBQUM7SUFHRCxXQUFXLENBQUMsS0FBVTtRQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3hDO0lBQ0wsQ0FBQztJQUdELFdBQVcsQ0FBQyxLQUFVO1FBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLEVBQUU7WUFDekIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDeEM7SUFDTCxDQUFDO0lBRUQsZUFBZTtRQUNYLE9BQU8sU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdkYsQ0FBQztJQUVELGdCQUFnQixDQUFDLGdCQUEwQjtRQUN2QyxJQUFJLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDekQsQ0FBQztJQUVELGlCQUFpQixDQUFDLGdCQUEwQjtRQUN4QyxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVELGdCQUFnQixDQUFDLEtBQWM7UUFDM0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUNuRCxDQUFDO0lBRUQsUUFBUSxDQUFDLGVBQWdDO1FBQ3JDLElBQUksTUFBTSxHQUFRLEVBQUUsQ0FBQztRQUVyQixJQUFJLGVBQWUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUNsQyxNQUFNLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztTQUNyQjtRQUVELElBQUksZUFBZSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ2xDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO1NBQ3JCO1FBRUQsT0FBTyxNQUFNLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUN4QyxDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQWE7UUFDcEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEMsQ0FBQzs7a0hBOUhRLHFCQUFxQixrQkFtQkUsb0JBQW9CO3NHQW5CM0MscUJBQXFCLDhYQUxuQjtRQUNQLG9DQUFvQztRQUNwQyxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLHFCQUFxQixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7S0FDOUU7MkZBRVEscUJBQXFCO2tCQVBqQyxTQUFTO21CQUFDO29CQUNQLFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFNBQVMsRUFBRTt3QkFDUCxvQ0FBb0M7d0JBQ3BDLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxXQUFXLHVCQUF1QixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUU7cUJBQzlFO2lCQUNKOzswQkFvQmdCLFFBQVE7OzBCQUFJLE1BQU07MkJBQUMsb0JBQW9CO21HQWpCM0MsR0FBRztzQkFBWCxLQUFLO2dCQUNHLEdBQUc7c0JBQVgsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBdUNOLFVBQVU7c0JBRFQsWUFBWTt1QkFBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBTWhDLFdBQVc7c0JBRFYsWUFBWTt1QkFBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBTWpDLFNBQVM7c0JBRFIsWUFBWTt1QkFBQyxLQUFLLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBUS9CLFdBQVc7c0JBRFYsWUFBWTt1QkFBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBUWpDLGFBQWE7c0JBRFosWUFBWTt1QkFBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBUW5DLGNBQWM7c0JBRGIsWUFBWTt1QkFBQyxVQUFVLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBUXBDLFdBQVc7c0JBRFYsWUFBWTt1QkFBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBUWpDLFdBQVc7c0JBRFYsWUFBWTt1QkFBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBEaXJlY3RpdmUsIERvQ2hlY2ssIEVsZW1lbnRSZWYsIGZvcndhcmRSZWYsIEhvc3RMaXN0ZW5lciwgSW5qZWN0LCBJbnB1dCwgS2V5VmFsdWVEaWZmZXIsIEtleVZhbHVlRGlmZmVycywgT25Jbml0LCBPcHRpb25hbCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxJREFUT1JTLCBOR19WQUxVRV9BQ0NFU1NPUiwgVmFsaWRhdG9yIH0gZnJvbSBcIkBhbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQgeyBDdXJyZW5jeU1hc2tDb25maWcsIENVUlJFTkNZX01BU0tfQ09ORklHIH0gZnJvbSBcIi4vY3VycmVuY3ktbWFzay5jb25maWdcIjtcbmltcG9ydCB7IElucHV0SGFuZGxlciB9IGZyb20gXCIuL2lucHV0LmhhbmRsZXJcIjtcblxuZXhwb3J0IGNvbnN0IENVUlJFTkNZTUFTS0RJUkVDVElWRV9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEN1cnJlbmN5TWFza0RpcmVjdGl2ZSksXG4gICAgbXVsdGk6IHRydWVcbn07XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiBcIltjdXJyZW5jeU1hc2tdXCIsXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIENVUlJFTkNZTUFTS0RJUkVDVElWRV9WQUxVRV9BQ0NFU1NPUixcbiAgICAgICAgeyBwcm92aWRlOiBOR19WQUxJREFUT1JTLCB1c2VFeGlzdGluZzogQ3VycmVuY3lNYXNrRGlyZWN0aXZlLCBtdWx0aTogdHJ1ZSB9XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBDdXJyZW5jeU1hc2tEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgRG9DaGVjaywgT25Jbml0LCBWYWxpZGF0b3Ige1xuXG4gICAgQElucHV0KCkgbWF4OiBudW1iZXI7XG4gICAgQElucHV0KCkgbWluOiBudW1iZXI7XG4gICAgQElucHV0KCkgb3B0aW9uczogYW55ID0ge307XG5cbiAgICBpbnB1dEhhbmRsZXI6IElucHV0SGFuZGxlcjtcbiAgICBrZXlWYWx1ZURpZmZlcjogS2V5VmFsdWVEaWZmZXI8YW55LCBhbnk+O1xuXG4gICAgb3B0aW9uc1RlbXBsYXRlID0ge1xuICAgICAgICBhbGlnbjogXCJyaWdodFwiLFxuICAgICAgICBhbGxvd05lZ2F0aXZlOiB0cnVlLFxuICAgICAgICBkZWNpbWFsOiBcIi5cIixcbiAgICAgICAgcHJlY2lzaW9uOiAyLFxuICAgICAgICBwcmVmaXg6IFwiJCBcIixcbiAgICAgICAgc3VmZml4OiBcIlwiLFxuICAgICAgICB0aG91c2FuZHM6IFwiLFwiXG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBJbmplY3QoQ1VSUkVOQ1lfTUFTS19DT05GSUcpIHByaXZhdGUgY3VycmVuY3lNYXNrQ29uZmlnOiBDdXJyZW5jeU1hc2tDb25maWcsIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSBrZXlWYWx1ZURpZmZlcnM6IEtleVZhbHVlRGlmZmVycykge1xuICAgICAgICBpZiAoY3VycmVuY3lNYXNrQ29uZmlnKSB7XG4gICAgICAgICAgICB0aGlzLm9wdGlvbnNUZW1wbGF0ZSA9IGN1cnJlbmN5TWFza0NvbmZpZztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMua2V5VmFsdWVEaWZmZXIgPSBrZXlWYWx1ZURpZmZlcnMuZmluZCh7fSkuY3JlYXRlKCk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5zdHlsZS50ZXh0QWxpZ24gPSB0aGlzLm9wdGlvbnMuYWxpZ24gPyB0aGlzLm9wdGlvbnMuYWxpZ24gOiB0aGlzLm9wdGlvbnNUZW1wbGF0ZS5hbGlnbjtcbiAgICB9XG5cbiAgICBuZ0RvQ2hlY2soKSB7XG4gICAgICAgIGlmICh0aGlzLmtleVZhbHVlRGlmZmVyLmRpZmYodGhpcy5vcHRpb25zKSkge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuc3R5bGUudGV4dEFsaWduID0gdGhpcy5vcHRpb25zLmFsaWduID8gdGhpcy5vcHRpb25zLmFsaWduIDogdGhpcy5vcHRpb25zVGVtcGxhdGUuYWxpZ247XG4gICAgICAgICAgICB0aGlzLmlucHV0SGFuZGxlci51cGRhdGVPcHRpb25zKCg8YW55Pk9iamVjdCkuYXNzaWduKHt9LCB0aGlzLm9wdGlvbnNUZW1wbGF0ZSwgdGhpcy5vcHRpb25zKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5pbnB1dEhhbmRsZXIgPSBuZXcgSW5wdXRIYW5kbGVyKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAoPGFueT5PYmplY3QpLmFzc2lnbih7fSwgdGhpcy5vcHRpb25zVGVtcGxhdGUsIHRoaXMub3B0aW9ucykpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJibHVyXCIsIFtcIiRldmVudFwiXSlcbiAgICBoYW5kbGVCbHVyKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgdGhpcy5pbnB1dEhhbmRsZXIuZ2V0T25Nb2RlbFRvdWNoZWQoKS5hcHBseShldmVudCk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcihcImNsaWNrXCIsIFtcIiRldmVudFwiXSlcbiAgICBoYW5kbGVDbGljayhldmVudDogYW55KSB7XG4gICAgICAgIHRoaXMuaW5wdXRIYW5kbGVyLmhhbmRsZUNsaWNrKGV2ZW50LCB0aGlzLmlzQ2hyb21lQW5kcm9pZCgpKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKFwiY3V0XCIsIFtcIiRldmVudFwiXSlcbiAgICBoYW5kbGVDdXQoZXZlbnQ6IGFueSkge1xuICAgICAgICBpZiAoIXRoaXMuaXNDaHJvbWVBbmRyb2lkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRIYW5kbGVyLmhhbmRsZUN1dChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKFwiaW5wdXRcIiwgW1wiJGV2ZW50XCJdKVxuICAgIGhhbmRsZUlucHV0KGV2ZW50OiBhbnkpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNDaHJvbWVBbmRyb2lkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRIYW5kbGVyLmhhbmRsZUlucHV0KGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJrZXlkb3duXCIsIFtcIiRldmVudFwiXSlcbiAgICBoYW5kbGVLZXlkb3duKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzQ2hyb21lQW5kcm9pZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmlucHV0SGFuZGxlci5oYW5kbGVLZXlkb3duKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJrZXlwcmVzc1wiLCBbXCIkZXZlbnRcIl0pXG4gICAgaGFuZGxlS2V5cHJlc3MoZXZlbnQ6IGFueSkge1xuICAgICAgICBpZiAoIXRoaXMuaXNDaHJvbWVBbmRyb2lkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRIYW5kbGVyLmhhbmRsZUtleXByZXNzKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJrZXl1cFwiLCBbXCIkZXZlbnRcIl0pXG4gICAgaGFuZGxlS2V5dXAoZXZlbnQ6IGFueSkge1xuICAgICAgICBpZiAoIXRoaXMuaXNDaHJvbWVBbmRyb2lkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRIYW5kbGVyLmhhbmRsZUtleXVwKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoXCJwYXN0ZVwiLCBbXCIkZXZlbnRcIl0pXG4gICAgaGFuZGxlUGFzdGUoZXZlbnQ6IGFueSkge1xuICAgICAgICBpZiAoIXRoaXMuaXNDaHJvbWVBbmRyb2lkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRIYW5kbGVyLmhhbmRsZVBhc3RlKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzQ2hyb21lQW5kcm9pZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIC9jaHJvbWUvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpICYmIC9hbmRyb2lkL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICB9XG5cbiAgICByZWdpc3Rlck9uQ2hhbmdlKGNhbGxiYWNrRnVuY3Rpb246IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5wdXRIYW5kbGVyLnNldE9uTW9kZWxDaGFuZ2UoY2FsbGJhY2tGdW5jdGlvbik7XG4gICAgfVxuXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoY2FsbGJhY2tGdW5jdGlvbjogRnVuY3Rpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbnB1dEhhbmRsZXIuc2V0T25Nb2RlbFRvdWNoZWQoY2FsbGJhY2tGdW5jdGlvbik7XG4gICAgfVxuXG4gICAgc2V0RGlzYWJsZWRTdGF0ZSh2YWx1ZTogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5kaXNhYmxlZCA9IHZhbHVlO1xuICAgIH1cblxuICAgIHZhbGlkYXRlKGFic3RyYWN0Q29udHJvbDogQWJzdHJhY3RDb250cm9sKTogeyBba2V5OiBzdHJpbmddOiBhbnk7IH0ge1xuICAgICAgICBsZXQgcmVzdWx0OiBhbnkgPSB7fTtcblxuICAgICAgICBpZiAoYWJzdHJhY3RDb250cm9sLnZhbHVlID4gdGhpcy5tYXgpIHtcbiAgICAgICAgICAgIHJlc3VsdC5tYXggPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFic3RyYWN0Q29udHJvbC52YWx1ZSA8IHRoaXMubWluKSB7XG4gICAgICAgICAgICByZXN1bHQubWluID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQgIT0ge30gPyByZXN1bHQgOiBudWxsO1xuICAgIH1cblxuICAgIHdyaXRlVmFsdWUodmFsdWU6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLmlucHV0SGFuZGxlci5zZXRWYWx1ZSh2YWx1ZSk7XG4gICAgfVxufSJdfQ==