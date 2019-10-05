import Register from "../src/Register"
import RAM from "../src/RAM"
import ProgramFactory from "./ProgramFactory";
import Program from "./Program";

export default class CPU {
    private static registerCount : number = 16;
    private ram : RAM;
    private programFactory : ProgramFactory;
    private program : Program;
    private registers : Register[];
    private instructionPointer : number;

    constructor(ram : RAM) {
        this.ram = ram;
        this.programFactory = new ProgramFactory();
        this.instructionPointer = 0;
        this.registers = [];
        for (let i : number = 0; i < CPU.registerCount; i++) {
            this.registers[i] = new Register();
        }
    }

    public getRegisters() : Register[] {
        return this.registers;
    }

    public getInstructionPointer() : number {
        return this.instructionPointer;
    }
    
    public load(program : Program) : void {
        this.program = this.program
    }

    public run() : void {
        // main logic
    }

    public reset() : void {
        this.instructionPointer = 0;
    }
}