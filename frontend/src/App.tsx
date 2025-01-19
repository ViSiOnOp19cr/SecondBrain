import {Dashboard} from './components/dashboard';
import { Signup } from './components/pages/signup';
import { Signin } from './components/pages/signin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;
