import CPU from "../src/CPU"
import RAM from "../src/RAM";
jest.mock("../src/RAM");

test("Get registers", () => {
    const cpu : CPU = new CPU(new RAM());
    expect(cpu.getRegisters()).toHaveLength(16);
});

test("Get instruction pointer", () => {
    const cpu : CPU = new CPU(new RAM());
    expect(cpu.getInstructionPointer()).toEqual(0);
})