import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Test de actualizar carrito', () => {
    it('DEBERIA ACTUALIZAR UN CART AL HACER UN PUT A /api/cart/:cid/', async () => {

        const cId = '65161cf7b4f0ae3a37ba7332';
        const payload = {
            quantity: 21,
            productId: "6510b4104c0b4ac4bf374c01"
        }

        const { _body } = await requester 
        .put(`/api/cart/${cId}`)
        .send(payload);

        console.log(_body)
        expect(_body.message).to.be.equal('Cart updated successfully');

    });
});
