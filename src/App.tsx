import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Content from "./components/Content/Content";
import { useTelegram } from "./hooks/useTelegram";
import { useEffect } from "react";

function App() {
  const { tg } = useTelegram();

  useEffect(() => {
    tg.ready();
    tg.expand();
  }, []);

  return (
    <Routes>
      <Route path="/:id" element={<Content />} />
      <Route path="*" element={<h1>NOT FOUND</h1>} />
    </Routes>
  );
}

export default App;
