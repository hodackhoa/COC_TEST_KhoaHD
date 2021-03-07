import React from 'react';
import {connect} from 'react-redux'
import EnableIco from '../images/check@1X.png';
import DisableIco from '../images/close@1X.png';
import EditIco from '../images/edit@1X.png';
import DelIco from '../images/delete@1X.png';
import {ShowPopup} from '../action'

class Content extends React.Component {
	constructor(props){
		super(props);
		this.state={
			data: {tableHead:[], tableBody:[] },
			bulkCheck: []
		}
	}
	static getDerivedStateFromProps(props){
		if(props.data!= null){
			props.data.tableBody.sort((a,b)=>{return (parseInt(a.order)>parseInt(b.order))? 1:(- 1)})
			return {data: props.data}
		}
		else{
			return {data: {tableHead:[],tableBody:[]}};
		}
	}

	handleAdd=(e)=>{
		if(this.props.title=='Categories'){
			this.props.dispatch(ShowPopup({title: this.props.title, status:true}))
		}
	}
	handleDel=(e,id,index)=>{
		this.props.dispatch(ShowPopup({title: this.props.title, status:true, type:"popDel", rowInf:{id:id, index:index} }))
	}
	handleEdit=(e,id,index)=>{
		if(this.props.title=='Categories'){
			this.props.dispatch(ShowPopup({title: this.props.title, status:true, type:"popEdit", rowInf:{id:id, index:index} }))
		}
	}
	handleBulkDel=(e,id,index)=>{
		if(e.target.checked){
			this.state.bulkCheck.push({id:id,index:index})
		}
		else{
			for(let i=0;i<this.state.bulkCheck.length;i++){
				if(this.state.bulkCheck[i].id == id){
					this.state.bulkCheck.splice(i,1);
					break;
				}
			}
		}
		//console.log(this.state.bulkCheck)
	}
	handleDelAll=()=>{
		if(this.state.bulkCheck.length>0){
			this.props.dispatch(ShowPopup({title: this.props.title, status:true, type:"popDel", bulkCheck:this.state.bulkCheck}))
			this.state.bulkCheck = [];
		}
	}
  render(){
  	let styTitle={
  		display: "flex",
  		justifyContent: "space-between",
  		alignItems: "center",
  		height: "172px",
  		padding: "39px 42px 75px",
  		boxSizing: "border-box",
  		background: "#55642C"
  	}
  	let styBtn1={
  		borderRadius: "30px",
  		background: "inherit",
  		border: "2px solid white",
  		color: "white"
  	}
  	let styBtn2={
  		borderRadius: "30px",
  		background: "white",
  		border: "none",
  		marginLeft: '16px',
  		color: "black"
  	}
  	let styOut={
			width: "1074px",
			height: "506px",
			background: "white",
			position: "absolute",
			top:"136px",
			left: "50%",
			transform: "translateX(-50%)",
			borderRadius: "5px",
			boxSizing: "border-box",
			padding: "30px 26px 21px 23px"
  	}
  	let styInner={
  		height: "445px",
			boxSizing: "border-box",
			border: "1px solid #cfcfcf",
			padding: "0 30px 30px",
			overflow: "auto"
  	}
  	
  	let tableHead = this.state.data.tableHead.map((item,index)=>{
  		return(
  				<th key={index}>{item}</th>
  			)
  	});
  	const tableBody = this.state.data.tableBody.map((item,index)=>{
  		return(
  				<tr key={index}>
  					{(item.key!=undefined)? <td>{item.key}</td> : null}
  					<td>{item.name}</td>
  					{(item.value!=undefined)? <td>{item.value}</td> : null}
  					{(item.status!=undefined)? <td><img src={(item.status.toLowerCase()=='enable')? EnableIco:DisableIco}/></td> : null}
  					{(item.order!=undefined)? <td>{item.order}</td> : null}
  					<td><img src={EditIco} onClick={(e)=>{this.handleEdit(e,item.id,index)}}/></td>
  					{(this.props.title=="Categories")? <td><img src={DelIco} onClick={(e)=>{this.handleDel(e,item.id, index)}}/></td>:null}
  					{(this.props.title=="Categories")? 
  						<td>
  							<div style={{position:'relative',display:'inline-block', width:'26px',height:'26px'}}>
  								
	  							<input type="checkbox" onChange={(e)=>{this.handleBulkDel(e,item.id,index)}}/>
	  							<span className='checkMark'></span>
	  						</div>
  						</td>:null}
  				</tr>
  			)
  	})
    return (
      <div className="Content" style={{position:"relative"}}>
      	<div className="title" style={styTitle}>
	      	<h3 style={{fontSize:"30px", color:"white"}}>{this.props.title}</h3>
	      	<div>
	      		<button className="btn-default" style={styBtn1} onClick={this.handleAdd}>Add</button>
	      		{(this.props.title=="Categories")?<button className="btn-default" style={styBtn2} onClick={this.handleDelAll}>Delete All</button>:null}
	      	</div>
	    	</div>
	    	<div className="outer" style={styOut}>
	    		<div className="inner" style={styInner}>
	    			<table style={{width:"100%", borderCollapse: "colappse"}}>
	    				<thead>
	    					<tr>
	    						{tableHead}
	    					</tr>
	    				</thead>
	    				<tbody>
	    					{tableBody}
	    				</tbody>
	    			</table>
	    		</div>
	    	</div>
      </div>
    );
  }
}
const mapStateToProps=(state)=>{
	return{
		data: state.data,
		showPopup:state.showPopup
	}
}
const mapDispatchToProps=(dispatch)=>{
	return{
		dispatch
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(Content);