let travelData = {};

// Fetch JSON data
fetch('travel_recommendation_api.json')
  .then(response => response.json())
  .then(data => {
    travelData = data;
    console.log('Data loaded:', travelData);
  })
  .catch(error => console.error('Error loading JSON:', error));

function searchRecommendations() {
  const query = document.getElementById('searchInput').value.toLowerCase().trim();
  const resultsContainer = document.getElementById('resultsContainer');
  resultsContainer.innerHTML = ''; // Clear previous results

  if (!query) {
    resultsContainer.innerHTML = '<p>Please enter a keyword to search.</p>';
    return;
  }

  let results = [];

  if (query === 'beach' || query === 'beaches') {
    results = travelData.beaches?.slice(0, 2) || [];
  } else if (query === 'temple' || query === 'temples') {
    results = travelData.temples?.slice(0, 2) || [];
  } else if (query === 'country' || query === 'countries') {
    results = travelData.countries?.slice(0, 2) || [];
  } else {
    resultsContainer.innerHTML = '<p>No recommendations found for that keyword.</p>';
    return;
  }

  // Display results
  results.forEach(item => {
    const div = document.createElement('div');
    div.classList.add('recommendation');

    if (query === 'country' || query === 'countries') {
      // For countries, show their name and at least two cities
      const cities = item.cities?.slice(0, 2).map(city => `
        <h4>${city.name}</h4>
        <img src="${city.imageUrl}" alt="${city.name}">
        <p>${city.description}</p>
      `).join('') || '';

      div.innerHTML = `<h3>Country: ${item.name}</h3>${cities}`;
    } else {
      // For beaches or temples
      div.innerHTML = `
        <h3>${item.name}</h3>
        <img src="${item.imageUrl}" alt="${item.name}">
        <p>${item.description}</p>
      `;
    }

    resultsContainer.appendChild(div);
  });
}

document.getElementById('searchBtn').addEventListener('click', searchRecommendations);

// Function to clear search results
function clearResults() {
    const resultsContainer = document.getElementById('resultsContainer');
    const searchInput = document.getElementById('searchInput');
    
    resultsContainer.innerHTML = '';  // Clear displayed results
    searchInput.value = '';           // Clear the search field
  }
  
  // Add event listener to the Clear button
  document.getElementById('clearBtn').addEventListener('click', clearResults);
  