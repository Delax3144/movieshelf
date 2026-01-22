import { Router } from "express";
import {
  listMovies,
  renderNewMovieForm,
  createMovie,
  showMovieDetails,
  deleteMovie,
  renderEditMovieForm,
  updateMovie
} from "../controllers/movies.controller.js";

const router = Router();

router.get("/", listMovies);

router.get("/new", renderNewMovieForm);
router.post("/", createMovie);

router.get("/:id", showMovieDetails);

router.get("/:id/edit", renderEditMovieForm);
router.post("/:id/edit", updateMovie);

router.post("/:id/delete", deleteMovie);

export default router;
