function cerca (event) {
    event.preventDefault();

    const contenuto = document.querySelector('#contenuto');
    const contenutoOk = encodeURIComponent(contenuto.value);
    console.log('Ricerco: '+ contenutoOk);
    const sect = document.querySelector('.flex-containersection');
    sect.innerHTML='';

    const select = document.querySelector('#tipo');
    if ( select.value == 'immagine') {
    const rest = 'https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=';
    fetch(rest + contenutoOk).then(onResponse).then(onJson);
    } else if (select.value == 'innoSquadra') {
        const spoty = "https://api.spotify.com/v1/search?q=" + 'inno ' + contenutoOk;
        fetch(spoty + "&type=track", 
        {
                headers:
                {
                    'Authorization': 'Bearer ' + token
                }
        }).then(onResponse).then(onJsonSpotify);
    }
}

function onJson(json) {
    console.log(json)
    for (i = 0; i < 10; i++) {

        if (json.player[i].strThumb == null) {

        } else {
                const sect = document.querySelector('section div');
                sect.classList.remove('flex-containersection');
                sect.classList.add('flex');
                const div = document.createElement('div');
                div.classList.add('first'); 
                const immagine = document.createElement('img');
                const paragrafo = document.createElement('p');
                immagine.src = json.player[i].strThumb;
                paragrafo.textContent = json.player[i].strPlayer;
                sect.appendChild(div);
                div.appendChild(immagine);
                div.appendChild(paragrafo);
                }
    }
}

let musica;

function onJsonSpotify(json) 
{
    console.log(json)
    for (i = 0; i < 10; i++) 
    {

        if (json.tracks.items[i].name  == null || 
            json.tracks.items[i].album.images[0].url  == null ||
            json.tracks.items[i].preview_url == null) 
            {

            } else {
                const sect = document.querySelector('section div');
                sect.classList.remove('#flex-containersection')
                sect.classList.add('flex');
                const div = document.createElement('div');
                const titolo = document.createElement('p');
                titolo.textContent = json.tracks.items[i].name;
                const img = document.createElement('img');
                img.src = json.tracks.items[i].album.images[0].url;
                const audiobutton = document.createElement('a');
                audiobutton.textContent = 'clicca per ascoltare';
                audiobutton.classList.add('large');
                audiobutton.href = json.tracks.items[i].preview_url;
                div.classList.add('second');
                sect.appendChild(div);
                div.appendChild(titolo);
                div.appendChild(img);
                div.appendChild(audiobutton);
            }
    }
}

function onResponse(response) {
    return response.json();
}

function onError(error) {
    console.log('Error: ' + error);
}

function onTokenJson(json) {
    token = json.access_token;
}

const client_id = '5cd80e8c9215475bbd00d588bcea7cdd';
const client_secret = 'f8fa467dd3dc4cb1899be1833b537823';
let token;

fetch("https://accounts.spotify.com/api/token", 
{
    method: "post",
    body: 'grant_type=client_credentials',
    headers:
    {
        'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
        'Content-Type' : 'application/x-www-form-urlencoded'
    }
} ).then(onResponse).then(onTokenJson);

const form = document.querySelector('form');
form.addEventListener('submit', cerca);
