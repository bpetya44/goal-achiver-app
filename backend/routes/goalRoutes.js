const express = require('express')
const router = express.Router()

// get goals

router.get('/', (req, res) =>{
    res.status(200).json({message: 'Get goals'})
})

//create goals
router.post('/', (req, res) =>{
    res.status(200).json({message: 'Set goal'})
})

//change goal select by id, we can access with params
router.put('/:id', (req, res) =>{
    res.status(200).json({message: `Update goal ${req.params.id}`})
})

//delete goal select by id, we can access with params
router.delete('/:id', (req, res) =>{
    res.status(200).json({message: `Delete goal ${req.params.id}`})
})


module.exports = router