let song;
let playSong;

// Spotify Client Credentials

const clientId = 'b7ea13f990eb41b393874a61d185ba5c'
const clientSecret = '2d091a373a0646668caffaff6183d869'

const getToken = async () =>{
    const result = await fetch(`https://accounts.spotify.com/api/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });

    // Access the data given to us by the fetch response (promise)
    const data = await result.json()
    return data.access_token
}

// Function to get the song info when image is clicked

/**
 * 
 * @param img_index
 * @param item_index
 * 
 * Function gets song from spotify using the image index of our gallery
 * Then it finds the correct item_index of the JSON response object from
 * spotify and will produce a preview_url
 */

async function clickedEvent(img_index, item_index){
    // Get Track Name (alt text from image tag)
    let track = document.getElementsByTagName('img')[img_index].attributes[1].value;
    console.log(track)

    let token = await getToken()

    let headers = new Headers([
        ['Content-Type', 'application/json'],
        ['Accept', 'application/json'],
        ['Authorization', `Bearer ${token}`]
    ]);

    let request = new Request(`https://api.spotify.com/v1/search?q=${track}&type=track&limit=15`, {
        method: 'GET',
        headers: headers
    });

    let result = await fetch(request);

    let response = await result.json()
    console.log(response.tracks)

    // song = response.track.items[item_index].previewurl
    song = response.tracks.items[item_index].preview_url


    while (song == null) {
        item_index += 1
        song = response.tracks.items[item_index].preview_url
    }


    console.log(song)

    // TODO: Add songSnippet function to play the song from the preview_url
    if (playSong) {
        stopSnippet();
    }
    songSnippet(song);

}


/**
 * 
 * @param {string} id
 * @param {string} event
 *  id = image id for gallery image
 *  event = mouse event given by the action from our user
 * 
 * function produces a song from the clickEvent based on the image index
 */

 function getSong(id, event) {
    switch (id) {
        case 'fig1':{
            event.stopPropagation();
            clickedEvent(0, 0)
            break;
        }
        case 'fig2':{
            event.stopPropagation();
            clickedEvent(1, 0)
            break;
        }
        case 'fig3':{
            event.stopPropagation();
            clickedEvent(2, 0)
            break;
        }
        case 'fig4':{
            event.stopPropagation();
            clickedEvent(3, 0)
            break;
        }
        case 'fig5':{
            event.stopPropagation();
            clickedEvent(4, 0)
            break;
        }
        case 'fig6':{
            event.stopPropagation();
            clickedEvent(5, 0)
            break;
        }
        
    }

}




function songSnippet(url) {
    playSong = new Audio(url)
    return playSong.play()
}



function stopSnippet() {
    return playSong.pause()
}