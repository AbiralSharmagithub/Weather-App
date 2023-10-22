fetch('./Json/data.json')
.then((reponse)=>{
    if(!reponse.ok){
    throw new Error("Your fetch data is showing problem");
    }
else
return reponse.json();
})
.then(myobj=>{
const mydata=myobj;
console.log(mydata);
const weatherSearch=document.createElement("div");
 weatherSearch.className="weather";
 weatherSearch.innerHTML=`
 <form id="search-weather">
 <input type="text" placeholder="Enter the name of country" id="option"> 
 <button id="button"><i class="fa-solid fa-magnifying-glass"></i></button> 
 </form>`
 document.body.appendChild(weatherSearch);
 mydata.forEach(data=> {
 console.log(data);
 const  countryWeather=document.createElement("div");
 countryWeather.className="weatherInfo";
 countryWeather.innerHTML=data.image;
 weatherSearch.appendChild(countryWeather);
 })})
 .catch(err=>{
 console.log(err);
})