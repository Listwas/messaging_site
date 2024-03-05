const API_URL = "http://192.168.1.50:32257/v1/user/login";

async function hashPasswordSync(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashedPassword = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return hashedPassword;
}

async function fetchLoginData(data) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(API_URL, requestOptions);
    const responseData = await response.json();
    const sessionKey = responseData.sessionKey;

    // Store session key in local storage
    localStorage.setItem("sessionKey", sessionKey);
    console.log("Response:", responseData);
  } catch (error) {
    console.error("Error:", error);
  }
}

// getting user data
function loginData() {
  const raw_passwd = document.getElementById("passwd").value;
  const username = document.getElementById("login").value;

  async function processLoginData() {
    const password = raw_passwd;
    const hashedPassword = await hashPasswordSync(password);
    console.log("Hashed Password:", hashedPassword);

    const data = {
      username: username,
      passwd: hashedPassword,
    };

    // Fetch and process login data
    await fetchLoginData(data);
  }

  processLoginData();
}
