import { Page,test } from "@playwright/test";
export class ScreenShotAction{

    public page:Page;
    constructor(page:Page){
        this.page=page;
    }

    public async takeScreenshot():Promise<void>{
        await test.step(`Taking full page screenshot`, async () => {
            await this.page.screenshot({path:`./screenshots/screenshot-${Date.now()}.png`,fullPage:true});
        });
    }

    public async takeElementScreenshot(selector:string):Promise<void>{
        await test.step(`Taking element screenshot`, async () => {
            await this.page.locator(selector).screenshot({path:`./screenshots/element-screenshot-${Date.now()}.png`});
        });
    }
}