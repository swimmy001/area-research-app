
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebaseConfig';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { CircularProgress} from '@mui/material';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

  const defaultTheme = createTheme();

  return (
    <div>
      <div>有効なGoogleアカウントでログインしてください</div>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Google Sign in
            </Typography>
            <SignInButton />
          </Box>
        </Container>
      </ThemeProvider>
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
    <Button
      type="submit"
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
      onClick={signInWithGoogle}
    >
      ログイン
    </Button>
  )
}
