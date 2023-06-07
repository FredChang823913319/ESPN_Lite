import React, { Component } from 'react';
// import Particles from 'react-particles-js';
import ParticlesBg from 'particles-bg'
import SingleSearch from './components/SingleSearch/SingleSearch';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import PlayerSearchForm from './components/PlayerSearchForm/PlayerSearchForm';
import HistoryTab from './components/HistoryTab/HistoryTab';
import Hint from './components/Hint/Hint';
import './App.css';


const initialState = {
  hints: [],
  target_player: {},
  review_history: false,
  status_code: 0,
  player_name:'',
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      joined: data.joined
    }})
  }


  onInputChange = (event) => {
    // console.log(event);
    this.setState({player_name: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({hints: []});
    this.setState({player_name: this.state.player_name});
      fetch('http://localhost:3000/fifa_search', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          player_name: this.state.player_name
        })
      })
      .then(response =>{
        this.setState({status_code: response.status});
        return response;})
      .then(response => response.json())
      .then(response => {
        // console.log("here")
        // console.log(this.state.status_code);
        // console.log(response.length);
        if (this.state.status_code === 300 && response.length > 1){
          this.setState({
            hints: [...this.state.hints, ...response]
          })
        } else if (this.state.status_code === 300 && response.length === 1){
          this.setState({
            hints: [...this.state.hints, response]
          })
        } else if (this.state.status_code === 200){
          this.setState({target_player: response});
          // console.log("debug");
          // console.log(this.state.target_player);
          // console.log(response);
          fetch('http://localhost:3000/update_history', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id,
              search_player: response.long_name
            })
          })
          .then(response => response.json())
          .then(console.log)
          .catch(console.log)
          // console.log(typeof response);  // object
          // console.log(this.state.target_player); //first click will be empty; second click has the object
        }
        })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    console.log("inside route");
    console.log(route);
    if (route === 'signout') {
      this.setState(initialState);
      // console.log("from onRouteChange");   // appeared at broswer console (front-end)
      // route will not be set to signin in current render cycle, but next cycle
      // this.setState({route: 'signin', isSignedIn: false});

      // https://legacy.reactjs.org/docs/faq-state.html
      // this.setState((state) => {
      //   // Important: read `state` instead of `this.state` when updating.
      //   return {route: state.count + 1}
      // });
    } else if (route === 'home') {
      console.log("hit onRouteChange home")
      this.setState({isSignedIn: true});
      this.setState({review_history: false});
    } else if (route === 'history'){
      this.setState({review_history: true});
    } 
    console.log("onRouteChange change state");
    this.setState({route: route});
  }

  renderElement = (route) => {
    console.log("hit renderElement");
    console.log(route);
    if(route === 'home'){
      console.log('here home')
       return (
        <div>
          <Logo />
          <Hint
            name={this.state.user.name}
            status_code={this.state.status_code}
            hints={this.state.hints}
            target_player={this.state.target_player}
          />
          <PlayerSearchForm
            onInputChange={this.onInputChange}
            onButtonSubmit={this.onButtonSubmit}
          />
          <HistoryTab onRouteChange={this.onRouteChange} review_history={this.state.review_history}/>
          <SingleSearch  target_player={this.state.target_player}/>
        </div>
       );
      }
      else if (route === 'signin' || route === 'signout'){
        return (<Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>);
      } else if (route === 'register'){
        return (<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>);
      } else if (route === 'history') {
        console.log("hit renderElement history")
        return (<HistoryTab onRouteChange={this.onRouteChange} review_history={this.state.review_history} id={this.state.user.id}/>);
      }
  }




  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    console.log(route);
    return (
      <div className="App">
        <ParticlesBg type="circle" bg={true} />
        {/* <section style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504016798967-59a258e9386d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80')", backgroundSize: "cover", backgrounRepeat: "norepeat", position: "fixed", width: "100%", height: "80%" }}> */}
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {
        this.renderElement(route)
       
        // route === 'home'?       
        //   <div>
        //       <Logo />
        //       <Hint
        //         name={this.state.user.name}
        //         status_code={this.state.status_code}
        //         hints={this.state.hints}
        //         target_player={this.state.target_player}
        //       />
        //       <PlayerSearchForm
        //         onInputChange={this.onInputChange}
        //         onButtonSubmit={this.onButtonSubmit}
        //       />
        //       <SingleSearch  target_player={this.state.target_player}/>
        //     </div>
        //   : (
        //      route === 'signin' || route === 'signout'
        //      ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        //      : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        //     )
        }
      </div>
    );
  }
}

export default App;
