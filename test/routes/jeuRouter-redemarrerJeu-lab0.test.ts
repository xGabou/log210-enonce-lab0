import request from "supertest";
import app from "../../src/app";
import { jeuRoutes } from "../../src/routes/jeuRouter";

describe("GET /api/v1/jeu/redemarrerJeu", () => {
  beforeAll(async () => {
    await request(app)
      .post("/api/v1/jeu/demarrerJeu")
      .send({ nom: "Alice" })
      .set("Accept", "application/json");

    await request(app)
      .post("/api/v1/jeu/demarrerJeu")
      .send({ nom: "Bob" })
      .set("Accept", "application/json");
  });

  it("devrait contenir get('/api/v1/jeu/redemarrerJeu')", async () => {
    await request(app).get('/api/v1/jeu/redemarrerJeu');
  });

  it("devrait retourner 200 et du JSON", async () => {
    const res = await request(app)
      .get("/api/v1/jeu/redemarrerJeu")
      .set("Accept", "application/json");

    expect(res.status).toBe(200);
    expect(res.type).toMatch(/json/);
  });

  it("devrait supprimer tous les joueurs", async () => {
    await request(app)
      .get("/api/v1/jeu/redemarrerJeu")
      .set("Accept", "application/json");

    const joueurs = JSON.parse(jeuRoutes.controleurJeu.joueurs);
    expect(Array.isArray(joueurs)).toBeTruthy();
    expect(joueurs.length).toBe(0);
  });

  it("jouer retourne 404 apres redemarrerJeu", async () => {
    await request(app).get('/api/v1/jeu/redemarrerJeu');

    await request(app)
      .post("/api/v1/jeu/jouer/123")
      .expect((res) => {
        expect(res.status).toBe(404);
      });
  });
});
