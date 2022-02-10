const emailConfig = require('../config/email')
const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')

const sendEmail = async options => {
  let transporter = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    secure: false, // true for 465, false for other ports
    auth: {
      user: emailConfig.user, // generated ethereal user
      pass: emailConfig.pass // generated ethereal password
    }
  })

  // usage template of handlebars
  transporter.use(
    'compile',
    hbs({
      viewEngine: {
        extname: '.handlebars', // handlebars extension
        layoutsDir: 'views/emails/', // location of handlebars templates
        defaultLayout: 'reset-by-email' // name of main template
      },
      viewPath: 'views/emails',
      extName: '.handlebars'
    })
  )

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"devJobs 👻" <noreply@devjobs.com>', // sender address
    to: options.user.email, // list of receivers
    subject: options.subject, // Subject line
    template: options.template,
    context: {
      resetUrl: options.resetUrl
    }
  })

  return info
}

module.exports = sendEmail
