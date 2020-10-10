var product = new Array();
var storageKey = 'products';
let a,b,c;
let img = "";
var rIndex = 0;

function addProduct() {
  a = document.getElementById("tenPr").value;
  b = document.getElementById("motaPr").value;
  c = document.getElementById("gia").value;

  if( a == "" || b == "" || c == ""){
    alert("Hãy nhập thông tin đầy đủ");
  }
  else{
    if(isNaN(c)){
      alert("Nhập giá món ăn bằng số")
    }
    else{
      var info = {
        namePro: a,   
        description: b,
        price: c,
        image: img
      }
      var data = localStorage.getItem(storageKey);
      if(data){
        var data1 = JSON.parse(localStorage.getItem(storageKey));
        // console.log(data1);
        product = data1;
        product.push(info);
        localStorage.setItem(storageKey,JSON.stringify(product));
      }
      else{
        product.push(info);
        localStorage.setItem(storageKey,JSON.stringify(product));
      }
      alert("Một sản phẩm được thêm!");
    }
  }
}

function uploadImg(event) {
  img = URL.createObjectURL(event.target.files[0]);
}


function reset() {
  document.getElementById("luu").style.display = "none";
  document.getElementsByTagName("form")[0].reset();
}

function getData() {
  var dataString = localStorage.getItem(storageKey);
  var product = (dataString) ? JSON.parse(dataString) : [];
  return product;
}


function show(){
  var product = getData();
  var html="";
  for(var i=0; i<product.length; i++){
    html += "<tr><td>" + (i + 1) + "</td>" +
      "<td>" + "<img style='height: 200px; width: 250px;' src='"+product[i].image+"'>" +"<h5>"+ product[i].namePro +"</h5>"+ product[i].description + "</td>" +
      "<td>" + product[i].price + " vnd</td>" +
      "<td> <button id='btn-delete' onclick='Delelete("+ i +")'><i class='fa fa-trash' aria-hidden='true'></i></button>" +
      "<button id='btn-edit' onclick='Edit("+ i +")'><i class='fa fa-pencil-square-o' aria-hidden='true'></i></i></button> </td>" +
      "</td></tr>";
  }
  document.getElementById("tblFood").innerHTML = html;
}

function Delelete(x) {
  var data1 = JSON.parse(localStorage.getItem(storageKey));
  // console.log(data1);
  product = data1;
  product.splice(x,1);
  localStorage.setItem(storageKey,JSON.stringify(product));
  show();
}

function Edit(x) {
  document.getElementById("luu").style.display = "inline-block";
  var data1 = JSON.parse(localStorage.getItem(storageKey));
  product = data1;
  document.getElementById("tenPr").value = product[x].namePro;
  document.getElementById("motaPr").value = product[x].description;
  document.getElementById("gia").value = product[x].price;
  //document.getElementById("anhPr").value = product[x].image;
  SelectedRowToInput();
}

function Update() {
  // debugger;
  var x = SelectedRowToInput();
  a = document.getElementById("tenPr").value;
  b = document.getElementById("motaPr").value;
  c = document.getElementById("gia").value;

  if( a == "" || b == "" || c == ""){
    alert("Hãy nhập thông tin đầy đủ");
  }
  else{
    if(isNaN(c)){
      alert("Nhập giá món ăn bằng số")
    }
    else{
      var data1 = JSON.parse(localStorage.getItem(storageKey));
      product = data1;
      product[x].namePro = a;
      product[x].description = b;
      product[x].price = c;
      localStorage.setItem(storageKey,JSON.stringify(product));
      document.getElementById("luu").style.display = "none";
      reset();
      show();
    }
  }
}

function SelectedRowToInput() {
  var table = document.getElementById("tblFood");
  for(var i = 0; i<table.rows.length; i++){
      table.rows[i].onclick = function() {
          rIndex = this.rowIndex;
          // console.log("dong so: "+rIndex);
          return rIndex;
      }
  }
  return rIndex;
}
