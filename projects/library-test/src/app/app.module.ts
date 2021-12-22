import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { CurrencyMaskModule } from "ng2-currency-mask";
import { AppComponent } from "./app.component";

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, CurrencyMaskModule, FormsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
