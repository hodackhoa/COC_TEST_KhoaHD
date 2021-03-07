import React from 'react';
import Header from './components/header.js'
import Nav from './components/nav.js'
import Content from './components/content.js';
import axios from '../node_modules/axios';
import {connect} from 'react-redux'
import {GetData} from './action'

class Users extends React.Component {
	componentDidMount(){
		this.props.dispatch(GetData(null));
	}
  render(){
    return (
      <div className="Users pageContent">
      	<Header/>
      	<Nav index={0}/>
      	<Content title="Users"/>
      </div>
    );
  }
}
const mapDispatchToProps=(dispatch)=>{
	return{
		dispatch
	}
}
export default connect(null,mapDispatchToProps)(Users);