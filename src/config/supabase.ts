/**
 * 🗄️ CONFIGURACIÓN DE SUPABASE CLIENT
 * ====================================
 * 
 * PROPÓSITO:
 * Inicializa y exporta el cliente de Supabase para usar en toda la app.
 * Este archivo centraliza la configuración de Supabase.
 * 
 * USO:
 * import { supabase } from '@/config/supabase';
 * 
 * VARIABLES DE ENTORNO NECESARIAS:
 * - VITE_SUPABASE_URL: URL de tu proyecto Supabase
 * - VITE_SUPABASE_ANON_KEY: Anon/Public key de tu proyecto
 * 
 * Estas variables deben estar en el archivo .env.local
 */

import { createClient } from '@supabase/supabase-js';

// Obtener variables de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validar que las variables existan
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. ' +
    'Please check your .env.local file and ensure ' +
    'VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.'
  );
}

// Crear y exportar el cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
