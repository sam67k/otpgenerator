const { User } = require('../models')

const { Op } = require('sequelize');

// add new user
exports.addUser = async (req, res) => {
  const name = req.body.name
  const phone_number = req.body.phone_number

  if (!name || !phone_number) {
    return res.status(400).json({ message: 'Value missing!' })
  }

  const user = await User.create({
    name: name,
    phone_number: phone_number
  })

  return res.status(201).json({ message: 'User created!' });
}

// generate otp for user if phone_number matches
exports.generateOTP = async (req, res) => {
  const user = await User.findOne({ where: { phone_number: req.body.phone_number } })
  if (!user) {
    return res.status(404).json({ message: 'User not found!' })
  }
  user.otp = Math.floor(1000 + Math.random() * 9000);
  user.otp_expiration = Date.now() + 300000
  user.save()

  return res.status(200).json({ id: user.id })
}

// verify unexpired otp for a userid
exports.verifyOTP = async (req, res) => {
  const id = req.params.user_id
  const otp = req.query.otp
  const user = await User.findOne({ where: { id: id, otp: otp, otp_expiration: { [Op.gt]: Date.now() } } })
  if (!user) {
    return res.json({ message: 'Verification Failed!' })
  }
  return res.status(200).json({ user: user })
}