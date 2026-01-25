import { WebElementAction } from "../utilities/WebUtilities/ElementAction";
import { AxeUtilites } from "../utilities/Axeutilities.ts/AxeUtilities";
import { ScreenShotAction } from "../utilities/WebUtilities/ScreenShotAction";
import { BrowserUtiles } from "../utilities/Browser/BrowserUtiles";
import { Page } from "playwright/test";


export class BasePage{
    public webelementactionObject:WebElementAction;
    public axescanObject:AxeUtilites;
    public screenShotActionObject:ScreenShotAction;
    public pageUtilesObject:BrowserUtiles;
  
    constructor(page:Page){
        this.webelementactionObject = new WebElementAction(page);
        this.axescanObject=new AxeUtilites(page);
        this.screenShotActionObject=new ScreenShotAction(page)
        this.pageUtilesObject=new BrowserUtiles(page);

    }
}