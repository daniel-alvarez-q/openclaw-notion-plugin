import { Type } from "typebox";
import { defineToolPlugin } from "openclaw/plugin-sdk/tool-plugin";
import NotionService from "./notion-client.js";

let service:NotionService|undefined;

function getNotionService(api_key:string):NotionService {
  if(!service){
    service = new NotionService(api_key);
  }
  return service;
}

export default defineToolPlugin({
  id: "notion-plugin",
  name: "Notion Integration Plugin",
  description: "Enables direct integration with a Notion workspace for OpenClaw Agents.",
  configSchema:Type.Object({
    api_key: Type.String()
  }),
  tools: (tool) => [
    tool({
      name: "notion-search",
      description: "Search interface for Notion objects, including pages and data_sources.",
      parameters: Type.Object({
        query: Type.String({ description: "Query seach parameters" }),
      }),
      execute: async ({ query }, config) => {
        const notion = getNotionService(config.api_key);
        return await notion.search(query)
      },
    }),
    tool({
      name: "get-database",
      description: "Interface for retrieval of a single database instance using its UUID",
      parameters: Type.Object({
        database_id: Type.String({description: "Database UUID"})
      }),
      execute: async ({database_id}, config) => {
        const notion = getNotionService(config.api_key);
        return await notion.get_database(database_id)
      }
    }),
    tool({
      name: "get-page",
      description: "Interface for retrieval of a single page instance using its UUID",
      parameters: Type.Object({
        page_id: Type.String({description: "Page UUID"})
      }),
      execute: async({page_id}, config)=>{
        const notion = getNotionService(config.api_key);
        return await notion.get_page(page_id)
      }
    }),
    tool({
      name: "create-page",
      description: "Interface for creation of a new page. The tool takes an object of type CreatePageParameters",
      parameters: Type.Object({
        params: Type.Object({})
      }),
      execute: async({params}, config)=>{
        const notion = getNotionService(config.api_key);
        return await notion.create_page(params)
      }
    })
  ],
});
