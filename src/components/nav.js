import React from 'react';
import {Link, Redirect} from "react-router-dom";

class Nav extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      bgTab:[],
      colorTab: []
    }
  }
  render(){
    let styNav={
      boxSizing: "border-box",
      padding: "69px 18px 69px 19px",
      background:'white',
      minHeight: '100vh'
    }
    this.state.bgTab[this.props.index] = "#55642C";
    this.state.colorTab[this.props.index] = "white";
    return (
      <nav className="Nav" style={styNav}>
      	<ul style={{listStyle: "none"}}>
      		<li style={{background:this.state.bgTab[0]}}><Link style={{color:this.state.colorTab[0]}} to="/users">Users</Link></li>
					<li style={{background:this.state.bgTab[1]}}><Link style={{color:this.state.colorTab[1]}} to="/collectibles">Collectibles</Link></li>
					<li style={{background:this.state.bgTab[2]}}><Link style={{color:this.state.colorTab[2]}} to= "/categories">Categories</Link></li>
					<li style={{background:this.state.bgTab[3]}}><Link style={{color:this.state.colorTab[3]}}to="/">Configurations</Link></li>
      	</ul>
      </nav>
    );
  }
}
export default Nav;