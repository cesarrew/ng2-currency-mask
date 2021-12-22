import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styles: [],
})
export class AppComponent {
    reactiveFormControl = new FormControl(10);
    templateDrivenValue: number = 20;
}
