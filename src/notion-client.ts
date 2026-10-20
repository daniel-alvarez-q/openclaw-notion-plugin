import { Client } from "@notionhq/client";

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

    async get_database(database_id: string) {
        return await this.client.databases.retrieve(
            { database_id: database_id }).then(
                (database) =>
                    JSON.stringify(database)
            ).catch((error) =>
                JSON.stringify(error)
            )
    }

    async get_page(page_id: string) {
        return await this.client.pages.retrieve({ page_id: page_id }).then((page) =>
            JSON.stringify(page)
        ).catch((error) => JSON.stringify(error))
    }

    async search(query: string = "", filter_value?: string) {
        const filter_param: object = { property: 'object', value: filter_value }
        return await this.client.search({ query: query }).then(
            (search_response) =>
                JSON.stringify(search_response)
        ).catch((error) => JSON.stringify(error))
    }
}

export default NotionService