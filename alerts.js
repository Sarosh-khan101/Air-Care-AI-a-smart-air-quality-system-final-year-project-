let children =document.getElementById("children-alert");
let adult =document.getElementById("adult-alert");
let elderly =document.getElementById("Elderly-alert");
let disease =document.getElementById("disease-alert");
let ent =document.getElementById("ent-alert");
let respiratory =document.getElementById("respiratory-alert");
let headache =document.getElementById("headache-alert");
let showAQI=(localStorage.getItem("currentAQI"));
let cAQI=document.getElementById("aqiValue");

cAQI.innerText=`CURRENT AQI: ${showAQI}`;

if(!showAQI){
    alertBox.textContent= "NO! AQI data found. Please search for a city first."
}


    if(showAQI<=50){
    children.textContent="Air quality is good. Outdoor play is safe.";
    adult.textContent="Enjoy outdoor activities freely.";
    elderly.textContent="No health concerns.";
    disease.textContent="Safe to go outside.";
    ent.textContent="Safe to outside. Enjoy outdoor activities.";
    respiratory.textContent="Feel free to do outdoor activities.";
    headache.textContent="No health concerns";

} else if(showAQI>50 && showAQI<=100){
    children.textContent="Limit prolong outdoor activities.";
    adult.textContent="Acceptable, but avoid heavy outdoor exercise.";
    elderly.textContent="Slight discomfort possible with prolonged exposure.";
    disease.textContent="Mild symptoms possible! stay alert.";
    ent.textContent="Acceptable but limit outdoor activities.";
    respiratory.textContent="Limit prolong exposure.";
    headache.textContent="Mild symptoms can appear.";

} else if (showAQI>100 && showAQI<= 200) {
    children.textContent = "Avoid outdoor play for long periods.";
    adult.textContent = "Reduce strenuous outdoor work.";
    elderly.textContent = "Possible breathing discomfort; stay indoors more.";
    disease.textContent = "Avoid outdoor exposure; symptoms may worsen.";
    ent.textContent="Use high quality masks and try to do work from home.";
    respiratory.textContent="Try to stay at home.";
    headache.textContent="Apply good quality health measures. Avoid outdoor exrecise routine.";

  }  else if (showAQI>200 && showAQI<= 300) {
    children.textContent = "Avoid all outdoor play; stay indoors.";
    adult.textContent = "Avoid prolonged outdoor activity.";
    elderly.textContent = "Health effects likely; minimize outdoor movement.";
    disease.textContent = "Serious symptoms possible; avoid exposure.";
    ent.textContent="Be carefull, and apply all health measures.";
    respiratory.textContent="Avoid going outside.";
    headache.textContent="Take care and try to work from home.";
  } 

  else if (showAQI>300 && showAQI<= 400) {
    children.textContent = "Stay indoors; air quality is very poor.";
    adult.textContent = "Avoid outdoor work and travel.";
    elderly.textContent = "Serious health risk; keep windows closed.";
    disease.textContent = "Severe effects; use air purifier if available.";
    ent.textContent="Air quality is very poor stay at home.";
    respiratory.textContent="Serious health risk; keep windows closed.";
    headache.textContent="Severe effects; use air purifier if available.";
  } 

  else {
    children.textContent = "Dangerous air! Stay indoors completely.";
    adult.textContent = "Health emergency; avoid any outdoor activity.";
    elderly.textContent = "Critical health warning; seek medical advice if needed.";
    disease.textContent = "Very dangerous; symptoms can worsen quickly.";
    ent.textContent="Air quality is hazardious, !!stay at home.";
    respiratory.textContent="Very serious health risk; keep windows closed. Avoid all outdoor activites.";
    headache.textContent="Severe effects; use air purifier if available. Avoid any outdoor activity";
  }

