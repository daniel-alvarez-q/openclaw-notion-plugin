# Notion Integration

Notion Tool Plugin for OpenClaw. This plugin implements the necessary tools to interact with the Notion API and perform the most common CRUD operations with its different abstractions.

### Requirements:

A connection is needed for the plugin to interact with the Notion Workspace. A valid API key associated to a connection (_not a personal token!!_) must be added to the plugin configuration within openclaw.json with *api_key* as key.

## Build

```bash
npm install
npm run plugin:build
npm run plugin:validate
npm test
```
