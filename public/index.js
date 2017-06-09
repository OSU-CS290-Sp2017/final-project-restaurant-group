var myModal=document.getElementById('modal-backdrop');
var myButton=document.getElementById('create-box-button');
var myBoxModal=document.getElementById('create-modal');
var myName=document.getElementById('name-input');
var myPhone=document.getElementById('phone-num-input');
var myTime=document.getElementById('time-input');
var myX=document.getElementsByClassName("close-button")[0];
var myCancel=document.getElementsByClassName("cancel-button")[0];
var myAccept=document.getElementsByClassName("accept-button")[0];

myButton.addEventListener('click',function(){
  myModal.classList.remove('hidden');
  myBoxModal.classList.remove('hidden');
});

myX.addEventListener('click',function(){
  clear();
});

myCancel.addEventListener('click',function(){
  clear();
});

myAccept.addEventListener('click',function(){
  if(myName.value===''||myPhone.value===''||myTime.value===''){
    alert("All the fields are not filled. Please fill all the fields.");
  }
  else{
    createNewBox();
  }
});

function createNewBox(){
  var newReserveContainer=document.getElementsByClassName('reserve-container')[0];
  var newArticle = document.createElement('article');
  var newDiv = document.createElement('div');
  var newNamePara = document.createElement('p');
  var newName = document.createTextNode(myName.value);
  var newPhonePara = document.createElement('p');
  var newPhone = document.createTextNode(myPhone.value);
  var newTimePara = document.createElement('p');
  var newTime = document.createTextNode(myTime.value);

  newArticle.classList.add('reserve-box');
  newDiv.classList.add('box-content');
  newNamePara.classList.add('name');
  newNamePara.appendChild(newName);
  newPhonePara.classList.add('number');
  newPhonePara.appendChild(newPhone);
  newTimePara.classList.add('time');
  newTimePara.appendChild(newTime);
  newDiv.appendChild(newNamePara);
  newDiv.appendChild(newPhonePara);
  newDiv.appendChild(newTimePara);
  newArticle.appendChild(newDiv);
  newReserveContainer.classList.add('reserve-container');
  newReserveContainer.appendChild(newArticle);

  clear();
}

function clear(){
  myName.value="";
  myPhone.value="";
  myTime.value="";
  myModal.classList.add('hidden');
  myBoxModal.classList.add('hidden');
}
