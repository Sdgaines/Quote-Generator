const quoteContain = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitbtn = document.getElementById('twitter');
const newlinebtn = document.getElementById('new-quote');
const load = document.getElementById('loader');

let apiQuotes = [];

// show loading
function loading() {
    load.hidden = false;
    quoteContain.hidden = true;
}

// Hiding loading
function complete() {
    quoteContain.hidden = false;
    load.hidden = true;
}


// Show New Quote
function newQuote() {
    loading();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // check is author field is blank and replace it with unknown
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    // Check quote length to determine styling
    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
        
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}


// Get Quotes from Api
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // catch error
    }
}

//Tweet Quote
function tweetQuote() {
    const twitUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitUrl, '_blank');
}

// Event Listeners
newlinebtn.addEventListener('click', newQuote);
twitbtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();
// loading();
