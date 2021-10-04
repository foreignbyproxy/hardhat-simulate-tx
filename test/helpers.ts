import path from "path";
import { resetHardhatContext } from "hardhat/plugins-testing";

import type{ HardhatRuntimeEnvironment } from "hardhat/types";

declare module "mocha" {
    interface Context {
        hre: HardhatRuntimeEnvironment;
    }
}

export function useEnvironment(fixtureProjectName: string) {
    beforeEach("Loading hardhat environment", function () {
        process.chdir(
            path.join(__dirname, "test-projects", fixtureProjectName)
        );

        this.hre = require("hardhat");
    });

    afterEach("Resetting hardhat", function () {
        resetHardhatContext();
    });
}
