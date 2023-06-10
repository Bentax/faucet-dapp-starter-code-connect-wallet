//import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import First from "./pages/First";
import Second from "./pages/Second";
import Third from "./pages/Third";
import NoPage from "./pages/NoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<First />} />
          <Route path="second" element={<Second />} />
          <Route path="dao" element={<Third />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;