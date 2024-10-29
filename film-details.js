async function loadFilmData(arrSrc) {
  return Promise.all(arrSrc.map(src => fetch(src).then(res => res.json())));
}

export async function render(data, handleNavigation) {
  console.log('Функция для детальной информации!');
  const posters = [
    'https://leonardo.osnova.io/f55707ee-117b-d67f-b598-74989547b878/-/preview/592x/-/format/webp',
    'https://leonardo.osnova.io/5083616d-733a-bd9b-930c-804a86da456a/-/preview/592x/-/format/webp',
    'https://leonardo.osnova.io/f0c4bc8f-29d9-d6b1-52d7-0eb47b0a6550/-/preview/592x/-/format/webp',
    'https://leonardo.osnova.io/7c79ccca-c9d0-707f-4098-c94920740679/-/preview/592x/-/format/webp',
    'https://leonardo.osnova.io/35d08419-c50f-f4aa-4914-b37f4dee6ea6/-/preview/592x/-/format/webp',
    'https://leonardo.osnova.io/81cd98dd-0ab1-55a1-21bb-0f68883fe77a/-/preview/592x/-/format/webp',
  ];

  const container = document.createElement('div');
  container.classList.add('container', 'd-flex');

  const link = document.createElement('a');
  const img = document.createElement('img');
  const inform = document.createElement('div');
  const title = document.createElement('h1');
  const description = document.createElement('p');
  const titlePlanets = document.createElement('h2');
  const planets = document.createElement('p');
  const titleSpecies = document.createElement('h2');
  const species = document.createElement('p');

  const planetsData = await loadFilmData(data.planets);
  const speciesData = await loadFilmData(data.species);
  console.log(planetsData);
  console.log(speciesData);

  link.textContent = 'List of movies'
  link.href = 'index.html';
  img.src = posters[data.episode_id - 1];
  img.alt = data.title;
  title.textContent = data.title;
  description.textContent = data.opening_crawl;
  titlePlanets.textContent = 'Planets';
  planets.textContent = planetsData.map(element => element.name).join(', ');
  titleSpecies.textContent = 'Species';
  species.textContent = speciesData.map(element => element.name).join(', ');

  link.addEventListener('click', (event) => {
    event.preventDefault();
    history.pushState(null, '', link.href);
    handleNavigation();
  })

  inform.append(title, description, titlePlanets, planets, titleSpecies, species, link);
  container.append(img, inform);

  return container;
}
