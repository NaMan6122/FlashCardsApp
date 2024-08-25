//higher order function, accepts a function as a parameter and returns a function as well.
const asyncHandler = (func) => async (req, res, next) => {
    try {
        await func(req, res, next);
    } catch (error) {
        res.status(error.code || 500).json({
            message: error.message,
        });
    }
}

export {asyncHandler};