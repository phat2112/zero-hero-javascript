/* select element */
const header = document.querySelector('.header');

// select a nodeList
const allNav = document.querySelectorAll('.nav__link');
console.log(`allNav`, allNav);

// select a Html collection => live collection
const allButton = document.getElementsByTagName('button');
console.log(`allButton`, allButton);

// select a Html collection => live collection
const allClassNav = document.getElementsByClassName('nav__link');
console.log(`allClassNav`, allClassNav);

/* create element */

const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// prepend and append is add element into existed element but not simultaneous it will execute only one at the same time
// add first
// header.prepend(message);
// add last
// header.append(message);

// way to use prepend and append at the same time
// header.prepend(message);
// header.append(message.cloneNode(true));

// remove element

// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     message.remove();
//     message.parentElement.removeChild(message);
//   });

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  // old way
  // const s1coords = section1.getBoundingClientRect();

  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   behavior: 'smooth',
  // });

  // new way
  section1.scrollIntoView({ behavior: 'smooth' });
});

// event delegation
// 1. add event listener to common parent element
// 2/ determine what element originated the event

// example handle event navigation for each class nav__link

//first step find the parent
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// DOM traversing is select element base on another element
const h1 = document.querySelector('h1');

// children
console.log(document.querySelectorAll('.highlight'));
console.log(h1.firstElementChild);
console.log(h1.lastElementChild);
console.log(h1.closest('header'));
console.log(h1.childNodes);
console.log(h1.children);

// parent

console.log(h1.parentNode);
console.log(h1.parentElement);

// my way to create a tab component
// const tabContainer = document.querySelector('.operations__tab-container');

// function handleRemoveActiveClass() {
//   [...tabContainer.parentElement.children].forEach(item => {
//     if (item.classList.contains('operations__tab-container')) {
//       [...item.children].forEach(ele => {
//         ele.classList.remove('operations__tab--active');
//       });
//     }
//     item.classList.remove('operations__content--active');
//   });
// }

// tabContainer.addEventListener('click', function (e) {
//   const index = e.target.dataset.tab;
//   if (!index) return;
//   handleRemoveActiveClass();
//   document
//     .querySelector(`.operations__tab--${index}`)
//     .classList.add('operations__tab--active');

//   document
//     .querySelector(`.operations__content--${index}`)
//     .classList.add('operations__content--active');
// });

// course way to create a tab component
const tabContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', function (e) {
  // button that occur event onClick
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;

  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// nav fade animation
const nav = document.querySelector('.nav');

function handleStyleOpacity(e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;

    const img = link.closest('.nav').querySelector('img');
    const navLinks = link.closest('.nav').querySelectorAll('.nav__link');
    navLinks.forEach(ele => {
      if (ele !== link) ele.style.opacity = opacity;
    });
    img.style.opacity = opacity;
  }
}

nav.addEventListener('mouseover', function (e) {
  handleStyleOpacity(e, 0.5);
});

nav.addEventListener('mouseout', function (e) {
  handleStyleOpacity(e, 1);
});

// Sticky navigation
// window.addEventListener('scroll', function (e) {
//   const section1 = document.querySelector('#section--1');
//   const initialCoords = section1.getBoundingClientRect();

//   const nav = document.querySelector('.nav');

//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

const headerEle = document.querySelector('.header');
const navEle = document.querySelector('.nav').getBoundingClientRect().height;

function stickyNav(entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}
const headerEleObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navEle}px`,
});

headerEleObserver.observe(headerEle);

// reveal section when scroll
const allSections = document.querySelectorAll('.section');

function revealSection(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// lazy load image
const imageTargets = document.querySelectorAll('img[data-src');

function loadImg(entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  // improve performance when the network is slow the image is still blur until it finish loading
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imageTargets.forEach(imageTarget => {
  imgObserver.observe(imageTarget);
});

// slider
const slider = () => {
  const slides = document.querySelectorAll('.slide');

  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let currentSlide = 0;
  let maxSlide = slides.length;

  const goToSlide = slideIndex => {
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${(index - slideIndex) * 100}%)`;
    });
  };

  const createDots = () => {
    slides.forEach((_, index) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${index}"></button>`
      );
    });
  };

  const activeSlide = slide => {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const init = () => {
    createDots();
    goToSlide(0);
    activeSlide(0);
  };

  init();

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      activeSlide(slide);
      goToSlide(slide);
    }
  });

  const nextSlide = () => {
    if (currentSlide === maxSlide - 1) {
      currentSlide = -1;
    }

    currentSlide++;
    goToSlide(currentSlide);
    activeSlide(currentSlide);
  };

  const prevSlide = () => {
    if (currentSlide === 0) {
      currentSlide = maxSlide;
    }

    currentSlide--;
    goToSlide(currentSlide);
    activeSlide(currentSlide);
  };

  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);
};

slider();

// defer and async in script tag
// defer is fire when HTML is completely parsed
// async is not waiting all the script file completely executed
// so best solution is using defer and async is using for 3rd party lib
//  defer and async is not supporting old browser
