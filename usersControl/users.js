import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import chalk from "chalk";
const filePath = path.join(process.cwd(), "users.json");

if (!existsSync(filePath)) {
    writeFileSync(filePath, JSON.stringify([]), "utf-8");
}

const data = readFileSync(filePath, { encoding: "utf-8" });
const parsed = JSON.parse(data);

const users = new Map(parsed.map(user => [user.username, user]));

export const userManeger = {
    users,
    save() {
    const data = this.toArray();
    writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    },
    create(user) {
    this.users.set(user.username, user);
    this.save();
    },
    toArray() {
    return Array.from(this.users.values());
    },
    colorStatus(status){ // definir uma cor dependendo do status da task
        switch(status){
            
            case "Usuário ativo": {
                return chalk.bgGreen(`${status}`)// se o status for em andamento, vai retornar a cor amarela
            }
            case "Usuário inativo":{
                return chalk.bgRed(`${status}`)
            }
            default:{
                return chalk.bgWhite(`${status}`) // se não for nenhum dos outros, vai retornar a cor branca
            }
        }
    }
};
