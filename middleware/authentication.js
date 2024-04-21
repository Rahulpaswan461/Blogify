const { validateToken } = require("../service/authentication")

function checkForAuthenticationCookie(cookieName){
      return (req,res,next)=>{
        const tokenCookieValue = req.cookies[cookieName]
        if(!tokenCookieValue)
         return  next()

        try{
            const userPayload = validateToken(tokenCookieValue)
            //so that in other part of the code we directly use the user 
            //instead of decoding it every time
            req.user = userPayload
        }
        catch(error){}
       return next()

      }
      
}

module.exports={
      checkForAuthenticationCookie
}