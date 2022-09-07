import Head from 'next/head';
import Image from 'next/image';
import Script from 'next/script';
import styles from './layout.module.css';
import Link from 'next/link';

const name = '难得有趣';
export const siteTitle = '难得有趣';

export default function Layout({ children, home }) {
  return (
    <div className="relative w-screen h-screen">
      <div className="bg-[#1b1b1b] text-[#cdcdcd] sticky top-0 left-0 w-full border-b border-orange-600 flex">
        <div className="max-w-7xl mx-auto py-0.5">
          <Link href={`/navigate`}>导航</Link>
        </div>
        <div className="max-w-7xl mx-auto py-0.5">
          <Link href={`/softTest`}>软考高级</Link>
        </div>
      </div>
      <div className="max-w-5xl mx-auto my-3">
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
        <main>{children}</main>
        {!home && (
          <div className={styles.backToHome}>
            <Link href="/">
              <a>← 回到首页</a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
