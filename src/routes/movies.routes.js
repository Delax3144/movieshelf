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

// list
router.get("/", listMovies);

// new
router.get("/new", renderNewMovieForm);
router.post("/", createMovie);

// details
router.get("/:id", showMovieDetails);

// edit
router.get("/:id/edit", renderEditMovieForm);
router.post("/:id/edit", updateMovie);

// delete
router.post("/:id/delete", deleteMovie);

export default router;
