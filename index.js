const {NlpManager} = require ('node-nlp');
const express = require('express');
const manager = new NlpManager(({languages:['es']}));
const app = express();

// agregar inputs

manager.addDocument('es', 'Buen día','saludo');
manager.addDocument('es', 'Buenos días','saludo');
manager.addDocument('es', 'Buenas tardes','saludo');
manager.addDocument('es', 'Buenas noches','saludo');
manager.addDocument('es', 'hola','saludo');
manager.addDocument('es', 'Hey mano como estás','saludo');
manager.addDocument('es', 'Adios','despedida');
manager.addDocument('es', 'Hasta mañana','despedida');
manager.addDocument('es', 'Que estés bien','despedida');
manager.addDocument('es', 'Feliz día','despedida');


// agregar Respuestas

manager.addAnswer('es', 'despedida','Que te vaya bien');
manager.addAnswer('es', 'despedida','hasta luego');
manager.addAnswer('es', 'despedida','te deseo lo mejor');
manager.addAnswer('es', 'despedida','saludos a tu tía');
manager.addAnswer('es', 'despedida','Que la pases bueno');
manager.addAnswer('es', 'saludo','Buenos días también');
manager.addAnswer('es', 'saludo','Cómo va todo');
manager.addAnswer('es', 'saludo','Que mañana tan bonita');
manager.addAnswer('es', 'saludo','Hace un buen día hoy');

// entrenamiento del modelo

manager.train().then( async () =>{
    manager.save();
    // ruta y manejo del flujo
    app.get('/chatbot', async (req, res) => {
        let response = await manager.process('es',req.query.message);
        res.send(response.answer || 'Favor re define tu pregunta ya que no te entendí' );});

    app.listen(3000);

})