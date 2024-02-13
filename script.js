const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";    //API to be used in the project//

const dropdowns = document.querySelectorAll(".dropdown select");                //accessing both dropdowns//
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (currCode in countryList) {                                 //accessing currency code in country list// 
    let newOption = document.createElement("option");             //adding option for each country code//  
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {            //SELECTING USD IN FROM OPTION//
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {       //SELECTING INR IN TO OPTION//
      newOption.selected = "selected";
    }
    select.append(newOption);                                       //ADDING ALL THE OPTIONS AVAILABLE TO COUNTRYLIST//
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);                               //TARGET SHOWS WHERE THE CHANGE COMES//
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  //CREATING A URL TO FETCH API BY USING BASE URL//
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;    //CONVERTING TO LOWECASE BCZ API'S WORK IN LOWERCASE//
  let response = await fetch(URL);                         //CALLINF FETCH BY USING URL//
  let data = await response.json();                        //PASSING DATA FROM RESPONSE//
  let rate = data[toCurr.value.toLowerCase()];             //SETTING DATA TO CUUENCY VALUE//

  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;     //UPDATING MESSAGE THAT HAS TO BE DISPLAYED AFTER GETTING FINAL AMOUNT //
};

//CHANGING FLAG IMG AS SOON AS COUNTRY CODE IS SELECTED//
const updateFlag = (element) => {
  let currCode = element.value;                   //EXTRACTING CURCODE FROM ELEMENT//
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();                          //NO CHANGE OCCURS ON PAGE(NO REFRESHING OF PAGE)//
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});































