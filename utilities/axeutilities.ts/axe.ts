import { getAxeResults, injectAxe } from 'axe-playwright';
import { Page } from 'playwright';
import { test } from '@playwright/test';
import { createHtmlReport } from "axe-html-reporter";
import AxeBuilder from '@axe-core/playwright';
import { logger } from '../logutilities/logger';

export class AxeUtilites {
  public page: Page;
  static pageName: string;
  constructor(page: Page) {
    this.page = page;
  }

  public async inject(): Promise<void> {
    try {
      await injectAxe(this.page);//inbuilt method from axe-playwright to inject axe script into page need to perform scan after page loads
      console.log('Axe injected successfully');
    } catch (error) {
      console.error('Failed to inject Axe:', error);
      throw error;
    }
  }
/**
 * 
 * @returns results that gives list of violations in page after scanning
 */
  public async axeScanPageWithOutTags(): Promise<any> {
    await this.inject();
    const results: any = await getAxeResults(this.page);//inbuilt method from axe-playwright to get axe results
    return results;
  }

/** * 
 * @param tags is an array of string that takes tags to scan e.g. ["wcag2a","wcag2aa","section508"]
 * @returns results that gives list of violations in page after scanning with specific tags
 */  
  public async axeScanPageWithTags(tags:string[]): Promise<any> {
    const axeResults: any = await new AxeBuilder({ page: this.page })//inbuilt method from axe-core/playwright to build custom axe scan
      .withTags(tags)
      .analyze();
    return axeResults;
  }

/**
 * 
 * @param option is a parameter that takes object 
 * 1)  want to enable tags to scan ensure provide true or false 
 * 2)what type of tags to scan like e.g. ["wcag2a","wcag2aa","section508"] etc
 * @returns  nothing but creates an axe html report in the specified location      
 */
  public async scanAndCreateAxeReport(option:{useTags:boolean,tags:string[]},pagename:string): Promise<void> {
    if (process.env.AXETOGGLE == 'true') {
   await test.step(`Performing Axe Scan on page: ${pagename}`, async () => { 
      createHtmlReport({
        results: (option.useTags==true)?await this.axeScanPageWithTags(option.tags):await this.axeScanPageWithOutTags(),
        options:
        {
          doNotCreateReportFile: false,
          reportFileName: `${pagename}-accessibility-report.html`,
          outputDir: './accessibility-reports/html'
        }
      })
      logger.info(`*****Axe Scan completed and report generated for ${pagename}*****`);
    });
  }
    else{
      logger.info("*****Axe Scan is disabled , to enable set AXETOGGLE=true in .env file*****");
    }
  }

}