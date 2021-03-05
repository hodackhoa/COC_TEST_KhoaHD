import React from 'react';
import {Link} from "react-router-dom";

class Nav extends React.Component {
  render(){
    return (
      <div className="Nav">
      	<ul>
      		<li><Link to = "/users"></Link>Users</li>
					<li><Link to = "/collectibles"></Link>Collectibles</li>
					<li><Link to = "/categories"></Link>Categories</li>
					<li><Link to ="/"></Link>Configurations</li>
      	</ul>
      </div>
    );
  }
}
export default Nav;