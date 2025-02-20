const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());

const storiesDir = path.join(__dirname, "stories");
const banksDir = path.join(__dirname, "banks");

// Ensure the stories directory exists
if (!fs.existsSync(storiesDir)) {
  fs.mkdirSync(storiesDir, { recursive: true });
}

// Ensure the banks directory exists
if (!fs.existsSync(banksDir)) {
  fs.mkdirSync(banksDir, { recursive: true });
}

// ✅ Enable CORS for frontend at http://localhost:3000
app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());

// ✅ Endpoint to list all stories (filenames only)
app.get("/api/stories", (req, res) => {
  fs.readdir(storiesDir, (err, files) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Unable to read stories directory" });
    }
    const jsonFiles = files.filter((file) => file.endsWith(".json"));
    res.json(jsonFiles);
  });
});

// ✅ Endpoint to fetch a specific story by filename
app.get("/api/story/:filename", (req, res) => {
  const { filename } = req.params;
  const safeFilename = path.basename(filename); // Prevent directory traversal attacks
  const filePath = path.join(storiesDir, safeFilename);

  // Ensure the requested file exists
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Story not found" });
  }

  // Read the JSON file and return its content
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error reading story file" });
    }
    res.json(JSON.parse(data)); // ✅ Ensure JSON response
  });
});

// ✅ Endpoint to save a new story to the ./stories folder
app.post("/api/saveStory", (req, res) => {
  const { storyTitle, storyContent } = req.body;

  if (!storyTitle || !storyContent) {
    return res
      .status(400)
      .json({ error: "Story title and content are required" });
  }

  const safeTitle = storyTitle.replace(/[^a-zA-Z0-9-_]/g, "_"); // Sanitize filename
  const filePath = path.join(storiesDir, `${safeTitle}.json`);

  const storyData = {
    storyTitle,
    storyContent,
    createdAt: new Date().toISOString(),
  };

  fs.writeFile(filePath, JSON.stringify(storyData, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ error: "Error saving story" });
    }
    res.json({
      message: "Story saved successfully!",
      filename: `${safeTitle}.json`,
    });
  });
});

// ✅ Endpoint to save a generated bank with a unique name
app.post("/api/saveBank", (req, res) => {
  const { bankName, bank } = req.body;

  if (!bankName || !bank) {
    return res.status(400).json({ error: "Bank name and data are required" });
  }

  const safeBankName = bankName.replace(/[^a-zA-Z0-9-_]/g, "_"); // Sanitize filename
  const filePath = path.join(banksDir, `${safeBankName}.json`);

  fs.writeFile(filePath, JSON.stringify(bank, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ error: "Error saving bank" });
    }
    res.json({
      message: "Bank saved successfully!",
      filename: `${safeBankName}.json`,
    });
  });
});

// ✅ Endpoint to get a list of all saved banks
app.get("/api/loadBank", (req, res) => {
  fs.readdir(banksDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Unable to read banks directory" });
    }
    const jsonFiles = files.filter((file) => file.endsWith(".json"));
    res.json(jsonFiles.map((file) => file.replace(".json", "")));
  });
});

// ✅ Endpoint to load a specific bank by name
app.get("/api/loadBank/:bankName", (req, res) => {
  const { bankName } = req.params;
  const safeBankName = path.basename(bankName); // Prevent directory traversal attacks
  const filePath = path.join(banksDir, `${safeBankName}.json`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "Bank not found" });
  }

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error reading bank file" });
    }
    res.json(JSON.parse(data));
  });
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
