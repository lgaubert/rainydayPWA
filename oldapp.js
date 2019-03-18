const apiKey = '972b0c8609a94c37ab9484f9b5b11717';
const api = 'https://newsapi.org/v2/top-headlines'


const main = document.querySelector('.container');

function newsMaker(articles) {
    return `<div class="article">
        <p>This is a test: ${articles.author} </p>             
        </div>`
}

async function getNews() {
    const res = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
    const json = await res.json();

    main.innerHTML = json.data.map(newsMaker).join('\n');
}

window.addEventListener('load', async e => {
    //await getNews();

    if ('serviceWorker' in navigator) {
        try {
            navigator.serviceWorker.register('serviceWorker.js');
            console.log('SW registered');

        } catch (error) {
            console.log('SW failed');

        }
    }
});

