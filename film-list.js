export function render(data, handleNavigation) {
  const posters = [
    'https://leonardo.osnova.io/7c79ccca-c9d0-707f-4098-c94920740679/-/preview/592x/-/format/webp',
    'https://leonardo.osnova.io/35d08419-c50f-f4aa-4914-b37f4dee6ea6/-/preview/592x/-/format/webp',
    'https://leonardo.osnova.io/81cd98dd-0ab1-55a1-21bb-0f68883fe77a/-/preview/592x/-/format/webp',
    'https://leonardo.osnova.io/f55707ee-117b-d67f-b598-74989547b878/-/preview/592x/-/format/webp',
    'https://leonardo.osnova.io/5083616d-733a-bd9b-930c-804a86da456a/-/preview/592x/-/format/webp',
    'https://leonardo.osnova.io/f0c4bc8f-29d9-d6b1-52d7-0eb47b0a6550/-/preview/592x/-/format/webp',
  ];

  const container = document.createElement('div');
  container.classList.add('container', 'd-flex');
  container.style = 'height: 100vh; align-items: center';
  const wrapper = document.createElement('div');
  wrapper.style = 'display: flex; align-items: stretch; gap: 20px;';

  data.results.forEach((element, index) => {
    const link = document.createElement('a');
    const img = document.createElement('img');
    const cardBody = document.createElement('div');
    const title = document.createElement('h5');

    link.classList.add('card');
    img.classList.add('card-img-top');
    cardBody.classList.add('card-body');
    title.classList.add('card-title');

    link.href = `?filmId=${index + 1}`;
    img.src = posters[index];
    img.alt = element.title;
    title.textContent = `Episode ${element.episode_id}. ${element.title}`;

    link.addEventListener('click', (event) => {
      event.preventDefault();
      history.pushState(null, '', link.href);
      handleNavigation();
    })

    cardBody.append(title);
    link.append(img, cardBody);
    wrapper.append(link);
  });

  container.append(wrapper);
  return container;
}
