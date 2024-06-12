let map = new Map();

function loadJSON(filePath) {
    let xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open('GET', filePath, false);
    xhr.send(null);
    if (xhr.status === 200) {
        return JSON.parse(xhr.responseText);
    } else {
        console.error('Error loading JSON:', xhr.status);
        return null;
    }
}

function iterateThroughObjects(data) {
    data.forEach(function (item) {
        map.set(item.name.toLowerCase(), item.link);
    });
}

function startRedirect(){

    let filePath = 'links.json';
    let jsonData = loadJSON(filePath);


    if (!jsonData) {
        document.body.innerText = "Fail to load data!";
        return;
    }

    iterateThroughObjects(jsonData);

    const urlParams = new URLSearchParams(window.location.search);
    let link = urlParams.get('link');

    if (!link){
        document.body.innerText = "query is empty!";
        return;
    }

    document.body.innerText = "searching for " + link;

    link = link.replaceAll(' ','-');
    console.log(link)

    let redirect = map.get(link.toLowerCase())

    if (redirect === undefined){
        document.body.innerHTML = '<iframe src="404.html"  width="100%" height="500">'
        document.title = "Site not found"
        return;
    }

    document.head.innerHTML += "<meta property=\"og:title\" content="+ link +">";

    document.body.innerText = "redirecting to " + redirect;
    window.location.href = redirect;

}

startRedirect()















