

import dotenv from 'dotenv'

dotenv.config()

if(!process.env.MONGO_URI){
    throw new Error("mongo uri isn't present in env variable")
}

const config = {
    MONGO_URI:process.env.MONGO_URI,
    JWT_SECRET:process.env.JWT_SECRET,
    PORT:process.env.PORT
}

export default config