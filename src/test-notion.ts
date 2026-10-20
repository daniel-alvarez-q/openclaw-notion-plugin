import NotionService from "./notion-client.js";
import readlineSync from "readline-sync";

let key = process.env.NOTION_API_KEY

if(!key){
    throw new Error("NOTION_API_KEY is not defined")
}

const client = new NotionService(key)
const rl = readlineSync;
const modes = ['exit', 'users', 'database', 'page', 'search'];
// const object_types = ['page', 'data_source']
while (true){
    const operation_mode:Number = rl.keyInSelect(modes, `
        Test module for Notion integration. Select operational mode to be tested:\n`);

    if (operation_mode==0){
        break
    } else if (operation_mode===1) {
        console.log(`${await client.get_users()}`)
    } else if (operation_mode===2){
        const db_id:string = rl.question('Provide a valid Database ID: \n')
        console.log(await client.get_database(db_id))
    } else if (operation_mode===3){
        const page_id:string = rl.question('Provide a valid Page ID: \n')
        console.log(await client.get_page(page_id))
    } else if (operation_mode===4){
        const query = rl.question('Provide a search query: \n')
        console.log( await client.search(query))
    }
}
