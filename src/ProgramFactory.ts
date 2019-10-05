import Program from "./Program";
import { fs } from "mock-fs";
import { readFileSync } from "fs";

export default class ProgramFactory {
    public buildProgram(filename : string) : Program {
        return new Program(this.parseHMMMCode(filename));
    }

    private parseHMMMCode(filename : string) : number[] {
        let programData : number[] = [];
        const program : string = readFileSync(filename, { encoding: 'utf-8' });
        const lines : string[] = program.split("\n");
        for (const line of lines) {
            programData.push(this.parseLine(line));
        }
        return programData;
    }

    private parseLine(line : string) : number {
        const tokens = line.split(" ");
        switch(tokens[0].toLowerCase()) {
            case 'halt':
                return this.parseHaltCommand();
            case 'read':
                return this.parseReadCommand(tokens[1]);
            case 'write':
                return this.parseWriteCommand(tokens[1]);
            case 'nop':
                return this.parseNopCommand();
            case 'setn':
                return this.parseSetnCommand(tokens[1], tokens[2]);
            case 'addn':
                return this.parseAddnCommand(tokens[1], tokens[2]);
            case 'mov':
            case 'copy':
                return this.parseCopyCommand(tokens[1], tokens[2]);
            case 'add':
                return this.parseAddCommand(tokens[1], tokens[2], tokens[3]);
            case 'sub':
                return this.parseSubCommand(tokens[1], tokens[2], tokens[3]);
            case 'neg':
                return this.parseNegCommand(tokens[1], tokens[2]);
            default:
                throw new Error(`Unkown command ${tokens[0]}`);
        }
    }

    private parseHaltCommand() : number {
        return 0x0000;
    }

    private parseReadCommand(registerArg : string) : number {
        const read = 0x1 << 12;
        const register = parseInt(registerArg.split("r")[1], 10);
        return read + register;
    }

    private parseWriteCommand(registerArg : string) : number {
        const write = 0x2 << 12;
        const register = parseInt(registerArg.split("r")[1], 10);
        return write + register;
    }

    private parseNopCommand() : number {
        return 0x3000;
    }

    private parseSetnCommand(registerArg : string, rawValue: string) : number {
        const setn = 0x4 << 12;
        const register = parseInt(registerArg.split("r")[1], 10) << 8;
        const value = parseInt(rawValue, 10) + 128;
        return setn + register + value;
    }

    private parseAddnCommand(registerArg : string, rawValue: string) : number {
        const addn = 0x5 << 12;
        const register = parseInt(registerArg.split("r")[1], 10) << 8;
        const value = parseInt(rawValue, 10) + 128;
        return addn + register + value;
    }

    private parseCopyCommand(targetRegisterArg : string, sourceRegisterArg: string) : number {
        const copy = 0x6 << 12;
        const register = parseInt(targetRegisterArg.split("r")[1], 10) << 4;
        const value = parseInt(sourceRegisterArg.split("r")[1], 10);
        return copy + register + value;
    }

    private parseAddCommand(targetRegisterArg : string, registerArg1: string, registerArg2: string) : number {
        const add = 0x7 << 12;
        const targetRegister = parseInt(targetRegisterArg.split("r")[1], 10) << 8;
        const register1 = parseInt(registerArg1.split("r")[1], 10) << 4;
        const register2 = parseInt(registerArg2.split("r")[1], 10);
        return add + targetRegister + register1 + register2;
    }

    private parseSubCommand(targetRegisterArg : string, registerArg1: string, registerArg2: string) : number {
        const sub = 0x8 << 12;
        const targetRegister = parseInt(targetRegisterArg.split("r")[1], 10) << 8;
        const register1 = parseInt(registerArg1.split("r")[1], 10) << 4;
        const register2 = parseInt(registerArg2.split("r")[1], 10);
        return sub + targetRegister + register1 + register2;
    }

    private parseNegCommand(registerArg1: string, registerArg2: string) : number {
        const neg = 0x9 << 12;
        const register1 = parseInt(registerArg1.split("r")[1], 10) << 4;
        const register2 = parseInt(registerArg2.split("r")[1], 10);
        return neg + register1 + register2;
    }
}