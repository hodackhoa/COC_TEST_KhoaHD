import React from 'react';
import {BrowserRouter as Router, Route, Link } from "react-router-dom";
import {Switch} from 'react-router';
import Configurations from './configurations.js';
import Users from './users.js'
import Collectibles from './collectibles.js'
import Categories from './categories.js'
import Popup from './components/popup.js'
import LoadingPop from './components/loadingPop.js'
import './App.css';

class App extends React.Component {
  render(){
    return (
	      <div className="App">
		      <Router>
		        <Switch>
		          <Route path="/" exact component={Configurations}/>
		          <Route path="/users" exact component={Users}/>
		          <Route path="/collectibles" exact component={Collectibles}/>
		          <Route path="/categories" exact component={Categories}/>
		        </Switch> 
		       </Router>
		       <Popup/>
		       <LoadingPop/>
	      </div>
	    
    );
  }
}
export default App;
