const newQuoteBtn = document.querySelector('.new-quote');
const quoteText = document.querySelector('.quote');
const authorText = document.querySelector('.author');
const twitterBtn = document.querySelector('.twitter-btn');
const container = document.querySelector('.container');
const loader = document.querySelector('#loader');


// Show loading
const showLoading = () => {
    loader.hidden = false;
    container.hidden = true;
}

// Hide loading
const HideLoading = () => {
    loader.hidden = true;
    container.hidden = false;
}


// get Quote form API
async function getQuoteFromAPI() {
    showLoading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const res = await axios.get(apiUrl);
        return res.data;
    } catch (error) {
        // Error
    }
}

// Random a new quote
async function newQuote() {
    const quoteData = await getQuoteFromAPI();
    const quote = quoteData[Math.floor(Math.random() * quoteData.length)];
    // Check name author
    if (!quote.author) {
        authorText.innerText = '- Incognito -';
    } else {
        authorText.innerText = `- ${quote.author} -`;
    }

    // Check length quote
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    // Inner text and hide loader
    quoteText.innerText = quote.text;
    HideLoading();
}

// Tweet Quote
const tweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// On load, default a quote
newQuote();

// Click new quote button
newQuoteBtn.addEventListener('click', () => {
    showLoading();
    setTimeout(() => {
        newQuote();
    }, 260);
});

// Click icon twitter button
twitterBtn.addEventListener('click', tweetQuote);