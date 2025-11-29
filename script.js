const APILINK =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=e66c586b04ebcb5d8307a0cd78627126&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w500";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=e66c586b04ebcb5d8307a0cd78627126&query=";

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

// load popular movies on first open
getMovies(APILINK);

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // clear old results
      main.innerHTML = "";

      data.results.forEach((movie) => {
        if (!movie.poster_path) return; // skip movies without poster

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
          <img class="thumbnail" src="${IMG_PATH + movie.poster_path}" alt="${movie.title}">
          <h3>${movie.title}</h3>
        `;

        main.appendChild(card);
      });
    })
    .catch((err) => console.error(err));
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value.trim();

  if (searchTerm) {
    getMovies(SEARCHAPI + searchTerm);
    search.value = "";
  }
});
