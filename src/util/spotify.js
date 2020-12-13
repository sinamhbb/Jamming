
const CLIENT_ID = '9d4896252f6b433c89ec2d014258c4f8';
const REDIRECT_URI="http://localhost:3000/";
let accessToken ;

const spotify = {
  
    getAccessToken(){
        if(accessToken){
            return accessToken;
        }console.log("1");
        
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        console.log(`accessTokenMatch: ${accessTokenMatch}`);
        console.log(`expiresInMatch = ${expiresInMatch}`);
        if(accessTokenMatch  && expiresInMatch){
            accessToken = accessTokenMatch[1];
            console.log(`accessToken = ${accessToken}`);
            const expiresIn = Number(expiresInMatch[1])
            console.log(`expiresIn= ${expiresIn}`);
             /*following code, helps you to wipe the access token and URL parameters*/
            window.setTimeout(() => accessToken = '' , expiresIn * 1000);
            window.history.pushState('access Token', null, '/');
            return accessToken;
             }else{
                const accessUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`
                window.location = accessUrl;
                console.log(`in else: ${window.location.href}`);              
            }
          
        
    },
   


    search(term){
        const accessToken = spotify.getAccessToken();
        console.log(1.1);
        console.log(`accessToken in search : ${accessToken}`);
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}` ,
        {headers:{
            Authorization: `Bearer ${accessToken}`
        }
        }).then(response => response.json())
          .then(jsonResponse => 
            {if(!jsonResponse.tracks){
                return [];
            }
            console.log(jsonResponse.tracks);
            return jsonResponse.tracks.items.map(track => ({
                id:track.id,
                name: track.name,
                artist: track.artists["0"].name,
                album: track.album.name,
                uri: track.uri
            })) 
        });

    },

    savePlaylist(name,trackUris){
        if(!name || !trackUris.length){
             return;
        }
            const accessToken = spotify.getAccessToken();
            console.log(`accessToken in save playlist= ${accessToken}`);
            const headers = {Authorization: `Bearer ${accessToken}`}
            
            let userID;
            return fetch(`https://api.spotify.com/v1/me`, {headers :headers}
            ).then(response => response.json()
            ).then(jsonResponse => {userID = jsonResponse.id;
                    console.log(`userID = ${userID}`)
                    return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, 
                    {headers:headers,
                    method:'POST',
                    body: JSON.stringify({name:name})})
                    .then(response => response.json())
                    .then(jsonResponse => {const playlistID = jsonResponse.id;
                        console.log(`playlistID = ${playlistID}`);
                     return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
                     {headers: headers,
                      method: "POST",
                      body:JSON.stringify({uris: trackUris})
                      })
                     .then(response => response.json())
                    })
                })
        
        
    }

}




export default spotify;