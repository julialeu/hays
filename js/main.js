document.addEventListener('DOMContentLoaded', () => {
    //Get form and input elements
    const form = document.getElementById('form');
    const input = document.getElementById('termsearch');
    const resultsDiv = document.getElementById('results');

    form.addEventListener('submit', async (e) => {
        e.preventDefault(); //Prevent default form submission
        const term = input.value.trim(); //Get input value

        if (term !== '') {
            const url = `https://es.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(term)}&utf8=&format=json&origin=*`;
            try {
                const response = await fetch(url); //Fetch data from Wikipedia API
                const data = await response.json(); //Convert response to JSON
                showResults(data.query.search); //Display results
            } catch (error) {
                resultsDiv.innerHTML = '<p>Error while fetching results</p>';
            }
    
            saveResults(term); //Save search term
        }
    });

    function showResults(searchResults) {
        if (!searchResults || searchResults.length === 0) {
            resultsDiv.innerHTML = '<p>No results found</p>'; //Handle no results
            return;
        }

        let html = '<ul>';
        searchResults.forEach(result => {
            html += `<li>
                <h3>${result.title}</h3>
                <p>${result.snippet}</p>
                <a href="https://es.wikipedia.org/wiki/${encodeURIComponent(result.title)}" target="_blank">See more</a>
            </li>`; //Create HTML for each result with title, snippet, and link
        });
        html += '</ul>';
        resultsDiv.innerHTML = html;
    }

    function saveResults(term) {
        fetch('php/save_results.php', {
            method: 'POST', //Send POST request
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `term=${encodeURIComponent(term)}` //Encode term for URL safety
        })
        .then(response => response.text()) //Convert response to text
        .then(response => {
            console.log('Search saved', response);
        })
        .catch(error => {
            console.error('Error saving search', error);
        });
    }   
}); 