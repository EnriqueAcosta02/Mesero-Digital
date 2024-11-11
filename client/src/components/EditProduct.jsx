import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Importar el archivo CSS

const EditProductFormCard = () => {
  const [category, setCategory] = useState('hamburguesas');
  const navigate = useNavigate(); // Usar useNavigate
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productDetails, setProductDetails] = useState({
    nombre: '',
    precio: '',
    ingredientes: [{ nombre: '', cantidad: '' }],
    tamaño: '',
    image: '',
  });

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:9999/productos/${category}`);
      const data = await response.json();
      console.log(`Datos para la categoría ${category}:`, data);
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Error al obtener los productos:', error);
      setProducts([]);
    }
  }, [category]);

  useEffect(() => {
    fetchProducts();
    setSelectedProduct(null);
    setProductDetails({
      nombre: '',
      precio: '',
      ingredientes: [{ nombre: '', cantidad: '' }],
      tamaño: '',
      image: '',
    });
  }, [category, fetchProducts]);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setProductDetails({
      ...product,
      ingredientes: product.ingredientes || [{ nombre: '', cantidad: '' }],
      image: product.image || '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails({ ...productDetails, [name]: value });
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...productDetails.ingredientes];
    updatedIngredients[index][field] = value;
    setProductDetails({ ...productDetails, ingredientes: updatedIngredients });
  };

  const addIngredient = () => {
    setProductDetails({
      ...productDetails,
      ingredientes: [...productDetails.ingredientes, { nombre: '', cantidad: '' }],
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductDetails({ ...productDetails, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

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
      fetchProducts();
      setSelectedProduct(null);
      setProductDetails({
        nombre: '',
        precio: '',
        ingredientes: [{ nombre: '', cantidad: '' }],
        tamaño: '',
        image: '',
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`http://localhost:9999/productos/${category}/${productId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        alert('Producto eliminado');
        fetchProducts();
      } else {
        alert('Error al eliminar el producto');
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  const goBackToCatalogo = () => {
    navigate('/catalogo');
  };

  return (
    <div className="edit-product-container">
      <h2>Editar Productos</h2>

      <label className="category-label">
        Categoría:
        <select value={category} onChange={handleCategoryChange} className="category-select">
          <option value="hamburguesas">Hamburguesas</option>
          <option value="lomitos">Lomitos</option>
          <option value="pizzas">Pizzas</option>
          <option value="bebidas">Bebidas</option>
        </select>
      </label>

      <div className="product-list">
        <h3>Productos en la categoría: {category}</h3>
        <div className="product-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <h4>{product.nombre}</h4>
              <p>Precio: ${product.precio}</p>
              <button onClick={() => handleEdit(product)} className="edit-button">Editar</button>
              <button onClick={() => handleDelete(product._id)} className="delete-button">Eliminar</button>
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <div className="form-container">
          <h3>Editar Producto: {selectedProduct.nombre}</h3>
          <form onSubmit={(e) => e.preventDefault()} className="product-form">
            <label className="form-label">
              Nombre del Producto:
              <input
                type="text"
                name="nombre"
                value={productDetails.nombre}
                onChange={handleChange}
                required
                className="form-input"
              />
            </label>

            {category === 'pizzas' && (
              <label className="form-label">
                Tamaño:
                <input
                  type="text"
                  name="tamaño"
                  value={productDetails.tamaño}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </label>
            )}

            <label className="form-label">
              Precio:
              <input
                type="number"
                name="precio"
                value={productDetails.precio}
                onChange={handleChange}
                required
                className="form-input"
              />
            </label>

            <label className="form-label">
              Foto del Producto:
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="form-input"
              />
              {productDetails.image && <img src={productDetails.image} alt="Producto" className="product-image" />}
            </label>

            {category !== 'bebidas' && (
              <>
                <label className="form-label">Ingredientes:</label>
                {productDetails.ingredientes.map((ingrediente, index) => (
                  <div key={index} className="ingredient-container">
                    <input
                      type="text"
                      placeholder="Nombre del ingrediente"
                      value={ingrediente.nombre}
                      onChange={(e) => handleIngredientChange(index, 'nombre', e.target.value)}
                      required
                      className="form-input"
                    />
                    <input
                      type="text"
                      placeholder="Cantidad"
                      value={ingrediente.cantidad}
                      onChange={(e) => handleIngredientChange(index, 'cantidad', e.target.value)}
                      required
                      className="form-input"
                    />
                  </div>
                ))}
                <button type="button" onClick={addIngredient} className="add-ingredient-button">
                  Agregar Ingrediente
                </button>
              </>
            )}

            <div className="form-buttons">
              <button onClick={submitProduct} className="submit-button">Guardar Cambios</button>
            </div>
          </form>
        </div>
      )}

      <button type="button" onClick={goBackToCatalogo} className="back-button">Volver al Catálogo</button>
    </div>
  );
};

export default EditProductFormCard;
