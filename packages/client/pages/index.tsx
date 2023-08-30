import type { NextPage } from 'next';
import Link from 'next/link';

import Layout from '@/components/layout/Layout';
import RequireWallet from '@/components/layout/RequireWallet';
import { useMessengerContract } from '@/hooks/useMessengerContract';
import { useWallet } from '@/hooks/useWallet';
import styles from '@/styles/Home.module.css';

export default function Home() {
  const { currentAccount, connectWallet } = useWallet();
  const { owner } = useMessengerContract({ currentAccount });
  console.log(currentAccount, 'currentAccount');
  console.log(owner, 'owner');
  console.log(owner === currentAccount);

  return (
    <Layout home>
      <RequireWallet
        currentAccount={currentAccount}
        connectWallet={connectWallet}
      >
        <div className={styles.container}>
          <main className={styles.main}>
            <h1 className={styles.title}>Welcome to Messenger 📫</h1>
            <div className={styles.card}>
              <Link href="/message/SendMessagePage">
                <h2>send &rarr;</h2>
              </Link>
              <p>send message and avax to other accounts</p>
            </div>

            <div className={styles.card}>
              <Link href="/message/ConfirmMessagePage">
                <h2>check &rarr;</h2>
              </Link>
              <p>Check messages from other accounts</p>
            </div>

            {owner === currentAccount && (
              <div className={styles.card}>
                <Link href="/OwnerPage">
                  <h2>owner &rarr;</h2>
                </Link>
                <p>Owner page</p>
              </div>
            )}
          </main>
        </div>
      </RequireWallet>
    </Layout>
  );
}
