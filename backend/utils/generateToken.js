import jwt from "jsonwebtoken";

const createUserToken = (res, data) => {
  let token = jwt.sign(
    { data, exp: Math.floor(Date.now() / 1000) * (60 * 60) },
    process.env.JWT_SECRET
  );

  const expiration = new Date(new Date().getTime() + 3600000);
  res.set(
    "Set-Cookie",
    `Buser=${token};httpOnly:false;SameSite=Strict;Expires=${expiration.toUTCString()}`
  );
};

const getUserToken = (req) => {
  let cookieHeaderValue = req.headers.cookie;
  let token = null;

  if (cookieHeaderValue) {
    let cookies = cookieHeaderValue.split(";");

    for (let cookie of cookies) {
      let [cookieName, cookieValue] = cookie.trim().split("=");

      if (cookieName === "Buser") {
        token = cookieValue;
        return token;
        break;
      }
    }
  }
};

const getUserDataFromToken = (req) => {
  try {
    const token = getUserToken(req);

    if (token) {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      return decodedToken.data;
    }

    return null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};



const createAdminToken = (res, data) => {
  let token = jwt.sign(
    { data, exp: Math.floor(Date.now() / 1000) * (60 * 60) },
    process.env.JWT_SECRET
  );

  const expiration = new Date(new Date().getTime() + 3600000);
  res.set(
    "Set-Cookie",
    `Badmin=${token};httpOnly:false;SameSite=Strict;Expires=${expiration.toUTCString()}`
  );
};

const getAdminToken = (req) => {
  let cookieHeaderValue = req.headers.cookie;
  let token = null;

  if (cookieHeaderValue) {
    let cookies = cookieHeaderValue.split(";");

    for (let cookie of cookies) {
      let [cookieName, cookieValue] = cookie.trim().split("=");

      if (cookieName === "Badmin") {
        token = cookieValue;
        return token;
        break;
      }
    }
  }
};

export {
  createUserToken,
  getUserToken,
  createAdminToken,
  getAdminToken,
  getUserDataFromToken,
};
