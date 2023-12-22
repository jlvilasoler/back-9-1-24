import chai from 'chai';
import supertest from 'supertest';

const expect = chai.expect;
const requester = supertest('http://localhost:8080');

describe('Test de actualizar usuario', () => {
    it('DEBERIA ACTUALIZAR UN USUARIO AL HACER UN PUT A /api/signup/', async () => {

        const uId = '6584e1c030b361b0661e2eb9';
        const payload = {
            first_name: "James",
            last_name: "Bond",
            email: "james@gmail.com",
            age: "22",
            password: "fdfdf"
        }

        const { statusCode } = await requester 
        .put(`/api/signup/${uId}`)
        .send(payload);

        console.log(statusCode)
        expect(statusCode).to.be.ok;

    });
});

