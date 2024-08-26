import { assert, expect, should } from "chai";

should();


describe('assert style', () => {


    it('expect assert style', () => {
        // arrange
        const name: string = "Rahul Kumar";
        const age: number = 30;
        const objectData: object = { name, age };
        const arrData: Array<number> = [1, 2, 3];
        const boolData: boolean = true
        // avt
        // assert
        // string
        expect(name).to.be.ok;
        expect(name).to.be.equal('Rahul Kumar');
        expect(name).to.not.be.equal('Rahul Kumar 1');
        expect(name).to.be.a.string;

        // number
        expect(age).to.be.ok;
        expect(age).to.be.equal(30);
        expect(age).to.be.a('number');

        // object
        expect(objectData).to.be.ok;
        expect(objectData).to.be.a('object');
        expect(objectData).to.have.property('name').equal('Rahul Kumar');
        expect(objectData).to.have.property('age').equal(30);


        // array
        expect(arrData).to.be.ok;
        expect(arrData).to.be.a('array');
        expect(arrData).to.have.lengthOf(3);
        expect(arrData).to.have.lengthOf(3).that.include(2);

        // boolean
        expect(boolData).to.be.ok
        expect(boolData).to.be.a('boolean')
        expect(boolData).to.be.true


    })




    it('should assert style', () => {
        // arrange
        const name: string = "Rahul Kumar";
        const age: number = 30;
        const objectData: object = { name, age };
        const arrData: Array<number> = [1, 2, 3];
        const boolData: boolean = true
        // avt
        // assert
        // string

        name.should.be.ok;
        name.should.be.equal('Rahul Kumar');
        name.should.not.be.equal('Rahul Kumar 1');
        name.should.be.a.string;

        // number
        age.should.be.ok;
        age.should.be.equal(30);
        age.should.be.a('number');

        // object
        objectData.should.be.ok;
        objectData.should.be.a('object');
        objectData.should.have.property('name').equal('Rahul Kumar');
        objectData.should.have.property('age').equal(30);


        // array
        arrData.should.be.ok;
        arrData.should.be.a('array');
        arrData.should.have.lengthOf(3);
        arrData.should.have.lengthOf(3).that.include(2);

        // boolean
        boolData.should.to.be.ok
        boolData.should.to.be.a('boolean')
        boolData.should.to.be.true


    })





    it('assert assert style', () => {
        // arrange
        const name: string = "Rahul Kumar";
        const age: number = 30;
        const objectData: object = { name, age };
        const arrData: Array<number> = [1, 2, 3];
        const boolData: boolean = true
        // avt
        // assert
        // string
        assert.isOk(name)
        assert.equal(name, 'Rahul Kumar');
        assert.notEqual(name, 'rrrr')
        assert.typeOf(name, 'string')

        // number
        assert.isOk(age);
        assert.equal(age, 30);
        assert.typeOf(age, 'number')

        // object
        assert.isOk(objectData);
        assert.typeOf(objectData, 'object');
        assert.deepEqual(objectData, { name, age })
        objectData.should.have.property('name').equal('Rahul Kumar');
        objectData.should.have.property('age').equal(30);


        // array
        assert.isOk(arrData);
        assert.deepEqual(arrData, [1, 2, 3]);
        assert.typeOf(arrData, 'array');
        assert.include(arrData, 2)

        // boolean
        assert.isOk(boolData);
        assert.typeOf(boolData, 'boolean');
        assert.equal(boolData, true)


    })



})