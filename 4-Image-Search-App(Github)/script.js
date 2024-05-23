const searchForm = document.querySelector("form");
const imagesContainer = document.querySelector(".images_container");
const searchInput = document.querySelector(".searchInput");
const loadMoreButton = document.querySelector(".load_more_button");
// const accessKey = "YOUR_ACCESS_KEY";

let page = 1;

// Function to fetch using Unsplash API
const fetchImages = async (query, pageNo) => {
  try {
    if (page === 1) {
      imagesContainer.innerHTML = "";
    }
    const url = `https://api.unsplash.com/search/photos?page=1&query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);

    if (data.results.length > 0) {
      data.results.forEach((photo) => {
        const imageElement = document.createElement("div");
        imageElement.classList.add("imageDiv");
        imageElement.innerHTML = `
            <img src=${photo.urls.regular} />
            `;

        //creating overlay
        const overlayElement = document.createElement("div");
        overlayElement.classList.add("overlay");

        //creating overlay text
        const overlayText = document.createElement("h3");
        overlayText.innerHTML = `${photo.alt_description}`;

        overlayElement.appendChild(overlayText);
        imageElement.appendChild(overlayElement);
        imagesContainer.appendChild(imageElement);
      });

      if (data.total_pages === pageNo) {
        loadMoreButton.style.display = "none";
      } else {
        loadMoreButton.style.display = " block";
      }
    } else {
      imagesContainer.innerHTML = `<h2>No Image Found..</h2>`;
      if (loadMoreButton.style.display === "block") {
        loadMoreButton.style.display = "none";
      }
    }
  } catch (error) {
    imagesContainer.innerHTML = `<h2>Failed to search images.Please try again later</h2>`;
    if (loadMoreButton.style.display === "block") {
        loadMoreButton.style.display = "none";
      }
  }
};

// Adding Event Listener I
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputText = searchInput.value.trim();
  if (inputText !== "") {
    page = 1;
    fetchImages(inputText, page);
  } else {
    imagesContainer.innerHTML = `<h2>Please enter something..</h2>`;
    if (loadMoreButton.style.display === "block") {
      loadMoreButton.style.display = "none";
    }
  }
});

//Adding Event listener to load more to fetch more images
loadMoreButton.addEventListener("click", () => {
  fetchImages(searchInput.value.trim(), ++page);
});
