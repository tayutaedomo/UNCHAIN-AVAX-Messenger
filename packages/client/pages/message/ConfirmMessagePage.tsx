import { BigNumber } from 'ethers';

import MessageCard from '@/components/card/MessageCard';
import Layout from '@/components/layout/Layout';
import RequireWallet from '@/components/layout/RequireWallet';
import { Message } from '@/hooks/useMessengerContract';
import { useWallet } from '@/hooks/useWallet';

export default function ConfirmMessagePage() {
  const { currentAccount, connectWallet } = useWallet();

  const message: Message = {
    depositInWei: BigNumber.from('1000000000000000000'),
    timestamp: new Date(1),
    text: 'message',
    isPending: true,
    sender: '0x-',
    receiver: '0x-',
  };
  let ownMessages: Message[] = [message, message];

  return (
    <Layout>
      <RequireWallet
        currentAccount={currentAccount}
        connectWallet={connectWallet}
      >
        {ownMessages.map((message, index) => {
          return (
            <div key={index}>
              <MessageCard
                message={message}
                onClickAccept={() => {}}
                onClickDeny={() => {}}
              />
            </div>
          );
        })}
      </RequireWallet>
    </Layout>
  );
}
