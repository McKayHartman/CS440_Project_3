const express = require("express");

const app = express();
const PORT = 5003;

// the In-memory image data for now.
let images = [
  {
    id: 1,
    title: "Sample Image 1",
    url: "https://picsum.photos/200"
  },
  {
    id: 2,
    title: "Sample Image 2",
    url: "https://picsum.photos/300"
  }
];

app.use(express.json());

// logger
app.use((req, res, next) => {
  console.log(`[IMAGE SERVICE] ${req.method} ${req.url}`);
  next();
});

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "image-service is running" });
});

// Get all images
app.get("/", (req, res) => {
  res.json(images);
});

app.get("/images", (req, res) => {
  res.json(images);
});

// Get one image by the id
app.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const image = images.find((img) => img.id === id);

  if (!image) {
    return res.status(404).json({ error: "Image not found" });
  }

  res.json(image);
});

app.get("/images/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const image = images.find((img) => img.id === id);

  if (!image) {
    return res.status(404).json({ error: "Image not found" });
  }

  res.json(image);
});

// Add a new image
app.post("/", (req, res) => {
  const { title, url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "url is required" });
  }

  const newImage = {
    id: images.length > 0 ? images[images.length - 1].id + 1 : 1,
    title: title || "Untitled Image",
    url
  };

  images.push(newImage);
  res.status(201).json(newImage);
});

app.post("/images", (req, res) => {
  const { title, url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "url is required" });
  }

  const newImage = {
    id: images.length > 0 ? images[images.length - 1].id + 1 : 1,
    title: title || "Untitled Image",
    url
  };

  images.push(newImage);
  res.status(201).json(newImage);
});

app.listen(PORT, () => {
  console.log(`Image service running on http://localhost:${PORT}`);
});
