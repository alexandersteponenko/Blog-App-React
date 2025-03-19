const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function getPosts() {
  const response = await fetch(`${BASE_URL}/posts`);
  if (!response.ok) {
    throw new Error("api response failed");
  }
  return await response.json();
}

export function addPost(post) {
  return fetch(`${BASE_URL}/posts`, {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}

export function deletePost(id) {
  fetch(`${BASE_URL}/posts/${id}`, {
    method: "DELETE",
  });
}
