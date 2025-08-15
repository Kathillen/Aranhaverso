import {isCancel, outro, log, select, text, intro, stream} from "@clack/prompts";
import { userManeger } from "../usersControl/users.js";
import { createUsers } from "./createUsers.js";
import { listUsersMenu } from "./listUsers.js";


export async function admMenu(){
    console.log;
    intro(" 🕷️ Você está no painel de controle!🕸️");

    stream.warn((function *() { yield 'Lembre-se "Grandes poderes geram grandes responsabilidades."'; })());
    const options = await select({
        message: "O que você deseja fazer?",
        options: [
        {value: 'createUser', label: 'Criar novo usuário'},
        {value: 'listUser', label: 'Listar usuários'},
        {value: 'deleteUser', label: 'Deletar usuário'},
        {value: 'exit', label: 'Sair'}
        ]
    });
    switch(options){
        case "createUser":{
            intro("🕷️ Você escolheu criar um novo usuário! 🕸️");
            createUsers();
            return;
        }
        case "listUser":{
            intro("🕷️ Você escolheu ver a lista de usuários! 🕸️");
            listUsersMenu();
            return;
        }
    }
}