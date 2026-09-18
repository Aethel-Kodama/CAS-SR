
function nowtime(){
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const nowhours = document.querySelector(".時刻 h3");
    if (nowhours) {
        nowhours.textContent = String(hours).padStart(2, "0") + ":" + String(minutes).padStart(2, "0");
    }
    const nowseconds = document.querySelector(".時刻 p");
    if (nowseconds) {
        nowseconds.textContent = String(seconds).padStart(2, "0");
    }
}
//$(function(){$(".次駅 .sec").css("opacity","0")})
//alert("幅:"+window.innerWidth+"px 高さ:"+window.innerHeight+"px")
setInterval(nowtime,1000);
nowtime();
const stalist = ["四城市","西四城","三城台二丁目","須津岡","府","狩川橋","比良新町","片島","鐘山公園","稲生沢","双葉茶屋","稲生沢温泉","笠浜"];


//定義
    
    let direction = 1; //SSR -> INZ:1,INZ -> SSR:-1
    let terminatesta = 2;
    let startingsta = 0;
    let nowsta = startingsta;
    let nnowsta = nowsta;
    const noboritakemin = [1,1,1,1,1,1,1,1,2,10,10,10]
    const noboritakesec = [45,55,55,55,10,15,25,55,0,0,0,0]
    const kudaritakemin = [1,2,1,1,1,1,2,1,2,10,10,10]
    const kudaritakesec = [40,0,10,10,10,55,10,25,15,0,0,0]
    let dept;
    let currenttime;


const nnnsta = document.querySelector(".次々々駅詳細")
const nnsta = document.querySelector(".次々駅詳細")
function staname(){
    const nownextsta = document.querySelector(".次駅詳細 .駅名");
    if (nownextsta) nownextsta.textContent = stalist[nowsta];

    const nownextnextsta = document.querySelector(".次々駅詳細 .駅名");
    if (nownextnextsta) nownextnextsta.textContent = stalist[nowsta + 1 * direction];

    const nownextnextnextsta = document.querySelector(".次々々駅詳細 .駅名");
    if (nownextnextnextsta) nownextnextnextsta.textContent = stalist[nowsta + 2 * direction];
}
function nstaname(){
    const preview0 = document.querySelector(".前駅 .プレビュー");
    if (preview0) preview0.textContent = stalist[nnowsta - 1 * direction];

    const preview1 = document.querySelector(".次駅 .プレビュー");
    if (preview1) preview1.textContent = stalist[nnowsta];

    const preview2 = document.querySelector(".次々駅 .プレビュー");
    if (preview2) preview2.textContent = stalist[nnowsta + 1 * direction];

    const preview3 = document.querySelector(".次々々駅 .プレビュー");
    if (preview3) preview3.textContent = stalist[nnowsta + 2 * direction];

    const preview4 = document.querySelector(".次々々々駅 .プレビュー");
    if (preview4) preview4.textContent = stalist[nnowsta + 3 * direction];

    $(function(){
        if (direction===-1){//上り
        $(".前駅 .min").text(noboritakemin[nowsta+2]); $(".前駅 .sec").text(String(noboritakesec[nowsta+2] ?? "").padStart(2,"0"));

        $(".次駅 .min").text(noboritakemin[nowsta+1]); $(".次駅 .sec").text(String(noboritakesec[nowsta+1] ?? "").padStart(2,"0"));

        $(".次々駅 .min").text(noboritakemin[nowsta]); $(".次々駅 .sec").text(String(noboritakesec[nowsta] ?? "").padStart(2,"0"));

        $(".次々々駅 .min").text(noboritakemin[nowsta-1]); $(".次々々駅 .sec").text(String(noboritakesec[nowsta-1] ?? "").padStart(2,"0"));

        $(".次々々々駅 .min").text(noboritakemin[nowsta-2]); $(".次々々々駅 .sec").text(String(noboritakesec[nowsta-2] ?? "").padStart(2,"0"));
        }
        else if (direction===1){
            $(".前駅 .min").text(kudaritakemin[nowsta-2]); $(".前駅 .sec").text(String(kudaritakesec[nowsta-2] ?? "").padStart(2,"0"));

            $(".次駅 .min").text(kudaritakemin[nowsta-1]); $(".次駅 .sec").text(String(kudaritakesec[nowsta-1] ?? "").padStart(2,"0"));

            $(".次々駅 .min").text(kudaritakemin[nowsta]); $(".次々駅 .sec").text(String(kudaritakesec[nowsta] ?? "").padStart(2,"0"));

            $(".次々々駅 .min").text(kudaritakemin[nowsta+1]); $(".次々々駅 .sec").text(String(kudaritakesec[nowsta+1] ?? "").padStart(2,"0"));

            $(".次々々々駅 .min").text(kudaritakemin[nowsta+2]); $(".次々々々駅 .sec").text(String(kudaritakesec[nowsta+2] ?? "").padStart(2,"0"));
        }
    })
}

