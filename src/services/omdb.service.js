import fetch from "node-fetch";

export async function fetchMoviePoster(title) {
  const apiKey = process.env.OMDB_API_KEY;
  if (!apiKey) return null;

  const url = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(title)}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.Response === "True" && data.Poster && data.Poster !== "N/A") {
      return data.Poster;
    }

    return null;
  } catch (err) {
    console.error("OMDb error:", err);
    return null;
  }
}
