const suma = require("./suma");

test("realizará una suma 1+1 y debe devolver 2", () => {
  expect(suma(1, 1)).toBe(2);
});
