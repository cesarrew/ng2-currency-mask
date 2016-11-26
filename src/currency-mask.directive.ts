import { AfterViewInit, Directive, ElementRef, forwardRef, HostListener, Input, OnInit } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

import { InputHandler } from "./input.handler";

export const CURRENCYMASKDIRECTIVE_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CurrencyMaskDirective),
    multi: true
};

@Directive({
    selector: "input[currencyMask]",
    providers: [CURRENCYMASKDIRECTIVE_VALUE_ACCESSOR]
})
export class CurrencyMaskDirective implements AfterViewInit, ControlValueAccessor, OnInit {

    @Input()
    options: any = {};

    inputHandler: InputHandler;

    optionsTemplate = {
        align: "right",
        allowNegative: true,
        precision: 2,
        prefix: "$ ",
        thousands: ",",
        decimal: ".",
        allowZero: true
    };

    constructor(private elementRef: ElementRef) {
    }

    ngAfterViewInit() {
        this.elementRef.nativeElement.style.textAlign = this.options.align;
    }

    ngOnInit() {
        this.inputHandler = new InputHandler(this.elementRef.nativeElement, Object.assign({}, this.optionsTemplate, this.options));
    }

    @HostListener("click", ["$event"])
    handleClick(event: any) {
        this.inputHandler.handleClick(event);
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
        this.inputHandler.handleKeypress(event);
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
        this.inputHandler.setOnModelChange(callbackFunction);
    }

    registerOnTouched(callbackFunction: Function): void {
        this.inputHandler.setOnModelTouched(callbackFunction);
    }

    setDisabledState(value: boolean): void {
        this.elementRef.nativeElement.disabled = value;
    }

    writeValue(value: number): void {
        this.inputHandler.setValue(value);
    }
}