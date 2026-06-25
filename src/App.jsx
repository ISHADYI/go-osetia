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
import { AboutUs } from "./pages/AboutUs.jsx";
import { PlansPage } from "./pages/PlansPage";
import { FavoritesProvider } from "./context/FavoritesContext";
import { CreateMeetingPage } from "./pages/CreateMeetingPage.jsx";
import { CategoryMeetings } from "./pages/CategoryMeetings.jsx";

function App() {
  return (
    <Router>
      <FavoritesProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="bg-white flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/plans" element={<PlansPage />} />
              <Route path="/create-meeting" element={<CreateMeetingPage />} />
              <Route
                path="/category/:categoryName"
                element={<CategoryMeetings />}
              />
              <Route path="/event/:id" element={<EventPage />} />
              <Route path="/profile" element={<OrganizerPage />} />
              <Route path="/organizer/:id" element={<OrganizerPage />} />
              <Route path="/events/*" element={<HomePage />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </FavoritesProvider>
    </Router>
  );
}

export default App;
