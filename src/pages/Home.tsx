import { auth } from '../firebaseConfig';
import Header from '../components/Header';

function Home() {

  return (
    <div>
      <Header />
      <h1>Home</h1>
      <SignOutButton />
    </div>
  )
}

function SignOutButton() {
  const signOut = async () => {
    await auth.signOut();
  }

  return (
    <button onClick={signOut}>ログアウト</button>
  )
}

export default Home
