import { OpaqueToken, ClassProvider } from '@angular/core';

export class CurrencyMaskConfig {
    align: string = 'right';
    allowNegative: boolean = true;
    decimal: string = '.';
    precision: number = 2;
    prefix: string = '$ ';
    suffix: string = '';
    thousands: string = ',';
    allowZero: boolean = true;
}

export const CURRENCY_MASK_CONFIG_TOKEN = new OpaqueToken('CurrencyMaskConfig')

export const CURRENCY_MASK_CONFIG_PROVIDER: ClassProvider = {
    provide: CURRENCY_MASK_CONFIG_TOKEN,
    useClass: CurrencyMaskConfig
}