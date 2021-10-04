import { extendConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-ethers";
import delay from "delay";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

import { getRandomSigner, SIMULATE_TASK_NAME, defaultSettings } from "./utils";

import "./types/type-extensions";
import type {
    HardhatConfig,
    HardhatUserConfig,
    HardhatRuntimeEnvironment,
} from "hardhat/types";

extendConfig(
    (config: HardhatConfig, userConfig: Readonly<HardhatUserConfig>) => {
        //Merge default settings and userConfig for simulateTx
        config.simulateTx = {
            ...defaultSettings,
            ...userConfig.simulateTx,
        };
    }
);

task(
    SIMULATE_TASK_NAME,
    "Simulates network activity between accounts and contracts"
).setAction(async function simulateNetwork(
    _: any,
    hre: HardhatRuntimeEnvironment
) {
    const {
        config: { simulateTx },
        ethers,
    } = hre;

    const signers = await ethers.getSigners();

    let i = 0;

    while (i < simulateTx.transactions) {
        i++;

        const txAmount = Math.random().toFixed(2);

        let sender: SignerWithAddress, receiver: string;

        //Set target means we are sending transactions from random accounts to the target
        if (simulateTx.target) {
            sender = getRandomSigner(signers, [simulateTx.target]);
            receiver = simulateTx.target;
        } else {
            //No target means we are sending transactions between random accounts
            sender = getRandomSigner(signers);
            receiver = getRandomSigner(signers, [sender.address]).address;
        }

        const tx = await sender
            .sendTransaction({
                to: receiver,
                value: ethers.utils.parseEther(txAmount),
            })
            .then((data) => {
                console.log(
                    `Sent TX of ${txAmount} from ${sender.address} to ${receiver}`
                );

                return data;
            });

        await delay.range(100, simulateTx.delay);
    }
});
