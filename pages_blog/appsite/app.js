(function (app) {
  app.essayItems = [];
  app.selectedItem = {};

  app.index = function () {
    setCopyrightDate();
    contactFormWireup();
  };

  app.overview = async function () {
    setCopyrightDate();
    await loadEssayItems();
    loadOverviewPageData();
    loadNavDropdownMenu();
  };

  app.essays = async function () {
    setCopyrightDate();
    await loadEssayItems();
    loadSelectedItem();
    updateEssayPage();
    loadNavDropdownMenu();
  };

  function setCopyrightDate() {
    const date = new Date();

    document.getElementById('copyright-year').innerText = date.getFullYear();
  }

  function contactFormWireup() {
    const contactForm = document.getElementById('contact-form');
    contactForm.onsubmit = contactFormSubmit;
  }

  function contactFormSubmit(e) {
    e.preventDefault();
    const contactForm = document.getElementById('contact-form');

    const name = contactForm.querySelector('#name');
    const email = contactForm.querySelector('#email');
    const message = contactForm.querySelector('#message');

    const mailTo = `mailto:${email.value}?subject=Contact From ${name.value}&body=${message.value}`;

    window.open(mailTo);

    name.value = '';
    email.value = '';
    message.value = '';
  }

  async function loadEssayItems() {
    const cacheData = sessionStorage.getItem('site-data');

    if (cacheData !== null) {
      app.essayItems = JSON.parse(cacheData);
    } else {
      const rawData = await fetch('data/sitedata.json');
      const data = await rawData.json();
      app.essayItems = data;
      sessionStorage.setItem('site-data', JSON.stringify(data));
    }
  }

  function loadSelectedItem() {
    const params = new URLSearchParams(window.location.search);
    let item = Number.parseInt(params.get('item'));

    if (item > app.essayItems.length || item < 1) {
      item = 1;
    }

    app.selectedItem = app.essayItems[item - 1];
    app.selectedItem.id = item;
  }

  function updateEssayPage() {
    const essayMain = document.getElementById('essay-main');
    const essayHeader = document.getElementById('essay-header');
    const essayImage = document.getElementById('essay-image');

    essayHeader.innerText = `0${app.selectedItem.id}. ${app.selectedItem.title}`;

    essayImage.src = app.selectedItem.imageBanner;
    essayImage.alt = app.selectedItem.imageAlt;

    getEssayContent(
      essayMain,
      app.selectedItem.textFile,
      app.selectedItem.listItems
    );

    const placeHolder = document.querySelectorAll('.placeholder-text');
    placeHolder.forEach((item) => item.remove());
  }

  function getEssayContent(mainEle, fileName, listItems) {
    fetch(`data/${fileName}`)
      .then((response) => {
        if (!response.ok) {
          return Promise.reject('Network response was not ok');
        }

        return response.text();
      })
      .then((text) => {
        const lines = text.split('\n').map((line) => line.replace('\r', ''));
        appendEssayText(mainEle, lines);
      })
      .then(() => {
        if (listItems === null || listItems.length === 0) {
          return Promise.reject('Cannot retreive technologies list');
        }

        appendTechList(mainEle, listItems);
      })
      .catch((reason) => {
        console.error('There was a problem with getting the content:', reason);
      });
  }

  function appendEssayText(mainEle, lines) {
    const fragment = new DocumentFragment();

    for (let i = 0; i < lines.length; i += 2) {
      const headerText = lines[i];
      const paragraphText = lines[i + 1];

      const div = createNewEssayTextDiv();

      const header = document.createElement('h3');
      header.innerText = headerText;

      const paragraph = document.createElement('p');
      paragraph.innerText = paragraphText;

      div.appendChild(header);
      div.appendChild(paragraph);

      fragment.appendChild(div);
    }

    mainEle.appendChild(fragment);
  }

  function appendTechList(mainEle, items) {
    const fragment = new DocumentFragment();

    const div = createNewEssayTextDiv();
    const h3 = document.createElement('h3');
    const ul = document.createElement('ul');

    h3.innerText = app.selectedItem.listTitle;

    div.appendChild(h3);
    div.appendChild(ul);

    items.forEach((item) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = item;
      a.innerText = item;
      li.appendChild(a);
      ul.appendChild(li);
    });

    fragment.appendChild(div);
    mainEle.appendChild(fragment);
  }

  function createNewEssayTextDiv() {
    const div = document.createElement('div');
    div.classList.add('essay-text');

    return div;
  }

  function loadOverviewPageData() {
    const main = document.getElementById('overview-main');

    const originalItems = document.querySelectorAll('.highlight');
    const newItems = [];

    const fragment = new DocumentFragment();

    for (let i = 0; i < app.essayItems.length; i++) {
      const item = app.essayItems[i];

      const highlight = document.createElement('div');
      highlight.classList.add('highlight');

      if (i % 2 > 0) {
        highlight.classList.add('invert');
      }

      const textDiv = document.createElement('div');
      const header = document.createElement('h2');
      const anchor = document.createElement('a');
      const image = document.createElement('img');

      const titleWords = item.title.split(' ');
      let title = `0${i + 1}. `;

      for (let j = 0; j < titleWords.length - 1; j++) {
        title += titleWords[j];
        title += '<br />';
      }

      title += titleWords[titleWords.length - 1];

      header.innerHTML = title;
      anchor.href = `blog_essays.html?item=${i + 1}`;
      anchor.innerText = 'read more';

      image.src = item.imageCard;
      image.alt = item.imageAlt;

      textDiv.appendChild(header);
      textDiv.appendChild(anchor);

      highlight.appendChild(image);
      highlight.appendChild(textDiv);

      newItems.push(highlight);
    }

    originalItems.forEach((item) => {
      item.remove();
    });

    newItems.forEach((item) => {
      fragment.appendChild(item);
    });

    main.appendChild(fragment);
  }

  function loadNavDropdownMenu() {
    const placeholderNav = document.querySelector('.dropdown-content');
    const dropdown = document.querySelector('.dropdown');

    const div = document.createElement('div');
    div.classList.add('dropdown-content');

    for (let i = 0; i < app.essayItems.length; i++) {
      const a = document.createElement('a');
      a.href = `blog_essays.html?item=${i + 1}`;
      a.innerText = `0${i + 1}. ${app.essayItems[i].title}`;

      div.appendChild(a);
    }

    placeholderNav.remove();
    dropdown.appendChild(div);
  }

  function loadNavMenuOriginal() {
    const originalNav = document.querySelectorAll('.essay-nav');
    const dropdown = document.querySelector('nav ul');

    const fragment = new DocumentFragment();

    for (let i = 0; i < app.essayItems.length; i++) {
      const li = document.createElement('li');
      const a = document.createElement('a');

      li.classList.add('essay-nav');
      a.href = `blog_essays.html?item=${i + 1}`;
      a.innerText = `Featured #${i + 1}`;

      li.appendChild(a);
      fragment.appendChild(li);
    }

    originalNav.forEach((item) => item.remove());
    nav.appendChild(fragment);
  }
})((window.app = window.app || {}));
