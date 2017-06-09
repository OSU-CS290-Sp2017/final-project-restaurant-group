var myModal=document.getElementById('modal-backdrop');
var myButton=document.getElementById('create-box-button');
var myBoxModal=document.getElementById('create-modal');
var myName=document.getElementById('name-input');
var myPhone=document.getElementById('phone-num-input');
var myTime=document.getElementById('time-input');
var myX=document.getElementsByClassName("cancel-button")[0];
var myCancel=document.getElementsByClassName("class-button")[0];
var myAccept=document.getElementsByClassName("accept-button")[0];

myButton.addEventListener('click',function(){
  myModal.classList.remove('hidden');
  myBoxModal.classList.remove('hidden');
});
