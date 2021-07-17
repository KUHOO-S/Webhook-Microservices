
function setUser(req, res, next) {
  const userRole = req.body.userRole

  if (req.body.userRole == null) {
    res.status(403)
    return res.send('You need to sign in')
  }
  if (userRole == "admin") {
    req.user = userRole
    next()
  }
  else {
    res.status(401)
    return res.send('Not allowed')
  }
}
  module.exports = setUser;