describe("Test de Login con datos correctos", () => {
  it("Deberia iniciar sesion al ingresar usuario y contraseña", () => {
    cy.visit("http://localhost:3000/");
    cy.wait(1000);
    cy.get("#correo").type("ronald@gmail.com");
    cy.wait(1000);
    cy.get("#contrasenia").type("1234");
    cy.wait(1000);
    cy.get("form").submit();
    cy.wait(1000);
    cy.contains("Inicio de sesión exitoso").should("be.visible");
  });
});
