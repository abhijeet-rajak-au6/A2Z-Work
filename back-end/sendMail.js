const {createTransport} = require("nodemailer");
const { resendEmail } = require("./controllers/user/userController");
module.exports = {

      async mailConfig({html,newUser,subject}){

        console.log("------------------------")
        console.log(newUser,subject)

        console.log("new User=",newUser)



            const transport = createTransport({
                host:"smtp.gmail.com",
                port: 465,
                secure: true,
                debug:true,
                auth: {
                    user: process.env.GMAIL_USER,
                    pass: process.env.GMAIL_PWD,
                },
                tls: {
                    // do not fail on invalid certs
                    rejectUnauthorized: false
                }
            })
            const response = await transport.verify();
            console.log(response);
                const mail = await transport.sendMail({
    
    
                    from: process.env.GMAIL_USER,
                    to: newUser.userEmail,
                    subject,
                    // text:`Node Mailer is done bro your email:${newUser.companyEmail} password:${password}`
                    html
                })
            
    }
}