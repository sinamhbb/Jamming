import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component{

    constructor(props){
        super(props);

        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);

        this.state={
            term: ''
        }
    }

    search(){
        this.props.onSearch(this.state.term)
    }

    handleTermChange(event){
        this.setState({term: event.target.value})
    }

    render(){
        return(
            <div className="SearchBar">
                <input 
                    placeholder='Enter A song, album or an artist' 
                    onChange={this.handleTermChange}/>

                <button className="SearchButton" onClick={this.search} >Search</button>
            </div>
        );
    }
}

export default SearchBar;