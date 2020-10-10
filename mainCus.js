
var arr = new Array();
var storageKey = 'arr';
let a,b,c,d,e,f;
var rIndex = 0;
function Registration(){
  a = document.getElementById("hoten").value;
  b = document.getElementById("diachi").value;
  c = document.getElementById("sodt").value;
  d = document.getElementById("tendn").value;
  e = document.getElementById("mk").value;
  f = document.getElementById("xnmk").value;
  if( a == "" || b == "" || c == "" || d == "" || e == "" || f == ""){
    alert("Hãy nhập thông tin đầy đủ");
  }
  else{
    if(f != e){
        alert("Xác nhận mật khẩu không khớp");
    }else{
      var information = {
          name:a,
          address:b,
          numberphone:c,
          user: d,
          pass: e,
          passVft: f
      }
      var data = localStorage.getItem(storageKey);
      if(data){
        var data1 = JSON.parse(localStorage.getItem(storageKey));
        // console.log(data1);
        arr = data1;
        arr.push(information);
        localStorage.setItem(storageKey,JSON.stringify(arr));
      }
      else{
        arr.push(information);
        localStorage.setItem(storageKey,JSON.stringify(arr));
      }
      alert("Bạn đã tạo tài khoản thành công!");
      Reset();
    }
  }
}
function Reset() {
  document.getElementsByTagName("form")[0].reset();
}

function Login() {
  let txt1 = document.getElementById("txt1").value;
  let txt2 = document.getElementById("txt2").value;
  var arr = getData();
  for(i in arr){
    if(txt1 == arr[i].user && txt2 == arr[i].passVft){
      alert("dang nhap thanh cong");
      break;
    }
    else{
      alert("thong tin tai khoan sai");
      break;
    }
  }
}

function getData() {
  var dataString = localStorage.getItem(storageKey);
  var arr = (dataString) ? JSON.parse(dataString) : [];
  return arr;
}

function Show() {
  var arr = getData();
  var html = "";
  for(var i=0; i<arr.length; i++){
  html += "<tr><td>" + (i + 1) + "</td>" + 
      "<td>" + arr[i].name + "</td>" + 
      "<td>" + arr[i].address + "</td>" +
      "<td>" + arr[i].numberphone + "</td>" +
      "<td> <button id='btn-delete' onclick='Delelete("+ i +")'><i class='fa fa-trash' aria-hidden='true'></i></button>" +
      "<button id='btn-edit' onclick='Edit("+ i +")'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></i></button> </td>" +
      "</td></tr>";
  }
  document.getElementById("kq").innerHTML = html;
}

function Delelete(x) {
  var data1 = JSON.parse(localStorage.getItem(storageKey));
  // console.log(data1);
  arr = data1;
  arr.splice(x,1);
  localStorage.setItem(storageKey,JSON.stringify(arr));
  Show();
}

function Edit(x) {
  document.getElementById("frmEdit").style.display = "block";
  var data1 = JSON.parse(localStorage.getItem(storageKey));
  arr = data1;
  document.getElementById("hoten").value = arr[x].name;
  document.getElementById("diachi").value = arr[x].address;
  document.getElementById("sodt").value = arr[x].numberphone;
  document.getElementById("tendn").value = arr[x].user;
  SelectedRowToInput();
}

function Save() {
  var x = SelectedRowToInput() - 1; 
  a = document.getElementById("hoten").value;
  b = document.getElementById("diachi").value;
  c = document.getElementById("sodt").value;
  d = document.getElementById("tendn").value;
  if( a == "" || b == "" || c == "" || d == ""){
    alert("Hãy nhập thông tin đầy đủ");
  }else{
    var data1 = JSON.parse(localStorage.getItem(storageKey));
    arr = data1;
    arr[x].name = a;
    arr[x].address = b;
    arr[x].numberphone = c;
    arr[x].user = d;
    localStorage.setItem(storageKey,JSON.stringify(arr));
    document.getElementById("frmEdit").style.display = "none";
    Show();
  }
}

function SelectedRowToInput() {
  var table = document.getElementById("tbl");
  for(var i = 0; i<table.rows.length; i++){
      table.rows[i].onclick = function() {
          rIndex = this.rowIndex;
          // console.log("dong so: "+rIndex);
          return rIndex;
      }
  }
  return rIndex;
}
