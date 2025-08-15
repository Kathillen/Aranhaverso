import {intro } from "@clack/prompts";
import chalk from "chalk"
import { mainMenu } from "./menus/menu.js";


intro(`${chalk.red.bold("Você chegou ao")}${chalk.blue.bold(" aranhaverso")}`)
intro(`${chalk.red.bold("🕷️  Seja Bem-vindo(a)🕸️")}`)

mainMenu()