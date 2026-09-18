const statusLine = document.getElementById("status-line");
const container = document.getElementById("courses");

// Relative path on purpose: in Kubernetes (Part 4) nginx will proxy
// /api/* to the backend Service, so the same frontend code works
// unchanged in both local dev and production.
fetch("/api/courses")
  .then((res) => {
    if (!res.ok) {
      throw new Error(`Backend responded with ${res.status}`);
    }
    return res.json();
  })
  .then((courses) => {
    statusLine.textContent = `عدد الشهادات: ${courses.length}`;
    courses.forEach((course) => {
      const card = document.createElement("div");
      card.className = "card";
      card.style.setProperty("--card-color", course.color);
      card.innerHTML = `
        <span class="dot" style="background:${course.color}"></span>
        <h3>${course.name}</h3>
        <p>${course.vendor}</p>
      `;
      container.appendChild(card);
    });
  })
  .catch((err) => {
    statusLine.textContent = "تعذر تحميل البيانات من الـbackend";
    console.error(err);
  });
