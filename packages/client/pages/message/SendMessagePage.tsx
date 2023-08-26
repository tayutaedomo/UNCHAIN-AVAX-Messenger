import SendMessageForm from '@/components/form/SendMessageForm';
import Layout from '@/components/layout/Layout';
import RequireWallet from '@/components/layout/RequireWallet';
import { useWallet } from '@/hooks/useWallet';

export default function SendMessagePage() {
  const { currentAccount, connectWallet } = useWallet();

  return (
    <Layout>
      <RequireWallet
        currentAccount={currentAccount}
        connectWallet={connectWallet}
      >
        <SendMessageForm
          sendMessage={(
            text: string,
            receiver: string,
            tokenInEther: string,
          ) => {}}
        />
      </RequireWallet>
    </Layout>
  );
}
