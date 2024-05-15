import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { auth } from './firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import Home from './pages/Home'
import { Navigate } from 'react-router-dom';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

const PrivateRoute: React.FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
  const[user] = useAuthState(auth);
  if (!user || !user.email || !user.email.endsWith('@gmail.com')) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

const App = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      } />
      <Route path="*" element={<NotFound />} />
    </>
  )
)

export default App
