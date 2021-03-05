import React from 'react';
import Header from './components/header.js'
import Nav from './components/nav.js'

class Configurations extends React.Component {
  render(){
    return (
      <div className="Configurations">
      	<Header/>
      	<Nav/>
      	<h3>config</h3>
      </div>
    );
  }
}
export default Configurations;