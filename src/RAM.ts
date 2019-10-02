export default class RAM {
    private static MemorySize : number = 256;
    private memory : number[];

    constructor() {
        this.memory = [];
        for (let i : number = 0; i < RAM.MemorySize; i++) {
            this.memory[i] = 0x0;
        }
    }

    get(address : number) {
        if (address >= RAM.MemorySize) {
            throw new Error(`0x${address.toString(16).toUpperCase()} is outside the range of the RAM`);
        }
        if (address < 0) {
            throw new Error(`Can not use a negative address 0x${address.toString(16).toUpperCase()}`);
        }
        return this.memory[address];
    }

    set(address : number, value : number) {
        if (address >= RAM.MemorySize) {
            throw new Error(`0x${address.toString(16).toUpperCase()} is outside the range of the RAM`);
        }
        if (address < 0) {
            throw new Error(`Can not use a negative address 0x${address.toString(16).toUpperCase()}`);
        }
        this.memory[address] = value;
    }
}