
import { Locator,Page,test } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage{

    private readonly username:Locator;
    private readonly password:Locator;
    private readonly loginBtn:Locator;
    constructor(public  page:Page){
        super(page);
        this.username=this.page.locator("//*[@name='username']");
        this.password=this.page.locator("//*[@name='password']");
        this.loginBtn=this.page.locator("#submit");
    }

    public async launchUrl():Promise<void>{
        await this.pageUtilesObject.launchBrowser("https://practicetestautomation.com/practice-test-login/");
    }

    public async fillCredentials(usernameData:string,passwordData:string):Promise<void>{
        await this.webelementactionObject.fillInTextBox(this.username,usernameData);
        await this.webelementactionObject.fillInTextBox(this.password,passwordData);
    }
    public async clickLogin():Promise<void>{
        await this.webelementactionObject.clickOnElement(this.loginBtn);
    }
    public async axeScanLoginpage():Promise<void>{
        await this.axescanObject.scanAndCreateAxeReport({useTags:true,tags:["wcag2a","wcag2aa","section508"]},"Login_Page");
    }
}