import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    // event.preventDefault();
    const city = $('#city').val();
    $('#city').val("");
    const state = $('#state').val();
    $('#state').val("");
    const country = $('#country').val();
    $('#country').val("");


    let request = new XMLHttpRequest();
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&appid=${process.env.API_KEY}`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        const kelvin = response.main.temp;
        const fahrenheit = Math.floor(((kelvin - 273) * 9/5) + 32);
        const pressure = response.main.pressure;
        getElements(response, fahrenheit, pressure);
      }
    };

    request.open("GET", url, true);
    request.send();

    function getElements(response, fahrenheit, pressure) {

      $('.showHumidity').text(`The humidity in ${city} is ${response.main.humidity}%`);
      $('.showTemp').text(`The temperature in Fahrenheit is ${fahrenheit} degrees.`);
      $('.showPress').text(`The pressure is ${pressure} hPa.`);
    }
  });
});


