import RAM from "../src/RAM";

test("Gets an address inside the RAM", () => {
    const ram : RAM = new RAM();

    expect(ram.get(0x0E)).toEqual(0x0);
});

test("Gets an address outside the RAM", () => {
    const ram : RAM = new RAM();

    expect(() => {
        ram.get(0xFFF)
    }).toThrow(new Error("0xFFF is outside the range of the RAM"));
});

test("Gets an address outside the RAM", () => {
    const ram : RAM = new RAM();

    expect(() => {
        ram.get(-0xFFF)
    }).toThrow(new Error("Can not use a negative address 0x-FFF"));
})

test("Sets an address inside the RAM", () => {
    const ram : RAM = new RAM();
    ram.set(0xFF, 0xE)
    expect(ram.get(0xFF)).toEqual(0xE);
});

test("Sets an address outside the RAM", () => {
    const ram : RAM = new RAM();

    expect(() => {
        ram.set(0xFFF, 0xE)
    }).toThrow(new Error("0xFFF is outside the range of the RAM"));
});

test("Gets an address outside the RAM", () => {
    const ram : RAM = new RAM();

    expect(() => {
        ram.set(-0xFFF, 0xE)
    }).toThrow(new Error("Can not use a negative address 0x-FFF"));
})