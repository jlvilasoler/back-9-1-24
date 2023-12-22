import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Test de actualizar productos', () => {
    it('DEBERIA ACTUALIZAR UN PRODUCTO AL HACER UN PUT A /api/products/:pid/', async () => {

        const pId = '6583717ba3aebb0f48098333';
        const payload = {
            title: "Apple MacBook Pro 17 pulgadas",
            description: "i9 de 6 núcleos a 2,9 GHz, pantalla 17, 16 GB de RAM, 1 TB",
            price: 4000,
            thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnJOrMsdxbjlwWcWpInG2OyX4SfDyELwkAg2bcdBbbEwQFIqOmiV8m31_TEYgwo5W2p9I&usqp=CAU",
            code: "212212",
            stock: 121313,
            category: "computadoras",       
            owner: "admin"
        }

        const { statusCode } = await requester 
        .put(`/api/products/${pId}`)
        .send(payload);

        console.log(statusCode)
        expect(statusCode).to.be.ok;

    });
});

