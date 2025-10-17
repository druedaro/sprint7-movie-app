import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import { PATHS } from './routes/paths';
import WelcomePage from './pages/WelcomePage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path={PATHS.HOME} element={<WelcomePage />} />
          <Route path={PATHS.AUTH} element={<div>Auth Page (Coming soon)</div>} />
          <Route path={PATHS.MOVIES} element={<div>Movies Page (Coming soon)</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;