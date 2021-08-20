import { InjectionToken } from "@angular/core";
export interface CurrencyMaskConfig {
    align: string;
    allowNegative: boolean;
    decimal: string;
    precision: number;
    prefix: string;
    suffix: string;
    thousands: string;
}
export declare let CURRENCY_MASK_CONFIG: InjectionToken<CurrencyMaskConfig>;
