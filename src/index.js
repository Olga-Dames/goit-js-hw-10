import './css/styles.css';
import fetchCoutries from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(e) {
  e.preventDefault();

  const inputValue = e.target.value.trim();

  if (inputValue === '') {
    clearData();
    return;
  }

  fetchCoutries(inputValue)
  .then(createCoutriesList)
  // .catch(onErrorNotify);   
}


function createCoutriesList (country) {
const countryLength = country.length; 
if(countryLength > 10) {
  return Notiflix.Notify.info('Too many matches found. Please enter a more specific name');
} 
if (countryLength > 1 && countryLength <= 10) {
  return arrayOfCountries(country)
}
// if (countryLength === 1) {
//   return countryCard(country)
// }
}

// function onErrorNotify(error) {
//   return Notiflix.Notify.failure('Oops, there is no country with that name');
// }

function arrayOfCountries(country){
  const countriesArray = country.map(
    ({flags, name}) =>
    `<li class="country__descr">
    <img class="country__icon" src="${flags.svg}" alt="${name.official}" width="60">
    <p class="country__name">${name.official}</p></li>`)
  .join('')
  refs.countryList.innerHTML = countriesArray;
}

// function countryCard(){
//   countryInfo.innerHTML = '';
// }
function clearData() {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';
}
