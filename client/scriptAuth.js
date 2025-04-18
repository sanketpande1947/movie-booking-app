let isLogin = true;

const form = document.getElementById("auth-form");
const formTitle = document.getElementById("form-title");
const submitBtn = document.getElementById("submit-btn");
const toggleLink = document.getElementById("toggle-link");
const toggleText = document.getElementById("toggle-text");
const errorMsg = document.getElementById("error-msg");

toggleLink.addEventListener("click", () => {
  isLogin = !isLogin;
  formTitle.textContent = isLogin ? "Login" : "Signup";
  submitBtn.textContent = isLogin ? "Login" : "Signup";
  toggleText.innerHTML = isLogin
    ? `Don't have an account? <a href="#" id="toggle-link">Signup</a>`
    : `Already have an account? <a href="#" id="toggle-link">Login</a>`;
  errorMsg.textContent = "";
  document.getElementById("toggle-link").addEventListener("click", toggleLink.click);
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await response.json();

  if (response.ok) {
    localStorage.setItem("token", data.token);
    window.location.href = "index.html";
  } else {
    errorMsg.textContent = data.message || "Something went wrong!";
  }
});
