const app = require("../../../src/app");
const request = require('supertest');

describe("Test /v1/team/{team_name}/meta_knowledge_graph endpoint", () => {
    test("Query to Text Mining team Should return 200 with valid response", async () => {
        await request(app)
            .get("/v1/team/Text Mining Provider/meta_knowledge_graph")
            .expect(200)
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.body).toHaveProperty("biolink:Gene");
                expect(response.body["biolink:Gene"]).toHaveProperty("biolink:ChemicalSubstance");
            })
    })

    test("Query to Invalid team Should return 200 with empty response", async () => {
        await request(app)
            .get("/v1/team/wrong team/meta_knowledge_graph")
            .expect(404)
            .expect('Content-Type', /json/)
            .then((response) => {
                expect(response.body).toEqual({
                    "error": "Unable to load predicates",
                    "more_info": "Failed to Load MetaKG",
                });
            })
    })

})