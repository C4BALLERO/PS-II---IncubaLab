import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { categoryService } from '../../../services/api';

const SearchBar = ({ onSearch, onCategoryChange }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const response = await categoryService.getCategories();
        if (response.success) {
          setCategories(response.data);
        }
      } catch (error) {
        console.error('Error loading categories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  return (
    <div style={{
      display: 'flex',
      gap: '1rem',
      marginBottom: '2rem',
      flexWrap: 'wrap',
      alignItems: 'center'
    }}>
      {/* Dropdown de categoría */}
      <select 
        style={{
          padding: '12px 16px',
          border: '1px solid #F5F5F5',
          borderRadius: '8px',
          backgroundColor: '#F5F5F5',
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: '1rem',
          minWidth: '200px',
          color: '#000000'
        }} 
        onChange={onCategoryChange}
        disabled={loading}
      >
        <option value="">
          {loading ? 'Cargando categorías...' : 'Buscar por categoría -'}
        </option>
        {categories.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>

      {/* Input de búsqueda */}
      <input
        type="text"
        placeholder="Buscar"
        style={{
          flex: 1,
          padding: '12px 16px',
          border: '1px solid #66B5CB',
          borderRadius: '8px',
          backgroundColor: '#66B5CB',
          fontFamily: "'Be Vietnam Pro', sans-serif",
          fontSize: '1rem',
          minWidth: '200px',
          color: '#000000'
        }}
        onChange={(e) => onSearch(e.target.value)}
      />

      {/* Botón de búsqueda */}
      <button style={{
        backgroundColor: '#880430',
        color: '#FFFFFF',
        border: 'none',
        padding: '12px 20px',
        borderRadius: '8px',
        fontSize: '1rem',
        fontFamily: "'Be Vietnam Pro', sans-serif",
        fontWeight: '500',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        transition: 'all 0.3s ease'
      }}>
        <FaSearch />
        Buscar
      </button>
    </div>
  );
};

export { SearchBar };
export default SearchBar;
