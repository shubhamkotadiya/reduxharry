export const setCookie = (name, value, limit) => {
  let currentHost = process.env.REACT_APP_HOST;
  currentHost = currentHost.substring(14);
  const d = new Date();
  d.setTime(d.getTime() + limit * 24 * 60 * 60 * 1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie =
    name + "=" + value + ";" + expires + `;path=/;domain=${currentHost}`;
};

export const getCookie = (cname) => {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

export const clearCookie = () => {
  let currentHost = process.env.REACT_APP_HOST;
  currentHost = currentHost.substring(14);
  document.cookie.split(";").forEach((c) => {
    document.cookie = c
      .replace(/^ +/, "")
      .replace(
        /=.*/,
        "=;expires=" +
          new Date().toUTCString() +
          `;path=/;domain=${currentHost}`
      );
  });
};
