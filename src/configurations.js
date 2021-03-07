import React from 'react';
import Header from './components/header.js';
import Nav from './components/nav.js';
import Content from './components/content.js';
import axios from '../node_modules/axios';
import {connect} from 'react-redux'
import {GetData} from './action'

class Configurations extends React.Component {
	componentDidMount(){
		axios.get("https://5f34126b9124200016e18691.mockapi.io/Configurations")
		.then(response=>{
			//console.log(response.data);
			let tableHead = ["Contants Name","Value","Edit"]
			this.props.dispatch(GetData({tableHead:tableHead,tableBody: response.data}))
		}).catch((err)=>{
			console.log(err)
		})
	}
  render(){
    return (
      <div className="Configurations pageContent">
      	<Header/>
      	<Nav index={3}/>
      	<Content title="Configurations"/>
      </div>
    );
  }
}
const mapDispatchToProps=(dispatch)=>{
	return{
		dispatch
	}
}
export default connect(null,mapDispatchToProps)(Configurations);