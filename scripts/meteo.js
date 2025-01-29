/**
 * @function fetchWeatherData ; charge les données méteo en utilisant API openWeathermap, et garantis la mis à jour des données sur la page web
 * @param void
 * @return void
 * @throws errors 
 */
function fetchWeatherData(){

    fetch(`config/config.json?timestamp=${new Date().getTime()}`)
    .then(response =>response.json())
    .then(data =>{
        const city = data.city;
        // intéroger l'API et récupérer les données météo lié à la ville 
        const apiKey = '486a0c72206cdf4d9738cfa3d084934b';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        fetch(url)
        .then(response=>response.json())
        .then(weatherData =>{
            // Mis à jours des données
            document.getElementById('cityname').textContent = `${city}`;
            document.getElementById('currenttemp').textContent = `${convertCelsius(weatherData.main.temp)}°C`;
            document.getElementById('humidity').textContent = `${weatherData.main.humidity}%`;
            document.getElementById('description').textContent=`${weatherData.weather[0].description}`;
            
            const icone = weatherData.weather[0].icon;
            document.getElementById('nullicon').src=`https://openweathermap.org/img/wn/${icone}.png`;

        })
        .catch(error=>console.error("erreur lors de la recuperation des données météo", error));
    })
    .catch(error=>console.error("erreur lors du chargement du fichier config.json", error));
}

/**
 * Fonction pour convertir la température en degré °C
 * @param : tempKelvin : température récuperer en Kelvin par defaut
 * @return :tempCelsius : température convertis en celsius
 */
function convertCelsius(tempKelvin){
    const tempCelsius =  (tempKelvin - 273.15).toFixed(1);
    return tempCelsius;
}

fetchWeatherData(); 

setInterval(fetchWeatherData,3600000);
    
