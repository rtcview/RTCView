


const RemoteVideo = document.getElementById('RemoteVideo');
const LocalVideo = document.getElementById('LocalVideo'); 

let localStream;
let peerConnection;
let roomID;

const servers = {

    iceServers:[ 
{
urls: [ 
"stun:stun.l.google.com:19302",
 "stun:stun2.l.google.com:19302"
]

},
{ urls: [
  "turn:openrelay.metered.ca:80",
  "turn:openrelay.metered.ca:443",
  "turn:openrelay.metered.ca:443?transport=tcp"
],
 username: "openrelayproject",
 credential: "openrelayproject"
 }

]

};

// init media access
async function initMedia() {
 localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
 });

    
}

initMedia();