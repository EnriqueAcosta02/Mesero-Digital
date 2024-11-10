import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();  // Cargar las variables de entorno desde el archivo .env

const URI_MONGODB = process.env.MONGODB_URI;  // URI de conexión de MongoDB

async function conectarDB() {
  try {
    // Conectarse a MongoDB usando la URI almacenada en las variables de entorno
    await mongoose.connect(URI_MONGODB, {
      dbName: 'mesero-digital',  // Nombre de la base de datos
    });
    console.log("¡Conexión exitosa a MongoDB!");
  } catch (error) {
    console.error("Error al conectar a MongoDB", error);
    throw error;  // Lanza el error para que sea manejado por el servidor si ocurre un fallo
  }
}

export default conectarDB;  // Exporta la función para usarla en otros archivos
