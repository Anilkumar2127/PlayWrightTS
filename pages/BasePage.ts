import { WebElementAction } from "../utilities/webUtilities/elementAction";
import { AxeUtilites } from "../utilities/axeutilities.ts/axe";
import { ScreenShotAction } from "../utilities/webUtilities/screenShotAction";
import { browserUtiles } from "../utilities/browser/browserUtiles";
import { Page } from "playwright/test";


export class BasePage{
    public webelementactionObject:WebElementAction;
    public axescanObject:AxeUtilites;
    public screenShotActionObject:ScreenShotAction;
    public pageUtilesObject:browserUtiles;
  
    constructor(page:Page){
        this.webelementactionObject = new WebElementAction(page);
        this.axescanObject=new AxeUtilites(page);
        this.screenShotActionObject=new ScreenShotAction(page)
        this.pageUtilesObject=new browserUtiles(page);

    }
}