// tslint:disable-next-line no-implicit-dependencies
import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { jestSnapshotPlugin } from "mocha-chai-jest-snapshot";

chai.use(chaiAsPromised);
chai.use(jestSnapshotPlugin());

import { useEnvironment } from "../helpers";
import { getRandomSigner } from "../../src/utils";

import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("Utils - getRandomSignerPair", function () {
    useEnvironment("config-empty");

    it("Returns a random signer from an array of signers", async function () {
        let signers = await this.hre.ethers.getSigners();
        const randomSigner = getRandomSigner(signers);

        expect(signers.includes(randomSigner)).to.equal(true);
        expect(randomSigner instanceof SignerWithAddress).to.equal(true);
    });

    it("The random signer should not have the same address of any of the excluded addresses", async function () {
        let signers = await this.hre.ethers.getSigners();

        //Get a random list of address for excludedAddresses
        const excludedAddresses: string[] = signers.reduce(
            (carry: string[], signer) => {
                if (Math.random() > 0.5) {
                    carry.push(signer.address);
                }

                return carry;
            },
            []
        );

        /*
			The function isn't deterministic so we run the function multiple times
			so that probabilistically we should run into a collision if the function
			returns a signer with an address that is in the excluded list
		*/
        let i = 0;
        do {
            let randomSigner1 = getRandomSigner(signers, excludedAddresses);
            expect(excludedAddresses.includes(randomSigner1.address)).to.equal(
                false
            );

            i++;
        } while (i < 10);
    });

    it("Throws if there are not enough Signers to return a random signer", async function () {
        let signers = await this.hre.ethers.getSigners();

        const exludeAllAddresses = signers.map((signer) => {
            return signer.address;
        });

        expect(() => getRandomSigner(signers, exludeAllAddresses)).to.throw();
    });
});
