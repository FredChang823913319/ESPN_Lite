import React from 'react';
import Card from '../CardComponents/Card';
import './SingleSearch.css';

const SingleSearch = ({ target_player }) => {
  // console.log(target_player)
  if (target_player.short_name !== undefined){
    return (
        <div className='tc'>
          <Card
            long_name={target_player.long_name}
            player_positions={target_player.player_positions}
            age={target_player.age}
            height_cm={target_player.height_cm} 
            weight_kg={target_player.weight_kg} 
            club_name={target_player.club_name}
            nationality_name={target_player.nationality_name} 
            player_tags={target_player.player_tags}
            player_face_url={target_player.player_face_url}
            nation_logo_url={target_player.nation_logo_url}
            nation_flag_url={target_player.nation_flag_url}
            club_logo_url= {target_player.club_logo_url}
          />
        </div>
    );
  }
}

export default SingleSearch;