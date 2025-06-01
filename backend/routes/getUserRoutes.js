const express = require('express')
const router = express.Router()
const requireHigherAuth = require('../middleware/requireHigherAuth')

// Controllers
const {getUserDetails,getAllUsers,deleteUser} = require('../controllers/getUserController')

router.use(requireHigherAuth)

router.get('/:id', getUserDetails);
router.get('/', getAllUsers);
router.delete('/:id', deleteUser);

module.exports = router
