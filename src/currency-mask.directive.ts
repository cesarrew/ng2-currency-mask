import { AfterViewInit, Directive, DoCheck, ElementRef, forwardRef, HostListener, KeyValueDiffer, KeyValueDiffers, Input, OnInit, Renderer } from "@angular/core";
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
export class CurrencyMaskDirective implements AfterViewInit, ControlValueAccessor, DoCheck, OnInit {

    @Input() options: any = {};

    inputHandler: InputHandler;
    keyValueDiffer: KeyValueDiffer<any, any>;

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

    constructor(
        private elementRef: ElementRef,
        private keyValueDiffers: KeyValueDiffers,
        private renderer: Renderer
    ) {
        this.keyValueDiffer = keyValueDiffers.find({}).create(null);
    }

    ngAfterViewInit() {
        let align = this.options.align ? this.options.align : this.optionsTemplate.align;
        this.renderer.setElementStyle(this.elementRef.nativeElement, "textAlign", align);
    }

    ngDoCheck() {
        if (this.keyValueDiffer.diff(this.options)) {
            let align = this.options.align ? this.options.align : this.optionsTemplate.align;
            this.renderer.setElementStyle(this.elementRef.nativeElement, "textAlign", align);

            this.inputHandler.updateOptions((<any>Object).assign({}, this.optionsTemplate, this.options));
        }
    }

    ngOnInit() {
        this.inputHandler = new InputHandler(this.elementRef.nativeElement, (<any>Object).assign({}, this.optionsTemplate, this.options));
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