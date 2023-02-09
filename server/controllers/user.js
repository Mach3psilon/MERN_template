import User from "../../models/User.js";

export async function getUsers(req, res) {
  const users = await User.find({});
  res.send(users);
}

export async function getUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
}

export async function getUser(req, res) {
  const user = await User.findOne({ _id: req.user._id });
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
}