staname();
function terminating(){ //終点到着時に次駅の表示を消す
    if (nnnsta) {
        if (nowsta + 2 > terminatesta && direction == 1 || nowsta - 2 < terminatesta && direction == -1) {
            nnnsta.style.opacity = 0;
        } else {
            nnnsta.style.opacity = 1;
        }
    }
    if (nnsta) {
        if (nowsta + 1 > terminatesta && direction == 1 || nowsta - 1 < terminatesta && direction == -1) {
            nnsta.style.opacity = 0;
        } else {
            nnsta.style.opacity = 1;
        }
    }
}
terminating();

const back = document.querySelector(".戻る");
const next = document.querySelector(".停車");
$(".行先 strong").text(stalist[terminatesta])
nstaname();
if (back) { // 戻るボタンを押したときの挙動まとめ
    back.addEventListener("click", function(){
        if (next.textContent!="次へ"&&next.textContent!="終了"){
            if (nowsta > startingsta && direction==1 || nowsta < startingsta && direction == -1) {
                nowsta = nowsta - 1 * direction;
                nnowsta = nnowsta - 1*direction;
                staname();
                nstaname();
                terminating();
                minsec();
            }
            if (next.textContent=="停車")
                next.textContent="次へ";
        }
        else if (next.textContent=="次へ"){next.textContent="停車";}
        
    });
}

if (next) { //進むボタンを押したときの挙動まとめ
    next.addEventListener("click", function(){
        if (nowsta == terminatesta&&next.textContent=="停車"){
            next.textContent="終了"
            $("#inputPanel").show()
        }
        if (nowsta != terminatesta) {
            if (next.textContent === "次へ"){
                
                $(".次駅詳細 *").hide()
                
                $(".次々駅詳細 *").hide()
                
                $(".次々々駅詳細 *").hide()
                nowsta=nowsta+1*direction;
                $(".次駅詳細 *").fadeIn()
                $(".次々駅詳細 *").fadeIn()
                $(".次々々駅詳細 *").fadeIn()
                terminating();
                next.textContent="停車";
                staname();
                $(".プレビュー,.標準時分")
                    .animate({top:"+=69px"},700)
                    .animate({top:"-=69px"},0)
                    .promise()
                    .done(function(){
                    nnowsta = nnowsta + 1 * direction;
                    nstaname();
                    })
                $("header .行先 strong").text(stalist[terminatesta])       
                eachDate();        
            }
            else {
                next.textContent = "次へ";
            };
        };
    });
};
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
function startDate(deptime){//Date型に変換
    let [h, m, s] = (deptime).split(':')
    if (s === undefined) s = '00'
    let starttime = new Date();
    starttime.setHours(h)
    starttime.setMinutes(m)
    starttime.setSeconds(s)
    return starttime;
}
function eachDate(){
    if (nowsta<startingsta){//下り
        currenttime.setSeconds(currenttime.getSeconds()+noboritakesec[nowsta-1])
        currenttime.setMinutes(currenttime.getMinutes()+noboritakemin[nowsta-1])
    }
    else if (nowsta>startingsta){//上り
        currenttime.setSeconds(currenttime.getSeconds()+kudaritakesec[nowsta+1])
        currenttime.setMinutes(currenttime.getMinutes()+kudaritakemin[nowsta+1])
    }
    $(".次駅停車時分").text(currenttime.getHours()+":"+String(currenttime.getMinutes()).padStart(2, "0"))
    $(".次駅停車秒").text(String(currenttime.getSeconds()).padStart(2, "0"))
}


$(function(){
   
  // 終点の選択肢リストz
  var staList = ["四城市","西四城","三城台二丁目","須津岡","府","狩川橋","比良新町","片島","鐘山公園","稲生沢","双葉茶屋","稲生沢温泉","笠浜"];

  // staListの内容をプルダウンに反映
  var $destination = $("#destination");
  $.each(staList, function(i, name){
    $destination.append($("<option>").val(stalist.indexOf(name)).text(name));
  });
  var $passingstation = $("#passingStation");
  $.each(staList, function(i, name){
    $passingstation.append($("<option>").val(stalist.indexOf(name)).text(name));
  });

  // 列車情報を格納する変数
  var trainData = {
    type: "",
    destination: "",
    passingStation: "",
    departureTime: ""
  };

  $("#applyBtn").on("click", function(){
    
    trainData.type            = $("#trainType").val();
    trainData.destination     = $("#destination").val();
    trainData.passingStation  = $("#passingStation").val();
    trainData.departureTime   = $("#departureTime").val();
    terminatesta = trainData.destination;
    startingsta=nowsta;
    dept=trainData.departureTime;
    currenttime=startDate(dept)
    if(terminatesta>nowsta){direction=1}
    else{direction=-1}
    staname();
    nstaname();
    terminating();
    $(".行先 strong").text(stalist[terminatesta])
    $("#inputPanel").hide()
    eachDate();
  });
});


