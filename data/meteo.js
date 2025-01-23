// récupération de l'information (la ville) présente dans config.json
fetch('config/config.json')
    .then(response =>response.json())
    .then(data =>{
        const city = data.city;
        // intéroger l'API et récupérer les données météo lié à la ville 
        const apiKey = '486a0c72206cdf4d9738cfa3d084934b';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        fetch(url)
        .then(response=>response.json())
        .then(weatherData =>{
            console.log(weatherData);
            console.log(weatherData.main.temp);
        })
        .catch(error=>console.error("erreur lors de la recuperation des données météo", error));
    })
    .catch(error=>console.error("erreur lors du chargement du fichier config.json", error));
