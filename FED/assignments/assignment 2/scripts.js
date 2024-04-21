async function searchGiphy() {
    const searchInput = document.getElementById('searchInput').value;
    const apiKey = '7FyV8Ls3s9zvMZ52tZd3xDfVeiZoUfiC';
    const limit = 10; 
    try {
        const response = await fetch(`https://api.giphy.com/v1/gifs/search?q=${searchInput}&api_key=${apiKey}&limit=${limit}`);
        const data = await response.json();
        displayGifs(data.data);
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
  }
  
  function displayGifs(gifs) {
    const gifContainer = document.getElementById('gifContainer');
    gifContainer.innerHTML = '';
  
    gifs.forEach(gif => {
        const gifElement = document.createElement('img');
        gifElement.src = gif.images.original.url;
        gifElement.alt = gif.title;
        gifElement.classList.add('gif');
        gifContainer.appendChild(gifElement);
    });
  }