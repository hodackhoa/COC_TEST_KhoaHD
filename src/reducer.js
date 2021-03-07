const stateDefault = {data:null, showPopup: {status:false}, showLoading:'none'};
export default function reducer(state=stateDefault, action){
	switch(action.type){
		case "GETDATA":
			state.data = action.data;
			return {...state}
		case "SHOWPOPUP":
			state.showPopup = action.data;
			return {...state}
		case "SHOWLOADING":
			state.showLoading = action.data;
			return {...state}
		default:
		return state
	}
}