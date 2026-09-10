window.onload = function(){
    const car = prompt("使用する編成を入力してください")}
function nowtime(){
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    console.log(`現在の時刻は ${hours} 時 ${minutes} 分 ${seconds} 秒です。`);
    const nowhours = document.querySelector(".時刻 h3");
    nowhours.textContent=String(hours).padStart(2,"0")+":"+String(minutes).padStart(2,"0");
    const nowseconds = document.querySelector(".時刻 p");
    nowseconds.textContent=String(seconds).padStart(2,"0");
}
//alert("幅:"+window.innerWidth+"px 高さ:"+window.innerHeight+"px")
setInterval(nowtime,1000);
nowtime();
const stalist = ["四城市","西四城","三城台二丁目","須津岡","府","狩川橋","比良新町","片島","鐘山公園","稲生沢","双葉茶屋","稲生沢温泉","笠浜"];
//定義
    
    let direction = -1; //SSR -> INZ:1,INZ -> SSR:-1
    let terminatesta = 7;
    let startingsta = 9;
    let nowsta = startingsta;

const nnnsta = document.querySelector(".次々々駅詳細")
const nnsta = document.querySelector(".次々駅詳細")
function staname(){
let nownextsta = document.querySelector(".次駅詳細 .駅名");
nownextsta.textContent=stalist[nowsta]
let nownextnextsta = document.querySelector(".次々駅詳細 .駅名")
nownextnextsta.textContent=stalist[nowsta+1*direction]
let nownextnextnextsta = document.querySelector(".次々々駅詳細 .駅名")
nownextnextnextsta.textContent=stalist[nowsta+2*direction]
let preview0 = document.querySelector(".前駅 .プレビュー")
preview0.textContent = stalist[nowsta-1*direction]
let preview1 = document.querySelector(".次駅 .プレビュー")
preview1.textContent = stalist[nowsta]
let preview2 = document.querySelector(".次々駅 .プレビュー")
preview2.textContent = stalist[nowsta+1*direction]
let preview3 = document.querySelector(".次々々駅 .プレビュー")
preview3.textContent = stalist[nowsta+2*direction]
let preview4 = document.querySelector(".次々々々駅 .プレビュー")
preview4.textContent = stalist[nowsta+3*direction]
}
staname();
function terminating(){
    
    if (nowsta+2>terminatesta&&direction==1||nowsta-2<terminatesta&&direction==-1){
        nnnsta.style.opacity = 0;
    }
    else {nnnsta.style.opacity = 1;};
    
    if (nowsta+1>terminatesta&&direction==1||nowsta-1<terminatesta&&direction==-1){
        nnsta.style.opacity = 0;
    }
    else {nnsta.style.opacity=1;}
}
terminating();

const back = document.querySelector(".戻る");
back.addEventListener("click",function(){
    if (nowsta > startingsta && direction || nowsta < startingsta&&direction==-1){
    nowsta = nowsta-1*direction;
    staname();
    terminating();}
})
const next = document.querySelector(".停車")
next.addEventListener("click",function(){
    if (nowsta!=terminatesta)
    nowsta = nowsta+1*direction
    staname();
    terminating();
})
const trainCount = document.querySelector(".両数");
if (trainCount) trainCount.textContent = "２";

const restriction = document.querySelector(".制限");
if (restriction&&startingsta<6&&6<=terminatesta&&direction==1) {
    restriction.innerHTML = stalist[startingsta].slice(0,2)+"ー比良&nbsp;<strong>120</strong> km/h<br>比良ー"+stalist[terminatesta].slice(0,2)+"&nbsp;<strong>105</strong> km/h";
}
else if(restriction&&direction==1&&startingsta>=6){
    restriction.innerHTML = stalist[startingsta].slice(0,2)+"ー"+stalist[terminatesta].slice(0,2)+"&nbsp;<strong>105</strong> km/h";
}
else if(restriction&&direction==1&&terminatesta<=6)
{   restriction.innerHTML = stalist[startingsta].slice(0,2)+"ー"+stalist[terminatesta].slice(0,2)+"&nbsp;<strong>120</strong> km/h"}
else if(restriction&&terminatesta<=6&&6<startingsta&&direction==-1){
    restriction.innerHTML = stalist[startingsta].slice(0,2)+"ー比良&nbsp;<strong>105</strong> km/h<br>比良ー"+stalist[terminatesta].slice(0,2)+"&nbsp;<strong>120</strong> km/h";
}
else if(restriction&&terminatesta>6&&direction==-1){
    restriction.innerHTML = stalist[startingsta].slice(0,2)+"ー"+stalist[terminatesta].slice(0,2)+"&nbsp;<strong>105</strong> km/h";
}
else if(restriction&&startingsta<=6&&direction==-1){
    restriction.innerHTML = stalist[startingsta].slice(0,2)+"ー"+stalist[terminatesta].slice(0,2)+"&nbsp;<strong>120</strong> km/h"
}