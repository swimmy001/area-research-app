import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';

function Home() {
  const[user] = useAuthState(auth);

  return (
    <div>
      {
        user ? (
          <>
            <UserInfo />
            <SignOutButton />
          </>
        ) : (
          <SignInButton />
        )
      }
    </div>
  )
}

export default Home


function SignInButton() {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <button onClick={signInWithGoogle}>ログイン</button>
  )
}

function SignOutButton() {
  return (
    <button onClick={() => auth.signOut()}>ログアウト</button>
  )
}

function UserInfo() {
  return (
    <div>
      <p>ログイン中です</p>
    </div>
  )
}
