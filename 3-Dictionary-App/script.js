const form = document.querySelector("form");
const resultDiv = document.querySelector(".result");

const getWordInfo = async (word) => {
  try {
    resultDiv.innerHTML = `Fetching Data...`;

    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const result = await response.json();
    console.log(result);

    let definitions = result[0].meanings[0].definitions[0];
    // showing data in the result div
    resultDiv.innerHTML = `
  <h2><strong>Word</strong> : ${result[0].word}</h2>
  <p class='pos'>${result[0].meanings[0].partOfSpeech}</p>
  <p><strong>Meaning</strong> : ${
    definitions.definition === undefined ? "Not Found" : definitions.definition
  }</p>
  <p><strong>Examples</strong> : ${
    definitions.example === undefined ? "Not Found" : definitions.example
  }</p>

`;

    // **Display Antonyms**
    if (definitions.antonyms.length === 0) {
      resultDiv.innerHTML += `<p><strong>Antonyms</strong> : Not Found</p>`;
    } else {
      resultDiv.innerHTML += `
      <p><strong>Antonyms</strong> : 
        <ul>`;
      for (let i = 0; i < definitions.antonyms.length; i++) {
        resultDiv.innerHTML += `<li>${definitions.antonyms[i]}</li>`;
      }
      resultDiv.innerHTML += `</ul></p>`;
    }

    // **Display Synonyms** (Added after Antonyms section)
    if (definitions.synonyms.length === 0) {
      resultDiv.innerHTML += `<p><strong>Synonyms</strong> : Not Found</p>`;
    } else {
      resultDiv.innerHTML += `
      <p><strong>Synonyms</strong> : 
        <ul>`;
      for (let i = 0; i < definitions.synonyms.length; i++) {
        resultDiv.innerHTML += `<li>${definitions.synonyms[i]}</li>`;
      }
      resultDiv.innerHTML += `</ul></p>`;
    }

    //Adding read more button
    resultDiv.innerHTML += `<div><a href=${result[0].sourceUrls} target='_blank'>Read more</a></div>`;
  } catch (error) {
    resultDiv.innerHTML = "<h1>Sorry , No Results Found....</h1>";
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWordInfo(form.elements[0].value);
  // getWordInfo(searchedWord.value);
});
