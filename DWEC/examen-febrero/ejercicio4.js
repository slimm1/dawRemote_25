document.addEventListener('DOMContentLoaded', () => {
    console.log(getPharagraphs());
    mapWords(getPharagraphs());
});

function getPharagraphs() {
    const pElements = document.querySelectorAll('p');
    return Array.from(pElements).map(element => element.innerText);    
}

function mapWords(pharagraphs) {
    let words = pharagraphs.map(phar => phar.split(' '));
    words = words.flat();
    words.sort((a, b) => a.length - b.length);
    console.log(words);
}