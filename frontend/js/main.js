console.log("Asffsa")

const wsConnection = new WebSocket("ws://localhost:8999");
wsConnection.onopen = function() {
    alert("Соединение установлено.");
};

wsConnection.onclose = function(event) {
    if (event.wasClean) {
        alert('Соединение закрыто чисто');
    } else {
        alert('Обрыв соединения'); // например, "убит" процесс сервера
    }
    alert('Код: ' + event.code + ' причина: ' + event.reason);
    console.log(event)
};

wsConnection.onerror = function(error) {
    alert("Ошибка " + error.message);
};

 const wsSend = function(data) {
// readyState - true, если есть подключение
    if(!wsConnection.readyState){
        setTimeout(function (){
            wsSend(data);
        },100);
    } else {
        wsConnection.send(data);
    }
};