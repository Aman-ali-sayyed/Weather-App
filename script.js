async function getWeather() {
    const apiKey = '07f55a166a82130e15b26a6cd347f2bf';
    const cityInput = document.getElementById('cityInput');
    const cityName = cityInput.value;

    // Check if the input is not empty
    if (cityName.trim() === '') {
        alert('Please enter a city name.');
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }

        const data = await response.json();

        // Display weather information
        const cityElement = document.getElementById('cityName');
        const temperatureElement = document.getElementById('temperature');
        const weatherDescriptionElement = document.getElementById('weatherDescription');
        const humidityElement = document.getElementById('humidity');
        const windSpeedElement = document.getElementById('windSpeed');
        const weatherIconElement = document.getElementById('weatherIcon');

        cityElement.textContent = `${data.name}, ${data.sys.country}`;
        temperatureElement.textContent = `Temperature: ${data.main.temp}°C`;
        weatherDescriptionElement.textContent = `Weather: ${data.weather[0].description}`;
        humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
        windSpeedElement.textContent = `Wind Speed: ${data.wind.speed} m/s`;

        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
        weatherIconElement.src = iconUrl;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please try again.');
    }
}
