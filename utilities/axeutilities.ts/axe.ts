import { getAxeResults, injectAxe } from 'axe-playwright';
import { Page } from 'playwright';
import { createHtmlReport } from "axe-html-reporter";
import AxeBuilder from '@axe-core/playwright';

export class AxeUtilites {
  public page: Page;
  public pageName: string;
  constructor(page: Page, pageName: string) {
    this.page = page;
    this.pageName = pageName;
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
    const results: any = (await getAxeResults(this.page));//inbuilt method from axe-playwright to get axe results
    return results;
  }
/**
 * 
 * @param option is a parameter that takes object 
 * 1)  want to enable tags to scan ensure provide true or false 
 * 2)what type of tags to scan like e.g. ["wcag2a","wcag2aa","section508"] etc
 * @returns  nothing but creates an axe html report in the specified location      
 */
  public async createAxeReport(option:{useTags:boolean,tags:string[]}): Promise<void> {
    if (process.env.AXETOGGLE == 'true') {
      createHtmlReport({
        results: (option.useTags==true)?await this.axeScanPageWithTags(option.tags):await this.axeScanPageWithOutTags(),
        options:
        {
          doNotCreateReportFile: false,
          reportFileName: `${this.pageName}-accessibility-report.html`,
          outputDir: './accessibility-reports/html'
        }
      })
    }
    else{
      console.log("*****Axe Scan is disabled , to enable set AXETOGGLE=true in .env file*****");
    }
  }

  public async axeScanPageWithTags(tags:string[]): Promise<any> {
    const axeResults: any = await new AxeBuilder({ page: this.page })
      .withTags(tags)
      .analyze();
    return axeResults;
  }
}