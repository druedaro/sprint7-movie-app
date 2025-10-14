// Button.tsx
// Componente atom - Botón reutilizable con diferentes variantes
// Extensible: acepta todos los atributos nativos de <button>

import type { ButtonProps } from '../../config/types';

/**
 * Componente Button reutilizable con variantes de estilo
 * @param variant - Estilo visual: 'primary' | 'secondary' | 'outline' | 'danger'
 * @param size - Tamaño: 'sm' | 'md' | 'lg'
 * @param children - Contenido del botón
 * @param className - Clases CSS adicionales (opcional)
 * @param ...props - Cualquier otro atributo nativo de button (onClick, disabled, etc.)
 */
export default function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '', 
  ...props 
}: ButtonProps) {
  
  // Estilos base que siempre se aplican
  const baseStyles = 'font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Estilos según la variante
  const variantStyles = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'bg-secondary-500 text-white hover:bg-secondary-600 focus:ring-secondary-500',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };
  
  // Estilos según el tamaño
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  // Combinar todos los estilos
  const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
  
  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
}
