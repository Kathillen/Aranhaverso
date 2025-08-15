// Listar os usuários

import {log, select, isCancel} from "@clack/prompts"
import chalk from "chalk"; // importando o chalk para poder formatar o texto


// importanto de outro documento

import { userManeger } from '../usersControl/users.js';
import { mainMenu } from './menu.js';
import { updateUsersMenu } from "./updateUsers.js";

//.

export async function listUsersMenu(){
    if(userManeger.users.size < 1) { // se o numero de usuários for menos do que 1, ou seja, 0
        log.warn("Nenhum usuário disponível"); 
        setTimeout(() => mainMenu(), 1000);
        return;
    }
    const selected  = await select ({
        message: "Selecione um aranha",
        options: [
                ...userManeger.toArray().map(({username , status}) => ({ 
                    label: `${userManeger.colorStatus(status)} ${chalk.white.underline(username)}`,
                    value: username
                    })),// Para fazer um espalhamento de um array, usando o metodo to array e depois vai mapear todos os items para um novo obj

                    {label: "Menu principal", value: "main"}
        ]
    })
    if(isCancel(selected) || selected === "main") {
        mainMenu();      // para verificar se o prompt foi cancelado ou se o user escolheu voltar para o menu pricipal
        return;
    }

    updateUsersMenu(selected)  // só vai ser executado se o if não acontecer
}
