import {Dashboard} from './components/dashboard';
import { Signup } from './components/pages/signup';
import { Signin } from './components/pages/signin';
import { SharePage } from './components/pages/share';
import { TwitterItems } from './components/pages/twitteritems';
import { YoutubeItems } from './components/pages/youtubeitems';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/share/:hash" element={<SharePage />} />
          <Route path="/twitter" element={<TwitterItems/>} />
          <Route path="/youtube" element={<YoutubeItems/>} />
        </Routes>
      </BrowserRouter> 
    </div>
  );
}
export default App;
