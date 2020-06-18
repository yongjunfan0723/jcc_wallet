/// <reference path = "../types/index.ts" />

import { Factory as WalletFactory } from "@swtc/wallet";

/**
 * check swtc or bizain address is valid or not
 *
 * @param {string} address
 * @param {string} [chain="swt"] the default value is `swt` which means the chain is swtc,
 * if the value is `bwt` which means the chain is bizain
 * @returns {boolean} return true if valid
 */
const isValidAddress = (address: string, chain = "swt"): boolean => {
  return WalletFactory(chain).isValidAddress(address);
};

/**
 * check swtc or bizain secret is valid or not
 *
 * @param {string} secret
 * @param {string} [chain="swt"] the default value is `swt` which means the chain is swtc,
 * if the value is `bwt` which means the chain is bizain
 * @returns {boolean} return true if valid
 */
const isValidSecret = (secret: string, chain: string = "swt"): boolean => {
  return WalletFactory(chain).isValidSecret(secret);
};

/**
 * get address with secret
 *
 * @param {string} secret
 * @param {string} [chain="swt"] the default value is `swt` which means the chain is swtc,
 * if the value is `bwt` which means the chain is bizain
 * @returns {(string | null)} return address if valid, otherwise return null
 */
const getAddress = (secret: string, chain: string = "swt"): string | null => {
  try {
    const wallet = WalletFactory(chain).fromSecret(secret);
    return wallet.address;
  } catch (error) {
    return null;
  }
};

/**
 * create swtc or bizain wallet
 *
 * @param {string} [chain="swt"] the default value is `swt` which means create swtc wallet,
 * if the value is `bwt` which means create bizain wallet
 * @param {ICreateOptionsModel} [opt={}]
 * @returns {(IWalletModel | null)} return IWalletModel if succress, otherwise return null
 */
const createWallet = (chain: string = "swt", opt: ICreateOptionsModel = {}): IWalletModel | null => {
  let wallet: IWalletModel;
  try {
    wallet = WalletFactory(chain).generate(opt);
  } catch (error) {
    wallet = null;
  }
  return wallet;
};

export { isValidAddress, isValidSecret, getAddress, createWallet };
