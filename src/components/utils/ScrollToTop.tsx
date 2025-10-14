/**
 * ⬆️ SCROLLTOTOP - UTILIDAD DE NAVEGACIÓN
 * ========================================
 * 
 * Nivel: Principiante
 * 
 * PROPÓSITO:
 * Componente utilitario que automáticamente hace scroll al inicio
 * de la página cada vez que cambia la ruta.
 * 
 * PROBLEMA QUE RESUELVE:
 * Por defecto, al navegar entre rutas en una SPA (Single Page App),
 * la posición del scroll se mantiene. Esto es confuso para el usuario
 * porque al ir a una página nueva, ve el contenido a mitad de scroll.
 * 
 * SOLUCIÓN:
 * Este componente se ejecuta cada vez que pathname cambia (usando useEffect)
 * y automáticamente hace scroll al top (window.scrollTo(0, 0)).
 * 
 * USO:
 * Se coloca en App.tsx dentro del <Router>:
 * 
 * <BrowserRouter>
 *   <ScrollToTop />  ← Se ejecuta en cada cambio de ruta
 *   <Routes>
 *     <Route path="/" element={<WelcomePage />} />
 *     <Route path="/calculator" element={<CalculatorPage />} />
 *   </Routes>
 * </BrowserRouter>
 * 
 * CARACTERÍSTICAS:
 * ✅ No renderiza nada visible (return null)
 * ✅ Solo ejecuta el efecto secundario del scroll
 * ✅ Se activa automáticamente con cada navegación
 * ✅ Compatible con react-router-dom v6
 * 
 * NOTA TÉCNICA:
 * - useLocation() obtiene la ubicación actual (pathname, search, hash)
 * - useEffect se ejecuta cuando pathname cambia
 * - window.scrollTo(0, 0) mueve el scroll a coordenadas X:0, Y:0
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  // 📍 Obtiene la ubicación actual (pathname = ruta actual)
  const { pathname } = useLocation();

  // ⬆️ EFECTO: Scroll al top cuando cambia la ruta
  useEffect(() => {
    window.scrollTo(0, 0);  // X: 0 (izquierda), Y: 0 (arriba)
  }, [pathname]);  // Se ejecuta cada vez que pathname cambia

  // 👻 Componente invisible - solo ejecuta efectos secundarios
  return null;
};

export default ScrollToTop;