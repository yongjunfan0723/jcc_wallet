/// <reference path = "../types/index.ts" />

import { Factory as WalletFactory } from "@swtc/wallet";
const Wallet = WalletFactory("call");

/**
 * check call address is valid or not
 *
 * @param {string} address
 * @returns {boolean} return true if valid
 */
const isValidAddress = (address: string): boolean => {
  return Wallet.isValidAddress(address);
};

/**
 * check call secret is valid or not
 *
 * @param {string} secret
 * @returns {boolean} return true if valid
 */
const isValidSecret = (secret: string): boolean => {
  return Wallet.isValidSecret(secret);
};

/**
 * get call address with secret
 *
 * @param {string} secret
 * @returns {(string | null)} return address if valid, otherwise return null
 */
const getAddress = (secret: string): string | null => {
  try {
    const wallet = Wallet.fromSecret(secret);
    return wallet.address;
  } catch (error) {
    return null;
  }
};

/**
 * create call wallet
 *
 * @param {ICreateOptionsModel} [opt={}]
 * @returns {(IWalletModel | null)} return IWalletModel if succress, otherwise return null
 */
const createWallet = (opt: ICreateOptionsModel = {}): IWalletModel | null => {
  let wallet: IWalletModel;
  try {
    wallet = Wallet.generate(opt);
  } catch (error) {
    wallet = null;
  }
  return wallet;
};

export { isValidAddress, isValidSecret, getAddress, createWallet };
