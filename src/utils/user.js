function setItem (key, value) {
  localStorage.setItem(key, value);
}

function getItem (key) {
  return localStorage.getItem(key);
}

export function setUser (user) {
  setItem('FILM_USER', JSON.stringify(user));
  setItem('FILM_TOKEN', user.user.token);
}

export function getUser () {
  return JSON.parse(getItem('FILM_USER'));
}

export function getToken () {
  return getItem('FILM_TOKEN');
}
