import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define el esquema para los ingredientes
const ingredienteSchema = new Schema({
    nombre: { type: String, required: true },
    cantidad: { type: String, required: true }
});

// Define los esquemas para cada tipo de producto
const hamburguesaSchema = new Schema({
    nombre: { type: String, required: true },
    ingredientes: [ingredienteSchema],
    precio: { type: Number, required: true },
    imagenUrl: { type: String, required: true } // Agregado campo para imagen
});

const lomitoSchema = new Schema({
    nombre: { type: String, required: true },
    ingredientes: [ingredienteSchema],
    precio: { type: Number, required: true },
    imagenUrl: { type: String, required: true } // Agregado campo para imagen
});

const pizzaSchema = new Schema({
    nombre: { type: String, required: true },
    tamaño: { type: String, required: true },
    ingredientes: [ingredienteSchema],
    precio: { type: Number, required: true },
    imagenUrl: { type: String, required: true } // Agregado campo para imagen
});

const bebidaSchema = new Schema({
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    imagenUrl: { type: String, required: true } // Agregado campo para imagen
});

// Modelos para las categorías
const CategoriaHamburguesa = mongoose.models.CategoriaHamburguesa || mongoose.model('CategoriaHamburguesa', hamburguesaSchema);
const CategoriaLomito = mongoose.models.CategoriaLomito || mongoose.model('CategoriaLomito', lomitoSchema);
const CategoriaPizza = mongoose.models.CategoriaPizza || mongoose.model('CategoriaPizza', pizzaSchema);
const CategoriaBebida = mongoose.models.CategoriaBebida || mongoose.model('CategoriaBebida', bebidaSchema);

// Exportamos los modelos
const Producto = {
    hamburguesa: CategoriaHamburguesa,
    lomito: CategoriaLomito,
    pizza: CategoriaPizza,
    bebida: CategoriaBebida
};

export default Producto;
