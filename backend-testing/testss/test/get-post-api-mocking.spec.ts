import { expect, use } from "chai";
import Calculator from "../src/calculator"
import nock from "nock";

describe('API TESTING', () => {
    it('should make a get  request from API', async () => {
        // arrange
        const calc = new Calculator();
        const mockedUserResponse = { id: 1, name: "kumar programming" }
        nock('https://jsonplaceholder.typicode.com').get('/users/1').reply(200, mockedUserResponse)
        // act
        const res = await calc.getUser();
        // assert
        expect(res.status).to.equal(200);
        expect(res.data.id).to.equal(1)
    })

    it('should make a POST  request from API', async () => {
        // arrange
        const calc = new Calculator();
        const userPayload = `{
     "id": 1,
     "name": "Leanne Graham",
     "username": "Bret",
     "email": "Sincere@april.biz",
     "address": {
       "street": "Kulas Light",
       "suite": "Apt. 556",
       "city": "Gwenborough",
       "zipcode": "92998-3874",
       "geo": {
         "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  }`
        const expectedUserResponse = `{
     "id": 1,
     "name": "Leanne Graham",
     "username": "Bret",
     "email": "Sincere@april.biz",
     "address": {
       "street": "Kulas Light",
       "suite": "Apt. 556",
       "city": "Gwenborough",
       "zipcode": "92998-3874",
       "geo": {
         "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    },
    "id":11
  }`
        nock("https://jsonplaceholder.typicode.com").post('/users', userPayload).reply(201, expectedUserResponse)
        // act
        const res = await calc.saveUser(userPayload);
        // assert
        expect(res.status).to.equal(201);
        expect(res.data.id).to.equal(11)
    })

    after(() => {
        nock.cleanAll();
    })

})