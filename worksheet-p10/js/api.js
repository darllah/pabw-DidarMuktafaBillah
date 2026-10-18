const URL = "https://jsonplaceholder.typicode.com/posts?_limit=4";

export async function load() {
  const response = await fetch(URL);
  console.log("status", response.status, "ok", response.ok);

  if (!response.ok) {
    throw new Error("status " + response.status);
  }

  return response.json();
}
