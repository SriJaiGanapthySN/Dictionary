document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("click");
  const result = document.getElementById("result");

  async function fetchdata(name) {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${name}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      if (
        data[0] &&
        data[0].meanings &&
        data[0].meanings[0] &&
        data[0].meanings[0].definitions &&
        data[0].meanings[0].definitions[0]
      ) {
        const audio =
          data[0].phonetics &&
          data[0].phonetics[0] &&
          data[0].phonetics[0].audio
            ? data[0].phonetics[0].audio
            : null;
        result.innerHTML = `
        <h1>Word: ${name}</h1>
        <strong>type:</strong>
        <p>${data[0].meanings[0].partOfSpeech}</p>
        <strong>definition:</strong>
        <ul>
      <li><p>${data[0].meanings[0].definitions[0].definition}</p></li>
      
      </ul>
       <strong>type:</strong>
       <p>${data[0].meanings[1].partOfSpeech}</p>
       <strong>definition:</strong>
       <ul>
       <li><p>${data[0].meanings[0].definitions[1].definition}</p> </li>
       </ul>
       ${
         audio
           ? `
        <button id="playAudio">Play Audio</button>
        <audio id="audio" src="${audio}"></audio>        `
           : "<p>No audio available</p>"
       }
        `;
        if (audio) {
          document.getElementById("playAudio").addEventListener("click", () => {
            document.getElementById("audio").play();
          });
        }
      } else {
        result.textContent = "No definition found.";
      }
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
      result.textContent = "An error occurred while fetching the data.";
    }
  }

  btn.addEventListener("click", (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    fetchdata(name);
  });
});
