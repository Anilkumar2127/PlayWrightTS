
import { Page,test } from "@playwright/test";

export class browserUtiles {
    private readonly page:Page;

    constructor(page:Page) {    
        this.page=page;
    }

    public async launchBrowser(url:string):Promise<void>{
        await test.step(`Launching browser with URL: ${url}`, async () => {
            await this.page.goto(url);
        })
    }
}