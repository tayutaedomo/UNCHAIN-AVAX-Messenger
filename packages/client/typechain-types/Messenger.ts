/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";

export declare namespace Messenger {
  export type MessageStruct = {
    sender: PromiseOrValue<string>;
    receiver: PromiseOrValue<string>;
    depositInWei: PromiseOrValue<BigNumberish>;
    timestamp: PromiseOrValue<BigNumberish>;
    text: PromiseOrValue<string>;
    isPending: PromiseOrValue<boolean>;
  };

  export type MessageStructOutput = [
    string,
    string,
    BigNumber,
    BigNumber,
    string,
    boolean
  ] & {
    sender: string;
    receiver: string;
    depositInWei: BigNumber;
    timestamp: BigNumber;
    text: string;
    isPending: boolean;
  };
}

export interface MessengerInterface extends utils.Interface {
  functions: {
    "accept(uint256)": FunctionFragment;
    "changeNumOfPendingLimits(uint256)": FunctionFragment;
    "deny(uint256)": FunctionFragment;
    "getOwnMessages()": FunctionFragment;
    "numOfPendingLimits()": FunctionFragment;
    "owner()": FunctionFragment;
    "post(string,address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "accept"
      | "changeNumOfPendingLimits"
      | "deny"
      | "getOwnMessages"
      | "numOfPendingLimits"
      | "owner"
      | "post"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "accept",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "changeNumOfPendingLimits",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "deny",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getOwnMessages",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "numOfPendingLimits",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "post",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(functionFragment: "accept", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "changeNumOfPendingLimits",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "deny", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getOwnMessages",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "numOfPendingLimits",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "post", data: BytesLike): Result;

  events: {
    "MessageConfirmed(address,uint256)": EventFragment;
    "NewMessage(address,address,uint256,uint256,string,bool)": EventFragment;
    "NumOfPendingLimitsChanged(uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "MessageConfirmed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewMessage"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NumOfPendingLimitsChanged"): EventFragment;
}

export interface MessageConfirmedEventObject {
  receiver: string;
  index: BigNumber;
}
export type MessageConfirmedEvent = TypedEvent<
  [string, BigNumber],
  MessageConfirmedEventObject
>;

export type MessageConfirmedEventFilter =
  TypedEventFilter<MessageConfirmedEvent>;

export interface NewMessageEventObject {
  sender: string;
  receiver: string;
  depositInWei: BigNumber;
  timestamp: BigNumber;
  text: string;
  isPending: boolean;
}
export type NewMessageEvent = TypedEvent<
  [string, string, BigNumber, BigNumber, string, boolean],
  NewMessageEventObject
>;

export type NewMessageEventFilter = TypedEventFilter<NewMessageEvent>;

export interface NumOfPendingLimitsChangedEventObject {
  limits: BigNumber;
}
export type NumOfPendingLimitsChangedEvent = TypedEvent<
  [BigNumber],
  NumOfPendingLimitsChangedEventObject
>;

export type NumOfPendingLimitsChangedEventFilter =
  TypedEventFilter<NumOfPendingLimitsChangedEvent>;

export interface Messenger extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MessengerInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    accept(
      _index: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    changeNumOfPendingLimits(
      _limits: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    deny(
      _index: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getOwnMessages(
      overrides?: CallOverrides
    ): Promise<[Messenger.MessageStructOutput[]]>;

    numOfPendingLimits(overrides?: CallOverrides): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    post(
      _text: PromiseOrValue<string>,
      _receiver: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  accept(
    _index: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  changeNumOfPendingLimits(
    _limits: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  deny(
    _index: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getOwnMessages(
    overrides?: CallOverrides
  ): Promise<Messenger.MessageStructOutput[]>;

  numOfPendingLimits(overrides?: CallOverrides): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  post(
    _text: PromiseOrValue<string>,
    _receiver: PromiseOrValue<string>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    accept(
      _index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    changeNumOfPendingLimits(
      _limits: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    deny(
      _index: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    getOwnMessages(
      overrides?: CallOverrides
    ): Promise<Messenger.MessageStructOutput[]>;

    numOfPendingLimits(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    post(
      _text: PromiseOrValue<string>,
      _receiver: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "MessageConfirmed(address,uint256)"(
      receiver?: null,
      index?: null
    ): MessageConfirmedEventFilter;
    MessageConfirmed(
      receiver?: null,
      index?: null
    ): MessageConfirmedEventFilter;

    "NewMessage(address,address,uint256,uint256,string,bool)"(
      sender?: null,
      receiver?: null,
      depositInWei?: null,
      timestamp?: null,
      text?: null,
      isPending?: null
    ): NewMessageEventFilter;
    NewMessage(
      sender?: null,
      receiver?: null,
      depositInWei?: null,
      timestamp?: null,
      text?: null,
      isPending?: null
    ): NewMessageEventFilter;

    "NumOfPendingLimitsChanged(uint256)"(
      limits?: null
    ): NumOfPendingLimitsChangedEventFilter;
    NumOfPendingLimitsChanged(
      limits?: null
    ): NumOfPendingLimitsChangedEventFilter;
  };

  estimateGas: {
    accept(
      _index: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    changeNumOfPendingLimits(
      _limits: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    deny(
      _index: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getOwnMessages(overrides?: CallOverrides): Promise<BigNumber>;

    numOfPendingLimits(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    post(
      _text: PromiseOrValue<string>,
      _receiver: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    accept(
      _index: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    changeNumOfPendingLimits(
      _limits: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    deny(
      _index: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getOwnMessages(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    numOfPendingLimits(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    post(
      _text: PromiseOrValue<string>,
      _receiver: PromiseOrValue<string>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
