import { InputManager } from './input.manager';

export class InputService {
  private inputManager: InputManager;

  constructor(private htmlInputElement: any, private options: any) {
    this.inputManager = new InputManager(htmlInputElement);
  }

  focus(): void {
    if (this.options.removeMaskDuringEntry) {
      this.rawValue = isNaN(this.value) || this.value === null ? '' : this.value.toString();
    }
    if (this.options.selectOnFocus) {
      this.inputManager.selectAll();
    }
  }

  blur(): void {
    if (this.options.removeMaskDuringEntry) {
      this.rawValue = this.applyMask(false, this.rawValue);
    }
  }

  addNumber(keyCode: number): void {
    const { direction, decimal, precision, prefix, thousands, removeMaskDuringEntry } = this.options;
    if (!this.rawValue && !removeMaskDuringEntry) {
      this.rawValue = this.applyMask(false, '0');
    }

    const keyChar = String.fromCharCode(keyCode);

    if (!keyChar.replace(new RegExp('[^0-9' + decimal + thousands + '-]', 'g'), '')) {
      return;
    }

    let selectionStart = this.inputSelection.selectionStart;
    const selectionEnd = this.inputSelection.selectionEnd;

    if (
      direction === 'LTR' &&
      this.rawValue.includes(decimal) &&
      this.rawValue.split(decimal)[1].length === precision &&
      selectionStart === selectionEnd &&
      this.rawValue.length - selectionStart <= precision
    ) {
      return;
    }

    this.rawValue =
      this.rawValue.substring(0, selectionStart) +
      keyChar +
      this.rawValue.substring(selectionEnd, this.rawValue.length);

    if (this.rawValue.length === 1 && direction === 'LTR') {
      selectionStart = -(prefix.length + precision + decimal.length + 1) + this.rawValue.length + prefix.length;
    }

    this.updateFieldValue(!removeMaskDuringEntry, selectionStart + 1);
  }

  applyMask(isNumber: boolean, rawValue: string): string {
    const { direction, allowNegative, decimal, precision, prefix, suffix, thousands } = this.options;
    rawValue = isNumber ? Number.parseFloat(rawValue).toFixed(precision) : rawValue;
    const onlyNumbers = rawValue.replace(/[^0-9]/g, '');

    if (!onlyNumbers) {
      return null;
    }

    let integerPart: string, decimalPart: string;

    if (direction === 'LTR') {
      integerPart = rawValue
        .replace(prefix, '')
        .replace(suffix, '')
        .replace(new RegExp('[^0-9' + decimal + '-]', 'g'), '')
        .split(decimal)[0]
        .replace(/^0*/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, thousands);
    } else {
      integerPart = onlyNumbers
        .slice(0, onlyNumbers.length - precision)
        .replace(/^0*/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, thousands);
    }

    if (integerPart === '') {
      integerPart = '0';
    }

    let newRawValue = integerPart;
    if (direction === 'LTR') {
      decimalPart = rawValue.split(decimal)[1] || '0';
    } else {
      decimalPart = onlyNumbers.slice(onlyNumbers.length - precision);
    }

    if (precision > 0) {
      while (decimalPart.length < precision) {
        if (direction === 'LTR') {
          decimalPart = decimalPart + '0';
        } else {
          decimalPart = '0' + decimalPart;
        }
      }
      newRawValue += decimal + decimalPart;
    }

    const isZero = parseInt(integerPart, 10) === 0 && (parseInt(decimalPart, 10) === 0 || decimalPart === '');
    const operator = rawValue.indexOf('-') > -1 && allowNegative && !isZero ? '-' : '';
    return operator + prefix + newRawValue + suffix;
  }

  clearMask(rawValue: string): number {
    if (rawValue == null || rawValue == '') {
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
    const { direction, decimal, precision, prefix, suffix, thousands, removeMaskDuringEntry } = this.options;
    let selectionEnd = this.inputSelection.selectionEnd;
    let selectionStart = this.inputSelection.selectionStart;
    const decimalLocation = this.rawValue.indexOf(decimal);

    if (direction === 'LTR') {
      if (keyCode === 8 && selectionStart === selectionEnd && decimalLocation === selectionStart - 1) {
        return;
      }
      if (keyCode === 46 && selectionStart === selectionEnd && decimalLocation === selectionStart) {
        return;
      }
    }

    if (selectionStart > this.rawValue.length - suffix.length) {
      selectionEnd = this.rawValue.length - suffix.length;
      selectionStart = this.rawValue.length - suffix.length;
    }

    selectionEnd = keyCode === 46 || keyCode === 63272 ? selectionEnd + 1 : selectionEnd;
    selectionStart = keyCode === 8 ? selectionStart - 1 : selectionStart;
    this.rawValue =
      this.rawValue.substring(0, selectionStart) + this.rawValue.substring(selectionEnd, this.rawValue.length);
    const applyMask = !removeMaskDuringEntry && (direction === 'LTR' && selectionStart < decimalLocation);

    this.updateFieldValue(applyMask, selectionStart);
  }

  updateFieldValue(applyMask: boolean, selectionStart?: number): void {
    selectionStart = selectionStart === undefined ? this.rawValue.length : selectionStart;
    if (applyMask) {
      const newRawValue = this.applyMask(false, this.rawValue || '');
      selectionStart = selectionStart - (this.rawValue.length - newRawValue.length);
      this.inputManager.updateValueAndCursor(newRawValue, selectionStart);
    } else {
      this.inputManager.updateValueAndCursor(this.rawValue, selectionStart);
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
