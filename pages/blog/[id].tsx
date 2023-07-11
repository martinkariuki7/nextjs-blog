import Layout from "../../components/layout";
import Head from "next/head";
import { getAllPostsIds, getPostData } from "../../lib/blog";
import Date from "../../components/date";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import utilStyles from "../../styles/utils.module.css";

export default function Post({
  postData,
}: {
  postData: {
    title: {
      rendered: string;
    };
    date: string;
    content: {
      rendered: string;
    };
    fimg_url: string;
  };
}) {
  return (
    <Layout>
      <Head>
        <title>{postData.title.rendered}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title.rendered}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <img src={postData.fimg_url} />
        <div
          style={{ marginTop: "2rem" }}
          dangerouslySetInnerHTML={{ __html: postData.content.rendered }}
        />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostsIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params?.id as string);
  return {
    props: {
      postData,
    },
  };
};
