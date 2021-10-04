import "hardhat/types/config";
import "hardhat/types/runtime";

import type { SimulateTx } from './types';

/*
	Extends the HardhatConfig and HardhatUserConfig with the SimulateTx types
*/
declare module "hardhat/types/config" {
	export interface HardhatConfig {
		simulateTx: SimulateTx
    }

	export interface HardhatUserConfig {
		simulateTx?: Partial<SimulateTx>
	}
}
