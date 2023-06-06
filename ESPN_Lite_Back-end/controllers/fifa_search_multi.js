const handleMutiplePlayerStats = (req, res, db) => {
  const { player_name_group } = req.body;
  console.log(player_name_group)
  // console.log(typeof player_name);  // string 
  // console.log(player_name);
  db('players_fifa22_small')
    .select('*')
    .whereIn('long_name', player_name_group)
    .then(data => {
      res.status(200).json(data);
      console.log(data); // [{},{}] 
      // if (data.length !== 0){
      //   res.status(200).json(data);
      // }   
    })
    .catch(err => res.status(400).json('unable to get entries'))
}



  
module.exports = {
  handleMutiplePlayerStats
}  