import mongoose from "mongoose";
import chai from 'chai';
import supertest from 'supertest';
import { beforeEach } from 'mocha';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

before(async () => {
  await mongoose.connect('mongodb+srv://jlvila:jj123456@jlvila.w8q6kim.mongodb.net/ecommerce_test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

describe('Test de crear carrito', () => {
  /*
  beforeEach(async () => {
    // mongoose.connection.collections.users?.drop();
  });
  */

  it('DEBERIA CREAR UN CARRITO AL HACER UN POST A /api/cart/', async () => {
    const cartMock = {
      cartId: "carrito"
    };

    const { statusCode } = await requester.post('/api/cart/').send(cartMock);
    console.log(statusCode);
    expect(statusCode).to.be.ok;
  });
});