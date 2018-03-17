// const isDev = ['localhost', '43.251.100.34'].includes(location.hostname);

const isDev = ['localhost'].includes(location.hostname);

const HOST = isDev ? 'http://localhost:3000' : 'http://43.251.100.34:3000';

// const HOST = 'http://43.251.100.34:3000';

export { isDev, HOST }
