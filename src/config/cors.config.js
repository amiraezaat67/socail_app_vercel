
const  corsOptions = {
  origin: function (origin, callback) {
    const whitelist = [process.env.FRONTEND_ORIGIN , undefined]        
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

export  {corsOptions}