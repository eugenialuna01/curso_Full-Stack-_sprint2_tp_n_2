//Conexión a la base de datos
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Grupo-06:grupo06@cursadanodejs.ls9ii.mongodb.net/Node-js', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conexión exitosa a MongoDB'))
.catch(error => console.error('Error al conectar a MongoDB:', error));

//Definir esquema y un modelo de superheroes
const superheroSchema = new mongoose.Schema(
  {
    nombreSuperHeroe: { type: String, required: true },
    nombreReal: { type: String, required: true },
    edad: { type: Number, min: 0 },
    planetaOrigen: { type: String, default: 'Desconocido' },
    debilidad: String,
    poderes: [String],
    aliados: [String],
    enemigos: [String],
    createdAt: { type: Date, default: Date.now },
    creador: String
  },
  {
    collection: 'Grupo-06'  // Reemplazá 'Grupo-06' por el nombre real de tu colección si lo necesitás
  }
);

const SuperHero = mongoose.model('SuperHero', superheroSchema);

//Insertar un nuevo superheroe
async function insertSuperHero() {
  const hero = new SuperHero({
    nombreSuperHeroe: 'Spiderman',
    nombreReal: 'Peter Parker',
    edad: 25,
    planetaOrigen: 'Tierra',
    debilidad: 'Radioactiva',
    poderes: ['Trepar paredes', 'Sentido arácnido', 'Super fuerza', 'Agilidad'],
    aliados: ['Ironman'],
    enemigos: ['Duende Verde'],
    creador: 'Eugenia'
  });

  await hero.save();
  console.log('Superhéroe insertado:', hero);
}

insertSuperHero();

//Actualizar un superheroe
async function updateSuperHero(nombreSuperHeroe) {
    const result = await SuperHero.updateOne(
    { nombreSuperHeroe: nombreSuperHeroe },
    { $set: { edad: 26 } }
  );

  console.log('Resultado de la actualización:', result);
}

updateSuperHero('Spiderman');

//Eliminar un superheroe
async function deleteSuperHero(nombreSuperHeroe) {
  const result = await SuperHero.deleteOne({ nombreSuperHeroe: nombreSuperHeroe });
  console.log('Superhéroe eliminado:', result);
}

deleteSuperHero('Spiderman');

//Buscar todos los superheroes
async function findSuperHeroes() {
  const heroes = await SuperHero.find({ planetaOrigen: 'Tierra' });
  console.log('Superhéroes encontrados:', heroes);
}

findSuperHeroes();