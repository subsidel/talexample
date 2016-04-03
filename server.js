const express = require('express')
const handlebars = require('express-handlebars')
const morgan = require('morgan')
const tal = require('tal')
const app = express()

app.use(morgan('combined'))
app.set('views', __dirname)

const hbs = handlebars.create({
  defaultLayout: 'index',
  extname: '.hbs',
  layoutsDir: __dirname,
  helpers: {
    json: context => JSON.stringify(context, null, 4)
  }
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')

app.use('/libs', express.static('./libs'))
app.use('/public', express.static('./public'))

app.get('/', function (req, res) {
  const deviceConfigName = `${req.query.brand}-${req.query.model}-default`

  const applicationId = 'sampleapp'
  const configPath = 'node_modules/tal/config'
  const antie = tal(configPath)
  const configString = antie.getConfigurationFromFilesystem(
    deviceConfigName,
     '/devices'
   ).replace(/%application%/g, applicationId)

  const deviceConfig = JSON.parse(configString)

  res.type(antie.getMimeType(deviceConfig))

  res.render('index', {
    dev: true,
    tal: {
      appBase: 'public',
      appId: applicationId,
      doctype: antie.getDocType(deviceConfig),
      rootTag: antie.getRootHtmlTag(deviceConfig),
      deviceHeaders: antie.getDeviceHeaders(deviceConfig),
      deviceBody: antie.getDeviceBody(deviceConfig),
      config: {
        framework: {
          deviceConfiguration: deviceConfig
        }
      }
    }
  })
})

app.listen('1337')
