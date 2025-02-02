const div = document.getElementById("countries");
const searchInput = document.getElementById("search");
const selectedRegion = document.getElementById("region");
const mode = document.getElementById("mode");
const body = document.body;
let countries = [];

async function fetchCountries() {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        countries = await response.json();
        displayCountries(countries);
    } catch (error) {
        console.error("Ma'lumot olishda xatolik:", error);
    }
}

selectedRegion.addEventListener("change", (event) => {
    if (event.target.value === "all") {
        displayCountries(countries);
        return;
    }
    const region = event.target.value;
    const filteredCountries = countries.filter((country) => country.region === region);
    displayCountries(filteredCountries);
});

function displayCountries(countriesList) {
    div.innerHTML = "";
    countriesList.forEach((country) => {
        const countryDiv = document.createElement("div");
        countryDiv.classList.add("card");
        countryDiv.innerHTML = `
            <img src="${country.flags.png}" alt="${country.name.common}">
            <h2>${country.name.common}</h2>
            <p>Population: ${country.population}</p>
            <p>Region: ${country.region}</p>
            <p>Capital: ${country.capital?.[0] || "No Capital"}</p>
        `;
        div.appendChild(countryDiv);
    });
}

searchInput.addEventListener("input", (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm)
    );
    displayCountries(filteredCountries);
});

fetchCountries();




function applyTheme() {
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark_mode");
        mode.textContent = "☀️ Light Mode";
    } else {
        body.classList.remove("dark_mode");
        mode.textContent = "🌙 Dark Mode";
    }
}

mode.addEventListener("click", () => {
    localStorage.setItem("theme", body.classList.contains("dark_mode") ? "light" : "dark");
    applyTheme();
});

applyTheme();