// import planets from './links.json' with { type: "json" };



function loadJSON(filePath) {
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open('GET', filePath, false); // false makes the request synchronous
    xhr.send(null);
    if (xhr.status === 200) {
        return JSON.parse(xhr.responseText);
    } else {
        console.error('Error loading JSON:', xhr.status);
        return null;
    }
}

// Function to iterate through array of objects
function iterateThroughObjects(data) {
    data.forEach(function (item) {
        map.set(item.name.toLowerCase(), item.link);
    });
}

// Example usage
let filePath = 'links.json'; // Path to your JSON file
let jsonData = loadJSON(filePath);
let map = new Map();

if (jsonData) {
    iterateThroughObjects(jsonData);
}

const urlParams = new URLSearchParams(window.location.search);
let link = urlParams.get('link');

link = link.replaceAll(' ','-');
console.log(link)

let redirect = map.get(link.toLowerCase())

if (redirect !== undefined)
    window.location.href = redirect;















