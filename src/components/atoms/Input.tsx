// Input.tsx
// Componente atom - Input reutilizable con label y manejo de errores
// Extensible: acepta todos los atributos nativos de <input>

import type { InputProps } from '../../config/types';

/**
 * Componente Input reutilizable con label, error y texto de ayuda
 * @param label - Etiqueta del campo (opcional)
 * @param error - Mensaje de error de validación (opcional)
 * @param helperText - Texto de ayuda debajo del input (opcional)
 * @param className - Clases CSS adicionales (opcional)
 * @param ...props - Cualquier otro atributo nativo de input (type, placeholder, value, onChange, etc.)
 */
export default function Input({ 
  label, 
  error, 
  helperText, 
  className = '', 
  ...props 
}: InputProps) {
  
  // Estilos base del input
  const baseStyles = 'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors duration-200';
  
  // Estilos según estado (error o normal)
  const stateStyles = error 
    ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
    : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500';
  
  // Combinar estilos
  const inputClasses = `${baseStyles} ${stateStyles} ${className}`;
  
  return (
    <div className="w-full">
      {/* Label (si existe) */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      {/* Input field */}
      <input className={inputClasses} {...props} />
      
      {/* Mensaje de error (si existe) */}
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
      
      {/* Texto de ayuda (si existe y no hay error) */}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
}
