// Création d'un utilisateur+
module.exports = function ({ app, dbConn, upload }) {
  app.post("/users/create", upload.single("avatar"), (req, res, next) => {
    const file = req.file;
    if (!file) {
      res.status(200).jsonp({
        message: "Veuillez ajouter une photo",
      });
    } else {
      const avatar = `/${file.filename}`;
      const { id, email, password, fullname } = req.body;
      if (email && password && fullname) {
        const findAccountByEmail = "SELECT * FROM user_account WHERE user_email = ?";
        dbConn.query(findAccountByEmail, [email], function (error, account) {
          if (account && account.length !== 0) {
            res.status(200).jsonp({ message: 'Cet email est déjà utilisé' });
          } else {
            const users = [[id, email, password, fullname, avatar]];
            const registerUserSql = "INSERT INTO user_account (id, user_email, user_password, user_full_name, user_avatar) VALUES ?";
            dbConn.query(registerUserSql, [users], function (error, insertedUser) {
              if (insertedUser) {
                res.status(200).jsonp({ avatar, insertId: insertedUser.insertId });
              } else {
                res.status(200).jsonp({ message: 'Oups on ne peut pas créer votre compte' });
              }
            });
          }
        });
      } else {
        return res.status(200).jsonp({ message: "Veuillez remplir les champs vides" });
      }
    }
  });

// Les followers
  app.post('/users/followers', (req, res) => {
    const { numberOfFollowers, id } = req.body;
    const updateNumberOfFollowersSql = "UPDATE user_account SET user_number_of_followers = ? WHERE id = ?";
    dbConn.query(updateNumberOfFollowersSql, [numberOfFollowers, id], function (err, updatedUser) {
      if (err) {
        res.status(200).jsonp({ message: "Oups on a un petit souci, veuillez réessayer" });
      } else if (updatedUser) {
        res.status(200).jsonp({ id });
      }
    });
  });

// Nombre de posts
  app.post('/users/posts', (req, res) => {
    const { numberOfPosts, id } = req.body;
    const updateNumberOfPostsSql = "UPDATE user_account SET user_number_of_posts = ? WHERE id = ?";
    dbConn.query(updateNumberOfPostsSql, [numberOfPosts, id], function (err, updatedUser) {
      if (err) {
        res.status(200).jsonp({ message: "Oups il y a un petit souci, veuillez réessayer" });
      } else if (updatedUser) {
        res.status(200).jsonp({ id });
      }
    });
  });

// Informations sur l'utilisateur
  app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    if (!userId) {
      res.status(200).jsonp({ message: 'Oups il y a un petit souci, veuillez réessayer' });
    }
    const getUserSql = "SELECT * FROM user_account WHERE id = ?";
    dbConn.query(getUserSql, [userId], function (error, response) {
      if (response && response.length) {
        res.status(200).jsonp(response);
      } else {
        res.status(200).jsonp({ message: 'Oups il y a un petit souci, veuillez réessayer' });
      }
    });
  });
};


