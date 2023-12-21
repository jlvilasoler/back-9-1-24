import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Test de crear productos', () => {
  it('DEBERIA CREAR UN PRODUCTO AL HACER UN POST A /api/products', async () => {
    const productMock = {
      title: "Apple MacBook Pro 17 pulgadas",
      description: "i9 de 6 núcleos a 2,9 GHz, pantalla 17, 16 GB de RAM, 1 TB",
      price: 4000,
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnJOrMsdxbjlwWcWpInG2OyX4SfDyELwkAg2bcdBbbEwQFIqOmiV8m31_TEYgwo5W2p9I&usqp=CAU",
      code: "212212",
      stock: 121313,
      category: "computadoras"
    };

    const response = await requester.post('/api/products').send(productMock);

    expect(response).to.not.be.null;
    expect(response.body).to.have.property('_id');
  });

});