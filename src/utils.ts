import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

export const SIMULATE_TASK_NAME = "simulate";
export const DEFAULT_TX_NUMBER = "5";

export const defaultSettings = {
	transactions: 5,
	delay: 5000
}

export function getRandomSigner(
    signers: SignerWithAddress[],
    excludedAddresses?: string[]
): SignerWithAddress {
    let validSigners = signers;

    //Filter out excluded signers by address
    if (excludedAddresses && excludedAddresses.length) {
        validSigners = validSigners.filter((signer) => {
            return !excludedAddresses.includes(signer.address);
        });
    }

    if (!validSigners.length) {
        throw new Error("No valid signers left.");
    }

    return validSigners[Math.floor(Math.random() * validSigners.length)];
}
