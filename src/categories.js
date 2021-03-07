import React from 'react';
import Header from './components/header.js'
import Nav from './components/nav.js'
import Content from './components/content.js';
import axios from '../node_modules/axios';
import {connect} from 'react-redux'
import {GetData} from './action'

class Categories extends React.Component {
	componentDidMount(){
		axios.get("https://5f34126b9124200016e18691.mockapi.io/Categories")
		.then(response=>{
			//console.log(response.data);
			let tableHead=["Key","Display Name","Show/Hide","Order","Edit", "Delete", "Bulk Detete"];
			this.props.dispatch(GetData({tableHead:tableHead,tableBody: response.data}))
		}).catch((err)=>{
			console.log(err)
		})
	}
  render(){
    return (
      <div className="Categories pageContent">
      	<Header/>
      	<Nav index={2}/>
      	<Content title="Categories"/>
      </div>
    );
  }
}
const mapDispatchToProps=(dispatch)=>{
	return{
		dispatch
	}
}
export default connect(null,mapDispatchToProps)(Categories);