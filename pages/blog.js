import { getAllPosts } from "../lib/blog";
import Layout from "../components/layout";
import Link from "next/link";
import Date from "../components/date";
import utilStyles from "../styles/utils.module.css";

export default function Blog({ allPostsData }) {
  return (
    <Layout>
      <h1>Blog</h1>
      <ul>
        {allPostsData.map(({ id, title, date }) => (
          <li key={id}>
            <br />
            <Link href={`/blog/${id}`}>{title.rendered}</Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = await getAllPosts();

  return {
    props: {
      allPostsData,
    },
  };
}
