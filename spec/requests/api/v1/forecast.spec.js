var shell = require('shelljs');
var resquest = require('supertest');
var app = require('../../../../app');
var User = require('../../../../models').User;

const bcrypt = require('bcrypt');

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

  describe('Test GET route to /api/v1/forecast?... path', () => {
    test('Returns an object with currently, hourly, daily keys when sent an apiKey', () => {
      return User.create({
        email: "whatever@example.com",
        password: bcrypt.hashSync("password", 10),
        apiKey: "jgn983hy48thw9begh98h4539h4"
      })
      .then(user => {
        return request(app).get('/api/v1/forecast?location=denver,co').send({apiKey: user.apiKey})
      })
      .then(response => {
        expect(response.status).toBe(200);
        expect(Object.keys(response.body).toHaveProperty('data'));

      })
    })
  })
})
