const errorHandler = async (error, req, res, next) => {
    try {
        await next();
    } catch (erorr){
        console.log(error);
    }
}

export default errorHandler;