import { Navigate, Route, Routes } from 'react-router-dom';
import LandingPage from '../pages/landing/LandingPage';
import LibraryPage from '../pages/library/LibraryPage';
import ComponentDetailsPage from '../pages/component-details/ComponentDetailsPage';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/library" element={<LibraryPage />} />
      <Route path="/library/:slug" element={<ComponentDetailsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
