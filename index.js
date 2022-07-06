const log = function () {
  console.log("test");
};

document.addEventListener('click', function() {
  document.getElementById('sleep-prevent-video-ios').play();
  document.getElementById('sleep-prevent-video-android').play();
});

setInterval(function(){
  document.getElementById('sleep-prevent-video-ios').play();
  document.getElementById('sleep-prevent-video-android').play();
}, 20000);  // 20秒ごと


var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var draw = "draw_";
var mode = "none"
var x1,x2,x3,y1,y2,y3,fill,d;



canvas.addEventListener("click", (e) => {
  var rect = e.target.getBoundingClientRect()
  var x = Math.floor(e.clientX - rect.left);
  var y = Math.floor(e.clientY - rect.top)
  console.log(`${x}:${y}`)

  if(mode == document.getElementById('drawType').value){

    if(mode == "line"){
      if(x1==""){
        x1 = x;
        y1 = y;
      }else{
        ctx.strokeStyle = document.getElementById('colorPick').value;
        //document.getElementById('colorPick').value
        // パスの開始
        ctx.beginPath();
        // 起点
        ctx.moveTo(x1, y1);
        // 終点
        ctx.lineTo(x, y);
        // 描画
        ctx.stroke();
        console.log(x1);

        draw = draw + `l${x1}/${y1}/${x}/${y}/${document.getElementById('colorPick').value.substr( 1, 6 )}@`
        console.log(draw);

        x1 = "";  
        x2 = "";
        x3 = "";
        y1 = "";
        y2 = "";
        y3 = "";
      }
    }

    if(mode == "square"){
      if(x1==""){
        x1 = x;
        y1 = y;
      }else{
        ctx.strokeStyle = document.getElementById('colorPick').value;
        ctx.fillStyle = document.getElementById('colorPick').value;

        ctx.beginPath();
           
            
        if(document.getElementById('fill').checked == true) {ctx.fillRect(x1, y1, x-x1, y-y1); }else{ctx.strokeRect(x1, y1, x-x1, y-y1); }
        ctx.closePath();

        draw = draw + `s${x1}/${y1}/${x-x1}/${y-y1}/${document.getElementById('colorPick').value.substr( 1, 6 )}/${document.getElementById('fill').checked}@`;
        console.log(draw);

        x1 = "";  
        x2 = "";
        x3 = "";
        y1 = "";
        y2 = "";
        y3 = "";
      }
    }

    if(mode == "circle"){
      if(x1==""){
        x1 = x;
        y1 = y;
      }else{
        ctx.strokeStyle = document.getElementById('colorPick').value;
        ctx.fillStyle = document.getElementById('colorPick').value;

        ctx.beginPath();

        d = Math.floor(Math.sqrt( Math.pow( x-x1, 2 ) + Math.pow( y-y1, 2 ) ));
        
        ctx.arc( x1, y1, d, 0 * Math.PI / 180, 360 * Math.PI / 180, false ) ;
           
            
        if(document.getElementById('fill').checked == true) {ctx.fill(); }else{ctx.stroke(); }
        ctx.closePath();

        draw = draw + `c${x1}/${y1}/${document.getElementById('colorPick').value.substr( 1, 6 )}/${d}/${document.getElementById('fill').checked}@`;
        console.log(draw);

        

        x1 = "";  
        x2 = "";
        x3 = "";
        y1 = "";
        y2 = "";
        y3 = "";
      }
    }

    


  }else{

    mode = document.getElementById('drawType').value
    x1 = "";  
    x2 = "";
    x3 = "";
    y1 = "";
    y2 = "";
    y3 = "";


  }





});

function canvasClear() {
  draw = "draw_";
  ctx.clearRect(0, 0, 128, 160);
}
























var timer;



const apis = function getData(){


fetch('https://script.google.com/macros/s/AKfycbzH1S7Z5EK9V_q5LtEvj-zLielLeOQkOzfv4kNrMFtOxg_WfGVzvyXJiJdAGH-PHG_VFQ/exec')
  .then(response => {
    return response.json();
  })
  .then(data => {


    if(timer == data.data[data.data.length-1][1]){

      console.log(data.data[data.data.length-1][0]);
      console.log(data.data[data.data.length-1][1]);
      console.log("conected");
      
      
      return data;

    }else{

      timer = data.data[data.data.length-1][1]
    console.log(data.data[data.data.length-1][0]);
    console.log(data.data[data.data.length-1][1]);
    console.log(data.data.length);
    writeText(data.data[data.data.length-1][0]+'\n');
    
    
    
    return data;

    }
  })
  .catch(error => {
    console.log("失敗しました");
    return "失敗しました";

});


}



async function sendData(inputdata){

  let inputs = document.getElementById('comand');
  //let inputs = inputdata
 // let sendComand = inputs.value;
  let sendComand = inputdata;
  inputs.value = '';
  
  writeText(sendComand+'\n');

  timer =  new Date();


  fetch('https://script.google.com/macros/s/AKfycbx4IV7XgJHtU0wj2q6VoDnvHKgiZBETiQQbvvTtQ80fyOtm0DbUhpW7O63_ZtycGNe6ug/exec?text='+sendComand+"&time="+timer)
    .then(response => {
      return response.json();
    })
    .then(data => {
  
  
      console.log("sended");
      return data;
      
    })
    .catch(error => {
      console.log("失敗しました");
      return "失敗しました";
  
  });
  
  
  // writeText(sendComand);

  }








setInterval(apis, 3000);

const button01 = document.getElementById("write01");
const button02 = document.getElementById("write02");
const button03 = document.getElementById("write03");
button01.addEventListener("click", function () {writeText('alert'+'\n');}, false);
button02.addEventListener("click", function () {sendData(document.getElementById('comand').value);}, false);
button03.addEventListener("click", function () {sendData(draw)}, false);

let port;

async function onStartButtonClick() {
  try {
    port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });
    console.log("接続");
  } catch (e) {
    console.log("Error");
  }
}

async function writeText(text) {
  const encoder = new TextEncoder();
  const writer = port.writable.getWriter();
  await writer.write(encoder.encode(text));
  console.log("テキスト書き込み: " + text);
  writer.releaseLock();
}












// https://breezegroup.co.jp/202004/javascript-fetch/
// https://qiita.com/youtoy/items/f77dc205e817f31a4e18
//
