document.getElementById('error-message').style.display = 'none';

const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';
    document.getElementById('error-message').style.display = 'none';
    if (searchText === '') {
        document.getElementById('error-message').style.display = 'block';
        document.getElementById('scarch-result').style.display = 'none';
        document.getElementById('total-data').style.display = 'none';
    }
    else {
        document.getElementById('total-data').style.display = 'block';
        // load data
        const url = `https://openlibrary.org/search.json?q=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.docs))
    }


};
const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
}
const displaySearchResult = docs => {
    const searchResult = document.getElementById('scarch-result');
    const totalDataFound = document.getElementById('total-data');
    totalDataFound.innerHTML = `Totla Data found:${docs.length}`;
    searchResult.textContent = '';
    if (docs.length === 0) {
        displayError();
        document.getElementById('scarch-result').style.display = 'none';
        document.getElementById('total-data').style.display = 'block';
    }
    else {
        docs.forEach(doc => {
            document.getElementById('scarch-result').style.display = 'flex';
            const url = `
             https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg
             `;
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
             <div class="card">
              <img src="${url}"class="card-img-top" alt="...">
              <div class="card-body">
                 <h1 class="card-title"> Title: ${doc.title}</h1>
                 <h4 class="card-title">Author_Name:${doc.author_name}</h4>
                 <h5 class="card-title">Publisher:${doc.publisher}</h5>
                 <h5 class="card-text">First_Publish_Year:${doc.first_publish_year}.</h5>
             </div>
            `;
            searchResult.appendChild(div);
        });
    }

};
