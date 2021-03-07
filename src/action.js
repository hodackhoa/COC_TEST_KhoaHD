export function GetData(data){
	return{
		type:"GETDATA",
		data
	}
}
export function PostData(data){
	return{
		type:"POSTDATA",
		data
	}
}
export function ShowPopup(data){
	return{
		type:"SHOWPOPUP",
		data
	}
}
export function ShowLoading(data){
	return{
		type:"SHOWLOADING",
		data
	}
}