document.getElementById("button").addEventListener("submit", async function(event){
    event.preventDefault();

    const cityName = document.getElementById("search").value;
    
    const response = await searchForTemperature(cityName);

    document.getElementById("temperature").value = String(response.data)
});

// Função para realizar a requisição e obter a temperatura de 'city'
async function searchForTemperature(city) {
    const response = await fetch.get("");
    return temperature
}