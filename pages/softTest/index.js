import Layout from 'components/layout';
import Link from 'next/link';

const Demo = (props) => {
  const infos = ['整体管理', '范围管理', '进度管理', '成本管理'];
  return (
    <Layout home>
      {infos.map((x, i) => (
        <div key={i} className="mb-2">
          <Link href={`/softTest/${i}`}>{x}</Link>
        </div>
      ))}
    </Layout>
  );
};

export default Demo;
