const router = require('express').Router();
const userRoutes = require('./users');
const articleRoutes = require('./articles');
const allRoutes = require('./all');

router.use(userRoutes);
router.use(articleRoutes);
router.use(allRoutes);

module.exports = router;
