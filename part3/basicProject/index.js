// const PORT=process.env.PORT||3001
const app=require('./app')
const logger=require('./utils/logger')
const config=require('./utils/config')
app.listen(config.PORT,()=>{
    logger.info("SERVER RUNNING ON PORT "+config.PORT )
})

module.exports=app;