import React from 'react';
import Card from './Card';

const CardList = ({ players }) => {
  return (
    <div>
      {
        players.map((player, i) => {
          return (
            <Card
              key={i}
              long_name={players[i].long_name}
              player_positions={players[i].player_positions}
              age={players[i].age}
              height_cm={players[i].height_cm}
              weight_kg={players[i].weight_kg} 
              club_name={players[i].club_name} 
              nationality_name={players[i].nationality_name} 
              player_tags={players[i].player_tags}
              player_face_url={players[i].player_face_url}
              nation_logo_url={players[i].nation_logo_url}
              nation_flag_url={players[i].nation_flag_url}
              club_logo_url={players[i].club_logo_url}
              />
          );
        })
      }
    </div>
  );
}

export default CardList;