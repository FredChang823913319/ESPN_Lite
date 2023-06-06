import React from 'react';
import CardList from '../CardComponents/CardList';
import Scroll from '../CardComponents/Scroll';
import SearchBox from '../CardComponents/SearchBox';

class HistoryTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history_players: [],
      searchfield: '',
      length: 0
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/get_history', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: this.props.id
      })
    })
    .then(response => response.json())
    .then(response =>{
      // console.log("length");
      // console.log(response);
      this.setState({length: response.length});
      // console.log(response.length);
      return response;
    })
    .then(response => {
      console.log(response)
      fetch('http://localhost:3000/fifa_search_multi', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          player_name_group: response
        })
      })
      .then(response => response.json())
      .then(response =>{
        console.log(response);
        this.setState({
          history_players: [...this.state.history_players, ...response]
        });  
      })

    })
  }


  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value })
  }

  renderElement = ()=>{
    const { history_players, searchfield } = this.state;
    const filteredPlayers = history_players.filter(history_players =>{
      return history_players.long_name.toLowerCase().includes(searchfield.toLowerCase());
    })
    // console.log("history_players.length")
    // console.log(history_players.length)
    // console.log(history_players);
    return (history_players.length !== this.state.length)?
      <h1>Loading</h1> :
      (
        <div className='tc'>
          <h1 className='f1'>Your History</h1>
          <SearchBox searchChange={this.onSearchChange}/>
          <Scroll>
            <CardList players={filteredPlayers} />
            {/* <CardList players={history_players} /> */}
          </Scroll>
        </div>
      );
  }
  

  render() {
    return (
    <div className='tc'>
      {this.props.review_history === false
        ? <div className="lh-copy mt3">
            <p  onClick={() => this.props.onRouteChange('history')} className="f4 link dim black db pointer">history</p>
          </div>
        : <div>
            <p className='f3'>
              {'Find your favorite FIFA football player. Git it a try!'}
              {this.renderElement()}
            </p>
            <div className="lh-copy mt3">
                <p  onClick={() => this.props.onRouteChange('home')} className="f4 link dim black db pointer">Home</p>
            </div>
          </div>
      }
    </div>
    );
  }
}

export default HistoryTab;