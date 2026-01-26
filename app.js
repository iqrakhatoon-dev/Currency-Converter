//Please use your own API key 

const apiKey = "Your-Api-Key";
const baseUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector("#msg");

for(let select of dropdowns){
    for(currCode in countryList){
       let newOps = document.createElement("option");
       newOps.innerText = currCode;
       newOps.value = currCode;
       if(select.name === "from" && currCode === "USD"){
        newOps.selected = "selected";
       }else if(select.name === "to" && currCode === "INR"){
        newOps.selected = "selected";
       }
       select.append(newOps);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const updateExchangeRate = async () => {
     let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1 ){
        amtVal = 1;
        amount.value = "1";
    }

    let fromCurrency = fromCurr.value;
    let toCurrency = toCurr.value;
    
   const Url = `${baseUrl}${fromCurrency}`;

   let response = await fetch(Url);
   let data = await response.json();
   let rate = data.conversion_rates[toCurrency];

   let finalAmt = amtVal * rate;
   msg.innerText = `${amtVal} ${fromCurrency} = ${finalAmt} ${toCurrency}`;
};

const updateFlag = (element) => {
    let currCode = element.value;
    let countyCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countyCode}/shiny/64.png`;
   let img = element.parentElement.querySelector("img");
   img.src = newSrc;
}

btn.addEventListener("click", (evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});
