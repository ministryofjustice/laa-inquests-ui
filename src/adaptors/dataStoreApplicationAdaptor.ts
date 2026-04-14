import axios, { AxiosStatic } from "#node_modules/axios/index.js";

export class ApplicationDataStoreAdaptor {
    constructor(private http: AxiosStatic = axios, private baseUrl : string) {
        
    }

    async getApplication(applicationId : string) {
        await this.http.get("https://www.gov.uk");
    }

}
