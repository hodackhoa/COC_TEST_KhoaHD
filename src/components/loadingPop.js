import React from 'react';
import {connect} from 'react-redux'
import LoadingIco from "../images/loading.gif"

class LoadingPop extends React.Component {
  constructor(props){
    super(props);
    this.state={
      showLoading: 'none'
    }
  }
  static getDerivedStateFromProps(props){
    return {showLoading: props.showLoading}
  }
  render(){
    let sty={
      display:this.state.showLoading,
      backgroundColor: "rgba(0,0,0,.5)",
      width: "100%",
      height: "100%",
      position: "fixed",
      top:"0"
    }
    let styImg={
      position:'absolute',
      top: '50%',
      left:'50%',
      transform: 'translate(-50%, -50%)',
      height: '100px'
    }
    return (
      <div className="LoadingPop" style={sty}>
      	<img src={LoadingIco} style={styImg}/>
      </div>
    );
  }
}
const mapStateToProps=(state)=>{
	return{
		showLoading: state.showLoading
	}
}
export default connect(mapStateToProps,null)(LoadingPop);