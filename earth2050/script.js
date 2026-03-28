const myId = Math.floor(Math.random() * 10000).toString();
document.getElementById("myId").innerText = myId;

const ws = new WebSocket("ws://localhost:8080");

ws.onopen = () => {
  ws.send(JSON.stringify({
    type: "register",
    id: myId
  }));
};