import { InputService } from "./input.service";

export class InputHandler {
    private inputService: InputService;
    private onModelChange: Function;
    private onModelTouched: Function;
    private htmlInputElement: HTMLInputElement;

    constructor(htmlInputElement: HTMLInputElement, options: any) {
        this.inputService = new InputService(htmlInputElement, options);
        this.htmlInputElement = htmlInputElement;
    }

    handleClick(event: any, chromeAndroid: boolean): void {
        let selectionRangeLength = Math.abs(this.inputService.inputSelection.selectionEnd - this.inputService.inputSelection.selectionStart);

        //if there is no selection and the value is not null, the cursor position will be fixed. if the browser is chrome on android, the cursor will go to the end of the number.
        if (selectionRangeLength == 0 && !isNaN(this.inputService.value)) {
            this.inputService.fixCursorPosition(chromeAndroid);
        }
    }

    handleCut(event: any): void {
        if (this.isReadOnly()) {
            return;
        }

        setTimeout(() => {
            this.inputService.updateFieldValue();
            this.setValue(this.inputService.value);
            this.onModelChange(this.inputService.value);
        }, 0);
    }

    handleInput(event: any): void {
        if (this.isReadOnly()) {
            return;
        }

        let keyCode = this.getNewKeyCode(this.inputService.storedRawValue, this.inputService.rawValue);
        let rawValueLength = this.inputService.rawValue.length;
        let rawValueSelectionEnd = this.inputService.inputSelection.selectionEnd;
        let rawValueWithoutSuffixEndPosition = this.inputService.getRawValueWithoutSuffixEndPosition();
        let storedRawValueLength = this.inputService.storedRawValue.length;
        this.inputService.rawValue = this.inputService.storedRawValue;

        if ((rawValueSelectionEnd != rawValueWithoutSuffixEndPosition || Math.abs(rawValueLength - storedRawValueLength) != 1) && storedRawValueLength != 0) {
            this.setCursorPosition(event);
            return;
        }

        if (rawValueLength < storedRawValueLength) {
            if (this.inputService.value != 0) {
                this.inputService.removeNumber(8);
            } else {
                this.setValue(null);
            }
        }

        if (rawValueLength > storedRawValueLength) {
            switch (keyCode) {
                case 43:
                    this.inputService.changeToPositive();
                    break;
                case 45:
                    this.inputService.changeToNegative();
                    break;
                default:
                    if (!this.inputService.canInputMoreNumbers || (isNaN(this.inputService.value) && String.fromCharCode(keyCode).match(/\d/) == null)) {
                        return;
                    }

                    this.inputService.addNumber(keyCode);
            }
        }

        this.setCursorPosition(event);
        this.onModelChange(this.inputService.value);
    }

    handleKeydown(event: any): void {
        if (this.isReadOnly()) {
            return;
        }

        let keyCode = event.which || event.charCode || event.keyCode;

        if (keyCode == 8 || keyCode == 46 || keyCode == 63272) {
            event.preventDefault();
            let selectionRangeLength = Math.abs(this.inputService.inputSelection.selectionEnd - this.inputService.inputSelection.selectionStart);

            if (selectionRangeLength == this.inputService.rawValue.length || this.inputService.value == 0) {
                this.setValue(null);
                this.onModelChange(this.inputService.value);
            }

            if (selectionRangeLength == 0 && !isNaN(this.inputService.value)) {
                this.inputService.removeNumber(keyCode);
                this.onModelChange(this.inputService.value);
            }

            if ((keyCode === 8 || keyCode === 46) && selectionRangeLength != 0 && !isNaN(this.inputService.value)) {
                this.inputService.removeNumber(keyCode);
                this.onModelChange(this.inputService.value);
            }
        }
    }

    handleKeypress(event: any): void {
        if (this.isReadOnly()) {
            return;
        }

        let keyCode = event.which || event.charCode || event.keyCode;

        if (keyCode == undefined || [9, 13].indexOf(keyCode) != -1 || this.isArrowEndHomeKeyInFirefox(event)) {
            return;
        }

        switch (keyCode) {
            case 43:
                this.inputService.changeToPositive();
                break;
            case 45:
                this.inputService.changeToNegative();
                break;
            default:
                if (this.inputService.canInputMoreNumbers && (!isNaN(this.inputService.value) || String.fromCharCode(keyCode).match(/\d/) != null)) {
                    this.inputService.addNumber(keyCode);
                }
        }

        event.preventDefault();
        this.onModelChange(this.inputService.value);
    }

    handleKeyup(event: any): void {
        this.inputService.fixCursorPosition();
    }

    handlePaste(event: any): void {
        if (this.isReadOnly()) {
            return;
        }

        setTimeout(() => {
            this.inputService.updateFieldValue();
            this.setValue(this.inputService.value);
            this.onModelChange(this.inputService.value);
        }, 1);
    }

    updateOptions(options: any): void {
        this.inputService.updateOptions(options);
    }

    getOnModelChange(): Function {
        return this.onModelChange;
    }

    setOnModelChange(callbackFunction: Function): void {
        this.onModelChange = callbackFunction;
    }

    getOnModelTouched(): Function {
        return this.onModelTouched;
    }

    setOnModelTouched(callbackFunction: Function) {
        this.onModelTouched = callbackFunction;
    }

    setValue(value: number): void {
        this.inputService.value = value;
    }

    private getNewKeyCode(oldString: string, newString: string): number {
        if (oldString.length > newString.length) {
            return null;
        }

        for (let x = 0; x < newString.length; x++) {
            if (oldString.length == x || oldString[x] != newString[x]) {
                return newString.charCodeAt(x);
            }
        }

        return null;
    }

    private isArrowEndHomeKeyInFirefox(event: any) {
        if ([35, 36, 37, 38, 39, 40].indexOf(event.keyCode) != -1 && (event.charCode == undefined || event.charCode == 0)) {
            return true;
        }

        return false;
    }

    private isReadOnly() {
        return this.htmlInputElement && this.htmlInputElement.readOnly;
    }

    private setCursorPosition(event: any): void {
        let rawValueWithoutSuffixEndPosition = this.inputService.getRawValueWithoutSuffixEndPosition();

        // For some reason, in Android, the event got override before the timeout and change the target.
        const inputElement = event.target;

        setTimeout(function () {
            inputElement.setSelectionRange(rawValueWithoutSuffixEndPosition, rawValueWithoutSuffixEndPosition);
        }, 0);
    }
}
