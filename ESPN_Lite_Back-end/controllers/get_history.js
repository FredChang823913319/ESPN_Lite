const getPlayerHistory = (req, res, db) => {
  const { id } = req.body;
  // console.log(search_player);
  // console.log(id);
  db('users').where('id', '=', id)
  .select('history_players') 
  .pluck('history_players')
  .then(result => {
    res.status(200).json(result[0])
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
  getPlayerHistory
}