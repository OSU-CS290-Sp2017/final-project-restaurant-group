var myModal=document.getElementById('modal-backdrop');
var myButton=document.getElementById('create-box-button');
var myBoxModal=document.getElementById('create-modal');
var myName=document.getElementById('name-input');
var myPhone=document.getElementById('phone-num-input');
var myTime=document.getElementById('time-input');
var myX=document.getElementsByClassName("close-button")[0];
var myCancel=document.getElementsByClassName("cancel-button")[0];
var myAccept=document.getElementsByClassName("accept-button")[0];

//make the modal show up
myButton.addEventListener('click',function(){
  myModal.classList.remove('hidden');
  myBoxModal.classList.remove('hidden');
});

//clear modal if X is clicked
myX.addEventListener('click',function(){
  clear();
});

//clear modal if cancel is clicked
myCancel.addEventListener('click',function(){
  clear();
});

//if accept button is clicked & all fields are filled, create the new reservation
myAccept.addEventListener('click',function(){
  if(myName.value===''||myPhone.value===''||myTime.value===''){
    alert("All the fields are not filled. Please fill all the fields.");
  }
  else{
    createNewRes();
  }
});

//makes a new reservation in the website & calls the store function
function createNewRes(){
	//collect the data
	var resName = myName.value;
	var resNum = myPhone.value;
	var resTime = myTime.value;
	console.log(resName, resNum, resTime);
	//call store, maybe getting back an error
	storeNewRes(resName, resNum, resTime, function (err) {
		//if there is an error, alert user
		if (err) {
			alert("Unable to save reservation. Error code:" + err);
		}

		else {
			//Code to put the new reservation in wasn't working, but reloading the page makes it show up just fine.
			location.reload(true);
		}
	});
	clear();

}
//this function stores the res in the DB
function storeNewRes(Name, Num, Time, callback){
	//set up the request
	var postURL = "/reservations.html/"+Name+"/addRes";
	var postRequest = new XMLHttpRequest();
	postRequest.open('POST', postURL);
	postRequest.setRequestHeader('Content-Type', 'application/json');
	//if there's some sort of error, callback the error
	postRequest.addEventListener('load', function (event) {
		var error;
		if (event.target.status !== 200){
			error = event.target.response;
		}
		callback(error);
	});

	//set up the content and send it to the server
	var postBody = {
		name: Name,
		number: Num,
		time: Time
	};
	postRequest.send(JSON.stringify(postBody));
}

//clears and hides the modal
function clear(){
  myName.value="";
  myPhone.value="";
  myTime.value="";
  myModal.classList.add('hidden');
  myBoxModal.classList.add('hidden');
}
