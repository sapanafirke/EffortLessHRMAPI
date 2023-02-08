const sgMail = require('@sendgrid/mail')
const sendEmail = async options => {
 
sgMail.setApiKey(process.env.SENDGRID_API_KEY)  
  // 1) Define the email options
  
  const msg = {
    from: 'effortlesshrm2023@gmail.com',
    to: options.email,
    subject: options.subject,
    text: options.message
}
  // 2) Actually send the email
 
 sgMail
  .send(msg)
  .then((response) => {
    console.log(response[0].statusCode)
    console.log(response[0].headers)
  })
  .catch((error) => {
    console.error(error)
  })
};

module.exports = sendEmail;
