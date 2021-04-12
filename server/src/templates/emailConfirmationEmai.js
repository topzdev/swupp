module.exports = ({ firstname, email, link }) => {
  return `
    <body style="background-color: #eaebed; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">

    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; background-color: #eaebed; width: 100%;" width="100%" bgcolor="#eaebed">
        <tr>
            <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
            <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; max-width: 580px; padding: 10px; width: 580px; Margin: 0 auto;" width="580" valign="top">
                <div class="header" style="padding: 20px 0;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; width: 100%;">
                        <tr>
                            <td class="align-center" width="100%" style="font-family: sans-serif; font-size: 14px; vertical-align: top; text-align: center;" valign="top" align="center">
                                <img src="https://res.cloudinary.com/topzdev/image/upload/v1618224122/swupp-prod/public/logo_x80_bw2osb.png" height="40" alt="swupp" style="border: none; -ms-interpolation-mode: bicubic; max-width: 100%;">
                                <span class="welcome-title" style="font-size: 35px; padding-top: 0.5em; font-weight: 700; font-style: unset; color: #010739;">Welcome to Swupp</span>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">

                    <table role="presentation" class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; background: #ffffff; border-radius: 3px; width: 100%;" width="100%">

                        <tr>
                            <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;" valign="top">
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; width: 100%;" width="100%">
                                    <tr>
                                        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">
                                            <div class="nav-intro" style="background-color: #010739; color: white; width: 100%; font-size: 20px; font-weight: 600; padding: 1rem 1.4rem; margin-left: -1.4rem; margin-top: -1.5rem; margin-bottom: 2rem;">
                                                Thank you for signing up with Swupp!
                                            </div>
                                            <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Hi ${firstname},</p>
                                            <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Welcome to Swupp. We just want to say thank you and let you know we're here for you, whatever you need.</p>
                                            <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Please check your inbox and spam folder. </p>
                                            <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">We look forward to help you in a better way.</p>
                                            <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;"> Best, </p>
                                            <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">The Swupp Team</p>
                                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; box-sizing: border-box; width: 100%;" width="100%">

                                                <tbody>
                                                    <tr><img src="https://res.cloudinary.com/topzdev/image/upload/v1618224122/swupp-prod/public/add-post-illustration_brjghm.jpg" alt style="border: none; -ms-interpolation-mode: bicubic; max-width: 100%;"></tr>
                                                    <tr>

                                                        <td align="center" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;" valign="top">
                                                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: auto; width: auto;">
                                                                <tbody>
                                                                    <tr>
                                                                        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; border-radius: 5px; text-align: center; background-color: #FFA41B;" valign="top" align="center" bgcolor="#FFA41B"> 
                                                                        <a href="${link}" target="_blank" style="border: solid 1px #FFA41B; border-radius: 5px; box-sizing: border-box; cursor: pointer; display: inline-block; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-decoration: none; text-transform: capitalize; background-color: #FFA41B; border-color: #FFA41B; color: #ffffff;">Verify My Account</a> </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                        
                                                    </tr>
                                                    
                                                    
                                                   
                                                </tbody>
                                                
                                            </table>
                                             
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
       
                        <!-- END MAIN CONTENT AREA -->
                    </table>

                    <!-- START FOOTER -->
                    <div class="footer" style="background-color: #121212; clear: both; Margin-top: 10px; text-align: center; width: 100%;">
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; width: 100%;" width="100%">
                            <tr>
                                <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #dededf; font-size: 12px; text-align: center;" valign="top" align="center">
                                    <span class="apple-link" style="color: #dededf; font-size: 12px; text-align: center;">© 2021 Swupp</span>
                                    <br> <a href="#" style="text-decoration: underline; color: #dededf; font-size: 12px; text-align: center;"> Terms And Conditions </a>| <a href="#" style="text-decoration: underline; color: #dededf; font-size: 12px; text-align: center;"> Privacy Policy </a> | <a href="#" style="text-decoration: underline; color: #dededf; font-size: 12px; text-align: center;"> Sitemap </a>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <!-- END FOOTER -->

                    <!-- END CENTERED WHITE CONTAINER -->
                </div>
            </td>
            <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
        </tr>
    </table>
</body>
    `;
};
