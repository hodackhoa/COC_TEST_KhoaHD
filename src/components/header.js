import React from 'react';
import logo from '../images/concrete-logo@1X.png'
import userIco from '../images/profile-user@1X.png'

class Header extends React.Component {
  render(){
  	let styHead={
  		width: "100%",
  		height: "68px",
  		display: "flex",
  		justifyContent : 'space-between',
  		padding: "10px",
  		alignItems: "center",
  		background: "#DBE2BF"
  	}
    return (
      <div className="Header" style={styHead}>
      	<img src={logo}/>
      	<img src={userIco} style={{marginRight: "32px"}}/>
      </div>
    );
  }
}
export default Header;