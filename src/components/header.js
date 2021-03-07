import React from 'react';
import logo from '../images/concrete-logo@1X.png'
import userIco from '../images/profile-user@1X.png'

class Header extends React.Component {
  render(){
  	let styHead={
      gridColumn: "1/3",
  		width: "100%",
  		height: "68px",
      boxSizing: "border-box",
  		display: "flex",
  		justifyContent : 'space-between',
  		padding: "10px",
  		alignItems: "center",
  		background: "#DBE2BF"
  	}
    return (
      <header className="Header" style={styHead}>
      	<img src={logo}/>
      	<img src={userIco} style={{marginRight: "32px"}}/>
      </header>
    );
  }
}
export default Header;