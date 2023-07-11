import Layout from "../../components/layout";
import Head from "next/head";
import { getAllPostsIds, getPostData } from "../../lib/blog";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.css";

export default function Post({ postData }) {
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

export async function getStaticPaths() {
  const paths = await getAllPostsIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
