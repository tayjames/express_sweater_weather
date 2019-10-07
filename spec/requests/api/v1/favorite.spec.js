var shell = require('shelljs');
var resquest = require('supertest');
var app = require('../../../../app');
var User = require('../../../../models').User;

const bcrypt = require('bcrypt');

describe('api', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create')
  });

  beforeEach(() => {
    shell.exec('npx sequelize db:migrate')
  });

  afterEach(() => {
    shell.exec('npx sequelize db:migrate:undo:all')
  });

  describe('Test POST route to /api/v1/favorites path', () => {
    test('Returns a 200 status with a message indicating a location has been added to your faves', () => {
      let params = {
        location: "denver,co",
        apiKey: "1dbdcd19-f718-4dd1-82ff-b79cd8c8fc33"
      }

      return User.create({
        email: "whatever@example.com",
        pasword: bcrypt.hashSync("password", 10),
        apiKey: ""
      })
      .then(user => {
        return request(app).post("/api/v1/favorites").send(params)
      })
      .then(response => {
        expect(response.status).toBe(200),
        expect(response.body).toHaveProperty("message")

      });
    })
  })
})
