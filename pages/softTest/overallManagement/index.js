import Layout from 'components/layout';
import Head from 'next/head';

import { steps, infos } from './data';

const Demo = (props) => {
  return (
    <Layout home>
      <Head>
        <title>项目整体管理</title>
      </Head>
      <h3 className="text-red-500">整体管理</h3>
      <div>管理步骤(共{steps.length}步)</div>
      {steps.map((step, i) => (
        <div key={i}>
          <div>
            <div className="text-yellow-700">
              {i + 1}.{step}
            </div>
            {infos[i].map((y, yi) => (
              <div key={yi} className="flex">
                <div>{y.name}:</div>
                <div>
                  {y.content.map((z, zi) => (
                    <div key={zi}>
                      {zi + 1}.{z}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </Layout>
  );
};

export default Demo;
