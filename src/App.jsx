import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Header } from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { HomePage } from "./pages/HomePage.jsx";
import { EventPage } from "./pages/EventPage.jsx";
import { OrganizerPage } from "./pages/OrganizerPage.jsx";

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/event/:id" element={<EventPage />} />
          <Route path="/organizer/:id" element={<OrganizerPage />} />
          <Route path="/events/*" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
