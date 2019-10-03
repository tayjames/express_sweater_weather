var shell = require('shelljs');
var request = require('supertest');
var app = require('../../../../app');

var User = require('../../../../models').User;
const bcrypt = require('bcrypt');

describe('api', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create')
  });
  beforeEach(() => {
    shell.exec('npx sequelize db:migrate')
    shell.exec('npx sequelize db:seed:all')
  });
  afterEach(() => {
    shell.exec('npx sequelize db:migrate:undo:all')
  });

  describe('Test POST route to /api/v1/sessions path', () => {
    test('Returns a 200 status with an apiKey', () => {
      let params = {
        email: "whatever@example.com",
        password: "password"
      }

      return User.create({
        email: "whatever@example.com",
        password: bcrypt.hashSync("password", 10),
        apiKey: "ljkgftr"
      })
      .then(user => {
        return request(app).post("/api/v1/sessions").send(params)
      })
      .then(response => {
        expect(response.status).toBe(200),
        expect(response.body).toHaveProperty("apiKey"),
        expect(response.body["apiKey"].length).toBeGreaterThan(0);
      });
    });

    test('Returns a 401 status when fields are missing', () => {
      let params = {
        email: "whatever@example.com"
      }

      return User.create({
        email: "whatever@example.com",
        password: bcrypt.hashSync("password", 10),
        apiKey: "ljkgftr"
    })
    .then(user => {
      return request(app).post("/api/v1/sessions").send(params)
    })
    .then(response => {
      expect(response.status).toBe(401),
      expect(response.body).toEqual("Missing field");
    })
  });

    test('returns a 401 status when password is incorrect', () => {
      let params = {
        email: "whatever@example.com",
        password: "contrasena"
      }

      return User.create({
        email: "whatever@example.com",
        password: bcrypt.hashSync("password", 10),
        apiKey: "ljkgftr"
      })
      .then (user => {
        return request(app).post("/api/v1/sessions").send(params)
      })
      .then(response => {
        expect(response.status).toBe(401),
        expect(response.body).toEqual("Incorrect Password")
      })
    })

    test('returns a 401 status when email is not valid', () => {
      let params = {
        email: "tay@gmail.com",
        password: "whatever"
      }

      return request(app).post("/api/v1/sessions").send(params)
        .then(response => {
          expect(response.status).toBe(401),
          expect(response.body).toEqual("Email not valid")
      })
    })
  })
})
