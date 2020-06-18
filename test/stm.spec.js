const chai = require("chai");
const expect = chai.expect;
const stmWallet = require("../lib").stmWallet;
const testAddress = "vaFtuK2skLZUCcqHvsFk2BMKpzQmJbQsXa";
const testSecret = "sp5KqpgwuHo3ejF5Bf9kDSJPivEYV";

let undefinedValue;
let invalidAddresses = ["", null, undefinedValue, {}, [], "xxxx", testAddress.substring(1), testAddress + "a", true, false, 123456];

let invalidSecrets = ["", null, undefinedValue, {}, [], "xxxx", testSecret.substring(1), testSecret + "a", true, false, 123456];

describe("test stm", function() {
  describe("test createWallet", function() {
    it("the wallet should be valid when create stream wallet successfully", function() {
      let wallet = stmWallet.createWallet();
      let { secret, address } = wallet;
      let a = stmWallet.isValidAddress(address);
      let b = stmWallet.isValidSecret(secret);
      expect(a).to.equal(true);
      expect(b).to.equal(true);
    });

    it("should return null when create stream wallet wrongly", function() {
      let wallet = stmWallet.createWallet(null);
      expect(wallet).to.equal(null);
    });

    it("create stream wallet successfully and valid when algorithm is ed25519", function() {
      const opt = { algorithm: "ed25519" };
      let wallet = stmWallet.createWallet(opt);
      let { secret, address } = wallet;
      let a = stmWallet.isValidAddress(address);
      let b = stmWallet.isValidSecret(secret);
      expect(a).to.equal(true);
      expect(b).to.equal(true);
    });

    it("create stream wallet wrongly when algorithm is ed25519", function() {
      const opt = { algorithm: "ed25519" };
      let wallet = stmWallet.createWallet(null, opt);
      expect(wallet).to.equal(null);
    });
  });

  describe("test isValidAddress", function() {
    it("should return true if the address is valid", function() {
      let isvalid = stmWallet.isValidAddress(testAddress);
      expect(isvalid).to.equal(true);
    });

    it("should return false if the address is not valid", function() {
      for (let address of invalidAddresses) {
        let isvalid = stmWallet.isValidAddress(address);
        expect(isvalid).to.equal(false);
      }
    });
  });

  describe("test isValidSecret", function() {
    it("should return true if the secret is valid", function() {
      let isvalid = stmWallet.isValidSecret(testSecret);
      expect(isvalid).to.equal(true);
    });

    it("should return false if the secret is not valid", function() {
      for (let secret of invalidSecrets) {
        let isvalid = stmWallet.isValidSecret(secret);
        expect(isvalid).to.equal(false);
      }
    });
  });

  describe("test getAddress", function() {
    it("should return correct address if the secret is valid", function() {
      let address = stmWallet.getAddress(testSecret);
      expect(address).to.equal(testAddress);
    });

    it("should return null if the secret is not valid", function() {
      for (let secret of invalidSecrets) {
        let address = stmWallet.getAddress(secret);
        expect(address).to.equal(null);
      }
    });
  });
});
