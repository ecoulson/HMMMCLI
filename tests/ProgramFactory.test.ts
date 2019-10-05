import * as MockFS from "mock-fs";
import ProgramFactory from "../src/ProgramFactory";
import Program from "../src/Program";

MockFS({
    'programs': {
        'program1.hmmm': 'halt',
        'program2.hmmm': 'read r1',
        'program3.hmmm': 'read r3',
        'program4.hmmm': 'write r1',
        'program5.hmmm': 'write r3',
        'program6.hmmm': 'nop',
        'program7.hmmm': 'setn r2 127',
        'program8.hmmm': 'addn r15 127',
        'program9.hmmm': 'copy r1 r2',
        'program10.hmmm': 'mov r1 r2',
        'program11.hmmm': 'add r15 r14 r13',
        'program12.hmmm': 'sub r15 r14 r13',
        'program13.hmmm': 'neg r5 r6',
    }
})

const factory : ProgramFactory = new ProgramFactory();

afterAll(() => {
    MockFS.restore();
})

test("read a halt program", () => {
    const program : Program = factory.buildProgram('programs/program1.hmmm');

    expect(program.read()).toEqual([0x0]);
});

test("read a read into r1 program", () => {
    const program : Program = factory.buildProgram('programs/program2.hmmm');

    expect(program.read()).toEqual([0x1001]);
});

test("read a read into r3 program", () => {
    const program : Program = factory.buildProgram('programs/program3.hmmm');

    expect(program.read()).toEqual([0x1003]);
});

test("read a write into r1 program", () => {
    const program : Program = factory.buildProgram('programs/program4.hmmm');

    expect(program.read()).toEqual([0x2001]);
});

test("read a write into r3 program", () => {
    const program : Program = factory.buildProgram('programs/program5.hmmm');

    expect(program.read()).toEqual([0x2003]);
});

test("read a nop program", () => {
    const program : Program = factory.buildProgram('programs/program6.hmmm');

    expect(program.read()).toEqual([0x3000]);
});

test("read a setn program", () => {
    const program : Program = factory.buildProgram('programs/program7.hmmm');

    expect(program.read()).toEqual([0x42FF]);
});

test("read a addn program", () => {
    const program : Program = factory.buildProgram('programs/program8.hmmm');

    expect(program.read()).toEqual([0x5FFF]);
});

test("read a copy program", () => {
    const program : Program = factory.buildProgram('programs/program9.hmmm');

    expect(program.read()).toEqual([0x6012]);
});

test("read a copy program", () => {
    const program : Program = factory.buildProgram('programs/program10.hmmm');

    expect(program.read()).toEqual([0x6012]);
});

test("read an add program", () => {
    const program : Program = factory.buildProgram('programs/program11.hmmm');

    expect(program.read()).toEqual([0x7FED]);
});

test("read a sub program", () => {
    const program : Program = factory.buildProgram('programs/program12.hmmm');

    expect(program.read()).toEqual([0x8FED]);
});

test("read a neg program", () => {
    const program : Program = factory.buildProgram('programs/program13.hmmm');

    expect(program.read()).toEqual([0x9056]);
});