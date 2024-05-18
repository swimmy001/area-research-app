
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebaseConfig';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { CircularProgress } from '@mui/material';

function Login() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <CircularProgress />
  }

  if (!user || !user.email || !user.email.endsWith('@gmail.com')) {
    auth.signOut();
  } else {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <div>有効なGoogleアカウントでログインしてください</div>
      <SignInButton />
    </div>
  )
}

export default Login


function SignInButton() {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      if (auth.currentUser?.email && auth.currentUser.email.endsWith('@gmail.com')) {
        navigate('/');
      } else {
        auth.signOut();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <button onClick={signInWithGoogle}>ログイン</button>
  )
}
