const test = require("node:test");
const assert = require("node:assert");
const http = require("node:http");
const app = require("../server");

// Small helper: start the app on a random free port, hit a path, return
// the response, then let the caller close the server.
function get(server, urlPath) {
  return new Promise((resolve, reject) => {
    http
      .get(`http://127.0.0.1:${server.address().port}${urlPath}`, (res) => {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          resolve({ status: res.statusCode, body: JSON.parse(body) });
        });
      })
      .on("error", reject);
  });
}

test("GET /api/health returns 200 and status ok", async () => {
  const server = app.listen(0);
  try {
    const res = await get(server, "/api/health");
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.status, "ok");
  } finally {
    server.close();
  }
});

test("GET /api/courses returns a non-empty JSON list", async () => {
  const server = app.listen(0);
  try {
    const res = await get(server, "/api/courses");
    assert.strictEqual(res.status, 200);
    assert.ok(Array.isArray(res.body));
    assert.ok(res.body.length > 0);
    assert.ok(res.body[0].name);
  } finally {
    server.close();
  }
});
