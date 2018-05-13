const expires = require('./index');
const expiresModule = require('expires');

describe('The expires plugin', () => {
    it('Should have a method getName that returns "expires"', () => {
        expect(expires.getName()).toEqual('expires');
    });

    it('Should have an early weight that should be under 100', () => {
        expect(expires.getWeight()).toBeLessThan(100);
    });

    describe('register method', () => {
        it('must exist', () => {
            expect(typeof expires.register).toEqual('function');
        });

        it('should return an instance of expires', () => {
            expect(expires.register() === expiresModule).toBeTruthy();
        });
    });


    describe('init method', () => {
        it('must exist', () => {
            const exp = expires.register();
            expect(typeof exp.init).toEqual('function');
        });
    });

});
