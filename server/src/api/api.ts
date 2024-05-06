import "dotenv/config";
import { Router } from "express";
// import auth from "./auth/auth";
// import posts from "./posts/posts";
// import users from "./users/users";
// import follow from "./follow/follow";
// import search from "./search/search";
// import tags from "./tags/tags";

const api = Router();

// api.use("/follow", follow);
// api.use("/auth", auth);
// api.use("/posts", posts);
// api.use("/users", users);
// api.use("/search", search);
// api.use("/tags", tags);

api.get("/", (req, res) => {
  res.json("hi from /api");
});

api.get("/movies", async (req, res) => {
  const apiKey = process.env.API_KEY;
  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`;
  const data = await fetch(url);
  const json = await data.json();
  res.send(json);
});

export default api;
