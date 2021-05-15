import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import {lazy, Suspense, useState } from 'react';

import Navbar from './containers/Navbar'

const UserListPage = lazy(() => import('./pages/UsersList')); // TODO Har bir sahifa ochilganda faqat unga
const ErrorPage = lazy(() => import('./pages/Error'));        // TODO kerakli ma'lumotlar olindai hammasi birdaniga
const LoginPage = lazy(() => import('./pages/Auth/Login'));   // TODO olinmaydi
const RegisterPage = lazy(() => import('./pages/Auth/Register'));

function App() {

 
  const [token, setToken] = useState(window.localStorage.getItem('sessionToken')); 
  // TODO Bu yerda localstorage ichidan token ya'ni server bizga yuborgan ma'lumot olinyapti va pastga qarasen 
  // TODO o'sha token bo'lsa userList ochiladi aks holda Login yoki Register sahifasi ochiladi.


  return (
    <div className="App">
      <Router>
        <Suspense fallback={<h1>Loading...</h1>}>
            {
            token ? (
            <>

              
              <Navbar setToken={setToken}/>
 
              <Switch>
              <Route exact path="/" component={UserListPage} />
              <Route path="*" component={ErrorPage} />
            </Switch>
            
            </>
          ) : (
            <Switch>
              <Route exact path="/" render={() => <LoginPage setToken={setToken}/>} component={LoginPage}/>
              <Route exact path="/register" component={RegisterPage}/>
              <Route path="*" component={ErrorPage}/>
            </Switch>
          )
        }
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
