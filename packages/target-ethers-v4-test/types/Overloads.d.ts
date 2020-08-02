/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Contract, ContractTransaction, EventFilter, Signer } from "ethers";
import { Listener, Provider } from "ethers/providers";
import { Arrayish, BigNumber, BigNumberish, Interface } from "ethers/utils";
import {
  TransactionOverrides,
  TypedEventDescription,
  TypedFunctionDescription
} from ".";

interface OverloadsInterface extends Interface {
  functions: {
    overload1: TypedFunctionDescription<{
      encode([input1]: [BigNumberish]): string;
    }>;
  };

  events: {};
}

export class Overloads extends Contract {
  connect(signerOrProvider: Signer | Provider | string): Overloads;
  attach(addressOrName: string): Overloads;
  deployed(): Promise<Overloads>;

  on(event: EventFilter | string, listener: Listener): Overloads;
  once(event: EventFilter | string, listener: Listener): Overloads;
  addListener(eventName: EventFilter | string, listener: Listener): Overloads;
  removeAllListeners(eventName: EventFilter | string): Overloads;
  removeListener(eventName: any, listener: Listener): Overloads;

  interface: OverloadsInterface;

  functions: {
    "overload1(int256)"(
      input1: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>;

    "overload1(uint256,uint256)"(
      input1: BigNumberish,
      input2: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>;
  };

  "overload1(int256)"(
    input1: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<BigNumber>;

  "overload1(uint256,uint256)"(
    input1: BigNumberish,
    input2: BigNumberish,
    overrides?: TransactionOverrides
  ): Promise<BigNumber>;

  filters: {};

  estimate: {
    "overload1(int256)"(
      input1: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>;

    "overload1(uint256,uint256)"(
      input1: BigNumberish,
      input2: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<BigNumber>;
  };
}
