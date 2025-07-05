const crypto = require('crypto');
const UrlModel = require('../models/urlModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.loginUser = async (req, res) => {
  try {
     
    let {username, password} = req.body;
  
    let chekcUser = await UrlModel.chekcUser(username);
   
    if(chekcUser){
        const match = await bcrypt.compare(password, chekcUser.password);
        if(match){
         const token = jwt.sign({ id: chekcUser.id, username: chekcUser.username }, 'JWT_SECRET', { expiresIn: '1h' });
        return res.status(200).json({success:true, token : token
        })
    }
    }
     req.body.password = await bcrypt.hash(password, 10);
    
    let newUser = await UrlModel.registerUser(req.body);
    if(newUser){
     const token = jwt.sign({ id: newUser.id, username: newUser.username }, 'JWT_SECRET', { expiresIn: '1h' });
     return res.status(201).json({success:true, message: 'you have registered succefully', token : token});
    }
  } catch (err) {
    console.log(err.message);
   return res.status(500).json({success:false, message: err.message });
  }
};
exports.createUrl = async (req, res) => {
  try {

  const shortCode =  crypto.randomBytes(3).toString('hex');
   req.body.short_code = shortCode;

  const saveUrl = await UrlModel.createURL(req.body);
    
  return res.status(201).json({
    success:true,
    url: `http://localhost:3000/${shortCode}`,

  })

  } catch (err) {
    console.log(err.stack);
   return res.status(500).json({success:false, message: err.message });
  }
};