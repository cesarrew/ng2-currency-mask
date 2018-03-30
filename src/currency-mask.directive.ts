import {
  AfterViewInit,
  Directive,
  DoCheck,
  ElementRef,
  forwardRef,
  HostListener,
  Inject,
  Input,
  KeyValueDiffer,
  KeyValueDiffers,
  OnInit,
  Optional,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { CURRENCY_MASK_CONFIG, CurrencyMaskConfig } from './currency-mask.config';
import { InputHandler } from './input.handler';

export const CURRENCYMASKDIRECTIVE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CurrencyMaskDirective),
  multi: true
};

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[currencyMask]',
  providers: [CURRENCYMASKDIRECTIVE_VALUE_ACCESSOR]
})
export class CurrencyMaskDirective implements AfterViewInit, ControlValueAccessor, DoCheck, OnInit {
  @Input() options: any = {};

  inputHandler: InputHandler;
  keyValueDiffer: KeyValueDiffer<any, any>;

  optionsTemplate = {
    align: 'right',
    direction: 'RTL',
    allowNegative: true,
    allowZero: true,
    decimal: '.',
    precision: 2,
    prefix: '$ ',
    suffix: '',
    thousands: ',',
    selectOnFocus: false,
    removeMaskDuringEntry: false
  };

  constructor(
    @Optional()
    @Inject(CURRENCY_MASK_CONFIG)
    private currencyMaskConfig: CurrencyMaskConfig,
    private elementRef: ElementRef,
    private keyValueDiffers: KeyValueDiffers
  ) {
    if (currencyMaskConfig) {
      this.optionsTemplate = currencyMaskConfig;
    }

    this.keyValueDiffer = keyValueDiffers.find({}).create();
  }

  ngAfterViewInit() {
    this.elementRef.nativeElement.style.textAlign = this.options.align
      ? this.options.align
      : this.optionsTemplate.align;
  }

  ngDoCheck() {
    if (this.keyValueDiffer.diff(this.options)) {
      this.elementRef.nativeElement.style.textAlign = this.options.align
        ? this.options.align
        : this.optionsTemplate.align;
      this.inputHandler.updateOptions((<any>Object).assign({}, this.optionsTemplate, this.options));
    }
  }

  ngOnInit() {
    this.inputHandler = new InputHandler(
      this.elementRef.nativeElement,
      (<any>Object).assign({}, this.optionsTemplate, this.options)
    );
  }

  @HostListener('focus', ['$event'])
  onFocus(event: any) {
    this.inputHandler.handleFocus(event);
  }

  @HostListener('blur', ['$event'])
  onBlur(event: any) {
    this.inputHandler.handleBlur(event);
    this.inputHandler.getOnModelTouched().apply(event);
  }

  @HostListener('cut', ['$event'])
  onCut(event: any) {
    if (!this.isChromeAndroid()) {
      this.inputHandler.handleCut(event);
    }
  }

  @HostListener('input', ['$event'])
  onInput(event: any) {
    if (this.isChromeAndroid()) {
      this.inputHandler.handleInput(event);
    }
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: any) {
    if (!this.isChromeAndroid()) {
      this.inputHandler.handleKeydown(event);
    }
  }

  @HostListener('keypress', ['$event'])
  onKeypress(event: any) {
    if (!this.isChromeAndroid()) {
      this.inputHandler.handleKeypress(event);
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: any) {
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
