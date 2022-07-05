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



async function sendData(){

  let inputs = document.getElementById('comand');
  let sendComand = inputs.value;
  inputs.value = '';
  
  writeText(sendComand);

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
button01.addEventListener("click", function () {writeText('alert'+'\n');}, false);
button02.addEventListener("click", function () {sendData();}, false);

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