import React from 'react';
import Header from './components/header.js'
import Nav from './components/nav.js'
import Content from './components/content.js';
import axios from '../node_modules/axios';
import {connect} from 'react-redux'
import {GetData} from './action'

class Collectibles extends React.Component {
	componentDidMount(){
		this.props.dispatch(GetData(null));
	}
  render(){
    return (
      <div className="Collectibles pageContent">
      	<Header/>
      	<Nav index={1}/>
      	<Content title="Collectibles"/>
      </div>
    );
  }
}
const mapDispatchToProps=(dispatch)=>{
	return{
		dispatch
	}
}
export default connect(null,mapDispatchToProps)(Collectibles);