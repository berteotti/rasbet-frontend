import { useCookies } from "react-cookie";

export function setCookie(name, value, options) {
  const [, setCookie] = useCookies();
  setCookie(name, value, options);
}

export function getCookie(name) {
  const [cookies] = useCookies();
  return cookies[name];
}

// Refactoring Notes: Here, we are using the useCookies hook from the react-cookie library to manage cookies in our application.
// The setCookie function now uses the setCookie hook to set a new cookie, and the getCookie function uses the cookies state returned
// by the hook to get the value of a specific cookie.
// This eliminates the need to use the document object, making the code more portable and easier to test.