/**
 * 📘 ARCHIVO DE TIPOS TYPESCRIPT - CONFIGURACIÓN CENTRAL
 * ======================================================
 * 
 * PROPÓSITO:
 * Define TODAS las interfaces y tipos TypeScript del proyecto.
 * Es el "diccionario" que describe la estructura de datos y props.
 * 
 * VENTAJAS DE CENTRALIZAR TIPOS:
 * ✅ Evita duplicación de código
 * ✅ Facilita mantenimiento (un solo lugar para actualizar)
 * ✅ Proporciona autocompletado en el IDE
 * ✅ Detecta errores en tiempo de desarrollo
 * ✅ Documenta la estructura de la aplicación
 * 
 * ORGANIZACIÓN:
 * 1. Importaciones de React
 * 2. Interfaces de datos
 * 3. Tipos auxiliares
 * 4. Interfaces de componentes (Props)
 */

// 📦 IMPORTACIONES DE TIPOS DE REACT
import type { ReactNode, ButtonHTMLAttributes, InputHTMLAttributes } from 'react';

// ═══════════════════════════════════════════════════════════════════════════
// 🗂️ INTERFACES DE DATOS (MODELOS DE LA APLICACIÓN)
// ═══════════════════════════════════════════════════════════════════════════

// Las interfaces de datos se definirán aquí según las necesidades del proyecto

// ═══════════════════════════════════════════════════════════════════════════
// 🎯 TIPOS AUXILIARES (ENUMS Y UNIONS)
// ═══════════════════════════════════════════════════════════════════════════

// Los tipos auxiliares se definirán aquí según las necesidades del proyecto

// ═══════════════════════════════════════════════════════════════════════════
// 🧩 INTERFACES DE PROPS (COMPONENTES REUTILIZABLES)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * 🔘 BUTTONPROPS - Props del componente Button reutilizable
 * Extiende ButtonHTMLAttributes: hereda TODOS los atributos nativos de <button>
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

/**
 * ✏️ INPUTPROPS - Props del componente Input personalizado
 * Extiende InputHTMLAttributes: hereda todos los atributos nativos de <input>
 */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}