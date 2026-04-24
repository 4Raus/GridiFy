import { Navigate, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LibraryPage from './pages/LibraryPage';
import ComponentPage from './pages/ComponentPage';

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/library/:slug" element={<ComponentPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

// import { Routes, Route } from 'react-router-dom'
// import LandingPage from './pages/LandingPage'
// import ComponentPage from './pages/ComponentPage'
//
// export default function App() {
//     return (
//         <Routes>
//             <Route path="/" element={<LandingPage />} />
//             <Route path="/library" element={<ComponentPage />} />
//         </Routes>
//     )
// }