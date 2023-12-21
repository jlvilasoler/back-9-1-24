import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Test de crear usuario', () => {
  it('DEBERIA CREAR UN USUARIO AL HACER UN POST A /api/users', async () => {
    const userMock = {
      first_name: "Jose",
      last_name: "Perez",
      email: "eluno@gmail.com",
      age: "22",
      cart: {},
      role: "user"
    };


    const { _body } = await requester.post('/api/sessions/register')
    expect(_body.payload).to.be.ok;
  });

});


//VER