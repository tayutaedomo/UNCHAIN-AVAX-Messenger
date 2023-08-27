/* Autogenerated file. Do not edit manually. */

/* tslint:disable */

/* eslint-disable */
import type { Messenger, MessengerInterface } from "../Messenger";
import type { PromiseOrValue } from "../common";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  PayableOverrides,
} from "ethers";

const _abi = [
  {
    inputs: [],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "MessageConfirmed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "depositInWei",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "text",
        type: "string",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isPending",
        type: "bool",
      },
    ],
    name: "NewMessage",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
    ],
    name: "accept",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
    ],
    name: "deny",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getOwnMessages",
    outputs: [
      {
        components: [
          {
            internalType: "address payable",
            name: "sender",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "receiver",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "depositInWei",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "text",
            type: "string",
          },
          {
            internalType: "bool",
            name: "isPending",
            type: "bool",
          },
        ],
        internalType: "struct Messenger.Message[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_text",
        type: "string",
      },
      {
        internalType: "address payable",
        name: "_receiver",
        type: "address",
      },
    ],
    name: "post",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040526200004f6040518060400160405280602081526020017f48657265206973206d7920666972737420736d61727420636f6e7472616374218152506200005560201b620009681760201c565b620001df565b620000f5816040516024016200006c9190620001bb565b6040516020818303038152906040527f41304fac000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050620000f860201b60201c565b50565b60008151905060006a636f6e736f6c652e6c6f679050602083016000808483855afa5050505050565b600081519050919050565b600082825260208201905092915050565b60005b838110156200015d57808201518184015260208101905062000140565b60008484015250505050565b6000601f19601f8301169050919050565b6000620001878262000121565b6200019381856200012c565b9350620001a58185602086016200013d565b620001b08162000169565b840191505092915050565b60006020820190508181036000830152620001d781846200017a565b905092915050565b6118a980620001ef6000396000f3fe60806040526004361061003f5760003560e01c806313e262711461004457806319b05f491461006057806356f6628214610089578063acdb8efd146100a5575b600080fd5b61005e60048036038101906100599190610ea2565b6100d0565b005b34801561006c57600080fd5b5061008760048036038101906100829190610f34565b6102f4565b005b6100a3600480360381019061009e9190610f34565b61052a565b005b3480156100b157600080fd5b506100ba610760565b6040516100c79190611164565b60405180910390f35b6101116040518060400160405280601c81526020017f257320706f73747320746578743a5b25735d20746f6b656e3a5b255d00000000815250338434610a01565b6000808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206040518060c001604052803373ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff16815260200134815260200142815260200184815260200160011515815250908060018154018082558091505060019003906000526020600020906006020160009091909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506040820151816002015560608201518160030155608082015181600401908161028b9190611392565b5060a08201518160050160006101000a81548160ff02191690831515021790555050507f6b8f49facd5e00a27899ac1ac6cd3edeb40299f83f03eac03a0c04e7a9059096338234428660016040516102e896959493929190611542565b60405180910390a15050565b6102fd81610aa3565b60008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020828154811061034f5761034e6115aa565b5b90600052602060002090600602016040518060c00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016002820154815260200160038201548152602001600482018054610438906111b5565b80601f0160208091040260200160405190810160405280929190818152602001828054610464906111b5565b80156104b15780601f10610486576101008083540402835291602001916104b1565b820191906000526020600020905b81548152906001019060200180831161049457829003601f168201915b505050505081526020016005820160009054906101000a900460ff16151515158152505090506104e981602001518260400151610c10565b7f2657c0f1a183b8a175f4cf6c3f6d7764c7265155fc9635682baad3cedd67d28781602001518360405161051e9291906115d9565b60405180910390a15050565b61053381610aa3565b60008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208281548110610585576105846115aa565b5b90600052602060002090600602016040518060c00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600282015481526020016003820154815260200160048201805461066e906111b5565b80601f016020809104026020016040519081016040528092919081815260200182805461069a906111b5565b80156106e75780601f106106bc576101008083540402835291602001916106e7565b820191906000526020600020905b8154815290600101906020018083116106ca57829003601f168201915b505050505081526020016005820160009054906101000a900460ff161515151581525050905061071f81600001518260400151610c10565b7f2657c0f1a183b8a175f4cf6c3f6d7764c7265155fc9635682baad3cedd67d2878160200151836040516107549291906115d9565b60405180910390a15050565b60606000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020805480602002602001604051908101604052809291908181526020016000905b8282101561095f57838290600052602060002090600602016040518060c00160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200160028201548152602001600382015481526020016004820180546108b3906111b5565b80601f01602080910402602001604051908101604052809291908181526020018280546108df906111b5565b801561092c5780601f106109015761010080835404028352916020019161092c565b820191906000526020600020905b81548152906001019060200180831161090f57829003601f168201915b505050505081526020016005820160009054906101000a900460ff161515151581525050815260200190600101906107c0565b50505050905090565b6109fe8160405160240161097c9190611602565b6040516020818303038152906040527f41304fac000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050610cc1565b50565b610a9d84848484604051602401610a1b9493929190611624565b6040516020818303038152906040527f91d1112e000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050610cc1565b50505050565b60008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208281548110610af557610af46115aa565b5b906000526020600020906006020190508060010160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610b97576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b8e906116e9565b60405180910390fd5b600115158160050160009054906101000a900460ff16151514610bef576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610be69061177b565b60405180910390fd5b60008160050160006101000a81548160ff0219169083151502179055505050565b60008273ffffffffffffffffffffffffffffffffffffffff1682604051610c36906117cc565b60006040518083038185875af1925050503d8060008114610c73576040519150601f19603f3d011682016040523d82523d6000602084013e610c78565b606091505b5050905080610cbc576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610cb390611853565b60405180910390fd5b505050565b60008151905060006a636f6e736f6c652e6c6f679050602083016000808483855afa5050505050565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610d5182610d08565b810181811067ffffffffffffffff82111715610d7057610d6f610d19565b5b80604052505050565b6000610d83610cea565b9050610d8f8282610d48565b919050565b600067ffffffffffffffff821115610daf57610dae610d19565b5b610db882610d08565b9050602081019050919050565b82818337600083830152505050565b6000610de7610de284610d94565b610d79565b905082815260208101848484011115610e0357610e02610d03565b5b610e0e848285610dc5565b509392505050565b600082601f830112610e2b57610e2a610cfe565b5b8135610e3b848260208601610dd4565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610e6f82610e44565b9050919050565b610e7f81610e64565b8114610e8a57600080fd5b50565b600081359050610e9c81610e76565b92915050565b60008060408385031215610eb957610eb8610cf4565b5b600083013567ffffffffffffffff811115610ed757610ed6610cf9565b5b610ee385828601610e16565b9250506020610ef485828601610e8d565b9150509250929050565b6000819050919050565b610f1181610efe565b8114610f1c57600080fd5b50565b600081359050610f2e81610f08565b92915050565b600060208284031215610f4a57610f49610cf4565b5b6000610f5884828501610f1f565b91505092915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b610f9681610e64565b82525050565b610fa581610efe565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610fe5578082015181840152602081019050610fca565b60008484015250505050565b6000610ffc82610fab565b6110068185610fb6565b9350611016818560208601610fc7565b61101f81610d08565b840191505092915050565b60008115159050919050565b61103f8161102a565b82525050565b600060c08301600083015161105d6000860182610f8d565b5060208301516110706020860182610f8d565b5060408301516110836040860182610f9c565b5060608301516110966060860182610f9c565b50608083015184820360808601526110ae8282610ff1565b91505060a08301516110c360a0860182611036565b508091505092915050565b60006110da8383611045565b905092915050565b6000602082019050919050565b60006110fa82610f61565b6111048185610f6c565b93508360208202850161111685610f7d565b8060005b85811015611152578484038952815161113385826110ce565b945061113e836110e2565b925060208a0199505060018101905061111a565b50829750879550505050505092915050565b6000602082019050818103600083015261117e81846110ef565b905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806111cd57607f821691505b6020821081036111e0576111df611186565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026112487fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8261120b565b611252868361120b565b95508019841693508086168417925050509392505050565b6000819050919050565b600061128f61128a61128584610efe565b61126a565b610efe565b9050919050565b6000819050919050565b6112a983611274565b6112bd6112b582611296565b848454611218565b825550505050565b600090565b6112d26112c5565b6112dd8184846112a0565b505050565b5b81811015611301576112f66000826112ca565b6001810190506112e3565b5050565b601f82111561134657611317816111e6565b611320846111fb565b8101602085101561132f578190505b61134361133b856111fb565b8301826112e2565b50505b505050565b600082821c905092915050565b60006113696000198460080261134b565b1980831691505092915050565b60006113828383611358565b9150826002028217905092915050565b61139b82610fab565b67ffffffffffffffff8111156113b4576113b3610d19565b5b6113be82546111b5565b6113c9828285611305565b600060209050601f8311600181146113fc57600084156113ea578287015190505b6113f48582611376565b86555061145c565b601f19841661140a866111e6565b60005b828110156114325784890151825560018201915060208501945060208101905061140d565b8683101561144f578489015161144b601f891682611358565b8355505b6001600288020188555050505b505050505050565b600061146f82610e44565b9050919050565b61147f81611464565b82525050565b60006114a061149b61149684610e44565b61126a565b610e44565b9050919050565b60006114b282611485565b9050919050565b60006114c4826114a7565b9050919050565b6114d4816114b9565b82525050565b6114e381610efe565b82525050565b600082825260208201905092915050565b600061150582610fab565b61150f81856114e9565b935061151f818560208601610fc7565b61152881610d08565b840191505092915050565b61153c8161102a565b82525050565b600060c0820190506115576000830189611476565b61156460208301886114cb565b61157160408301876114da565b61157e60608301866114da565b818103608083015261159081856114fa565b905061159f60a0830184611533565b979650505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60006040820190506115ee60008301856114cb565b6115fb60208301846114da565b9392505050565b6000602082019050818103600083015261161c81846114fa565b905092915050565b6000608082019050818103600083015261163e81876114fa565b905061164d6020830186611476565b818103604083015261165f81856114fa565b905061166e60608301846114da565b95945050505050565b7f4f6e6c79207468652072656365697665722063616e205f636f6e6669726d4d6560008201527f737361676520746865206d657373616765000000000000000000000000000000602082015250565b60006116d36031836114e9565b91506116de82611677565b604082019050919050565b60006020820190508181036000830152611702816116c6565b9050919050565b7f54686973206d6573736167652068617320616c7265616479206265656e20636f60008201527f6e6669726d656400000000000000000000000000000000000000000000000000602082015250565b60006117656027836114e9565b915061177082611709565b604082019050919050565b6000602082019050818103600083015261179481611758565b9050919050565b600081905092915050565b50565b60006117b660008361179b565b91506117c1826117a6565b600082019050919050565b60006117d7826117a9565b9150819050919050565b7f4661696c656420746f20776974686472617720415641582066726f6d20636f6e60008201527f7472616374000000000000000000000000000000000000000000000000000000602082015250565b600061183d6025836114e9565b9150611848826117e1565b604082019050919050565b6000602082019050818103600083015261186c81611830565b905091905056fea26469706673582212207fb83607ef570eb78f3c0a9df558afdc4fc244c60423d0a675bb56fc37c522a664736f6c63430008110033";

type MessengerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MessengerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Messenger__factory extends ContractFactory {
  constructor(...args: MessengerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<Messenger> {
    return super.deploy(overrides || {}) as Promise<Messenger>;
  }
  override getDeployTransaction(
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Messenger {
    return super.attach(address) as Messenger;
  }
  override connect(signer: Signer): Messenger__factory {
    return super.connect(signer) as Messenger__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MessengerInterface {
    return new utils.Interface(_abi) as MessengerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Messenger {
    return new Contract(address, _abi, signerOrProvider) as Messenger;
  }
}
