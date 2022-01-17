const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(process.env.SEND_GRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        from: 'k.eoin2000@gmail.com',
        to: email,
        subject: 'Thanks for registering for the Task App',
        text: `Welcome to the task app ${name}. let me know how you get along with the app.`
    })
}

const sendCancelEmail = (email, name) => {
    sgMail.send({
        from: 'k.eoin2000@gmail.com',
        to: email,
        subject: 'Sorry to see you leave',
        text: `We are sorry to see you leave ${name}. please contact us to see if there is anything we can do to keep you as a customer`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}





