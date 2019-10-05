import Register from "../src/Register"

test("Get value from register", () => {
    const register : Register = new Register();

    expect(register.get()).toEqual(0);
})

test("Set value in register", () => {
    const register : Register = new Register();
    register.set(10);
    expect(register.get()).toEqual(10);
})

test("Set value in register", () => {
    const register : Register = new Register();
    expect(() => {
        register.set(-129);
    }).toThrow(new Error("Value to be set in register is outside the range"));
})

test("Set value in register", () => {
    const register : Register = new Register();
    expect(() => {
        register.set(0x100);
    }).toThrow(new Error("Value to be set in register is outside the range"));
})