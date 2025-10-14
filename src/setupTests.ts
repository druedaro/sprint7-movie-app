/**
 * 🧪 CONFIGURACIÓN DE TESTING CON JEST-DOM
 * ========================================
 * 
 * Nivel: Principiante
 * 
 * PROPÓSITO:
 * Archivo de configuración que se ejecuta automáticamente antes
 * de cada test suite. Extiende Jest con matchers personalizados
 * para testing del DOM.
 * 
 * ¿QUÉ ES @testing-library/jest-dom?
 * Librería que añade matchers (afirmaciones) útiles para testing:
 * 
 * MATCHERS DISPONIBLES:
 * - toBeInTheDocument(): Verifica que un elemento existe en el DOM
 * - toHaveTextContent(): Verifica el texto de un elemento
 * - toBeVisible(): Verifica que un elemento es visible
 * - toBeDisabled(): Verifica que un elemento está deshabilitado
 * - toHaveClass(): Verifica las clases CSS de un elemento
 * - toHaveValue(): Verifica el valor de un input
 * ...y muchos más
 * 
 * EJEMPLO DE USO EN TESTS:
 * 
 * test('muestra el título', () => {
 *   render(<WelcomePage />);
 *   const title = screen.getByText(/Welcome/i);
 *   expect(title).toBeInTheDocument();  // ← Matcher de jest-dom
 * });
 * 
 * NOTA:
 * Este archivo NO necesita ser importado en cada test.
 * Jest lo ejecuta automáticamente gracias a la configuración
 * en jest.config.js (setupFilesAfterEnv).
 * 
 * DOCUMENTACIÓN:
 * https://github.com/testing-library/jest-dom
 */

import '@testing-library/jest-dom';