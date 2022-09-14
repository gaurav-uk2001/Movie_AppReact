import Movies from "./Components/Movies";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
function App() {
  return (
    <Router>
    <Navbar></Navbar>
    <Switch>
      <Route path='/' exact component={Home}></Route>
      <Route path='/movies' component={Movies}></Route>
      <Route path='/about' render={(props)=>(
        <About {...props} isAuth={true}/>
      )}/>
      </Switch>
    </Router>
  );
}

export default App;
