import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { ChessLookup } from './pages/ChessLookup';
import { SteamLookup } from './pages/SteamLookup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="chess" element={<ChessLookup />} />
          <Route path="steam" element={<SteamLookup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;