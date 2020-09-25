
module.exports = {
	sendJobOfferPage(link, name) {
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Job offer letter</title>
        </head>
        <body>
                    <div class="welcome-page-container" style="width: 90%;
                    margin-left: 10%; ">
                        <div class="welcome-page-card" style="width: 500px; background:#4d4f53;  box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
                    color : azure; padding: 30px">
                            <h2 style="text-align: center;">A2ZWORK</h2>
                            <h3 style="text-align: center;">Accept this job offer</h3>
                            <h5>Dear, ${name}</h5>
                            <p>Let's get started on A2ZWORK, as per your application to the job this is an offer letter
                            on behalf of the client from A2ZWORK. Your application is
                            accepted by the client so we are sending this confirmation
                            mail to notify you</p>
                            <p>We at A2ZWORK take the trust and safety of our users seriously. We just need you to verify your email address by clicking the button below. This link will expire in 24 hours.</p>
                            <div class="verify-container" style="text-align: center">
                                <a href="${link}"><button class="verify-button" style="width: 300px ; padding: 10px; background: #fff200; outline: none;
                    border-radius: 8px; cursor: pointer;" value="">Accept</button>></a>
                            </div>
                            <p>Thanks for your time,</p>
                            <p><b>The A2ZWORK Team</b></p>
                            <p>If you have any issues confirming your email, we will be happy to help you. You can contact us on <b>rajakabhijeet6@gmail.com</b>.</p>
                        </div>
                    </div>
        </html>`
    }
}

