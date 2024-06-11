'use strict';
let lat = 0;
let lng = 0;
const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
    <article class="country ${className}">
      <img class="country__img" src="${data.flags.png}" />
      <div class="country__data">
        <h3 class="country__name">${data.name.common + ' ' + data.cioc}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>🌍</span>${data.capital}</p>
        <p class="country__row"><span>👫</span>${(
          +data.population / 1000000
        ).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${data.languages?.spa}</p>
        
        <p class="country__row"><span>Latlng</span>${
          data.latlng[0] + ',' + data.latlng[1]
        }</p>
      </div>
      
    </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderWeather = function (data, className = '') {
  const html = `
   <div class="card" style="width: 18rem;">
  <div class="card-header">
    Weather
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">Description : ${data.weather[0].description}</li>
    <li class="list-group-item">Wind deg : ${data.wind.deg}</li>
    <li class="list-group-item">Wind speed : ${data.wind.speed}</li>
    <li class="list-group-item">Wind gust : ${data.wind.gust}</li>
  </ul>
</div>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const country = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      const [place] = data;
      lat = place.latlng[0];
      lng = place.latlng[1];
      // console.log(lng);
      renderCountry(place);
    });
};

country('spain');

btn.addEventListener('click', e => {
  // console.log(lat, lng);
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=834b24d18756bc0b8d31f39b332357a7`
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      renderWeather(data);
    });
});
