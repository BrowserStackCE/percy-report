const fs = require('fs')
const ejs = require('ejs');
const path = require('path')
function HtmlReportGenerator(config,jsonReport){
    let { buildId,  downloadPath } = config
    let template_path = path.resolve(__dirname,'template/report.html')
    const template = fs.readFileSync(template_path,{encoding:'utf-8'}).toString()
    let htmlReport = ejs.render(template,{buildId,...jsonReport})
    fs.writeFileSync(`${downloadPath}/${buildId}/report.html`,htmlReport)
}

function HtmlSummary(summary,filename){
    let template_path = path.resolve(__dirname,'template/summary.html')
    const template = fs.readFileSync(template_path,{encoding:"utf-8"}).toString()
    let htmlSummary = ejs.render(template,summary)
    fs.writeFileSync(filename,htmlSummary)
}

module.exports.HtmlReportGenerator = HtmlReportGenerator
module.exports.HtmlSummary = HtmlSummary