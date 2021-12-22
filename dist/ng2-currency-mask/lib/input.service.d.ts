export declare class InputService {
    private htmlInputElement;
    private options;
    private inputManager;
    constructor(htmlInputElement: any, options: any);
    addNumber(keyCode: number): void;
    applyMask(isNumber: boolean, rawValue: string): string;
    clearMask(rawValue: string): number | null;
    changeToNegative(): void;
    changeToPositive(): void;
    fixCursorPosition(forceToEndPosition?: boolean): void;
    getRawValueWithoutSuffixEndPosition(): number;
    getRawValueWithoutPrefixStartPosition(): number;
    removeNumber(keyCode: number): void;
    updateFieldValue(selectionStart?: number): void;
    updateOptions(options: any): void;
    get canInputMoreNumbers(): boolean;
    get inputSelection(): any;
    get rawValue(): string;
    set rawValue(value: string);
    get storedRawValue(): string;
    get value(): number | null;
    set value(value: number);
}
