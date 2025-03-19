export const errorHandler = async (err, c) => {
    c.status(500);
    return c.json({
        msg: "Internal Server error",
        error: err.message
    });
};
