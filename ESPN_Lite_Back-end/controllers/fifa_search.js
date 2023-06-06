const handlePlayerStats = (req, res, db) => {
  const { player_name } = req.body;
  // console.log(typeof player_name);  // string 
  // console.log(player_name);
  db('players_fifa22_small')
    .select('*')
    .where('long_name', 'ilike', player_name)
    .then(data => {
      // console.log(data); [{},{}] 
      if (data.length !== 0){
        // console.log(data[0].overall);
        // console.log(data);
        console.log("non-empty");
        res.status(200).json(data[0]);
      } else {
        db('players_fifa22_small')
          .select('long_name')
          .where('long_name', 'ilike', `%${player_name}%`)
          .limit(4)
          .pluck('long_name')
          .then(data => {
            if (data.length){
              // console.log(data.length);
              // console.log(data);
              console.log("partial");
              res.status(300).json(data);
            }else{
              // console.log(data.length);
              // console.log(data);
              console.log("not found");
              res.status(404).json('not found');
            }
          })
          .catch(err => res.status(400).json(err))
      }
    })
}

module.exports = {
  handlePlayerStats
}