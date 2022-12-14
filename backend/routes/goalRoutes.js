const express = require('express')
const router = express.Router()
const { getGoals, setGoal, updateGoal, deleteGoal } = require('../controllers/goalController')
const { protect } = require('../middleware/authMiddleware')

//get goals and set goals in one line as both on the same root route
router.route('/')
    .get(protect, getGoals)
    .post(protect, setGoal)
//// get goals
//router.get('/', getGoals)
////create goals
//router.post('/', setGoal)

//change goal and delete goal as both on same route
router.route('/:id')
    .delete(protect, deleteGoal)
    .put(protect, updateGoal)
// //change goal select by id, we can access with params
// router.put('/:id', updateGoal)
// //delete goal select by id, we can access with params
// router.delete('/:id', deleteGoal)


module.exports = router