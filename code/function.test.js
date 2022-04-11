import { divide_floor, divide_remainder, sum_total, split_bill, create_bill } from './function.js';
import { shopping_list, email_list } from './data.js';

const chai = window.chai;
const assert = chai.assert;

describe('divide_floor', () => {
    it('should divide the first value with the second and round the result down', () => {
        assert.equal(divide_floor(10, 3), 3);
        assert.equal(divide_floor(12, 2), 6);
    });
    it('should throw an error if any parameter is wrong or missing', () => {
        assert.throws(() => divide_floor('a', 1), 'Invalid parameter');
        assert.throws(() => divide_floor(2, 'b'), 'Invalid parameter');
        assert.throws(() => divide_floor(3), 'Invalid parameter');
    });
});

describe('divide_remainder', () => {
    it('should divide the first value with the second and return the rest of the division', () => {
        assert.equal(divide_remainder(9, 3), 0);
        assert.equal(divide_remainder(27, 2), 1);
    });
    it('should throw an error if any parameter is wrong or missing', () => {
        assert.throws(() => divide_remainder('a', 1), 'Invalid parameter');
        assert.throws(() => divide_remainder(2, 'b'), 'Invalid parameter');
        assert.throws(() => divide_remainder(3), 'Invalid parameter');
    });
});

describe('sum_total', () => {
    it('should multiply two arrays in order and return the total', () => {
        assert.equal(sum_total([1, 2, 3], [1, 2, 3]), 14);
        assert.equal(sum_total([35, 127, 488], [11, 29, 42]), 24564);
    });
    it('should throw an error if any parameter is wrong  or missing', () => {
        assert.throws(() => sum_total([1, 2], 1), 'Invalid parameter');
        assert.throws(() => sum_total(2, [1, 2]), 'Invalid parameter');
        assert.throws(() => sum_total(3), 'Invalid parameter');
    });
    it('should throw an error if one of the arrays is bigger then the other', () => {
        assert.throws(() => sum_total([1, 2], [1, 2, 3]), 'Different sizes');
        assert.throws(() => sum_total([1, 2, 3], [1, 2]), 'Different sizes');
    });
});

describe('split_bill', () => {
    describe('split the bill between the email list without having broken numbers even if it means someone will pay a little more', () => {
        it('should split the total passed correctly between the buyers', () => {
            const expect = 556;
            let bill = split_bill(expect, email_list);
            let values = Object.values(bill);
            let total = 0;

            for(let i = 0; i < values.length; i++) {
                total += values[i] * 100;
            }

            assert.equal(total, expect);
        });
        it('should throw an error if any parameter is wrong  or missing', () => {
            assert.throws(() => split_bill(10, 'a'), 'Invalid parameter');
            assert.throws(() => split_bill(500), 'Invalid parameter');
        });
    });
});

describe('create_bill', () => {
    describe('return an object (dictionary) where the keys are the email of the buyers and the value is how much each of them have to pay', () => {
        it('should return an object (dictionary)', () => {
            assert.isObject(create_bill(shopping_list, email_list));
        });
        it('should create keys with the values of the email list', () => {
            let keys = Object.keys(create_bill(shopping_list, email_list));
            assert.deepEqual(keys, email_list);
        });
    });
});

mocha.run();