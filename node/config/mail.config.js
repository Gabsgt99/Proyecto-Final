import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
//configure env
dotenv.config();

const mail = {
    user: process.env.FROM_EMAIL,
    pass: process.env.PASS_FE
}; 
console.log(mail);
const transporter = nodemailer.createTransport({
    port: 587,
    service:'gmail',
    auth: {
        user: mail.user,
        pass: mail.pass,
    },
});

export const sendEmail = async (email,subject, html) => {
    try {
        await transporter.sendMail({
            from: `Factoria F5 <${ mail.user }>`, // sender address
            to: "test.workdev@yopmail.com", // list of receivers
            subject: subject, // Subject line
            html: html, // html body
        });
    } catch (error) {
        console.log(error, 'Algo salió mal con el email');
    }
};
export const getTemplate = (user) => {
    return `
        <!DOCTYPE html>
            <html>
                <head>
                    <style>
                    /* Agrega estilos en línea aquí para mejorar la presentación del correo */
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        background-color: #f1f1f1;
                        color: #333;
                        padding: 20px;
                    }
                    #email___content {
                        background-color: #fff;
                        padding: 20px;
                        border-radius: 5px;
                        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    }
                    img {
                        max-width: 100%;
                        height: auto;
                    }
                    a {
                        color: #007bff;
                        text-decoration: none;
                    }
                    </style>
                </head>

                <body>
                    <div id="email___content">
                    <img src="https://factoriaf5.org/wp-content/uploads/2021/07/logo.png" alt="">
                    <h2>Hola ${user.name}!</h2>
                    <p>
                        Has sido registrado exitosamente en la aplicación de gestión de salas de Factoria F5.
                        Para poder ingresar a la aplicación, debes confirmar tu registro y crear tu contraseña
                        haciendo clic en el siguiente enlace:
                    </p>
                    <a href="http://localhost:3000/forgotpassword?id=${user.id}&token=${user.token}" target="_blank">Confirmar Cuenta</a>
                    </div>
                </body>
            </html>
        `;
};
