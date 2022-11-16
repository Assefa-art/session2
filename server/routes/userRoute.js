const express = require('express')
const UserModel = require('../models/users')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const router = express.Router()
const checkAdminRole = (req, res, next) => {
    // check if the user has the correct role
    // role ==> admin next()
    // unauthorized user
    // next(
    const token = req.headers['authorization']
    if(!token) {
        res.json({
            success:false,
            msg:'unauthorized user!'
        })
    }else{
        
        try {
            const check = jwt.verify(token, process.env.JWT_SECRET)
            // console.log(check)

           if(check.role === "ADMIN") {
            next()
           }else{
            res.json({
                success:false,
                msg:'unauthorized user!'
            })
           }
            
        } catch (error) {
            res.json({
                success:false,
                msg:'unauthorized user!'
            })
        }
        

    }
    
    
}
// we will Protect the route
router.get('/',checkAdminRole, (req, res) => {
    UserModel.find().then(users => {
        res.json({
            users : users
        })
    })
})

router.post('/',(req,res) => {
    const body = req.body
    console.log(body)
    const salt =  bcryptjs.genSaltSync(10)
    bcryptjs.hash(body.password, salt).then(hashed => {
        const newUser = UserModel({
            username : body.username,
            age : body.age,
            phoneNumber:body.phoneNumber,
            email:body.email,
            password:hashed,
            role : body.role || 'USER'
        })
        console.log(newUser)
        newUser.save().then(user => {
            res.json({
                user : user,
                salt:salt
            })
        })
    })
    
})

router.post('/login', (req, res) => {
    const {username, password} = req.body
    // testuser, 1234567
    UserModel.findOne({username : username}).then(user => {
        if(user) {
            bcryptjs.compare(password, user.password).then(matched => {
                if(matched) {
                    console.log(process.env.JWT_SECRET)
                    jwt.sign({username : user.username, email : user.email, age:user.age, phoneNumber:user.phoneNumber, role:user.role}, process.env.JWT_SECRET, (err, token) => {
                        console.log(token)
                        if(!err){
                            res.json({
                                success:true,
                                token:token
                            })
                        }else{
                            res.json({
                                success:false,
                                msg:'Error logging in!'
                            })
                        }
                    })
                    
                }
                else{
                    res.json({
                        success:false,
                        msg:'Incorrect  password!'
                    })
                }
            })
        }else{
            res.json({
                msg:'Incorrect username!'
            })
        }
    })
})

router.get('/filtered', (req, res) => {
    const query = req.query
    query['_id'] = query.id


    UserModel.findOne({query}).then(user => {
        res.json({
            user : user
        })
    })
})


router.get('/:id', (req, res) => {

    UserModel.findOne({_id:req.params.id}).then(user => {
        res.json({
            user : user
        })
    })
})

router.delete('/:id', checkAdminRole,(req, res) => {
    const params = req.params
    UserModel.deleteOne({_id:params.id}).then((anything) => {
        console.log(anything)
        res.json({
            whatever :'User is deleted!'
        })
    })
})

router.delete('/delete-by-username/:username', checkAdminRole,(req, res) => {
    const params = req.params
    UserModel.deleteOne({username:params.username}).then((anything) => {
        console.log(anything)
        res.json({
            whatever :'User is deleted!'
        })
    })
})

// router.patch('/:id', (req, res) => {
//    const params = req.params
//    console.log(req.body)
   
//    UserModel.updateOne({_id:params.id}, {...req.body}).then((user) => {
      
//        res.json({
//            user :user
//       })
//    })
// })

router.patch('/:id',async (req, res) =>{
    try{
        const UpdateUser = await UserModel.findOneAndUpdate( 
            req.params.id,
            {
                $set:req.body,
            },

            {new:true}
           
            );

            res.status(200).json(UpdateUser);
        
        } catch (err) {
        console.log(err)
            res.status(500).json(err)
        }
});


module.exports = router
//i can't hear you
