const searchForm = document.querySelector("form");
const inputBox = document.querySelector(".inputBox");
const searchBtn = document.querySelector(".searchBtn");
const movieContainer = document.querySelector(".movie_container");

//Function to fetch movie details using OMDB api
const getMovieInfo = async (movie) => {
  try {
    const apiKey = "YOUR_API_KEY";
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&t=${movie}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Unable to fetch movie data.....");
    }
    const data = await response.json();

    showMovieData(data);
  } catch (error) {
    showErrorMsg("Sorry, No Movies Found !!");
  }
};

// Function to show movie data on screen
const showMovieData = (data) => {
  movieContainer.innerHTML = "";
  movieContainer.classList.remove("noBackground");

  //using destructuring assignment to extract properties from data objects
  const { imdbRating, Genre, Released, Runtime, Plot, Poster } = data;

  const movieElement = document.createElement("div");
  movieElement.classList.add("movie-info");
  movieElement.innerHTML = `
  <h2>${data.Title}</h2>
  <p><strong>Rating: &#11088;</strong>${imdbRating}</p>
  `;
  const movieGenreElement = document.createElement("div");
  movieGenreElement.classList.add("movie-genre");

  Genre.split(",").forEach((element) => {
    const p = document.createElement("p");
    p.innerHTML = element;
    movieGenreElement.appendChild(p);
  });

  movieElement.appendChild(movieGenreElement);
  movieElement.innerHTML += `<p><strong>Released Date: </strong>${Released}</p>
  <p><strong>Duration: </strong>${Runtime}</p>
  <p><strong>Cast: </strong>${data.Actors}</p>
  <p><strong>Plot: </strong>${Plot}</p>
  `;

  //Creating a div for movie poster
  const moviePosterElement = document.createElement("div");
  moviePosterElement.classList.add("movie-poster");
  moviePosterElement.innerHTML = `
  <img src=${Poster}/>
  `;
  movieContainer.appendChild(moviePosterElement);
  movieContainer.appendChild(movieElement);
};

//Function to display error message
const showErrorMsg = (message) => {
  movieContainer.innerHTML = `<h2>${message}</h2>`;
  movieContainer.classList.add("noBackground");
};

//Function to handle the form submission
const handleFormSubmission = (e) => {
  e.preventDefault();

  const movieName = inputBox.value.trim();
  if (movieName !== "") {
    showErrorMsg("Fetching Movie Info....");
    getMovieInfo(movieName);
  } else {
    showErrorMsg("Please enter movie name..");
  }
};

// Adding event listener to search form
searchForm.addEventListener("submit", handleFormSubmission);
