import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styles: [],
})
export class AppComponent implements OnInit {
    angularMaterialExample: number = 60;
    formControlExample = new FormControl(20);
    formGroupExample: FormGroup;
    ngModelExample: number = 10;

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.formGroupExample = this.formBuilder.group({
            formArrayExample: this.formBuilder.array([this.formBuilder.control(30), this.formBuilder.control(40), this.formBuilder.control(50)]),
        });
    }

    get formArrayExample() {
        return this.formGroupExample.get("formArrayExample") as FormArray;
    }
}
