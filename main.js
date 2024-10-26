const cssPromise = {};

function loadResource(src) {
  if (src.endsWith('.js')) {
    return import(src);
  }

  if (src.endsWith('.css'))
  {
    if (!cssPromise[src]) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = src;
      cssPromise[src] = new Promise(resolve => {
        link.addEventListener('load', () => resolve());
      });
      document.head.append(link);
    }
    return cssPromise[src];
  }

  return fetch(src).then(res => res.json());
}

const appContainer = document.getElementById('app');
const searchParams = new URLSearchParams(location.search);
const filmId = searchParams.get('filmId');

function renderPage(moduleName, apiUrl, css) {
  Promise.all([moduleName, apiUrl, css].map(src => loadResource(src)))
  .then(([pageModule, data]) => {
    appContainer.innerHTML = '';
    appContainer.append(pageModule.render(data));
  });
}

if (filmId) {
  renderPage(
    'film-list',
    'https://swapi.dev/api/films/',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css'
  );
} else {
  renderPage(
    'film-details',
    `https://swapi.dev/api/films/${filmId}`,
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css'
  );
}


