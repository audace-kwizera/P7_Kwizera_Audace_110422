// Creation de Post
module.exports = function ({ app, dbConn, upload }) {
  // Création d'un post
  app.post('/posts', upload.single('post_image'), (req, res) => {
    const file = req.file;
    if (!file) {
      res.status(200).jsonp({
        message: "Veuillez charger une image",
      });
    } else {
      const postContent = `/${file.filename}`;
      const postCategory = req.file && req.file.mimetype.includes('image') ? 1 : 2;
      const postCreatedDate = new Date();
      const postCreatedBy = req.body.post_created_by;
      if (postCreatedBy) {
        const createdPost = [[postContent, postCategory, postCreatedDate, postCreatedBy]];
        const createPostSql = "INSERT INTO post (post_content, post_category, post_created_date, post_created_by) VALUES ?";
        dbConn.query(createPostSql, [createdPost], function (error, insertedPost) {
          if (insertedPost) {
            res.status(200).jsonp({ id: insertedPost.insertId, post_content: postContent, post_category: postCategory, post_created_date: postCreatedDate, post_created_by: postCreatedBy });
          } else {
            res.status(200).jsonp({ message: 'Oups il y a une petit problème, veuillez réessayer' });
          }
        });
      } else {
        res.status(200).jsonp({ message: 'Oups il y a une petit problème, veuillez réessayer' });
      }
    }
  });

  // Charger Les Posts
  app.get('/posts', (req, res) => {
    const getPostsSql = "SELECT * FROM post ORDER BY post_created_date DESC";
    dbConn.query(getPostsSql, function (error, posts) {
      if (posts) {
        res.status(200).jsonp(posts);
      } else {
        res.status(200).jsonp({ message: 'Oups nous arrivons pas à charger les posts, veuillez réessayern' });
      }
    });
  });

  // Charger un post en particulier
  app.get('/posts/:id', (req, res) => {
    const id = req.params.id;
    const getPostSql = "SELECT post.id, post_content, post_category, post_created_date, post_created_by, post_number_of_reactions, user_account.user_avatar, user_account.user_full_name, user_account.user_number_of_followers FROM post INNER JOIN user_account ON post.post_created_by = user_account.id WHERE post.id = ?";
    if (!id) {
      res.status(200).jsonp({ message: 'Oups nous arrivons pas à charger le posts, veuillez réessayern' });
    }
    dbConn.query(getPostSql, [id], function (error, response) {
      if (response && response.length) {
        res.status(200).jsonp(response);
      } else {
        res.status(200).jsonp({ message: 'Oups nous arrivons pas à charger les posts, veuillez réessayern' });
      }
    });
  });

  // Nombre de likes
  app.post('/posts/reactions', (req, res) => {
    const { numberOfReactions, id } = req.body;
    const updateNumberOfReactionsSql = "UPDATE post SET post_number_of_reactions = ? WHERE id = ?";
    dbConn.query(updateNumberOfReactionsSql, [numberOfReactions, id], function (err, updatedPost) {
      if (err) {
        res.status(200).jsonp({ message: "Oups il y a une petit problème, veuillez réessayer" });
      } else if (updatedPost) {
        res.status(200).jsonp({ id });
      }
    });
  });

  // Les posts selon l'utilisateur
  app.post('/posts/categories', (req, res) => {
    const { userId, postCategory } = req.body;
    if (!userId || !postCategory) {
      res.status(200).jsonp({ message: 'Oups il y a une petit problème, veuillez réessayer' });
    }
    const getPostsSql = "SELECT * FROM post WHERE post_created_by = ? AND post_category = ? ORDER BY post_created_date DESC";
    dbConn.query(getPostsSql, [userId, postCategory], function (error, posts) {
      if (posts) {
        res.status(200).jsonp(posts);
      } else {
        res.status(200).jsonp({ message: 'Oups il y a une petit problème, veuillez réessayer' });
      }
    });
  });

}

