import { log } from 'console';
import { test } from '../CustomWorld/fixturesExample';
import credentials from '../test-data/credentials.json';
import { records } from '../utilities/datautilities/csv';

test.beforeEach(async ({ loginPage }) => {
    await loginPage.launchUrl();
});
test('Sample Application Login Test',async ({loginPage})=>{
        await loginPage.fillCredentials(credentials.username,credentials.password);
        await loginPage.clickLogin();
        await loginPage.axeScanLoginpage();
});


