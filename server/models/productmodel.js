import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define el esquema para los ingredientes
const ingredienteSchema = new Schema({
    nombre: { type: String, required: true },
    cantidad: { type: String, required: true }
});

const hamburguesaSchema = new Schema({
    nombre: { type: String, required: true },
    ingredientes: [ingredienteSchema],
    precio: { type: Number, required: true }
});

const lomitoSchema = new Schema({
    nombre: { type: String, required: true },
    ingredientes: [ingredienteSchema],
    precio: { type: Number, required: true }
});

const pizzaSchema = new Schema({
    nombre: { type: String, required: true },
    tamaño: { type: String, required: true },
    ingredientes: [ingredienteSchema],
    precio: { type: Number, required: true }
});

const bebidaSchema = new Schema({
    nombre: { type: String, required: true },
    precio: { type: Number, required: true }
});

const CategoriaHamburguesa = mongoose.models.CategoriaHamburguesa || mongoose.model('CategoriaHamburguesa', hamburguesaSchema);
const CategoriaLomito = mongoose.models.CategoriaLomito || mongoose.model('CategoriaLomito', lomitoSchema);
const CategoriaPizza = mongoose.models.CategoriaPizza || mongoose.model('CategoriaPizza', pizzaSchema);
const CategoriaBebida = mongoose.models.CategoriaBebida || mongoose.model('CategoriaBebida', bebidaSchema);

const Producto = {
  hamburguesa: CategoriaHamburguesa,
  lomito: CategoriaLomito,
  pizza: CategoriaPizza,
  bebida: CategoriaBebida
};

export default Producto;
