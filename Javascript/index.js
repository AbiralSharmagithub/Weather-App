fetch('./Json/data.json')
.then((reponse)=>{
    if(!reponse.ok){
    throw new Error("Your fetch data is showing problem");
    }
else
return reponse.json();
}).then((myobj)=>{
const mydata=myobj;
console.log(mydata);
}).catch((err)=>{
    console.log(err);
})