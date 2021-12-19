let mcache = require('memory-cache');

exports.cache = (duration) => {
  return (req,res,next) => {
    let key='__express__' + req.originalUrl || req.url
    let cacheBody = mcache.get(key);
    if(cacheBody) {
      res.send(cacheBody) 
      console.log(cacheBody);
      console.log('b');
      return
    } else {
      res.sendResponse = res.send
      res.send = (body) => {
        mcache.put(key,body,duration * 1000);
        res.sendResponse(body);
        console.log('a');
      }
      next();
    }
  }
}


exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send('로그인 필요');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');

  }
};
