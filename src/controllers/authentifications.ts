import express from "express";
import { createUser, getUserByEmail } from "../db/users";
import { random, authentication } from "../helpers";

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json("Password or Username not provided!");
    }

    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      return res.status(400).json("User not exist!");
    }
    const userHash = authentication(user.authentication.salt, password);
    const dbHash = authentication(
      user.authentication.salt,
      user.authentication.password
    );

    console.log("userHash >>> ", userHash);
    console.log("dbHash   >>> ", dbHash);

    if (userHash != dbHash) {
      return res.status(403).json("Pasword not correct");
    }

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );
    await user.save();

    res.cookie("ZADOIENKO-AUTH", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });

    return res.status(200).json(user).end();
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

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
