import express from 'express';

//rest objrect
const app = express();

// rest api
app.get('/', (req,res) =>{
    res.send({
        message: 'Bienvenido al gestor de salas'
    });
});

//PORT
const PORT = 8080;

//run listen
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});