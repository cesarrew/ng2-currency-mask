# ng2-currency-mask

A very simple currency mask directive for Angular that allows using a number attribute with the ngModel. In other words, the model is a number, and not a string with a mask. It was tested in Angular version 13.

## Example App

https://stackblitz.com/edit/angular-ivy-bpn8by

## Getting Started

### Installing and Importing

Install the package by command:

```sh
    npm install ng2-currency-mask --save
```

Import the module

```ts
import { CurrencyMaskModule } from "ng2-currency-mask";

@NgModule({
    imports: [
        ...
        CurrencyMaskModule
    ],
    declarations: [...],
    providers: [...]
})
export class AppModule {}
```

### Using

```html
<input currencyMask [(ngModel)]="value" />
```

-   `ngModel` An attribute of type number. If is displayed `'$ 25.63'`, the attribute will be `'25.63'`.

### Options

You can set options as follows:

```html
<!-- example for pt-BR money -->
<input currencyMask [(ngModel)]="value" [options]="{ prefix: 'R$ ', thousands: '.', decimal: ',' }" />
```

Available options:

-   `align` - Text alignment in input. (default: `right`)
-   `allowNegative` - If `true` can input negative values. (default: `true`)
-   `decimal` - Separator of decimals (default: `'.'`)
-   `precision` - Number of decimal places (default: `2`)
-   `prefix` - Money prefix (default: `'$ '`)
-   `suffix` - Money suffix (default: `''`)
-   `thousands` - Separator of thousands (default: `','`)

You can also set options globally...

```ts
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
    align: "right",
    allowNegative: true,
    decimal: ",",
    precision: 2,
    prefix: "R$ ",
    suffix: "",
    thousands: "."
};

@NgModule({
    imports: [
        ...
        CurrencyMaskModule
    ],
    declarations: [...],
    providers: [
        { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
```

### Validation

This directive also provides built-in validation for minimum and maximum values. If the attributes 'min' and / or 'max' are set, the Angular CSS class 'ng-invalid' will be added to the input to indicate an invalid value.

```html
<input currencyMask [(ngModel)]="value" min="-10.50" max="100.75" />
```
