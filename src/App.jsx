import ConstructionCursor from "./assets/components/cursor/ConstructionCursor";

import WhatsAppWidget from "./assets/modules/whatsapp/WhatsAppWidget";
import AppRouter from "./routes/AppRouter";

import "./App.css";

function App() {
  return (
    <>
      <ConstructionCursor />
      <AppRouter />
      <WhatsAppWidget />
    </>
  );
}

export default App;
