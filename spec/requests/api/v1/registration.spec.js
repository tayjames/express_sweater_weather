var shell = require('shelljs');
var request = require('supertest');
var app = require('../../../../app');

describe('api', () => {
  // beforeAll(() => {
  //   shell.exec('npx sequelize db:create')
  // });
  // beforeEach(() => {
  //   shell.exec('npx sequelize db:migrate')
  //   shell.exec('npx sequelize db:seed:all')
  // });
  // afterEach(() => {
  //   shell.exec('npx sequelize db:migrate:undo:all')
  // });

  describe("Test POST route to /api/v1/users path", () => {
    test('returns a 201 status with an api key associated with user', () => {
      let params = {
        "email": "whatever@example.com",
        "password": "password",
        "passwordConfirmation": "password"
      }

      return request(app).post("/api/v1/users").send(params)
        .then(response => {
          expect(response.status).toBe(201),
          expect(response.body).toHaveProperty("apiKey"),
          // expect(uuid.is(res.body.apiKey)).toBe(true)
          expect(response.body["apiKey"].length).toBeGreaterThan(0);
        });
    });

    test('returns a 401 status when passwords do not match', () => {
      let params = {
        "email": "whatever@example.com",
        "password": "password",
        "passwordConfirmation": "contrasena"
      }

      return request(app).post("/api/v1/users").send(params)
        .then(response => {
          expect(response.status).toBe(401),
          expect(response.body).toEqual("Passwords do not match");
        });
    });

    test('returns a 401 status when fields are missing', () => {
      let params = {
        "email": "whatever@example.com",
        "password": "password"
      }

      return request(app).post("/api/v1/users").send(params)
        .then(response => {
          expect(response.status).toBe(401),
          expect(response.body).toEqual("Missing field");
        });
    })
  })
})
