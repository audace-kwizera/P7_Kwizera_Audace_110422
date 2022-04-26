// Afficher les followers
module.exports = function ({ app, dbConn, upload }) {
  app.post('/followers/get', (req, res) => {
    const { followerId, userId } = req.body;
    if (!followerId || !userId) {
      res.status(200).jsonp({ message: 'Oups, rien à afficher' });
    }
    const getFollowerSql = "SELECT * FROM user_follower WHERE follower_id = ? AND user_id = ?";
    dbConn.query(getFollowerSql, [followerId, userId], function (error, response) {
      if (response && response.length) {
        res.status(200).jsonp({ ...response[0] });
      } else {
        res.status(200).jsonp({ message: 'Oups, rien à afficher' });
      }
    });
  });

  // Ajout d'un nouveau followers au click
  app.post('/followers/create', (req, res) => {
    const { followerId, userId } = req.body;
    if (!followerId || !userId) {
      res.status(200).jsonp({ message: 'Oups il y a une petit problème, veuillez réessayer' });
    }
    const followers = [[followerId, userId]];
    const insertFollowerSql = "INSERT INTO user_follower (follower_id, user_id) VALUES ?";
    dbConn.query(insertFollowerSql, [followers], function (error, insertedFollower) {
      if (insertedFollower) {
        res.status(200).jsonp({ insertId: insertedFollower.insertId, follower_id: followerId, user_id: userId });
      } else {
        res.status(200).jsonp({ message: 'Oups il y a une petit problème, veuillez réessayer' });
      }
    });
  });

  // Annulation d'un follower
  app.post('/followers/delete', (req, res) => {
    const { followerId, userId } = req.body;
    if (!followerId || !userId) {
      res.status(200).jsonp({ message: 'Oups il y a une petit problème, veuillez réessayer' });
    }
    const deleteFollowerSql  = "DELETE FROM user_follower WHERE follower_id = ? AND user_id = ?";
    dbConn.query(deleteFollowerSql, [followerId, userId], function (error, response) {
      if (response && response.affectedRows) {
        res.status(200).jsonp({ followerId, userId });
      } else {
        res.status(200).jsonp({ message: 'Oups il y a une petit problème, veuillez réessayer' });
      }
    });
  });
};