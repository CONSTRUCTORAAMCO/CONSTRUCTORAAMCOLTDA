import ConstructionCursor from "./assets/components/cursor/ConstructionCursor";

import WhatsAppWidget from "./assets/modules/whatsapp/WhatsAppWidget";
import AppRouter from "./routes/AppRouter";
import RouteMetadata from "./seo/RouteMetadata";

import "./App.css";

function App() {
  return (
    <>
      <RouteMetadata />
      <ConstructionCursor />
      <AppRouter />
      <WhatsAppWidget />
    </>
  );
}

export default App;
