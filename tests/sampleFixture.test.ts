import {test} from '../CustomWorld/fixturesExample';

test('test fixture',async ({loginPage},testInfo)=>{
        await loginPage.launchUrl();
        await loginPage.fillLoginCredentials();
        await loginPage.clickLogin();
        await loginPage.axeScanLoginpage();
});