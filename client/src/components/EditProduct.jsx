import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const [category, setCategory] = useState('hamburguesas');
  const navigate = useNavigate(); // Usar useNavigate
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productDetails, setProductDetails] = useState({
    nombre: '',
    precio: '',
    ingredientes: [{ nombre: '', cantidad: '' }],
    tamaño: '',
    image: '', // Nuevo campo para la imagen
  });

  // Obtener productos por categoría (envuelto en useCallback)
  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:9999/productos/${category}`);
      const data = await response.json();
      console.log(`Datos para la categoría ${category}:`, data);
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        setProducts([]); // Si los datos no son un array, establecer lista vacía
      }
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      setProducts([]);  // Asegúrate de manejar el error y no dejar el estado undefined
    }
  }, [category]);

  // Ejecutar fetch cuando la categoría cambia
  useEffect(() => {
    fetchProducts();
    // Limpiar los datos de edición al cambiar de categoría
    setSelectedProduct(null);
    setProductDetails({
      nombre: '',
      precio: '',
      ingredientes: [{ nombre: '', cantidad: '' }],
      tamaño: '',
      image: '', // Limpiar la imagen al cambiar de categoría
    });
  }, [category, fetchProducts]);

  // Manejar cambio de categoría
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  // Manejar selección de producto para edición
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setProductDetails({
      ...product,
      ingredientes: product.ingredientes || [{ nombre: '', cantidad: '' }],
      image: product.image || '', // Cargar la imagen si existe
    });
  };

  // Manejar cambios en los campos de producto editado
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails({ ...productDetails, [name]: value });
  };

  // Manejar cambios en los ingredientes
  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...productDetails.ingredientes];
    updatedIngredients[index][field] = value;
    setProductDetails({ ...productDetails, ingredientes: updatedIngredients });
  };

  // Función para agregar un nuevo ingrediente
  const addIngredient = () => {
    setProductDetails({
      ...productDetails,
      ingredientes: [...productDetails.ingredientes, { nombre: '', cantidad: '' }],
    });
  };

  // Función para manejar la carga de la imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductDetails({ ...productDetails, image: reader.result }); // Guardar la URL base64 de la imagen
      };
      reader.readAsDataURL(file); // Leer la imagen como una URL base64
    }
  };

  // Enviar los cambios de producto
  const submitProduct = async () => {
    try {
      const url = `http://localhost:9999/productos/${category}/${selectedProduct._id}`;
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productDetails),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el producto');
      }

      alert('Producto actualizado con éxito');
      fetchProducts(); // Recargar productos después de editar
      setSelectedProduct(null); // Limpiar producto seleccionado
      setProductDetails({
        nombre: '',
        precio: '',
        ingredientes: [{ nombre: '', cantidad: '' }],
        tamaño: '',
        image: '',
      }); // Limpiar formulario
    } catch (error) {
      console.error(error.message);
    }
  };

  // Eliminar producto
  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`http://localhost:9999/productos/${category}/${productId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        alert('Producto eliminado');
        fetchProducts(); // Recargar productos después de eliminar
      } else {
        alert('Error al eliminar el producto');
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  // Función para navegar de vuelta al catálogo
  const goBackToCatalogo = () => {
    navigate('/catalogo'); // Asegúrate de que esta es la ruta correcta
  };

  return (
    <div style={styles.container}>
      <h2>Editar Productos</h2>

      {/* Seleccionar categoría */}
      <label style={styles.label}>
        Categoría:
        <select value={category} onChange={handleCategoryChange} style={styles.input}>
          <option value="hamburguesas">Hamburguesas</option>
          <option value="lomitos">Lomitos</option>
          <option value="pizzas">Pizzas</option>
          <option value="bebidas">Bebidas</option>
        </select>
      </label>

      {/* Lista de productos */}
      <div style={styles.productList}>
        <h3>Productos en la categoría: {category}</h3>

        <div style={styles.productGrid}>
          {products.map((product) => (
            <div key={product._id} style={styles.productCard}>
              <h4>{product.nombre}</h4>
              <p>Precio: ${product.precio}</p>
              <button onClick={() => handleEdit(product)} style={styles.editButton}>
                Editar
              </button>
              <button onClick={() => handleDelete(product._id)} style={styles.deleteButton}>
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Formulario para editar producto */}
      {selectedProduct && (
        <div style={styles.formContainer}>
          <h3>Editar Producto: {selectedProduct.nombre}</h3>
          <form onSubmit={(e) => e.preventDefault()} style={styles.form}>
            <label style={styles.label}>
              Nombre del Producto:
              <input
                type="text"
                name="nombre"
                value={productDetails.nombre}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </label>

            {category === 'pizzas' && (
              <label style={styles.label}>
                Tamaño:
                <input
                  type="text"
                  name="tamaño"
                  value={productDetails.tamaño}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </label>
            )}

            <label style={styles.label}>
              Precio:
              <input
                type="number"
                name="precio"
                value={productDetails.precio}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </label>

            {/* Cargar foto */}
            <label style={styles.label}>
              Foto del Producto:
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={styles.input}
              />
              {productDetails.image && (
                <img
                  src={productDetails.image}
                  alt="Producto"
                  style={{ width: '100px', marginTop: '10px' }}
                />
              )}
            </label>

            {/* Mostrar ingredientes solo si no es una bebida */}
            {category !== 'bebidas' && (
              <>
                <label style={styles.label}>Ingredientes:</label>
                {productDetails.ingredientes.map((ingrediente, index) => (
                  <div key={index} style={styles.ingredientContainer}>
                    <input
                      type="text"
                      placeholder="Nombre del ingrediente"
                      value={ingrediente.nombre}
                      onChange={(e) => handleIngredientChange(index, 'nombre', e.target.value)}
                      required
                      style={styles.input}
                    />
                    <input
                      type="text"
                      placeholder="Cantidad"
                      value={ingrediente.cantidad}
                      onChange={(e) => handleIngredientChange(index, 'cantidad', e.target.value)}
                      required
                      style={styles.input}
                    />
                  </div>
                ))}
                <button type="button" onClick={addIngredient} style={styles.addButton}>
                  Agregar Ingrediente
                </button>
              </>
            )}

            {/* Botones de acción */}
            <div style={styles.buttonsContainer}>
              <button onClick={submitProduct} style={styles.submitButton}>
                Guardar Cambios
              </button>
              
            </div>
          </form>
        </div>
      )}
      <button type="button" onClick={goBackToCatalogo} style={styles.backButton}>
                Volver al Catálogo
              </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  label: {
    marginBottom: '10px',
    fontSize: '14px',
    fontWeight: 'bold',
  },
  input: {
    padding: '10px',
    width: '300px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  productList: {
    marginBottom: '20px',
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
  },
  productCard: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    textAlign: 'center',
  },
  editButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  formContainer: {
    width: '100%',
    maxWidth: '600px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  buttonsContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  backButton: {
    backgroundColor: '#ccc',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  addButton: {
    backgroundColor: '#2196F3',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  ingredientContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '10px',
  },
};

export default EditProduct;
