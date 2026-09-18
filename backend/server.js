const express = require("express");
const path = require("path");
const courses = require("./data/courses");

const app = express();

// Liveness/readiness for Kubernetes probes later (Part 4).
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// The data the frontend renders.
app.get("/api/courses", (req, res) => {
  res.json(courses);
});

// Local-dev only: let Express also serve the frontend files, so the
// relative fetch('/api/courses') in the frontend works on localhost too.
// In production (Part 4) nginx will do this job instead of Express.
app.use(express.static(path.join(__dirname, "..", "frontend")));

// Only start listening when this file is run directly (`node server.js`).
// When a test file does require('./server'), it just gets the app object
// without a port already bound, so tests can start/stop their own server.
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Backend listening on http://localhost:${PORT}`);
  });
}

module.exports = app;
