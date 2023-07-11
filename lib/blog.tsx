const URL = "https://epl.martinkariuki.com/wp-json/wp/v2/posts";

export async function getAllPosts() {
  //const encodedSlug = encodeURIComponent();

  const res = await fetch(URL);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

// Working well
export async function getAllPostsIds() {
  const res = await fetch(URL);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const posts = await res.json();

  return posts.map(({ id }) => {
    return {
      params: {
        id: id.toString(),
      },
    };
  });
}

export async function getPostData(id) {
  const res = await fetch(`${URL}/${id}`);
  const postData = await res.json();
  return postData;
}
