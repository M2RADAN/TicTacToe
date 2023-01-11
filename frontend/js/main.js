import {io} from "socket.io-client"

const createForm = document.getElementById("createForm")
const joinForm = document.getElementById("joinForm")
createForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch("/room", {
    method: "POST",
  }).then(res => res.json()).then(res => {
    if (res.success ===  true) {
      const socket = io("/", {
        query: {
          uid: res.id
        }
      })
      socket.on('tictac', (message) =>
        console.log('Message from server: ', message)
      )

      document.getElementById("testMessage").innerHTML = `<b>${res.id}</b>`
    }
  })
})

joinForm.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(document.getElementById("roomidInput").value)
  const socket = io("/", {
        query: {
          uid: document.getElementById("roomidInput").value
        }
      })
  socket.on('tictac', (message) =>
    console.log('Message from server: ', message)
  )

})

// const socket = io("/", {
//   query: {
//     "uid": "abc"
//   }
// })
// socket.on('tictac', (message) =>
//   console.log('Message from server: ', message)
// )


// function sendMessageToServer() {
//   socket.emit('message', "I'm client")
// }

// window.addEventListener("click", () => {
//   console.log("222")
//   socket.emit("message", "this is some msg")
// })