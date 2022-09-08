import Layout from 'components/layout';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { useState } from 'react';

import datas from 'pages/data';

const Demo = (props) => {
  const router = useRouter();
  const nowIndex = Number(router.query.id);
  console.log(nowIndex, datas);
  const [steps, infos, title] = datas[nowIndex];

  const [isCollapse, setIsCollapse] = useState(false);
  return (
    <Layout home>
      <Head>
        <title>{title}</title>
      </Head>
      <h3 className="text-red-500">{title}</h3>
      <div>管理步骤(共{steps.length}步)</div>
      {steps.map((step, i) => (
        <div className="mb-10" key={i}>
          <div className="text-yellow-700">
            {i + 1}.{step}
          </div>
          {infos[i].map((y, yi) => (
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
      ))}
    </Layout>
  );
};

export default Demo;
