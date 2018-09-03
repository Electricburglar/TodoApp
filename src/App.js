import React, { Component } from 'react';
import { Layout, Header, Navigation, Content, Button, Drawer } from 'react-mdl';
import { Link } from 'react-router-dom';
import Router from './components/Router';
import './App.css';
import cookie from 'react-cookies';
import Store from './store';
import Footer from './AppFooter';

class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      logged: false,
      onLogin: this.onLogin,
      onLogout: this.onLogout
    };
  }

  // Login Func
  onLogin = () => {
    this.setState({
      logged: true
    });
  }

  // Logout Func
  onLogout = () => {
    this.setState({
      logged: false
    });
  }

  // Close drawer menu
  hideToggle = () => {
    var selectorId = document.querySelector('.mdl-layout');
    selectorId.MaterialLayout.toggleDrawer();
  }

  componentWillMount = () => {
    if(cookie.load('userId') !== undefined)
    {
      this.setState({
        logged: true
      });
    }
    else
    {
      this.setState({
        logged: false
      });
    }
  }

  render() {
    return (
      <div className="App">
        <Store.Provider value={this.state}>
        <Layout>
          <Header className="Header" title={<Link to='/' style={{textDecoration: 'none', color: 'white', fontFamily: 'Luckiest Guy'}}>Todo App</Link>}>
            <Navigation className="LinkStyle">
              <Link to="/todo">Todo</Link>
              <Link to="/mypage">MyPage</Link>
            </Navigation>
            {!this.state.logged && <Button raised><Link to='/login' style={{textDecoration: 'none', color: 'white', fontFamily: 'Luckiest Guy'}}>Login/SignUp</Link></Button>}
            {this.state.logged && <Button raised onClick={
                  () => {
                      cookie.remove('userId');
                      this.setState({
                        logged: false,
                      });
                  }}><Link to='/' style={{textDecoration: 'none', color: 'white', fontFamily: 'Luckiest Guy'}}>Logout</Link></Button>}
          </Header>
          <Drawer title={<Link to="/" style={{textDecoration: 'none', color: 'black', fontFamily: 'Luckiest Guy'}} onClick={() => this.hideToggle()}>Todo App</Link>}>
            <Navigation className="LinkStyle">
                <Link to="/todo" onClick={() => this.hideToggle()}>Todo</Link>
                <Link to="/mypage" onClick={() => this.hideToggle()}>MyPage</Link>
              </Navigation>
              <div className="text-center" style={{marginTop: '50px'}}>
              {!this.state.logged && <Button style={{width: '80%'}} raised><Link to='/login' style={{textDecoration: 'none', color: 'black', fontFamily: 'Luckiest Guy'}} onClick={() => this.hideToggle()}>Login/SignUp</Link></Button>}
              {this.state.logged && <Button raised onClick={
                    () => {
                        cookie.remove('userId');
                        this.setState({
                          logged: false,
                        });
                        this.hideToggle();
              }}><Link to='/' style={{textDecoration: 'none', color: 'black', fontFamily: 'Luckiest Guy'}}>Logout</Link></Button>}
              </div>
          </Drawer>
          <Content className="Content text-center">
            <Router />
          </Content>
        </Layout>
        <Footer />     
        </Store.Provider>
      </div>
    );
  }
}

export default App;
