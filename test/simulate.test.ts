import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { jestSnapshotPlugin } from "mocha-chai-jest-snapshot";
import sinon from "sinon";
import delay from "delay";

chai.use(chaiAsPromised);
chai.use(jestSnapshotPlugin());

import { useEnvironment } from "./helpers";
import * as utils from "../src/utils";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

describe("Base configuration", function () {
    useEnvironment("config-empty");

    beforeEach(function () {
        sinon.restore();
    });

    it("Runs the task with default settings (transactions:5; delay:5000)", async function () {
        let sendTransactionSPY = sinon.spy(
            SignerWithAddress.prototype,
            "sendTransaction"
        );

        //Stub delay so we don't have to wait through the delay
        sinon.stub(console, "log");
        let delaySTUB = sinon.stub(delay, "range").resolves(true);
        await this.hre.run(utils.SIMULATE_TASK_NAME);

        expect(sendTransactionSPY.callCount).to.equal(
            utils.defaultSettings.transactions
        );

        delaySTUB.args.forEach((call) => {
            expect(call[1]).to.equal(utils.defaultSettings.delay);
        });
    });
});

describe("Base configuration", function () {
    useEnvironment("config-set-transaction");

    beforeEach(function () {
        sinon.restore();
    });

    it("Setting 'transaction' property runs the right number of transactions", async function () {
        let sendTransactionSPY = sinon.spy(
            SignerWithAddress.prototype,
            "sendTransaction"
        );

        //Stub delay so we don't have to wait through the delay
        sinon.stub(console, "log");
        sinon.stub(delay, "range").resolves(true);

        await this.hre.run(utils.SIMULATE_TASK_NAME);

        expect(sendTransactionSPY.callCount).to.equal(2); //getRandomSigner gets called twice per tx
    });
});

describe("Base configuration", function () {
    useEnvironment("config-set-delay");

    beforeEach(function () {
        sinon.restore();
    });

    it("Setting 'deploy' property runs delay with the correct number", async function () {
        //Stub delay so we don't have to wait through the delay
        sinon.stub(console, "log");
        let delaySTUB = sinon.stub(delay, "range").resolves(true);

        await this.hre.run(utils.SIMULATE_TASK_NAME);

        delaySTUB.args.forEach((call) => {
            expect(call[1]).to.equal(2000);
        });
    });
});

describe("Target Configuration", function () {
    useEnvironment("config-target");

    beforeEach(function () {
        sinon.restore();
    });

    it("Sends all transactions to the target address", async function () {
        const { config } = this.hre;

        let sendTransactionSPY = sinon.spy(
            SignerWithAddress.prototype,
            "sendTransaction"
        );

        sinon.stub(console, "log");
        sinon.stub(delay, "range").resolves(true);

        await this.hre.run(utils.SIMULATE_TASK_NAME);

        //Get all "receiving" addresses
        const toAddresses = sendTransactionSPY.args.map((item: any) => {
            return item[0].to;
        });

        expect(
            toAddresses.every((val) => val === config.simulateTx.target)
        ).to.equal(true);
    });

    it("Task calls getRandomSigner with target in excludes", async function () {
        const { config } = this.hre;

        let getRandomSignerSPY = sinon.spy(utils, "getRandomSigner");

        sinon.stub(console, "log");
        sinon.stub(delay, "range").resolves(true);

        await this.hre.run(utils.SIMULATE_TASK_NAME);

        //Make sure each call to getRandomSignerSPY
        getRandomSignerSPY.args.forEach((call) => {
            expect(call[1]).to.eql([config.simulateTx.target]);
        });
    });
});
