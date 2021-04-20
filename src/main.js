import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import WeatherService from './weather-service.js'

function clearFields() {
  $('#city').val("");
  $('#state').val("");
  $('#country').val("");
  $('.showErrors').text("");
  $('.showHumidity').text("");
  $('.showTemp').text("");
  $('.showPress').text("");
}

function showFieldsForCity(city, body, fehrenheit, pressure) {
  $('.showHumidity').text(`The humidity in ${city} is ${body.main.humidity}%`);
  $('.showTemp').text(`The temperature in Fahrenheit is ${fahrenheit} degrees.`);
  $('.showPress').text(`The pressure is ${pressure} hPa.`);
}



$('#weatherLocation').on("click", () => {
  let city = $('#city').val();
  const state = $('#state').val();
  const country = $('#country').val();
  clearFields();
  
  let promise = WeatherService.getWeather(city, state, country);
  promise.then(function(response) {
    const body = JSON.parse(response);
    const kelvin = body.main.temp;
    const fahrenheit = Math.floor(((kelvin - 273) * 9/5) + 32);
    const pressure = body.main.pressure;
    showFieldsForCity(city, body, fahrenheit, pressure);
  }, function(error) {
    $('.showErrors').text(`There was an error processing your request: ${error}`);

  });
});



