import { createHmac } from "crypto";
import { readFile, writeFile } from "fs";
import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";

const path = "server/db/users.json"
export const privateKey = createHmac('sha256', "AdminPass").digest('hex');
interface IUser {
  id: string;
  login: string;
  hashPass: string;
  stats: {
    wins: number,
    loses: number,
    ties: number,
    total: number
  }
}

export class DataBase {
  private userBD: {[id: string]: IUser}; 
  
  constructor() {
    this.userBD = {};
    readFile(path, (err, data)=> {
        if(!err) {
            this.userBD = JSON.parse(data.toString()) ;
        }
        else {
            console.log(err);
        }
    })

    }

    createUser(login: string, password: string) {
      const uid = uuid()
       const newUser = {
        id: uid,
        login,
        hashPass: createHmac('sha256', password).digest('hex'),
        stats: {
            wins: 0,
            loses: 0,
            ties: 0,
            total: 0
          }
          
       }
       this.userBD[uid] = newUser;
       this.writeJson();
       return jwt.sign(newUser.id, privateKey)
    }

    updateUser(id: string, result: "loses" | "wins" | "ties") {
        this.userBD[id].stats[result]++;
        this.userBD[id].stats["total"]++;
        this.writeJson();
      }

    getUser(id: string) {
        return this.userBD[id];
    }
    
    findUser(login: string) {
        for (let user of Object.values(this.userBD)) {
            if(user.login === login) {
                return user;
            }
        }
    }

    writeJson() {
        writeFile(path, JSON.stringify(this.userBD), "utf-8" , (err) => {
          console.log(err)
        })
    }
    
}
