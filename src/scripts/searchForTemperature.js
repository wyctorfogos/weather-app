document.getElementById("button").addEventListener("click", async function(event) {
    event.preventDefault(); // Evita o reload da página ao clicar no botão

    const cityName = document.getElementById("search").value;
    
    // Obtém a temperatura da cidade informada
    const temperature = await searchForTemperature(cityName);

    // Exibe a temperatura no textarea
    document.getElementById("temperature").value = temperature ? `Temperature in ${cityName}: ${temperature}°C` : "City not found.";
});

// Função para buscar a latitude e longitude e, em seguida, obter a temperatura
async function searchForTemperature(city) {
    try {
        // Primeiro, vamos buscar a latitude e longitude da cidade usando a API do Open-Meteo
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}`;
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            throw new Error("City not found");
        }

        const { latitude, longitude } = geoData.results[0];

        // Com latitude e longitude, podemos buscar a previsão do tempo
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        return weatherData.current_weather.temperature; // Retorna a temperatura em °C
    } catch (error) {
        console.error("Error fetching temperature:", error);
        return null; // Retorna null em caso de erro
    }
}
