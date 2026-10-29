import {Client, CreateDataSourceParameters, GetDataSourceParameters, CreatePageParameters, UpdatePageParameters} from "@notionhq/client";

/*Notion Service Class*/

class NotionService {
    api_key: string;
    private client: Client;
    // private object_types: Array<String>;

    constructor(key: string) {
        this.api_key = key;
        this.client = new Client({
            auth: this.api_key
        });
        // this.object_types = ['pages', 'data_sources']
    }

    async get_users() {
        return await this.client.users.list().then((user_list) =>
            JSON.stringify(user_list.results)
        ).catch((error) =>
            JSON.stringify(error)
        )
    }

    /* Databases */

    async get_database(database_id: string) {
        return await this.client.databases.retrieve(
            { database_id: database_id }).then(
                (database) =>
                    JSON.stringify(database)
            ).catch((error) =>
                JSON.stringify(error)
            )
    }

    /* Datasources */

    async get_datasource(params:GetDataSourceParameters){
        return await this.client.dataSources.retrieve(params).then((response)=>
            JSON.stringify(response)
        ).catch((error)=>
            JSON.stringify(error)
        )
    }

    async create_datasource(params:CreateDataSourceParameters){
        return await this.client.dataSources.create(params).then((response) =>
            JSON.stringify(response)
        ).catch((error) =>
            JSON.stringify(error)
        )
    }

    /* Pages */

    async get_page(page_id: string) {
        return await this.client.pages.retrieve({ page_id: page_id }).then((page) =>
            JSON.stringify(page)
        ).catch((error) => JSON.stringify(error))
    }

    async create_page(params: CreatePageParameters){
        return await this.client.pages.create(params).then((response)=>
            JSON.stringify(response)
        ).catch((error)=>
            JSON.stringify(error)
        )
    }

    async update_page(params:UpdatePageParameters){
        return await this.client.pages.update(params).then((response)=>
            JSON.stringify(response)
        ).catch((error)=>
            JSON.stringify(error)
        )
    }

    /* Search */

    async search(query: string = "", filter_value?: string) {
        // const filter_param: object = { property: 'object', value: filter_value }
        return await this.client.search({ query: query }).then(
            (search_response) =>
                JSON.stringify(search_response.results)
        ).catch((error) => JSON.stringify(error))
    }
}

export default NotionService