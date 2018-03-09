import { InputManager } from './input.manager';

export class InputService {

    private inputManager: InputManager;

    constructor(private htmlInputElement: any, private options: any) {
        this.inputManager = new InputManager(htmlInputElement);
    }

    focus(): void {
        if (this.options.removeMaskDuringEntry) {
            this.rawValue = this.value.toString();
        }
        if (this.options.selectOnFocus) {
            this.inputManager.selectAll();
        }
    }

    blur(): void {
        if (this.options.removeMaskDuringEntry) {
            this.rawValue = this.applyMask(false, this.rawValue || '');
        }
    }

    addNumber(keyCode: number): void {
        if (!this.rawValue) {
            this.rawValue = this.applyMask(false, '0');
        }

        const keyChar = String.fromCharCode(keyCode);
        const selectionStart = this.inputSelection.selectionStart;
        const selectionEnd = this.inputSelection.selectionEnd;
        this.rawValue = this.rawValue.substring(0, selectionStart) + keyChar + this.rawValue.substring(selectionEnd, this.rawValue.length);
        this.updateFieldValue(selectionStart + 1);
    }

    applyMask(isNumber: boolean, rawValue: string): string {
        const { allowNegative, decimal, precision, prefix, suffix, thousands } = this.options;
        rawValue = isNumber ? Number.parseFloat(rawValue).toFixed(precision) : rawValue;

        if (!rawValue.replace(/[^0-9]/g, '')) {
            return '';
        }

        let integerPart = rawValue
            .split(decimal)[0].replace(/^0*/g, '')
            .replace(/\B(?=(\d{3})+(?!\d))/g, thousands);

        if (integerPart === '') {
            integerPart = '0';
        }

        let newRawValue = integerPart;
        let decimalPart = rawValue.split(decimal)[1] || '0';

        if (precision > 0) {
            while (decimalPart.length < precision) {
                decimalPart = decimalPart + '0';
            }

            newRawValue += decimal + decimalPart;
        }

        const isZero = parseInt(integerPart, 10) === 0 && (parseInt(decimalPart, 10) === 0 || decimalPart === '');
        const operator = (rawValue.indexOf('-') > -1 && allowNegative && !isZero) ? '-' : '';
        return operator + prefix + newRawValue + suffix;
    }

    clearMask(rawValue: string): number {
        if (rawValue == null || rawValue == "") {
            return null;
        }

        let value = rawValue.replace(this.options.prefix, '').replace(this.options.suffix, '');

        if (this.options.thousands) {
            value = value.replace(new RegExp('\\' + this.options.thousands, 'g'), '');
        }

        if (this.options.decimal) {
            value = value.replace(this.options.decimal, '.');
        }

        return parseFloat(value);
    }

    changeToNegative(): void {
        if (this.options.allowNegative && this.rawValue !== '' && this.rawValue.charAt(0) !== '-' && this.value !== 0) {
            this.rawValue = '-' + this.rawValue;
        }
    }

    changeToPositive(): void {
        this.rawValue = this.rawValue.replace('-', '');
    }

    removeNumber(keyCode: number): void {
        let selectionEnd = this.inputSelection.selectionEnd;
        let selectionStart = this.inputSelection.selectionStart;

        if (selectionStart > this.rawValue.length - this.options.suffix.length) {
            selectionEnd = this.rawValue.length - this.options.suffix.length;
            selectionStart = this.rawValue.length - this.options.suffix.length;
        }

        selectionEnd = keyCode === 46 || keyCode === 63272 ? selectionEnd + 1 : selectionEnd;
        selectionStart = keyCode === 8 ? selectionStart - 1 : selectionStart;
        this.rawValue = this.rawValue.substring(0, selectionStart) + this.rawValue.substring(selectionEnd, this.rawValue.length);
        this.updateFieldValue(selectionStart);
    }

    updateFieldValue(selectionStart?: number): void {
        selectionStart = selectionStart === undefined ? this.rawValue.length : selectionStart;
        if (this.options.removeMaskDuringEntry) {
            this.inputManager.updateValueAndCursor(this.rawValue, selectionStart);
        } else {
            const newRawValue = this.applyMask(false, this.rawValue || '');
            selectionStart = selectionStart - (this.rawValue.length - newRawValue.length);
            this.inputManager.updateValueAndCursor(newRawValue, selectionStart);
        }
    }

    updateOptions(options: any): void {
        const value: number = this.value;
        this.options = options;
        this.value = value;
    }

    get canInputMoreNumbers(): boolean {
        return this.inputManager.canInputMoreNumbers;
    }

    get inputSelection(): any {
        return this.inputManager.inputSelection;
    }

    get rawValue(): string {
        return this.inputManager.rawValue;
    }

    set rawValue(value: string) {
        this.inputManager.rawValue = value;
    }

    get storedRawValue(): string {
        return this.inputManager.storedRawValue;
    }

    get value(): number {
        return this.clearMask(this.rawValue);
    }

    set value(value: number) {
        this.rawValue = this.applyMask(true, '' + value);
    }
}
