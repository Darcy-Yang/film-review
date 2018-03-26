function setItem (key, value) {
  localStorage.setItem(key, value);
}

function getItem (key) {
  return localStorage.getItem(key);
}

export function setUser (user) {
  setItem('FILM_USER', JSON.stringify(user));
}

export function getUser () {
  return JSON.parse(getItem('FILM_USER'));
}
