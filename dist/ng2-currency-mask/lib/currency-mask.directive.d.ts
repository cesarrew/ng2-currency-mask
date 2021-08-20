import { AfterViewInit, DoCheck, ElementRef, KeyValueDiffer, KeyValueDiffers, OnInit } from "@angular/core";
import { AbstractControl, ControlValueAccessor, Validator } from "@angular/forms";
import { CurrencyMaskConfig } from "./currency-mask.config";
import { InputHandler } from "./input.handler";
import * as i0 from "@angular/core";
export declare const CURRENCYMASKDIRECTIVE_VALUE_ACCESSOR: any;
export declare class CurrencyMaskDirective implements AfterViewInit, ControlValueAccessor, DoCheck, OnInit, Validator {
    private currencyMaskConfig;
    private elementRef;
    private keyValueDiffers;
    max: number;
    min: number;
    options: any;
    inputHandler: InputHandler;
    keyValueDiffer: KeyValueDiffer<any, any>;
    optionsTemplate: {
        align: string;
        allowNegative: boolean;
        decimal: string;
        precision: number;
        prefix: string;
        suffix: string;
        thousands: string;
    };
    constructor(currencyMaskConfig: CurrencyMaskConfig, elementRef: ElementRef, keyValueDiffers: KeyValueDiffers);
    ngAfterViewInit(): void;
    ngDoCheck(): void;
    ngOnInit(): void;
    handleBlur(event: any): void;
    handleClick(event: any): void;
    handleCut(event: any): void;
    handleInput(event: any): void;
    handleKeydown(event: any): void;
    handleKeypress(event: any): void;
    handleKeyup(event: any): void;
    handlePaste(event: any): void;
    isChromeAndroid(): boolean;
    registerOnChange(callbackFunction: Function): void;
    registerOnTouched(callbackFunction: Function): void;
    setDisabledState(value: boolean): void;
    validate(abstractControl: AbstractControl): {
        [key: string]: any;
    };
    writeValue(value: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CurrencyMaskDirective, [{ optional: true; }, null, null]>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<CurrencyMaskDirective, "[currencyMask]", never, { "max": "max"; "min": "min"; "options": "options"; }, {}, never>;
}
