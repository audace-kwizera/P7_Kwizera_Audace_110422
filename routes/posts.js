/**
 * Importation de Express
 */
const express = require('express');
/** Importation des sauces */
const postCtrl = require('../controllers/posts');
/** Création d'un router avec la méthode router d'express */
const router = express.Router();

// @route GET & POST - /posts/
router
  .route("/")
  .get(postControllers.getAllPost)
  .post(postControllers.createNewPost);

// avoir le post par l'id
router
  .route("/:id")
  .get(postControllers.getPostById);

// auth, multer, à ajouter avant postctrl etc... comme ici (! attention multer uniquement sur les deux premiers)
//router.post('/:id/like', auth, sauceCtrl.likeDislikeSauce);

router.post('/', postCtrl.createPost);
router.put('/:id', postCtrl.modifyPost);
router.delete('/:id', postCtrl.deletePost);
router.get('/:id', postCtrl.getOnePost);
router.get('/', postCtrl.getAllPost);
router.post('/:id/like', postCtrl.likeDislikePost);


module.exports = router;