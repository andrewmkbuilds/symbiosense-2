import { AuthProvider, useAuth } from '@/lib/AuthContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Team from '@/pages/Team';
import Innovation from '@/pages/Innovation';
import RobotGame from '@/pages/RobotGame';
import RobotDesign from '@/pages/RobotDesign';
import Journey from '@/pages/Journey';
import Gallery from '@/pages/Gallery';
import Resources from '@/pages/Resources';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import LiveConsole from '@/pages/LiveConsole';
import PageNotFound from './lib/PageNotFound';

// This site is a static marketing website: no accounts, no dashboard, no server.
// Every route below is public. The provider around it reports a settled,
// signed-out state and never contacts a backend.
const SiteRoutes = () => {
  const { isLoadingAuth } = useAuth();

  if (isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<Team />} />
        <Route path="/innovation" element={<Innovation />} />
        <Route path="/robot-game" element={<RobotGame />} />
        <Route path="/robot-design" element={<RobotDesign />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/live-console" element={<LiveConsole />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <SiteRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App