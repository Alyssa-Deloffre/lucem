const request = require("supertest");
const app = require("../app");
const Therapist = require("../models/therapist");

// Mayleen
it("Try to signup with missing infos", async () => {
  const res = await request(app).post("/therapists/signup").send({
    description: "Exemple de description",
  });

  expect(res.body.result).toBe(false);
  expect(res.body.error).toBe("Missing or empty fields");
});

// Alyssa
it("Signup new Therapist", async () => {
  const res = await request(app).post("/therapists/signup").send({
    name: "name",
    firstname: "firstname",
    password: "test",
    email: "name.firstname@email.fr",
    phone: "0123456789",
    avatar: "./",
    description: "Exemple de description",
  });

  expect(res.body.result).toBe(true);
  expect(res.body.token.length).toBe(32);
});

// Quentin
it("Try to signup already existing Therapist", async () => {
  const res = await request(app).post("/therapists/signup").send({
    name: "name",
    firstname: "firstname",
    password: "test",
    email: "name.firstname@email.fr",
    phone: "0123456789",
    avatar: "./",
    description: "Exemple de description",
  });

  await Therapist.deleteOne({ email: "name.firstname@email.fr" });

  expect(res.body.result).toBe(false);
  expect(res.body.error).toBe("Therapist already exists");
});
