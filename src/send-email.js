var nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
    host: 'smtp.exmail.qq.com', // SMTP address
    port: 465, // SMTP port
    auth: {
      user: 'shupeipei@zyeeda.com', // username
      pass: 'Andylau1989' // password
    }
})

var mailOptions = {
  from: 'shupeipei@zyeeda.com', // sender address
  to: '576507045@qq.com', // list of receivers
  subject: 'Hello', // Subject line
  text: 'Hello world', // plaintext body
  html: '<b>Hello world </b>' // html body
}

transporter.sendMail(mailOptions, function(error, info){
  if(error){
    console.log('something wrong with: ', error);
  }else{
    console.log('message sent successful.');
  }
  smtpTransport.close(); // close connection pool.
})
