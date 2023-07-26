import nodemailer from 'nodemailer';

const mail = {
    user: process.env.FROM_EMAIL,
    pass: process.env.PASS_FE
}; 

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    service:'gmail',
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'test.devlop01@gmail.com',//mail.user,
      pass: 'mupwzsvmqqhvpujm'//mail.pass,
    },
  });
  
  export const sendEmail = async (email,subject,html) => {
    try {
        await transporter.sendMail({
            from: `Factoria F5 <${ mail.user }>`, // sender address
            to: email, // list of receivers
            subject, // Subject line
            html, // html body
          });
    console.log(html);
    } catch (error) {
        console.log(error, 'Algo salió mal con el email');
        //console.log(process.env.FROM_EMAIL);
    }
};
export const getTemplate = (name, token) => {
    return`
        <head>
        </head>

        <div id="email___content">
            <img src="https://factoriaf5.org/wp-content/uploads/2021/07/logo.png" alt="">
            <h2>Hola ${ name }!</h2>
            <p>Enhorabuena,
            has sido registrado exitosamente en la
            aplicación de gestión de salas de
            Factoria F5, para poder ingresar a la
            aplicación debes confirmar tu registro y
            crear tu contraseña.</p>
            <a
                href="http://localhost:8080/api/v1/auth/confirm/${token}"
                target="_blank"
            >Confirmar Cuenta</a>
        </div>
    `;
};
