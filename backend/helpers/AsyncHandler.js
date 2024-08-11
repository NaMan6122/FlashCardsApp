//higher order function which acts as a wrapper for executing async functions in a less bulky format.
const asyncHandler = (func) => async(req, res, next) => {
    try {
        await func(req, res, next);
    } catch (error) {
        res.status(error.code || 500)
        .json({
            message: error.message,
            success: false,
        });
        console.log(`Wrapper Exec Error: ${error}`);
    }
}

export {asyncHandler};