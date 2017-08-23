import { AfterViewInit, Directive, DoCheck, ElementRef, forwardRef, HostListener, KeyValueDiffer, KeyValueDiffers, Input, OnInit } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

import { InputHandler } from "./input.handler";

export const CURRENCYMASKDIRECTIVE_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CurrencyMaskDirective),
    multi: true
};

@Directive({
    selector: "[currencyMask]",
    providers: [CURRENCYMASKDIRECTIVE_VALUE_ACCESSOR]
})
export class CurrencyMaskDirective implements AfterViewInit, ControlValueAccessor, DoCheck, OnInit {

    @Input() options: any = {};

    inputHandler: InputHandler;
    keyValueDiffer: KeyValueDiffer;

    optionsTemplate = {
        align: "right",
        allowNegative: true,
        allowZero: true,
        decimal: ".",
        precision: 2,
        prefix: "$ ",
        suffix: "",
        thousands: ","
    };

    constructor(private elementRef: ElementRef, private keyValueDiffers: KeyValueDiffers) {
        this.keyValueDiffer = keyValueDiffers.find({}).create(null);
    }

    ngAfterViewInit() {
        if(this && this.elementRef && this.elementRef.nativeElement && this.elementRef.nativeElement.style) {
            this.elementRef.nativeElement.style.textAlign = this.options.align ? this.options.align : this.optionsTemplate.align;
        }
    }

    ngDoCheck() {
        if (this.keyValueDiffer.diff(this.options)) {
            if(this && this.elementRef && this.elementRef.nativeElement && this.elementRef.nativeElement.style) {
                this.elementRef.nativeElement.style.textAlign = this.options.align ? this.options.align : this.optionsTemplate.align;
            }
            if(this && this.inputHandler) {
                this.inputHandler.updateOptions(Object.assign({}, this.optionsTemplate, this.options));
            }
        }
    }

    ngOnInit() {
        this.inputHandler = new InputHandler(this.elementRef.nativeElement, Object.assign({}, this.optionsTemplate, this.options));
    }

    @HostListener("blur", ["$event"])
    handleBlur(event: any) {
        if(this && this.inputHandler) {
            this.inputHandler.getOnModelTouched().apply(event);
        }
    }

    @HostListener("cut", ["$event"])
    handleCut(event: any) {
        if (!this.isChromeAndroid()) {
            this.inputHandler.handleCut(event);
        }
    }

    @HostListener("input", ["$event"])
    handleInput(event: any) {
        if (this.isChromeAndroid()) {
            this.inputHandler.handleInput(event);
        }
    }

    @HostListener("keydown", ["$event"])
    handleKeydown(event: any) {
        if (!this.isChromeAndroid()) {
            this.inputHandler.handleKeydown(event);
        }
    }

    @HostListener("keypress", ["$event"])
    handleKeypress(event: any) {
        if (!this.isChromeAndroid()) {
            this.inputHandler.handleKeypress(event);
        }
    }

    @HostListener("paste", ["$event"])
    handlePaste(event: any) {
        if (!this.isChromeAndroid()) {
            this.inputHandler.handlePaste(event);
        }
    }

    isChromeAndroid(): boolean {
        return /chrome/i.test(navigator.userAgent) && /android/i.test(navigator.userAgent);
    }

    registerOnChange(callbackFunction: Function): void {
        if(this && this.inputHandler) {
            this.inputHandler.setOnModelChange(callbackFunction);
        }
    }

    registerOnTouched(callbackFunction: Function): void {
        if(this && this.inputHandler) {
            this.inputHandler.setOnModelTouched(callbackFunction);
        }
    }

    setDisabledState(value: boolean): void {
        this.elementRef.nativeElement.disabled = value;
    }

    writeValue(value: number): void {
        if(this && this.inputHandler) {
            this.inputHandler.setValue(value);
        }
    }
}
