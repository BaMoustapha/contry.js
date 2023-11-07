const content = document.querySelector(".cards");
const api_url = 'https://restcountries.com/v3.1/all';
const toggleButton = document.getElementById('myButton');
const searchCountry = document.querySelector("#search");
const continentSelectionner = document.getElementById("filter");
const divcontent = document.getElementById('lien')
let africa = document.getElementById('africa')

let countries = []
let paysFilter;
let pays;


async function fetchCountries() {
        

  try {
      const response = await fetch(api_url);
      const countries = await response.json();
      pays = countries;
      affichepays(countries)
    
      }catch (error) {
              console.error('Erreur:', error);
          }
}

fetchCountries()

function affichepays (pays) {

  content.innerHTML = "";
  pays.forEach(country => {
    
    const divContainer = document.createElement("div");
    divContainer.className =
      "rounded-3 col-10 cardContainer col-md-4 col-lg-3";
    divContainer.innerHTML += 
                  
      `<div class="col-md-3 me-auto mb-5">
          <div class="card shadow rounded" style="width: 18rem;">
            
            <img src="${country.flags.svg}" type="button" 
            class="card-img-top img-fluid w-auto" style="height: 180px; width: 18rem;" alt=""
            id="lien">
            </a>
            <div class="card-body h-auto">
              <h5 class="card-title"><b>${country.name.common}</b></h5>
              <p class="card-text"><b>Population</b> : ${country.population}</p>
              <p class="card-text"><b>Region</b> : ${country.region}</p>
              <p class="card-text"><b>Capital</b> : ${country.capital}</p>
            </div>
          </div>
      </div>
      
      `
      divContainer.addEventListener("click", () => {
        window.location.href = `detail.html?capital=${country.capital}`;
      });

      content.appendChild(divContainer);
});



}



function filterCountries1() {
  console.log(searchCountry.value);
  console.log(continentSelectionner.value);
  const paysFilter = pays.filter(
    (pays) =>
      (continentSelectionner.value === "all" ||
        pays.region.toLowerCase() === continentSelectionner.value) &&

      (pays.name.common
        .toLowerCase()
        .includes(searchCountry.value.toLowerCase()) ||
        pays.region.toLowerCase().includes(searchCountry.value.toLowerCase()))

  )

  affichepays(paysFilter)
  

}

continentSelectionner.addEventListener("change", filterCountries1);
searchCountry.addEventListener("input", filterCountries1);


              


toggleButton.addEventListener('click', () => {
    if (document.body.classList.contains('dark-mode')) {
        // Switch to light mode
        document.body.classList.remove('dark-mode');
    } else {
        // Switch to dark mode
       document.body.classList.add('dark-mode');
    }
});


