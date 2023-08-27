import { BigNumber, ethers } from 'ethers';
import { useEffect, useState } from 'react';

import { Messenger as MessengerType } from '../typechain-types';

import { getEthereum } from '@/utils/ethereum';
import abi from '@/utils/Messenger.json';

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
const contractABI = abi.abi;

export type Message = {
  sender: string;
  receiver: string;
  depositInWei: BigNumber;
  timestamp: Date;
  text: string;
  isPending: boolean;
};

type PropsSendMessage = {
  text: string;
  receiver: string;
  tokenInEther: string;
};

type ReturnUseMessengerContract = {
  processing: boolean;
  ownMessages: Message[];
  sendMessage: (props: PropsSendMessage) => void;
};

type PropsUseMessengerContract = {
  currentAccount: string | undefined;
};

export const useMessengerContract = ({
  currentAccount,
}: PropsUseMessengerContract): ReturnUseMessengerContract => {
  const [processing, setProcessing] = useState<boolean>(false);
  const [messengerContract, setMessengerContract] = useState<MessengerType>();
  const [ownMessages, setOwnMessages] = useState<Message[]>([]);

  const ethereum = getEthereum();

  function getMessengerContract() {
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(
          ethereum as unknown as ethers.providers.ExternalProvider,
        );
        const signer = provider.getSigner();
        const MessengerContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer,
        ) as MessengerType;
        setMessengerContract(MessengerContract);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getOwnMessages() {
    if (!messengerContract) return;

    try {
      const OwnMessages = await messengerContract.getOwnMessages();
      const messageCleaned: Message[] = OwnMessages.map((message) => {
        return {
          sender: message.sender,
          receiver: message.receiver,
          depositInWei: message.depositInWei,
          timestamp: new Date(message.timestamp.toNumber() * 1000),
          text: message.text,
          isPending: message.isPending,
        };
      });
      setOwnMessages(messageCleaned);
    } catch (error) {
      console.log(error);
    }
  }

  async function sendMessage({
    text,
    receiver,
    tokenInEther,
  }: PropsSendMessage) {
    if (!messengerContract) return;

    try {
      const tokenInWei = ethers.utils.parseEther(tokenInEther);
      console.log(
        'call post with receiver:[%s], token:[%s]',
        receiver,
        tokenInWei.toString(),
      );

      const txn = await messengerContract.post(text, receiver, {
        gasLimit: 300000,
        value: tokenInWei,
      });
      console.log('Processing...', txn.hash);
      setProcessing(true);

      await txn.wait();
      console.log('Done --', txn.hash);
      setProcessing(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMessengerContract();
    getOwnMessages();
  }, [currentAccount, ethereum]);

  useEffect(() => {
    // Event listener
    const onNewMessage = (
      sender: string,
      receiver: string,
      depositInWei: BigNumber,
      timestamp: BigNumber,
      text: string,
      isPending: boolean,
    ) => {
      console.log('NewMessage from %s to %s', sender, receiver);

      if (receiver.toLocaleLowerCase() === currentAccount) {
        setOwnMessages((prevState) => [
          ...prevState,
          {
            sender,
            receiver,
            depositInWei,
            timestamp: new Date(timestamp.toNumber() * 1000),
            text,
            isPending,
          },
        ]);
      }
    };

    if (messengerContract) {
      messengerContract.on('NewMessage', onNewMessage);
    }

    return () => {
      if (messengerContract) {
        messengerContract.off('NewMessage', onNewMessage);
      }
    };
  }, [messengerContract, currentAccount]);

  return {
    processing,
    ownMessages,
    sendMessage,
  };
};
