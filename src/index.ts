import express from "express";
import { createUser, deleteUser, getOneUser, getUsers, updatePartialUser, updateUser } from "./logic";
import { isRequestBodyValid, isUserEmailUnique,isUserIdValid } from "./middlewares";

const app = express();

app.use(express.json());

app.get("/:userId", isUserIdValid, getOneUser);
app.get("/", getUsers);
app.post("/", isRequestBodyValid, isUserEmailUnique, createUser);
app.delete("/:userId", isUserIdValid, deleteUser);
app.put("/:userId", isUserIdValid, isRequestBodyValid, isUserEmailUnique, updateUser);
app.patch("/:userId", isUserIdValid, isUserEmailUnique, updatePartialUser);

app.listen(3000, () => {
    console.log("API started sucessfully in port 3000!");
});