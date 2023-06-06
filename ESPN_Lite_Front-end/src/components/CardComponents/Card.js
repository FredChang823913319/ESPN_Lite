import React from 'react';

const Card = ({ 
  long_name, 
  player_positions,
  age, 
  height_cm, 
  weight_kg, 
  club_name, 
  nationality_name, 
  player_tags,
  player_face_url,
  nation_logo_url,
  nation_flag_url,
  club_logo_url,
}) => {
  return (
    <div className='tc w-20 grow bg-light-green br3 pa3 ma2 dib bw2 shadow-5'>
      <img alt='player_face' src={`${player_face_url}`} width="100" height="100" />
      <div className='tc'>
        <h2>{long_name}</h2>
        <p>{'player_positions: '}{player_positions}</p>
        <p>{'age: '}{age}</p>
        <p>{'height: '}{height_cm}{' cm'}</p>
        <p>{'weight: '}{weight_kg}{' kg'}</p>
        <p>{'club_name: '}{club_name}</p>
        <p>{'nationality_name: '}{nationality_name}</p>
        <p>{'player_tags: '}{player_tags}</p>
      </div>
      <img alt='national flag' src={`${nation_flag_url}`} />
      <br />
      {/* <img alt='national team logo' src={`${nation_logo_url}`} /> */}
      <img alt='club team logo' src={`${club_logo_url}`} />     
    </div>
  );
}

export default Card;


// {
//   short_name: 'L. Messi',
//   long_name: 'Lionel Andrés Messi Cuccittini',
//   player_positions: 'RW, ST, CF',
//   overall: 93,
//   potential: 93,
//   value_eur: 78000000,
//   wage_eur: 320000,
//   age: 34,
//   dob: '6/24/87',
//   height_cm: 170,
//   weight_kg: 72,
//   club_name: 'Paris Saint-Germain',
//   league_name: 'French Ligue 1',
//   league_level: 1,
//   club_position: 'RW',
//   nationality_name: 'Argentina',
//   nation_position: 'RW',
//   nation_jersey_number: 10,
//   preferred_foot: 'Left',
//   player_tags: '#Dribbler, #Distance Shooter, #FK Specialist, #Acrobat, #Clinical Finisher, #Complete Forward',
//   player_traits: 'Finesse Shot, Long Shot Taker (AI), Playmaker (AI), Outside Foot Shot, One Club Player, Chip Shot (AI), Technical Dribbler (AI)',
//   player_face_url: 'https://cdn.sofifa.net/players/158/023/22_120.png',
//   club_logo_url: 'https://cdn.sofifa.net/teams/73/60.png',
//   club_flag_url: 'https://cdn.sofifa.net/flags/fr.png',
//   nation_logo_url: 'https://cdn.sofifa.net/teams/1369/60.png',
//   nation_flag_url: 'https://cdn.sofifa.net/flags/ar.png'
// }