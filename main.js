const express = require("express");
const fs = require("fs");
const app = express();
app.use("/public", express.static("public"));
app.get("/", (req, res) => {
  res.sendFile("/public/index.html", { root: __dirname });
});

app.get("/login", (req, res) => {
  const username = req.query.username;
  const password = req.query.password;

  const newuser = { username, password };

  let users = [];
  try {
    const usersData = fs.readFileSync("users.json");
    users = JSON.parse(usersData);
    const exists = users.some((item) => {
      // Customize this condition based on your JSON structure and the value you want to check
      return item.username === username; // Example: Checking if 'someKey' matches the targetValue
    });
  } catch (e) {
    res.status(500).send("A error occurred!" + e);
  }

  users.push(newuser);

  fs.writeFile("users.json", JSON.stringify(users, null, 2), (e) => {
    if (e) {
      return res.status(500).send("Error saving userdata: " + e);
    }
  });

  res.send("<h1>cool</h1>");
});

app.listen(2100);
