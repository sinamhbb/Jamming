import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResaults from '../SearchResaults/SearchResaults';
import Playlist from '../Playlist/Playlist';
import spotify from '../../util/spotify';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state= {searchResults: [],
                 PlaylistName:'My Playlist', 
                 playlistTracks: []
                 };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  search(term){
    spotify.search(term)
    .then(searchResults => this.setState({searchResults: searchResults}))
    console.log(0.9)
    const trackUris = this.state.playlistTracks.map(track => track.uri); 
    console.log(`trackUris= ${trackUris}`)
  }

  savePlaylist (){
    let trackUris = this.state.playlistTracks.map(track => track.uri); 
    console.log(`trackUris = ${trackUris}`)
    spotify.savePlaylist(this.state.PlaylistName, trackUris).then(
      this.setState({PlaylistName: 'New Playlist', playlistTracks:[]})
    )
  }

  updatePlaylistName(name){
    this.setState({PlaylistName: name})
  }

  addTrack(track){
    let tracks = this.state.playlistTracks;
    
    if(tracks.find(savedTrack => savedTrack.id === track.id)){
        return;
    }else{    
      tracks.push({id:track.id , name: track.name , artist: track.artist , album: track.album, uri:track.uri})
      this.setState({playlistTracks: tracks})
    }
  
  }

  removeTrack(track){
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({playlistTracks: tracks})
    console.log(track.id)
    
  }


  render(){
    return (
      <div>
        <h1>Ja<span className="highlight" >mmm</span>ing</h1>
        <div className="App">
          {/*<!-- Add a SearchBar component -->*/}
          <SearchBar 
          onSearch={this.search} />
          
          <div className="App-playlist">
            {/* <!-- Add a SearchResults component --> */}
            <SearchResaults 
              searchResults={this.state.searchResults} 
              onAdd={this.addTrack}/>
            {/* <!-- Add a Playlist component --> */}
            <Playlist  PlaylistName={this.state.PlaylistName} 
              playlistTracks={this.state.playlistTracks} 
              onRemove={this.removeTrack} 
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;