// App.tsx
// Componente raíz de la aplicación - Configura el enrutado principal
// Define las rutas disponibles y componentes que renderizan cada página
// Nivel de explicación: beginner (comentarios en español)

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;