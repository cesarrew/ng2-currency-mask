export declare class InputManager {
    private htmlInputElement;
    private _storedRawValue;
    constructor(htmlInputElement: any);
    setCursorAt(position: number): void;
    updateValueAndCursor(newRawValue: string, oldLength: number, selectionStart: number): void;
    get canInputMoreNumbers(): boolean;
    get inputSelection(): any;
    get rawValue(): string;
    set rawValue(value: string);
    get storedRawValue(): string;
}
