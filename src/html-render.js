const fs = require('fs')
const ejs = require('ejs');
const path = require('path')

function HtmlReportGenerator(config, jsonReport, isApp) {
    if (isApp) {
        let {
            buildId,
            downloadPath
        } = config
        let template_path = path.resolve(__dirname, 'template/app-report.html')
        const template = fs.readFileSync(template_path, {
            encoding: 'utf-8'
        }).toString()
        let htmlReport = ejs.render(template, {
            buildId,
            ...jsonReport
        })
        fs.writeFileSync(`${downloadPath}/${buildId}/app-report.html`, htmlReport)
    } else {
        let {
            buildId,
            downloadPath
        } = config
        let template_path = path.resolve(__dirname, 'template/react-standalone.html')
        const template = fs.readFileSync(template_path, {
            encoding: 'utf-8'
        }).toString()
        let htmlReport = ejs.render(template, {
            data: {
                buildId,
                ...jsonReport
            }
        })
        fs.writeFileSync(`${downloadPath}/${buildId}/react-standalone.html`, htmlReport)
    }
}

function HtmlSummary(summary, filename, isApp) {
    if (isApp) {
        let template_path = path.resolve(__dirname, 'template/app-summary.html')
        const template = fs.readFileSync(template_path, {
            encoding: "utf-8"
        }).toString()
        try {
            let htmlSummary = ejs.render(template, summary)
            fs.writeFileSync(filename, htmlSummary)
        } catch (err) {
            console.log(err)
        }
    } else {
        let template_path = path.resolve(__dirname, 'template/summary.html')
        const template = fs.readFileSync(template_path, {
            encoding: "utf-8"
        }).toString()
        try {
            let htmlSummary = ejs.render(template, summary)
            fs.writeFileSync(filename, htmlSummary)
        } catch (err) {
            console.log(err)
        }
    }

}

module.exports.HtmlReportGenerator = HtmlReportGenerator
module.exports.HtmlSummary = HtmlSummary