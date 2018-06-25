import _ from 'lodash';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyAj6b2wsW_a6jC49vWePSU5DaJW2T7bx6I';



class App extends Component {
    constructor(props){
        super(props);
        
        this.state={
            videos: [],
            selectedVideo: null
            };
        
        this.videoSearch('doge');
        
    }
    
    videoSearch(term){
        YTSearch({key:API_KEY, term: term}, (videos)=> {
            this.setState({
                videos,
                selectedVideo: videos[0]
                });
            //this.setState({ videos: videos });
            
        });
    }
    
  render() {
      const videoSearch = _.debounce((term) =>{this.videoSearch(term)}, 300);
    return (
    <div>
        <SearchBar onSearchTermChange={videoSearch}/>
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList 
            onVideoSelect={selectedVideo=> this.setState({selectedVideo})}
            videos={this.state.videos}/>
      </div>
     
    );
  }
}

export default App;
