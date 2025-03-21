const volunteerInviteTemplate = (volunteerName, eventName, registerLink, eventPage) => {
	return `<!DOCTYPE html>
	<html>
	
	<head>
		<meta charset="UTF-8">
		<title>Invitation to Volunteer in ${eventName}</title>
		<style>
			body {
				background-color: #fffff0;
				font-family: Arial, sans-serif;
				font-size: 16px;
				line-height: 1.4;
				color: #333333;
				margin: 0;
				padding: 0;
			}
	
			.container {
				max-width: 600px;
				margin: 0 auto;
				padding: 20px;
				text-align: center;
			}
	
			.logo {
				max-width: 200px;
				margin-bottom: 20px;
			}
	
			.message {
				font-size: 18px;
				font-weight: bold;
				margin-bottom: 20px;
			}
	
			.body {
				font-size: 16px;
				margin-bottom: 20px;
			}
	
			.cta {
				display: inline-block;
				padding: 10px 20px;
				background-color: #FFD60A;
				color: #000000;
				text-decoration: none;
				border-radius: 5px;
				font-size: 16px;
				font-weight: bold;
				margin-top: 20px;
			}
	
			.support {
				font-size: 14px;
				color: #999999;
				margin-top: 20px;
			}
		</style>
	
	</head>
	
	<body>
		<div class="container">
			<a href="https://samarthanam.org/"><img class="logo"
					src="https://samarthanam.org/wp-content/uploads/2023/10/samarthanam-logo.jpg" alt="Samarthanam Logo"></a>
			<div class="message">Samarthanam Volunteer Invitation</div>
			<div class="body">
				<p>Dear ${volunteerName},</p>
                <p>Based on your past volunteering experiences that you have with Samarthanam, we would like to cordially invite you
                to participate in "${eventName}".</p>
                <p>You may register as a volunteer <a href="${registerLink}">here</a></p>
                <p>For more details about the event you may visit <a href="${eventPage}">here</a>.</p>
			</div>
			<div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
					hregister="mailto:samarthanam@gmail.com">samarthanam@gmail.com</a>. We are here to help!</div>
		</div>
	</body>
	
	</html>`;
};
module.exports = volunteerInviteTemplate;
