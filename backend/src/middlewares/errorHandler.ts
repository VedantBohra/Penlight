import {Context} from 'hono'

export const errorHandler = async(err:Error,c:Context) => {
    c.status(500)
    return c.json({
        msg : "Internal Server error",
        error : err.message
    })

}