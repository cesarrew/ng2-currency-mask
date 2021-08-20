export declare class InputHandler {
    private inputService;
    private onModelChange;
    private onModelTouched;
    private htmlInputElement;
    constructor(htmlInputElement: HTMLInputElement, options: any);
    handleClick(event: any, chromeAndroid: boolean): void;
    handleCut(event: any): void;
    handleInput(event: any): void;
    handleKeydown(event: any): void;
    handleKeypress(event: any): void;
    handleKeyup(event: any): void;
    handlePaste(event: any): void;
    updateOptions(options: any): void;
    getOnModelChange(): Function;
    setOnModelChange(callbackFunction: Function): void;
    getOnModelTouched(): Function;
    setOnModelTouched(callbackFunction: Function): void;
    setValue(value: number): void;
    private getNewKeyCode;
    private isArrowEndHomeKeyInFirefox;
    private isReadOnly;
    private setCursorPosition;
}
