# ng2-currency-mask

A very simple currency mask directive for Angular 2 that allows using a number attribute with the ngModel. In other words, the model is a number, and not a string with a mask. It is compatible with Angular 2 2.0.0 and newer.
Inspired by https://github.com/castrolol/ng2-mask-money.

Note: This component is ready to AoC (Ahead-of-Time) compilation.

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
        //... you others modules
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

 * `ngModel` An attribute of type number. If is displayed `'$ 25.63'`, the attribute will be `'25.63'`.

### Options 

You can set options...

```html
    <!-- example for pt-BR money -->
    <input currencyMask [(ngModel)]="value" [options]="{ prefix: 'R$ ', thousands: '.', decimal: ',' }"/>
```  

Available options: 

 * `align` - Text alignment in input. (default: `right`)
 * `allowNegative` - If `true` can input negative values.  (default: `true`)
 * `precision` - Number of decimal places (default: `2`)
 * `thousands` - Separator of thousands (default: `','`)
 * `decimal` -  Separator of decimals (default: `'.'`)
 * `prefix` - Money preffix (default: `'$ '`)

## Questions? Open a Issue!