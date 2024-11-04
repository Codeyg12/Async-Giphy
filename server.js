const dotenv = require("dotenv");
dotenv.config();
const express = require("express");

const app = express();
const PORT = 8080;

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/api/gifs", async (req, res) => {
  const search = req.query.search;
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${search}&limit=5&offset=0&rating=g&lang=en&bundle=messaging_non_clips`
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ err: "Cannot fetch GIFs" });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
