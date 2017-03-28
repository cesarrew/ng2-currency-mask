# ng2-currency-mask

A very simple currency mask directive for Angular that allows using a number attribute with the ngModel. In other words, the model is a number, and not a string with a mask. You should use the version 2.x.x for Angular 2.x.x applications and the version 4.x.x for Angular 4.x.x applications.

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
 * `decimal` -  Separator of decimals (default: `'.'`)
 * `precision` - Number of decimal places (default: `2`)
 * `prefix` - Money prefix (default: `'$ '`)
 * `suffix` - Money suffix (default: `''`)
 * `thousands` - Separator of thousands (default: `','`)

## Questions? Open a Issue!