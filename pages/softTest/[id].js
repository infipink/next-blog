import Layout from 'components/layout';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { useState } from 'react';

import datas from 'data';

const Demo = (props) => {
  const router = useRouter();
  const nowIndex = Number(router.query.id);
  const [steps, infos, title] = datas[nowIndex];

  const [isCollapse, setIsCollapse] = useState(false);
  const [showIndex, setSHowIndex] = useState(0);

  return (
    <Layout home>
      <Head>
        <title>{title}</title>
      </Head>
      <h3 className="text-red-500">{title}</h3>
      <div className="flex">
        <div className="w-32">
          {steps.map((step, i) => (
            <div
              className={`${
                i === showIndex ? 'text-yellow-700' : ''
              } mr-5 mb-6 cursor-pointer`}
              onClick={() => setSHowIndex(i)}
            >
              {i + 1}.{step}
            </div>
          ))}
        </div>
        <div className="flex-1">
          {infos[showIndex].map((y, yi) => (
            <div key={yi} className="flex mb-5">
              <div
                className="text-blue-600 w-32 text-right mr-4 mb-2 cursor-pointer"
                onClick={() => setIsCollapse(!isCollapse)}
              >
                {y.name}:
              </div>
              <div className="border-dashed border-2 border-indigo-600 p-2 flex-1	">
                {y.content.map((z, zi) => (
                  <div key={zi}>{isCollapse ? '' : `${zi + 1}.${z}`}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Demo;
