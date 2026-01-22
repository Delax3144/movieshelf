import prisma from "../db/prisma.js";
import { fetchMoviePoster } from "../services/omdb.service.js";

export async function listMovies(req, res) {
  const search = (req.query.search || "").trim();

  let movies;

  if (!search) {
    movies = await prisma.movie.findMany({
      orderBy: { createdAt: "desc" }
    });
  } else {
    const q = `%${search.toLowerCase()}%`;

    // SQLite: делаем case-insensitive через LOWER()
    movies = await prisma.movie.findMany({
      where: {
        OR: [
          { title: { contains: search } },         // базовый вариант
          { title: { contains: search.toLowerCase() } } // подстраховка
        ]
      },
      orderBy: { createdAt: "desc" }
    });
  }

  res.render("movies/list", {
    title: "Movies",
    movies,
    search
  });
}



export function renderNewMovieForm(req, res) {
  res.render("movies/form", {
    title: "Add movie",
    errors: [],
    values: {},
    isEdit: false
  });
}

export async function createMovie(req, res) {
  const { title, description, year, imageUrl } = req.body;

  const errors = [];
  if (!title || title.trim() === "") errors.push("Title is required");
  if (!year || isNaN(year)) errors.push("Year must be a number");

  if (errors.length > 0) {
    return res.render("movies/form", {
  title: "Add movie",
  errors,
  values: { title, description, year, imageUrl },
  isEdit: false
});

  }

  let finalImageUrl = imageUrl?.trim() || null;

  // 👉 REST API integration
  if (!finalImageUrl) {
    const posterFromApi = await fetchMoviePoster(title.trim());
    if (posterFromApi) {
      finalImageUrl = posterFromApi;
    }
  }

  await prisma.movie.create({
    data: {
      title: title.trim(),
      description: description?.trim() || "",
      year: Number(year),
      imageUrl: finalImageUrl
    }
  });

  res.redirect("/movies");
}


export async function showMovieDetails(req, res) {
  const id = Number(req.params.id);

  const movie = await prisma.movie.findUnique({
    where: { id }
  });

  if (!movie) {
    return res.status(404).send("Movie not found");
  }

  res.render("movies/details", {
    title: movie.title,
    movie
  });
}

export async function renderEditMovieForm(req, res) {
  const id = Number(req.params.id);

  const movie = await prisma.movie.findUnique({
    where: { id }
  });

  if (!movie) {
    return res.status(404).send("Movie not found");
  }

  res.render("movies/form", {
    title: "Edit movie",
    errors: [],
    values: movie,
    isEdit: true
  });
}

export async function updateMovie(req, res) {
  const id = Number(req.params.id);
  const { title, description, year, imageUrl } = req.body;

  const errors = [];
  if (!title || title.trim() === "") errors.push("Title is required");
  if (!year || isNaN(year)) errors.push("Year must be a number");

  if (errors.length > 0) {
    return res.render("movies/form", {
      title: "Edit movie",
      errors,
      values: { id, title, description, year, imageUrl },
      isEdit: true
    });
  }

  await prisma.movie.update({
    where: { id },
    data: {
      title: title.trim(),
      description: description?.trim() || "",
      year: Number(year),
      imageUrl: imageUrl?.trim() || null
    }
  });

  res.redirect(`/movies/${id}`);
}

export async function deleteMovie(req, res) {
  const id = Number(req.params.id);

  await prisma.movie.delete({
    where: { id }
  });

  res.redirect("/movies");
}
