let selectedCityInterval;

// Function to update time for Los Angeles, Paris, and Tokyo
function updateTime() {
    // Los Angeles
    let losAngelesElement = document.querySelector("#los-angeles");
    if (losAngelesElement) {
        let losAngelesDateElement = losAngelesElement.querySelector(".date");
        let losAngelesTimeElement = losAngelesElement.querySelector(".time");
        let losAngelesTime = moment().tz("America/Los_Angeles");

        losAngelesDateElement.innerHTML = losAngelesTime.format("MMMM Do YYYY");
        losAngelesTimeElement.innerHTML = losAngelesTime.format(
            "h:mm:ss [<small>]A[</small>]"
        );
    }

    // Paris
    let parisElement = document.querySelector("#paris");
    if (parisElement) {
        let parisDateElement = parisElement.querySelector(".date");
        let parisTimeElement = parisElement.querySelector(".time");
        let parisTime = moment().tz("Europe/Paris");

        parisDateElement.innerHTML = parisTime.format("MMMM Do YYYY");
        parisTimeElement.innerHTML = parisTime.format(
            "h:mm:ss [<small>]A[</small>]"
        );
    }

    // Tokyo
    let tokyoElement = document.querySelector("#tokyo");
    if (tokyoElement) {
        let tokyoDateElement = tokyoElement.querySelector(".date");
        let tokyoTimeElement = tokyoElement.querySelector(".time");
        let tokyoTime = moment().tz("Asia/Tokyo");

        tokyoDateElement.innerHTML = tokyoTime.format("MMMM Do YYYY");
        tokyoTimeElement.innerHTML = tokyoTime.format(
            "h:mm:ss [<small>]A[</small>]"
        );
    }
}

// Function to update the selected city
function updateCity(event) {
    clearInterval(selectedCityInterval);  // Clear any previous intervals

    let cityTimeZone = event.target.value;
    if (cityTimeZone === "current") {
        cityTimeZone = moment.tz.guess();  // Guess user's timezone
    }

    let cityName = cityTimeZone.replace("_", " ").split("/")[1];

    function updateSelectedCityTime() {
        let cityTime = moment().tz(cityTimeZone);
        let selectedCityElement = document.querySelector("#selected-city");

        // If there isn't already a selected city element, create it
        if (!selectedCityElement) {
            let citiesElement = document.querySelector("#cities");
            selectedCityElement = document.createElement("div");
            selectedCityElement.classList.add("city");
            selectedCityElement.id = "selected-city";
            citiesElement.appendChild(selectedCityElement);
        }

        // Make sure the HTML structure matches the style of other cities
        selectedCityElement.innerHTML = `
            <div class="city">
                <div>
                    <h2>${cityName}</h2>
                    <div class="date">${cityTime.format("MMMM Do YYYY")}</div>
                </div>
                <div class="time">${cityTime.format("h:mm:ss")} <small>${cityTime.format("A")}</small></div>
            </div>
            <a href="/" class="return-link">All cities</a>
        `;
    }

    updateSelectedCityTime();  // Update immediately
    selectedCityInterval = setInterval(updateSelectedCityTime, 1000);  // Update every second
}

// Update times every second
updateTime();
setInterval(updateTime, 1000);

// Add event listener for the dropdown selection
let citiesSelectElement = document.querySelector("#city");
citiesSelectElement.addEventListener("change", updateCity);
