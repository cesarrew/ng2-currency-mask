import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CurrencyMaskModule } from "ng2-currency-mask";
import { AppComponent } from "./app.component";

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserAnimationsModule, BrowserModule, CurrencyMaskModule, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
