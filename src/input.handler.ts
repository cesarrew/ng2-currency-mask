import { InputService } from "./input.service";

export class InputHandler {

    private inputService: InputService;
    private onModelChange: Function;
    private onModelTouched: Function;

    constructor(htmlInputElement: HTMLInputElement, options: any) {
        this.inputService = new InputService(htmlInputElement, options);
    }

    handleClick(event: any) {
        this.inputService.resetSelection();
    }

    handleCut(event: any) {
        setTimeout(() => {
            this.inputService.updateFieldValue();
            this.onModelChange(this.inputService.value);
        }, 1);
    }

    handleKeydown(event: any) {
        let key = event.which || event.charCode || event.keyCode;

        if (key === undefined) {
            return false;
        }

        if (key === 8 || key === 46 || key === 63272) {
            event.preventDefault();
            this.inputService.removeNumber(key);
            this.onModelChange(this.inputService.value);
        }
    }

    handleKeypress(event: any) {
        let key = event.which || event.charCode || event.keyCode;

        switch (key) {
            case undefined:
                return false;
            case 43:
                this.inputService.changeToPositive();
                break;
            case 45:
                this.inputService.changeToNegative();
                break;
            default:
                if (!this.inputService.canInputMoreNumbers) {
                    return false;
                }

                this.inputService.addNumber(key);
        }

        event.preventDefault();
        this.onModelChange(this.inputService.value);
    }

    handlePaste(event: any) {
        setTimeout(() => {
            this.inputService.updateFieldValue();
            this.onModelChange(this.inputService.value);
        }, 1);
    }

    getOnModelChange(): Function {
        return this.onModelChange;
    }

    setOnModelChange(callbackFunction: Function) {
        this.onModelChange = callbackFunction;
    }

    getOnModelTouched(): Function {
        return this.onModelTouched;
    }

    setOnModelTouched(callbackFunction: Function) {
        this.onModelTouched = callbackFunction;
    }

    setValue(value: number) {
        this.inputService.value = value;
    }
}