
var siteNameInput = document.getElementById("siteNameInput");
var siteURLInput = document.getElementById("siteURLInput");

var searchInput = document.getElementById("searchInput");

var productList = [ ];

if (localStorage.getItem("products") != null ){

    productList = JSON.parse(localStorage.getItem("products"));
    displayData();

}


function addProduct(){
    if (validationName() == true && validationURL() == true){
        var product = {
            name: siteNameInput.value  ,
            url: siteURLInput.value
        }
        productList.push(product);
        localStorage.setItem("products" , JSON.stringify(productList) );
        clearForm();
        displayData();
        console.log(productList);
        
    }
}
 
function clearForm(){
    siteNameInput.value = "";
    siteURLInput.value = "";
    
}

function displayData(){
    var storage = "";
    for (var i = 0; i < productList.length; i++) {
        storage+= `<tr>
        <td> ${i} </td>
        <td> ${productList[i].name} </td>
        <td> ${productList[i].url} </td>
        <td>
           <button id="myButton" onclick="changeUrl()" class="btn btn-success btn-sm"> vist </button>
           <button onclick = " deleteItem( ${i} ) " class="btn btn-danger btn-sm">delete</button>
        </td>
       </tr>`

    }  
    
    document.getElementById("tableBody").innerHTML=storage;
}
/* <a href: ${productList[i].siteURLInput}> vist </a> */

function deleteItem(i){
    productList.splice( i , 1);
    console.log(productList);
    displayData();
    
}

function search(){
    var term = searchInput.value ;
    var storage = "";
    for (var i = 0; i < productList.length; i++) {
        if (productList[i].name.tolowercase().includes( term.tolowercase())) {
            storage += ` <tr>
            <td> ${i} </td>
            <td> ${productList[i].name} </td>
            <td> ${productList[i].url} </td>
            <td>
            <button class="btn btn-success btn-sm"> vist </button>
            <button onclick = " deleteItem(${i}) " class="btn btn-danger btn-sm">delete</button>
            </td>
           </tr>`
        
        }

    } 

    document.getElementById("tableBody").innerHTML=storage;

}

function changeUrl(i) {

 var regexName = /^((ftp|http|https):\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
 if (regexName.test(siteURLInput.value)) {

    var newUrl = window.open('${productList[i.siteURLInput]}') 
    document.getElementById("myButton").href = newUrl;
 } else {

   var newUrl = window.open('(ftp|http|https):\/\/)?${productList[i.siteURLInput]}') 
   document.getElementById("myButton").href = newUrl;
 }

}

//regex101 website testing validation   .... regex have method called 'test' inside it
// var regex = /^[A-Z][a-z]{3,8}$/

var nameMessage = document.getElementById("nameMessage");
var urlMessage = document.getElementById("urlMessage");

function validationName() {

    var text = siteNameInput.value;
    var regexName = /^[A-Z][a-z]{3,8}$/

    if(regexName.test(text)){ //valid

        siteNameInput.classList.add("is-valid");
        siteNameInput.classList.remove("is-valid");
        nameMessage.classList.add("d-none");
        return true;



    }else{ //invalid

        siteNameInput.classList.add("is-invalid");
        siteNameInput.classList.remove("is-invalid");
        nameMessage.classList.remove("d-none");
        
        return false;
    }

    regexName.test(text);
    
}

function validationURL() {
    var text = siteURLInput.value;
    var regexName = /^((ftp|http|https):\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/

    if(regexName.test(text)){ //valid

        siteURLInput.classList.add("is-valid");
        siteURLInput.classList.remove("is-valid");
        urlMessage.classList.add("d-none");
        return true;



    }else{ //invalid

        siteURLInput.classList.add("is-invalid");
        siteURLInput.classList.remove("is-invalid");
        urlMessage.classList.remove("d-none");
        
        return false;
    }

    regexName.test(text);
}