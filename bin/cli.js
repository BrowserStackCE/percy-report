#!/usr/bin/env node
const { Command } = require('commander');
const { Generate } = require('../src');
const program = new Command();

program.name('percy-report')
.description('Generate Percy Reports & Download Images Locally')
.version('0.0.1')

program.command('generate')
.description('Genetate Report')
.argument('<buildId>')
.option('--percy-token <percyToken>',"Percy ReadOnly or FullAccess Token",process.env.PERCY_TOKEN)
.option('--download-path <downloadPath>',"Directory path where to generate the report","./Report")
.option('--download-images',"If True Images will be downloaded",false)
.action(async (args,options)=>{
  await Generate({buildId:args,...options})
})

program.parse()