
import { records } from '../utilities/Datautilities/CSV'
import {test} from '../customworld/fixturesExample';


test.beforeEach(async ({ loginPage }) => {
    await loginPage.launchUrl();
});
const contentData = records('test-data/testDataCSV.csv');

for (const data of contentData) {
  test(`Login Test with ${data.username} and ${data.password}`, async ({loginPage}) => {
    console.log(`Executing test with username: ${data.username} and password: ${data.password}`);
    await loginPage.fillCredentials(data.username, data.password);
    await loginPage.clickLogin();
  });
}
