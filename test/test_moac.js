const chai = require('chai');
const expect = chai.expect;
const testSecret = "0x8fef3bc906ea19f0348cb44bca851f5459b61e32c5cae445220e2f7066db36d8";
const testAddress = "0x5edccedfe9952f5b828937b325bd1f132aa09f60";
const moacWallet = require('../src/moac')
describe('test moac', function () {

    describe('test isValidAddress', function () {
        it('should return true if the address is valid', function () {
            let isvalid = moacWallet.isValidAddress(testAddress);
            expect(isvalid).to.equal(true);
        })

        it('should return false if the address is not valid', function () {
            let isvalid = moacWallet.isValidAddress(testAddress.substring(1));
            expect(isvalid).to.equal(false);
        })
    })

    describe('test isValidSecret', function () {
        it('should return true if the secret is valid', function () {
            let isvalid = moacWallet.isValidSecret(testSecret);
            expect(isvalid).to.equal(true);
        })

        it('should return false if the secret is not valid', function () {
            let isvalid = moacWallet.isValidSecret(testSecret.substring(1));
            expect(isvalid).to.equal(false);
        })
    })

    describe('test getAddress', function () {
        it('should return correct address if the secret is valid', function () {
            let address = moacWallet.getAddress(testSecret);
            expect(address).to.equal(testAddress);
        })

        it('should return null if the secret is not valid', function () {
            let address = moacWallet.getAddress(testSecret.substring(1));
            expect(address).to.equal(null);
        })
    })

});