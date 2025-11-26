
import { Locator,Page } from "@playwright/test";
import { AxeUtilites } from "../utilities/axeutilities.ts/axe";
import { logger } from "../utilities/logutilities.ts/logger";
import { log } from "console";

export class LoginPage{

    private readonly username:Locator;
    private readonly password:Locator;
    private readonly loginBtn:Locator;

    public axeUtitles:AxeUtilites ;
    constructor(public  page:Page){
        this.page=page;
        this.axeUtitles=new AxeUtilites(this.page,"Login_Page");
        this.username=this.page.locator("#input-email");
        this.password=this.page.locator("#input-password");
        this.loginBtn=this.page.locator("//*[@type='submit']")
    }

    public async launchUrl():Promise<void>{
        logger.info("Launching the URL");
        await this.page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");
    }
    public async fillLoginCredentials():Promise<void>{
        logger.info("Entering the username");
        await this.username.fill("A@A.A");
        logger.info("Entering the password");
        await this.password.fill("A@A.A");
    }
    public async clickLogin():Promise<void>{
        logger.info("Clicking on login button");
        await this.loginBtn.click();
    }
    public async axeScanLoginpage(){
        logger.info("Performing axe scan on login page");
        await this.page.waitForLoadState('networkidle');
        await this.axeUtitles.createAxeReport({useTags:false,tags:[]});
    }
}