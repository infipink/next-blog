import Head from 'next/head';
import Image from 'next/image';
import Script from 'next/script'
import styles from './layout.module.css';
import Link from 'next/link';
import utilStyles from '../styles/utils.module.css';
import profilePic from '../public/profile.jpg';

const name = '难得有趣';
export const siteTitle = '难得有趣';

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="前端学习" />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <header className={styles.header}>
        {/* {home && (
          <>
            <Image
              priority
              src={profilePic}
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        )} */}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← 回到首页</a>
          </Link>
        </div>
      )}
    </div>
  );
}
