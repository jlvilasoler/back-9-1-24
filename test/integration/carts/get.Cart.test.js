import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Test de obtener los cart de la BD', () => {
  it('DEBERIA OBTENER UN ARREGLO DE CARRITOS AL HACER UN GET A /api/cart', async () => {
    const response = await requester.get('/api/cart');

    expect(response).to.have.property('status');
    expect(response).to.have.property('body');
    expect(response.body).to.be.an('array').that.is.not.empty;
  });
});