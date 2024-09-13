(function (app) {
  app.promotions = [];
  app.products = [];
  app.testimonials = [];
  app.comparisons = [];
  app.pricings = [];
  app.ratings = [];

  app.setCopyrightDate = function () {
    const date = new Date();

    document.getElementById('copyright-year').innerText = date.getFullYear();
  };

  app.removePlaceholderContent = function () {
    const placeholder = document.querySelectorAll('.placeholder');
    placeholder.forEach((element) => element.remove());
  };

  app.promotionContent = async function () {
    await getPageItems(app.promotions, 'promotions');
    createPromotionContent();
  };

  app.productContent = async function () {
    await getPageItems(app.products, 'products');
    createProductContent();
  };

  app.testimonialContent = async function () {
    await getPageItems(app.testimonials, 'testimonials');
    createTetimonialContent();
  };

  app.comparisonContent = async function () {
    await getPageItems(app.comparisons, 'comparisons');
    createComparisonContent();
  };

  app.pricingContent = async function () {
    await getPageItems(app.pricings, 'pricings');
    createPricingContent();
  };

  app.ratingContent = async function () {
    await getPageItems(app.ratings, 'ratings');
    createRatingContent();
  };

  app.wireEventListeners = function () {
    const chat = document.getElementById('chat-button');
    const close = document.getElementById('close-button');
    const messageForm = document.getElementById('message-form');

    chat.addEventListener('click', openForm);
    close.addEventListener('click', closeForm);
    messageForm.onsubmit = messageFormSubmit;
  };

  app.wireQuoteForm = function () {
    const quoteForm = document.getElementById('quote-form');
    quoteForm.onsubmit = quoteFormSubmit;
  };

  async function getPageItems(items, file) {
    const cacheData = sessionStorage.getItem(`${file}-data`);

    if (cacheData !== null) {
      items.length = 0;
      items.push(...JSON.parse(cacheData));
    } else {
      const rawData = await fetch(`data/${file}.json`);
      const data = await rawData.json();
      items.length = 0;
      items.push(...data);
      sessionStorage.setItem(`${file}-data`, JSON.stringify(data));
    }
  }

  async function getSingleItem(item, file) {
    const cacheData = sessionStorage.getItem(`${file}-data`);
    if (cacheData !== null) {
      Object.assign(item, JSON.parse(cacheData));
    } else {
      const rawData = await fetch(`data/${file}.json`);
      const data = await rawData.json();
      Object.assign(item, data);
      sessionStorage.setItem(`${file}-data`, JSON.stringify(data));
    }
  }

  function createPromotionContent() {
    const promotionSect = document.getElementById('promotions');
    const fragment = new DocumentFragment();

    console.log(app.promotions);

    app.promotions.forEach((element) => {
      if (element.isActive === true) {
        const div = document.createElement('div');
        div.classList.add('promo-container');
        div.classList.add('close');

        const h3 = document.createElement('h3');
        const p = document.createElement('p');

        h3.innerText = element.title;
        p.innerText = element.desc;

        div.appendChild(h3);
        div.appendChild(p);

        addPromoEventListener(h3, div);

        fragment.appendChild(div);
      }
    });

    promotionSect.append(fragment);
  }

  function createProductContent() {
    const productSect = document.getElementById('products-container');
    const fragment = new DocumentFragment();

    console.log(app.products);

    app.products.forEach((element) => {
      const parent = document.createElement('div');
      parent.classList.add('product-item');

      const img = document.createElement('img');
      img.src = element.image;
      img.alt = element.name;

      const div = document.createElement('div');
      div.classList.add('item-header');

      const pName = document.createElement('p');
      const pPrice = document.createElement('p');
      pName.innerText = element.name;
      pPrice.innerText = element.originalPrice;

      if (element.isDiscounted) {
        pPrice.innerText = element.discountedPrice;
      }

      div.appendChild(pName);
      div.appendChild(pPrice);

      parent.appendChild(img);
      parent.appendChild(div);

      fragment.appendChild(parent);
    });

    productSect.appendChild(fragment);
  }

  function createTetimonialContent() {
    const testimonialSect = document.getElementById('testimonials-container');
    const fragment = new DocumentFragment();

    console.log(app.testimonials);

    app.testimonials.forEach((element) => {
      const titleString = `${element.name}, ${element.desc}`;

      const parent = document.createElement('div');
      parent.classList.add('testimonial-item');

      const div = document.createElement('div');
      div.classList.add('profile');

      if (element.image === 'none') {
        const p = document.createElement('p');

        const splitName = element.name.split(' ');
        const initials = splitName.map((word) => word.charAt(0));
        p.innerText = initials.join('');

        div.appendChild(p);
      } else {
        const img = document.createElement('img');
        img.src = element.image;
        img.alt = titleString;

        div.appendChild(img);
      }

      const divReview = document.createElement('div');
      divReview.classList.add('review');
      const pReview = document.createElement('p');
      pReview.innerHTML = `${titleString} <br>${element.review}`;
      divReview.appendChild(pReview);

      parent.appendChild(div);
      parent.appendChild(divReview);

      fragment.appendChild(parent);
    });

    testimonialSect.appendChild(fragment);
  }

  function createComparisonContent() {
    const comparisonSect = document.getElementById('comparison');
    const fragment = new DocumentFragment();

    console.log(app.comparisons);

    const table = comparisonSect.querySelector('table');

    app.comparisons.forEach((element) => {
      const tr = document.createElement('tr');
      tr.classList.add('feature-row');

      const featTd = document.createElement('td');
      featTd.innerText = element.feature;

      const basicTd = document.createElement('td');
      const premTd = document.createElement('td');
      const basicIcon = document.createElement('i');
      const premIcon = document.createElement('i');

      basicIcon.classList.add('fa');
      basicIcon.classList.add('fa-check');
      premIcon.classList.add('fa');
      premIcon.classList.add('fa-check');

      if (element.isPremium === true) {
        basicIcon.classList.remove('fa-check');
        basicIcon.classList.add('fa-remove');
      }

      basicTd.appendChild(basicIcon);
      premTd.appendChild(premIcon);

      tr.appendChild(featTd);
      tr.appendChild(basicTd);
      tr.appendChild(premTd);

      fragment.appendChild(tr);
    });

    table.appendChild(fragment);
  }

  function createPricingContent() {
    const pricingSect = document.getElementById('pricing');

    console.log(app.pricings);

    const parent = pricingSect.querySelector('#plans-container');
    const fragment = new DocumentFragment();

    app.pricings.forEach((element) => {
      const div = document.createElement('div');
      div.classList.add('plan-item');

      if (element.isPromoted === true) {
        div.classList.add('promoted');
      }

      const ul = document.createElement('ul');

      const planLi = document.createElement('li');
      const priceLi = document.createElement('li');
      const durationLi = document.createElement('li');

      planLi.classList.add('plan');
      priceLi.classList.add('price');

      planLi.innerText = element.plan;
      priceLi.innerText = `$${element.price}`;
      durationLi.innerText = `${element.duration} months`;

      const img = document.createElement('img');
      img.src = element.image;
      img.alt = element.alt;

      if (element.extra > 0) {
        durationLi.innerText += ` +${element.extra} extra!`;
      }

      const contentFragment = new DocumentFragment();

      element.content.forEach((ele) => {
        const li = document.createElement('li');

        if (typeof ele === 'string') {
          li.innerText = ele;
        }
        if (typeof ele === 'number') {
          li.innerText = `${ele} boxes total!`;
        }
        if (typeof ele === 'boolean') {
          if (ele === true) {
            li.innerText = 'Premium Services!';
          }
          if (ele === false) {
            li.innerText = 'Basic Services';
          }
        }
        contentFragment.appendChild(li);
      });

      const buttonLi = document.createElement('li');
      buttonLi.classList.add('button');
      buttonLi.innerHTML = '<a href="">Purchase</a>';

      ul.appendChild(planLi);
      ul.appendChild(img);
      ul.appendChild(priceLi);
      ul.appendChild(durationLi);
      ul.appendChild(contentFragment);
      ul.appendChild(buttonLi);
      div.appendChild(ul);
      fragment.appendChild(div);
    });

    parent.appendChild(fragment);
  }

  async function createRatingContent() {
    const ratingSect = document.getElementById('rating');

    console.log(app.ratings);

    let totalCount = 0;
    let totalPoints = 0;
    let averageRating = 0;

    app.ratings.forEach((element) => {
      totalCount += element.count;
    });
    app.ratings.forEach((element) => {
      totalPoints += element.point * element.count;
    });
    averageRating = (totalPoints / totalCount).toFixed(2);
    console.log(totalCount);

    const starSymbols = ratingSect.querySelectorAll('.star-symbol ');

    for (let i = 0; i < starSymbols.length; i++) {
      determineStarChecked(starSymbols[i], i + 1, averageRating);
    }

    const averageTotal = ratingSect.querySelector('#average-total');
    averageTotal.innerText = `${averageRating} average based on ${totalCount} reviews`;

    const oneBar = ratingSect.querySelector('#one-rating');
    const twoBar = ratingSect.querySelector('#two-rating');
    const threeBar = ratingSect.querySelector('#three-rating');
    const fourBar = ratingSect.querySelector('#four-rating');
    const fiveBar = ratingSect.querySelector('#five-rating');

    let scaler = 0;
    scaler = 0.9 / (app.ratings[4].count / totalCount);
    scaler = scaler.toFixed(2);

    populateBarInfo(oneBar, app.ratings[0], totalCount, scaler);
    populateBarInfo(twoBar, app.ratings[1], totalCount, scaler);
    populateBarInfo(threeBar, app.ratings[2], totalCount, scaler);
    populateBarInfo(fourBar, app.ratings[3], totalCount, scaler);
    populateBarInfo(fiveBar, app.ratings[4], totalCount, scaler);
  }

  function addPromoEventListener(element, parent) {
    element.addEventListener('click', promoEventWrapper(parent));
  }

  function promoEventWrapper(parent) {
    return function (e) {
      togglePromotionOpenClose(e, parent);
    };
  }

  function togglePromotionOpenClose(e, parent) {
    parent.classList.toggle('close');
  }

  function determineStarChecked(element, star, rating) {
    if (rating >= star) {
      element.classList.add('checked');
    }
  }

  function determineBarLength(element, rating, totalCount, scaler) {
    const countPercentage = rating.count / totalCount;
    let barLength = countPercentage * 100 * scaler;
    barLength = barLength.toFixed(0);

    element.style = `width: ${barLength}%;`;
  }

  function populateBarInfo(element, ratingItem, totalCount, scaler) {
    const bar = element.querySelector('.bar');
    const count = element.querySelector('.total');

    const countPercentage = ratingItem.count / totalCount;
    let barLength = countPercentage * 100 * scaler;
    barLength = barLength.toFixed(0);
    bar.style = `width: ${barLength}%;`;

    count.innerText = ratingItem.count;
  }

  function openForm() {
    document.getElementById('message-form-container').style.display = 'block';
  }

  function closeForm() {
    document.getElementById('message-form-container').style.display = 'none';
  }

  function quoteFormSubmit(e) {
    e.preventDefault();

    const quoteForm = document.getElementById('quote-form');

    const name = quoteForm.querySelector('#name');
    const email = quoteForm.querySelector('#email');

    const message = `Simulated ${name.value}'s request of a free quote and they can be contacted at ${email.value}.`;
    toastr.info(message);

    name.value = '';
    email.value = '';
  }

  function messageFormSubmit(e) {
    e.preventDefault();

    const messageForm = document.getElementById('message-form');
    const messageText = messageForm.querySelector('#message-box');

    const message = `Simulated message of "${messageText.value}" sent.`;
    toastr.info(message);

    messageText.value = '';
  }
})((window.app = window.app || {}));
