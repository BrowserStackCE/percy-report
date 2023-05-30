const { Generate,Summary } = require('../../src');
const {expect} = require('chai')
const fs = require('fs')
const {getLatestBuildID} = require('../util/getLatestBuildID')

describe('Report to be generated',()=>{
    it('verifes if App Percy report is generated in the ./Reports directory', async () =>{
        let percyToken = process.env.APP_PERCY_TOKEN;
        let projectID='394074'
        let buildId = await getLatestBuildID(percyToken, projectID);
        await Generate({percyToken: percyToken,buildId:buildId, downloadPath: './Reports', downloadImages: false})
        expect(fs.existsSync(`./Reports/${buildId}`)).true
        expect(fs.existsSync(`./Reports/${buildId}/app-report.html`)).true
        expect(fs.existsSync(`./Reports/${buildId}/report.json`)).true

    }).timeout(50000);
});