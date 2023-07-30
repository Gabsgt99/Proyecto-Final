import JWT from 'jsonwebtoken';

// Crea el token con la info enviada del registro por eso lo llamo payload
export const getToken = (payload) => {
    return JWT.sign({
        data:payload
    },  process.env.JWT_SECRET, { expiresIn:'48h'});
};

// Verificador de token (si es valido)
export const getTokenData = (token) => {
    const data = null;
    JWT.verify(token,process.env.JWT_SECRET, (error,decoded) => {
        if(error) {
            console.log(error);
        }else{
            data = decoded;
        }
    });
    return data;
};

