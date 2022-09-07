import Layout from 'components/layout';
import Link from "next/link";

const Demo = (props) => {
  return (
    <Layout home>
      <Link href={`/softTest/overallManagement`}>整体管理</Link>
    </Layout>
  );
};

export default Demo;
