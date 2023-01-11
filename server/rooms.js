import { v4 as uuid } from 'uuid';
export function createRoom(io) {

  if (!io) throw new Error("ты пидор")

  return {
    uid: uuid(),
    ioInstance: io,
    addClient (socketId)  {
      if (this.players.length < 2) this.players.push(socketId)
      else this.observers.push(socketId)
    },
    removeClient (socketId)  {
      if (~this.players.indexOf(socketId)) return this.players.splice(this.players.indexOf(socketId), 1);
      this.observers.splice(this.observers.indexOf(socketId), 1);
    },

    emitSubscribers (name, msg)  {
      const clients = [...this.players, ...this.observers];
        this.ioInstance.sockets.forEach(el => {
          if (clients.includes(el.id)) el.emit(name, msg)
        })
    },



    setField () {},
    toString() {
      console.log(this.players)
      return this.uid + " \n" + " players : " + this.players.map(el => el).join(" - ") + " obresvers : " + this.observers.map(el => el).join (" - ");
    },
    players: [],
    observers: [],

    field: [["-","-","-"],["-","-","-"],["-","-","-"]]
  }
}