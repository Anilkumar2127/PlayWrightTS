import { Locator, Page, test } from "@playwright/test";
import { logger } from "../logutilities/logger";
import { log } from "console";

export class WebElementAction {
    private readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    /*** * Fills a text box specified by a selector or Locator with the provided data.
         * @param selector is the selector string or Locator of the text box
         * @param data is the string data to fill in the text box
         * @returns Promise that resolves when the fill action is complete.
         */
    public async fillInTextBox(selector: Locator | string, data: string): Promise<void> {
        await test.step(`Filling text box in ${selector} with data: ${data}`, async () => {
            if (typeof selector == 'string') {
                await this.page.locator(selector).fill(data);
            } else {
                await selector.fill(data);
            }
        })
    }

    /**
     *  Clicks on an element specified by a selector or Locator.
     * @param selector is the selector string or Locator of the element to be clicked
     * @returns Promise that resolves when the click action is complete.
     */
    public async clickOnElement(selector: string | Locator): Promise<void> {
       await test.step(`Clicking on element: ${selector}`, async () => {
            if (typeof selector === 'string') {
                await this.page.locator(selector).click();
            } else {
                await selector.click();
            }
        });
    }
    /**
     * Clicks on an element to initiate a file download and saves it to the specified path.
     * @param selector is the string or Locator to be clicked to start the download
     * @param downloadPath is the path location where the file will be saved
     * 
     */
    public async downloadFile(selector: string | Locator, downloadPath: string): Promise<void> {
        await test.step(`Downloading file by clicking on element: ${selector}`, async () => {
            const downloadPromise = this.page.waitForEvent('download');
            await this.clickOnElement(selector);
            const download = await downloadPromise;
            await download.saveAs(downloadPath);

        });
    }
    /**
     * Clicks on an element that triggers an alert dialog and accepts the alert.
     * @param selector is the string or locator to trigger an alert dialog
     * @returns Promise that resolves when the alert is accepted and the click action is complete.
     */
    public async acceptAlertAndClick(selector: string): Promise<void> {
        await test.step(`Clicking on element: ${selector} and accepting alert`, async () => {
            this.page.on('dialog', async (dialog) => {
                await dialog.accept();
            });
            await this.clickOnElement(selector);
        });
    }
    /**     * Uploads a file to an input element specified by a selector or Locator.
         * @param selector is the selector string or Locator of the input element
         * @param filePath is the path of the file to be uploaded
         * @returns Promise that resolves when the file upload is complete.
         */
    public async uploadFile(selector: string | Locator, filePath: string): Promise<void> {
       await test.step(`Uploading file: ${filePath} using selector: ${selector}`, async () => {
            if (typeof selector === 'string') {
                await this.page.locator(selector).setInputFiles(filePath);
            } else {
                await selector.setInputFiles(filePath);
            }
        });
    }
}
