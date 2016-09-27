var
    expect = require('chai').expect,
    sinon = require('sinon'),
    lodown = require('../index'),
    customers = require('./fixtures/customers.json');

describe('lodown', function() {
    describe('identity', function() {
        it('should return the exact value provided', function() {
            expect(lodown.identity(100)).to.equal(100);
            expect(lodown.identity('Hello World')).to.equal('Hello World');
            expect(lodown.identity(true)).to.equal(true);
            expect(lodown.identity(null)).to.equal(null);
        });
    });
    describe('typeOf', function() {
        it('should return a String for the data type provided', function() {
            expect(lodown.typeOf({})).to.equal('object');
            expect(lodown.typeOf([])).to.equal('array');
            expect(lodown.typeOf(1)).to.equal('number');
            expect(lodown.typeOf(true)).to.equal('boolean');
            expect(lodown.typeOf(null)).to.equal('null');
            expect(lodown.typeOf("Hello World")).to.equal('string');
            expect(lodown.typeOf(new Date())).to.equal('date');
            expect(lodown.typeOf(function() {})).to.equal('function');
            expect(lodown.typeOf(undefined)).to.equal('undefined');
        });
    });    
    describe('first', function() {
        it('should return an Array of FIRST occurence in Array', function() {
            expect(lodown.first(["a","b","c"], 1)).to.equal("a");
            expect(lodown.first(["Tom","Bob","Jerry"],-1)).to.equal([]);
        });
    });
    describe('last', function() {
        it('should return an Array of LAST occurence in Array', function() {
            expect(lodown.last([1,2,3,2,4])).to.equal([4]);
            expect(lodown.last(["Tom","Bob","Jerry"], 2)).to.equal(["Bob","Jerry"]);
        });
    });
    describe('each', function() {
        it('should iterate an Array, applying action to each element, index of the element, and the collection', function() {
            var action = sinon.spy();
            lodown.each(customers, action);
            expect(action.callCount).to.equal(customers.length);
            customers.forEach(function(customer, index) {
                expect(action.calledWith(customer, index, customers)).to.be.true;
            });
        });
        it('should iterate an Object, applying action for each value, key of value, and Object', function() {
            var action = sinon.spy();
            var customer = customers[0];
            lodown.each(customer, action);
            expect(action.callCount).to.equal(Object.keys(customer).length);
            for (var key in customer) {
                expect(action.calledWith(customer[key], key, customer)).to.be.true;
            }
        });
    });
    describe('indexOf', function() {
        var data = ["a","b","c","d", "a"];
        it('Should return the correct index of element in array', function() {
            expect(lodown.indexOf(data, "c")).to.equal(2);
            expect(lodown.indexOf(data, "z")).to.equal(-1);
            expect(lodown.indexOf(data, "a")).to.equal(0);
            expect(lodown.indexOf(data, ["a","b","c","d","a"]));
        });
    });
    describe('filter', function() {
        
        var inputData = ['a',1,'b',2,'c',3];
        it('Should filter elements in an array', function() {
            expect(lodown.filter(inputData, function(e,i,a) {
                return typeof e === "string" && i < a.length/2;
            })).to.equal(["a","b"]);
        });
    });
    describe('reject', function() {
        var data = [1,2,3,4,5];
        it('Should return an array which each element results in a falsey value', function() {
            expect(lodown.reject(data, function(e){return e % 2 == 0})).to.equal([ 1, 3, 5 ]);
        });
    });
    describe('partition', function() {
        var inputData = [1,2,3,4,5];
        it('Should reject data that is a string', function() {
            expect(lodown.partition(inputData, function(e,i,a) {
                return e % 2 === 0;
            })).to.equal([[2,4],[1,3,5]]);
        });
    });
    describe('unique', function() {
        var inputData = [1,2,2,2,3,3,4,5,6,6,7,8];
        it('Should remove all duplicates from array', function() {
            expect(lodown.unique(inputData)).to.equal([1,2,3,4,5,6,7,8]);
        });
    });
    describe('map', function() {
        var inputData = [1,2,3,4];
        it('Should be able to map through an Array', function() {
            expect(lodown.map(inputData, function(e) {
                return e * 2;
            })).to.equal([2,4,6,8]);
        });
        var inputObj = {'a':1,'b':2,'c':3};
        it('Should be able to map through an Object', function() {
            expect(lodown.map(inputObj, function(v,k,o) {
                return k + v * Object.keys(o).length;
            })).to.equal(['a4','b8','c12','d16']);
        });
    });
    describe('pluck', function() {
        var inputData = [
            { name: "Bugs", species:"Bunny"},
            { name: "Wiley", species: "Coyote"},
            { name: "Daffy", species: "Duck"}
            ];
        it('Should be able to pluck out properties in an Object', function() {
            expect(lodown.pluck(inputData, "name")).to.equal(["Bugs","Wiley","Daffy"]);
            expect(lodown.pluck(inputData, "species")).to.equal(["Bunny","Coyote","Duck"]);
        });
    });
    describe('contains', function() {
        var inputData = ['a','b','c',1,2,3];
        it('Should return TRUE if value is in the Array', function() {
            expect(lodown.contains(inputData, 'a')).to.equal(true);
        });
        it('Should return FALSE if value is NOT in the Array', function() {
            expect(lodown.contains(inputData, 'z')).to.equal(false);
        });
    });
    describe('every', function() {
        var inputData = [10,20,40,60,100];
        it('Should return TRUE if all iterations of Array are true', function() {
            expect(lodown.every(inputData, function(value) {
                return value % 2 === 0;
            })).to.equal(true);
        });
        it('Should return FALSE if all iterations of Array are false', function() {
            expect(lodown.every(inputData, function(value) {
                return value % 2 === 0;
            })).to.equal(false);
        });
    });
    describe('some', function() {
        var inputData = [10,20,30,40,50];
        it('Should return TRUE if only ONE iteration of Array is true', function() {
            expect(lodown.some(inputData, function(value) {
                return value % 2 === 0;
            })).to.equal(true);
        });
        it('Should return FALSE if ALL iterations of Array are false', function() {
            expect(lodown.some(inputData, function(value) {
                return value % 2 === 5;
            })).to.equal(false);
        });
    });
    describe('reduce', function() {
        var inputData = [1,2,3];
        it('Should return a result with an array & seed', function() {
            expect(lodown.reduce(inputData, function(mem, num) {
                return mem + num;
            }, 0)).to.equal(6);
        });
        it('Should return a result WITHOUT a seed', function() {
            expect(lodown.reduce(inputData, function(mem, num) {
                return mem + num;
            })).to.equal(7);
        });
    });
    describe('extend', function() {
        var inputData = {a:"one", b:"two"};
        var inputData2 = {c:"three",d:"four"};
        it('Should extend an Objects properties', function() {
            expect(lodown.extend(inputData, inputData2)).to.equal({a:"one",b:"two",c:"three",d:"four"});
        });
        it('Should replace an Objects properties if key/value exists', function() {
            expect(lodown.extend(inputData, {b:"Kitty Kat"})).to.equal({a:"one",b:"Kitty Kat"});
        });
        it('Should handle multiple objects', function() {
            expect(lodown.extend(inputData, inputData2, {e:"five",f:"six"})).to.equal({a:"one",b:"two",c:"three",d:"four",e:"five",f:"six"});
        });
    });
});