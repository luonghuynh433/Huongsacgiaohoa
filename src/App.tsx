import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/HomePage';
import { SurveyPage } from './pages/SurveyPage';
import { MinimapPage } from './pages/MinimapPage';
import { CustomKitPage } from './pages/CustomKitPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="survey" element={<SurveyPage />} />
          <Route path="minimap" element={<MinimapPage />} />
          <Route path="custom-kit" element={<CustomKitPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

