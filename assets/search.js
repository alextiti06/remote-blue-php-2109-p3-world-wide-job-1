const largeOffers = document.getElementsByClassName('largeOffer');
const smallOffers = document.getElementsByClassName('smallOffer');
const closeOffer = document.getElementsByClassName('closeOffer');
const lastUrlSegment = window.location.href.split('/').pop();
const applyButton = document.getElementById('apply');

function jobApply(event) {
    event.preventDefault();
    const applyLink = event.currentTarget;
    const link = applyLink.href;
    fetch(link)
        .then((res) => res.json())
        .then((res) => {
            if (res.isApplied) {
                applyButton.classList.add('applied');
            }
        });
}
applyButton.addEventListener('click', jobApply);

function load1stContent(array, array2) {
    array[0].classList.add('show');
    array2[0].classList.add('active');
}
if (window.matchMedia('(min-width: 992px)').matches && (lastUrlSegment === 'offres')) {
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
