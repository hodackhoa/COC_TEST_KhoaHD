import React from 'react';
import axios from '../../node_modules/axios';
import closeIco from "../images/cancel@1X.png";
import {connect} from 'react-redux'
import {ShowPopup} from '../action'
import {GetData} from '../action'
import {ShowLoading} from '../action'

class Popup extends React.Component {
  constructor(props){
    super(props);
    this.state={
      status: "none",
      formData: {key:'', name:'', order:'', status:''},
      hasReceive: false,
      showSpan: {key:'hidden', name:'hidden', order:'hidden', status:'hidden'},
      bgInp: {key:'#fff', name:'#fff', order:'#fff', status:'#fff'}
    }
  }
  static getDerivedStateFromProps(props,state){
    if(props.showPopup.status){
      if(props.showPopup.rowInf!=undefined && !state.hasReceive){
        return{status: "block",formData: {...props.data.tableBody[props.showPopup.rowInf.index]},hasReceive:true }
      }
      else{
        return{status: "block"}
      }
    }
    else{
      return {status: "none"}
    }
    return (props.showPopup.status)? {status: "block"} : {status: "none"};
  }

  handleClose=(e)=>{
    this.props.dispatch(ShowLoading('none'));
    this.props.dispatch(ShowPopup({status:false}))
    this.setState({
      hasReceive:false,
      formData: {key:'', name:'', order:'', status:''},
      showSpan: {key:'hidden', name:'hidden', order:'hidden', status:'hidden'},
      bgInp: {key:'#fff', name:'#fff', order:'#fff', status:'#fff'}
    })
  }
  handleInp=(e,index)=>{
    let copySt = this.state.formData;
    copySt[e.target.name] = e.target.value
    this.state.showSpan[e.target.name] =(e.target.value=="")? 'visible' : 'hidden';
    this.state.bgInp[e.target.name] =(e.target.value=="")? '#FFEFEF' : '#fff';
    this.setState({
      formData: copySt,
      showSpan: {...this.state.showSpan},
      bgInp: {...this.state.bgInp}
    })
  }
  handleKeyUp=(e)=>{
    if(e.target.name=='order'){
      let val = e.target.value.match(/\d/gi);
      e.target.value=(val==null)?'':val.join("");
    }
  }
  validation=(e)=>{
    let submit =true;
    for(let obj in this.state.formData){
      if(this.state.formData[obj]==""){
        this.state.showSpan[obj]='visible';
        this.state.bgInp[obj] = '#FFEFEF';
        submit = false;
      }
    }
    this.setState({
      showSpan: {...this.state.showSpan},
      bgInp: {...this.state.bgInp}
    })
    return submit;
  }
  handleAdd=(e)=>{
    if(this.validation()){
      this.props.dispatch(ShowLoading('block'));
      if(this.props.showPopup.type=="popEdit"){
        axios.put("https://5f34126b9124200016e18691.mockapi.io/"+this.props.showPopup.title+'/'+this.props.showPopup.rowInf.id, this.state.formData)
        .then(response=>{
          this.props.data.tableBody[this.props.showPopup.rowInf.index] = response.data;
          this.props.dispatch(GetData(this.props.data))
          this.handleClose();
        }).catch((err)=>{
          console.log(err)
        })
      }
      else{
        axios.post("https://5f34126b9124200016e18691.mockapi.io/"+this.props.showPopup.title, this.state.formData)
        .then(response=>{
          // console.log(response.data)
          this.props.data.tableBody.push(response.data);
          this.props.dispatch(GetData(this.props.data))
          this.handleClose();
        }).catch((err)=>{
          console.log(err)
        })
      }
    }
    
  }
  handleConfirmDel=(e)=>{
    this.props.dispatch(ShowLoading('block'));
    let arrDel = (this.props.showPopup.bulkCheck==undefined)? [this.props.showPopup.rowInf] : this.props.showPopup.bulkCheck;
    let processDel=(callback)=>{
      axios.delete("https://5f34126b9124200016e18691.mockapi.io/"+this.props.showPopup.title+"/"+arrDel[i].id)
      .then(response=>{
        callback();
      }).catch((err)=>{
        console.log(err)
      })
    }
    let callback=()=>{
      this.props.data.tableBody=this.props.data.tableBody.filter((item)=>{
        return item.id != arrDel[i].id;
      })
      i++;
      if(i<arrDel.length){
        processDel(callback);
      }
      else{
        this.props.dispatch(GetData(this.props.data))
        this.handleClose();
      }
    }
    let i=0;
    processDel(callback);
  }
  render(){
    let styPopup={
      display: this.state.status,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,.5)",
      position: "fixed",
      top:"0"
    }
    let styContent={
      background: "white",
      position: "absolute",
      top:"50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "798px",
      height: "475px",
      padding: "52px 45px 42px",
      boxSizing: "border-box"
    }
    let styBtn={
      width: '120px',
      height: '40px',
      fontSize: '15px',
      borderRadius: '0',
      border: 'none'
    }
    let styPopdel={
      display: this.state.status,
      background: "white",
      position: "absolute",
      top:"50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "300px",
      height: '150px',
      padding: "30px",
      boxSizing: "border-box",
      boxShadow: "0 0 10px grey",
      textAlign:'center',
    }
    return (
      (this.props.showPopup.type!="popDel")?
        <div className="Popup" style={styPopup} onClick={this.handleClose}>
          <div id="contentPopup" style={styContent} onClick={(e)=>{e.stopPropagation()}}>
            <h3 style={{fontSize:"30px", lineHeight:'30px'}}>{((this.props.showPopup.type!='popEdit')?'Add New ':'Edit ')+ this.props.showPopup.title}</h3>
            <form style={{margin:"36px 45px 42px", width:'456px'}}>
              <div className="grInp">
                <label htmlFor="key">Key</label>
                <input type="text" name="key" value={this.state.formData.key} style={{background:this.state.bgInp.key}} onChange={(e)=>{this.handleInp(e,0)}}/>
                <span style={{visibility:this.state.showSpan.key}}>Key field is required</span>
              </div>
              <div className="grInp">
                <label htmlFor="name">Display name</label>
                <input type="text" name="name" value={this.state.formData.name} style={{background:this.state.bgInp.name}} onChange={(e)=>{this.handleInp(e,1)}}/>
                <span style={{visibility:this.state.showSpan.name}}>Display name field is required</span>
              </div>
              <div className="grInp">
                <label htmlFor="status">Status</label>
                <input type="text" name="status" value={this.state.formData.status} style={{background:this.state.bgInp.status}} onChange={(e)=>{this.handleInp(e,2)}}/>
                <span style={{visibility:this.state.showSpan.status}}>Status field is required</span>
              </div>
              <div className="grInp">
                <label htmlFor="order">Order</label>
                <input type="text" name="order" value={this.state.formData.order} style={{background:this.state.bgInp.order}} onKeyUp={this.handleKeyUp} onChange={(e)=>{this.handleInp(e,3)}}/>
                <span style={{visibility:this.state.showSpan.order}}>Order field is required</span>
              </div>
            </form>
            <div className="btnGr" style={{textAlign: 'center'}}>
              <button className="btn-default" style={styBtn} onClick={this.handleAdd}>{(this.props.showPopup.type!='popEdit')?'Add':'Edit'}</button>
            </div>
            <img src={closeIco} alt="closeIco" style={{position:'absolute', top:'25px', right:'25px'}} onClick={this.handleClose}/>
          </div>
        </div>
        :<div style={styPopdel}>
          <h4>Are you sure to delete ?</h4>
          <div style={{display:'flex',justifyContent:'space-around', marginTop: '20px'}}>
            <button onClick={this.handleConfirmDel} className="btn-default" style={{width:'100px',height:'40px', background:"red",fontSize:'15px'}}>OK</button>
            <button onClick={this.handleClose} className="btn-default" style={{width:'100px',height:'40px', background:'grey',fontSize:'15px'}}>Cancel</button>
          </div>
        </div> 
    );
  }
}
const mapDispatchToProps=(dispatch)=>{
	return{
		dispatch
	}
}
const mapStateToProps=(state)=>{
  return{
    data: state.data,
    showPopup: state.showPopup
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Popup);