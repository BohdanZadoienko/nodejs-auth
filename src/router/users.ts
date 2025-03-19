import express from "express";
import { isAuthenticated, isOwner } from "../middlewares";
import { getAllUsers } from "../controllers/users/getAllUsers";
import { deleteUser } from "../controllers/users/deleteUserById";
import { updateUser } from "../controllers/users/updateUser";

export default (router: express.Router) => {
  router.get("/users", isAuthenticated, getAllUsers);
  router.delete("/users/:id", isAuthenticated, isOwner, deleteUser);
  router.patch("/users/:id", isAuthenticated, isOwner, updateUser);
};
