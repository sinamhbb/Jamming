import React from 'react';
import './SearchResaults.css';
import TrackList from '../TrackList/TrackList.js';

class SearchResaults extends React.Component {

    
    render(){
        return(
            <div className="SearchResaults">
                <h2>Resaults</h2>
                <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={false} />
            </div>
        )
    }
}

export default SearchResaults;