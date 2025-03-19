import express from "express";
import { register } from "../controllers/auth/register";
import { login } from "../controllers/auth/login";

export default (router: express.Router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
};