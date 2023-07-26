import JWT from 'jsonwebtoken';

export const getToken = (payload) => {
    return JWT.sign({
        data:payload
    },  process.env.JWT_SECRET, { expiresIn:'24h'});
};

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