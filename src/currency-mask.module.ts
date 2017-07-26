import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgModule, ModuleWithProviders } from "@angular/core";
import { CurrencyMaskDirective } from "./currency-mask.directive";
import { CURRENCY_MASK_CONFIG_PROVIDER } from "./currency-mask-config";

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        CurrencyMaskDirective
    ],
    exports: [
        CurrencyMaskDirective
    ]
})
export class CurrencyMaskModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CurrencyMaskModule,
            providers: [
                CURRENCY_MASK_CONFIG_PROVIDER
            ]
        }
    }
}