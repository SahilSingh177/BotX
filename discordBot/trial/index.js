
fetch("http://api.weatherapi.com/v1/current.json?key=d1dabbfeb7ee44de865195900220211&q=London")
  .then((response) => response.json())
  .then((data) => console.log(data));