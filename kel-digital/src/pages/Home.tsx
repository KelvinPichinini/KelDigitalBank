import '../App.css';
import Header from '../components/Header';
import Cover from '../components/Cover';
import Login from '../components/Login';

function Home() {
  return (
    <div className="home">
      <Header />
      <Cover />
      <Login />
    </div>
  );
}

export default Home;