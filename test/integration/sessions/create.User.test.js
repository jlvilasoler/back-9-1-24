import mongoose from "mongoose";
import chai from 'chai';
import supertest from 'supertest';
import { beforeEach } from 'mocha';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

mongoose.connect(
  'mongodb+srv://jlvila:jj123456@jlvila.w8q6kim.mongodb.net/ecommerce_test?retryWrites=true&w=majority'
)

describe('Test de crear usuario', () => {

  beforeEach(function () {
    mongoose.connection.collections.users?.drop(); // borramos todos los users de la BD 
})

  it('DEBERIA CREAR UN USUARIO AL HACER UN POST A /api/signup', async () => {
    const userMock = {
      first_name: "Jose",
      last_name: "Perez",
      email: "unossss@gmail.com",
      age: "22",
      password: "fdfdf"
    };



    const { statusCode } = await requester.post('/api/signup').send(userMock)
    console.log( statusCode)
    expect(statusCode).to.be.ok;
  });

});
