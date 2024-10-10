const request = require("supertest");
const servidor = require("../index");

//Testea que la ruta GET /cafes devuelve un status code 200 y el tipo de dato
// recibido es un arreglo con por lo menos 1 objeto.
describe("GET /cafes", () => {
  it("debería devolver un status code 200 y un arreglo con al menos un objeto", async () => {
    const response = await request(servidor).get("/cafes");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
});

//Comprueba que se obtiene un código 404 al intentar eliminar un café con un id que no existe.
describe("DELETE /cafes/:id", () => {
  it("debería devolver un código 404 si el id no existe", async () => {
    const nonExistentId = 9999;
    const response = await request(servidor)
      .delete(`/cafes/${nonExistentId}`)
      .set("Authorization", "Bearer token");
    expect(response.status).toBe(404);
  });
});

//Prueba que la ruta POST /cafes agrega un nuevo café y devuelve un código 201.
describe("POST /cafes", () => {
  it("debería agregar un nuevo café y devolver un código 201", async () => {
    const newCafe = { id: 8, nombre: "Café con leche" };
    const response = await request(servidor).post("/cafes").send(newCafe);
    expect(response.status).toBe(201);
    expect(response.body).toContainEqual(newCafe);
  });
});

// Prueba que la ruta PUT /cafes devuelve un status code 400 si intentas actualizar un
//  café enviando un id en los parámetros que sea diferente al id dentro del payload.
describe("PUT /cafes/:id", () => {
  it("debería devolver un status code 400 si los ids no coinciden", async () => {
    const id = 1;
    const updatedCafe = { id: 2, nombre: "Café Latte" };
    const response = await request(servidor)
      .put(`/cafes/${id}`)
      .send(updatedCafe);
    expect(response.status).toBe(400);
  });
});
