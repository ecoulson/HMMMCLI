export default class Register {
    private static maxValue = 0xFF;
    private static minValue = 0x00;
    private data : number;

    constructor() {
        this.data = 0;
    }

    public get() : number {
        return this.data;
    }

    public set(data : number) : void {
        if (data > Register.maxValue || data < Register.minValue) {
            throw new Error("Value to be set in register is outside the range");
        }
        this.data = data;
    }
}