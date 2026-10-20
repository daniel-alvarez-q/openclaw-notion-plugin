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
  ],
});
