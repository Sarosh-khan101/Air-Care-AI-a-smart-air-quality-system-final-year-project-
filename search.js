const searchInput= document.getElementById("searchInput");
const searchBtn= document.getElementById("search-btn");
const cityName= document.getElementById("city-name");
const currentAQI= document.getElementById("current-aqi");
const aqi24= document.getElementById("predicted24");
const aqi48= document.getElementById("predicted48");

searchBtn.addEventListener("click", async ()=>{
  const city= searchInput.value.trim();

  if(city === ""){
    alert("Please enter a city name!");
    return;
  }

  cityName.innerText =city;

  getAQIData(city);
 
});

async function getAQIData(city){
  try {
    const response = await fetch(`http://localhost:5000/api/aqi/`+ city);
    const data = await response.json();

    if (data.aqi) {

      const currAQI=data.aqi;
      localStorage.setItem('currentAQI',currAQI);
   console.log("Stored in local storage:",currAQI);

      currentAQI.textContent = `Current AQI: ${data.aqi}`;
      // Simple fake prediction (since API doesn’t provide 24/48h)
      aqi24.textContent = `24-Hour Prediction: ${data.aqi + 10}`;
      aqi48.textContent = `48-Hour Prediction: ${data.aqi + 20}`;
    } else {
      currentAQI.textContent = "City not found or no data available.";
      aqi24.textContent = "";
      aqi48.textContent = "";
    }
  } catch (error) {
    currentAQI.textContent = "Error fetching AQI data.";
    console.error(error);
  }
}


// Initialize map over India
const map = L.map("map").setView([20.5937, 78.9629], 5);

// Add OpenStreetMap layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18,
  minZoom: 3,
  attribution: '© OpenStreetMap contributors',
}).addTo(map);

