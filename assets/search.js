require('select2');

const largeOffers = document.getElementsByClassName('largeOffer');
const smallOffers = document.getElementsByClassName('smallOffer');
const closeOffer = document.getElementsByClassName('closeOffer');
const applyButtons = document.querySelectorAll('[data-apply]');
const addFavorite = document.querySelectorAll('[data-favorite]');
const $ = require('jquery');

document.addEventListener('DOMContentLoaded', () => {
    $('.select-multiple').select2();
});

function addToFavorite(event) {
    event.preventDefault();
    const favoriteLink = event.currentTarget;
    const link = favoriteLink.href;
    fetch(link)
        .then((res) => res.json())
        .then((res) => {
            if (res.isInFavorite) {
                // Ajout d'un message au clic si possible
                favoriteLink.innerHTML = 'Enlever des favoris';
            } else {
                favoriteLink.innerHTML = 'Enregistrer';
            }
        });
}

function jobApply(event) {
    event.preventDefault();
    const applyLink = event.currentTarget;
    const link = applyLink.href;
    fetch(link)
        .then((res) => res.json())
        .then((res) => {
            if (res.isApplied) {
                // Ajout d'un message au clic si possible
                alert('Vous avez déjà postulé');
            } else {
                applyLink.classList.add('applied');
                applyLink.innerHTML = 'Postulé';
            }
        });
}
applyButtons.forEach((element) => element.addEventListener('click', jobApply));

function load1stContent(array, array2) {
    array[0].classList.add('show');
    array2[0].classList.add('active');
}
if (window.matchMedia('(min-width: 992px)').matches) {
    load1stContent(largeOffers, smallOffers);
}
// eslint-disable-next-line no-restricted-syntax
for (const element of smallOffers) {
    element.addEventListener('click', (event) => {
        const selectedId = (event.target.id).substring(10);
        // eslint-disable-next-line no-restricted-syntax
        for (const clicked of smallOffers) {
            clicked.classList.remove('active');
        }
        element.classList.add('active');
        // eslint-disable-next-line no-restricted-syntax
        for (const offer of largeOffers) {
            if (window.matchMedia('(min-width: 992px)').matches) {
                offer.classList.remove('show');
            }
            const divId = offer.id.substring(10);
            if (divId === selectedId) {
                offer.classList.add('show');
            }
            if (window.matchMedia('(max-width: 992px)').matches) {
                // eslint-disable-next-line no-restricted-syntax
                for (const close of closeOffer) {
                    close.addEventListener('click', () => {
                        offer.classList.remove('show');
                    });
                }
            }
        }
    });
}

addFavorite
    .forEach((a) => a.addEventListener('click', addToFavorite));
