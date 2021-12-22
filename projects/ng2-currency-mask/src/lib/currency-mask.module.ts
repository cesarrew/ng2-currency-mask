import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CurrencyMaskDirective } from "./currency-mask.directive";

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [CurrencyMaskDirective],
    exports: [CurrencyMaskDirective],
})
export class CurrencyMaskModule {}
