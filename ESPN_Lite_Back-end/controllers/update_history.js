const updatePlayerHistory = (req, res, db) => {
  const { id, search_player } = req.body;
  console.log(search_player);
  console.log(id);
  db('users').where('id', '=', id)
  .returning('id')  
  .then(result => {
    // console.log(result[0].history_players);   // NULL if no history_players 
    let history_players_arr = result[0].history_players
    if (history_players_arr !== null && history_players_arr.includes(search_player)){
      console.log('found it');
    }else{
      console.log('not in there');
      db('users').where('id', '=', id)
      .update({
        history_players: db.raw(`array_append(history_players, ?)`, [search_player])
      })
      .then(history_players =>{
        console.log(history_players);
        console.log("output 1 if success");
      })
    }
    res.status(200).json('success at appending new unique player in history')
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
  updatePlayerHistory
}






// reference
// ref #1 
// db('users')
// .where({
//   "id": id,
//   "history_players": search_player
// })
// .first() // getting the first value
// .then((found) => {
//   if (found){
//     res.json('already present');
//   }else{
//     // now insert data
//       // db('checkins')
//       //   .insert({
//       //     // your data
//       //   });
//       res.json("not found");
//   }
// });

// ref #2
// .increment('id', 1) // 
// .returning('id')  // will only return id when id has been manipulated before such as increment


// ref #3
// db('users').where('id', '=', id)
// .returning('id')  
// .then(result => {
//   // console.log(result)  
//   // console.log(typeof result[0]);  // object 
//   // console.log(typeof result[0].history_players);   // object 
//   // console.log(result[0].history_players);   // NULL if no history_players 
//   // let found_flag = 0 
//   let history_players_arr = result[0].history_players
//   if (history_players_arr !== null && history_players_arr.includes(search_player)){
//     console.log('found it');
//     // found_flag = 1
//     // return found_flag
//   }else{
//     console.log('not in there');
//     db('users').where('id', '=', id)
//     .update({
//       history_players: db.raw(`array_append(history_players, ?)`, [search_player])
//     })
//     .then(history_players =>{
//       console.log(history_players);
//       console.log("output 1 if success");
//     })
//     // found_flag = 0
//     // return found_flag
//   }
// })
// .then(found_flag=>{
//   console.log(found_flag)
//   if (found_flag === 0){
//   db('users').where('id', '=', id)
//     .update({
//       history_players: db.raw(`array_append(history_players, ?)`, [search_player])
//     })
//     .returning('history_players')  // return 1 if update success; or return 'history_players' column 
//     .then(history_players =>{
//       console.log(history_players);
//       console.log("where");
//     })
//   }
// })