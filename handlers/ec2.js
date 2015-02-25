var list = function(req) {
  req.io.emit('ec2:list', {
             
  });
  console.log('hihi');
}

module.exports = {
  'list': list
}
