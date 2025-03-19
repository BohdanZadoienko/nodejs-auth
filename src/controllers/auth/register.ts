import express from "express";
import { createUser, getUserByEmail } from "../../db/users";
import { random } from "../../helpers";

export const register = async (req: express.Request, res: express.Response) => {
    try {
      const { email, password, username } = req.body;
  
      if (!email || !password || !username) {
        return res.status(400).json("Email, Password or Username not provided!");
      }
  
      const existingUser = await getUserByEmail(email);
  
      if (existingUser) {
        console.log("User already exist!");
        return res.status(400).json("User already exist!");
      }
  
      const salt = random();
      const user = await createUser({
        email,
        username,
        authentication: {
          salt,
          password,
        },
      });
  
      console.log("User created: ", user);
      return res.status(200).json(user).end();
    } catch (error) {
      console.error(error);
      return res.sendStatus(500).json(error);
    }
  };
  