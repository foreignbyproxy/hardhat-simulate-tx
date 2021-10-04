// We load the plugin here.
import { HardhatUserConfig } from "hardhat/types";

import "../../../src/index";

const config: HardhatUserConfig = {
    solidity: "0.7.3",
    simulateTx: {
        target: "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
    },
};

export default config;
