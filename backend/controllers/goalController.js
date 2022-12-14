const asyncHandler= require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

//@desc Get goals
//@route GET /api/goals
//@access Private
const getGoals = asyncHandler(async (req, res) =>{

    const goals = await Goal.find({ user: req.user.id })
    res.status(200).json(goals)
})

//@desc Set goal
//@route POST /api/goals
//@access Private
const setGoal = asyncHandler(async (req, res) =>{
    //console.log(req.body);
    if(!req.body.text){ //if client hasn't entered any text we send error
        res.status(400)
        throw new Error('Please add a text field');
    }

    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id,
    })
    res.status(200).json(goal)
})

//@desc Update goal
//@route PUT /api/goals/:id
//@access Private
const updateGoal = asyncHandler(async (req, res) =>{

    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    //find user by id -not needed can replace user with req.user
    const user = await User.findById(req.user.id)
    //check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }
    //make sure the logged in user matches the goal user
    if(goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorised')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(200).json(updatedGoal)
})

//@desc Delete goal
//@route DELETE /api/goals/:id
//@access Private
const deleteGoal = asyncHandler(async (req, res) =>{

    //find goal
    const goal = await Goal.findById(req.params.id)
    //check goal
    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }
    
    //find user by id, this is not needed as find user is done in the authMiddleware so can replace all 'user' with req.user
   const user = await User.findById(req.user.id)
    //check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }
    //make sure the logged in user matches the goal user
    if(goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorised')
    }

    await goal.remove()
    res.status(200).json({id: req.params.id})
})


module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}