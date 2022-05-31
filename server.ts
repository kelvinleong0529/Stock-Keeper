import express from "express"

import { validatePost, createPostLimit, createPost } from "./routes/user/new_item";
import { validateUser, createUserLimit, createUser } from "./routes/user/newUser";

import { db } from "./db"
import { createUserCredentialsTable, createUserTable } from "./scripts/migrate";

// interfaces
import { GetItem } from "./interfaces/getItem";
import { getItem, getItemLimit } from "./routes/user/getItem";
import { validateApiKey } from "./authorization/validate_api_key";

const PORT: number = Number(process.env.PORT || 5000);
const app = express()

// create the tables needed
createUserCredentialsTable();
createUserTable();

// app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/users", async (req, res) => {
    const queryUser: GetItem = {
        id: req.body.id,
        name: req.body.name,
        country: req.body.country,
        age: req.body.age
    }
    const users = await db.select().where({ id: queryUser["id"] }).from("users");
    res.json(users);
});

app.get("/example", getItemLimit, validateApiKey, getItem);

app.post("/users", createPostLimit, validatePost, createPost);

app.post("/create_user", createUserLimit, validateUser, createUser);

// app.delete("/users", async (req, res) => {
//     const user = await db("users").delete({ name: req.body.name }).returning("*");
//     res.json(user);
// });

app.listen(PORT, () => console.log(`Server up at http://localhost:${PORT}`));