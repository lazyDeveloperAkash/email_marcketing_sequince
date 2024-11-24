exports.generatedeErrors = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    // Extract the field causing the duplicate err
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        const duplicateValue = err.keyValue[field];

        return res.status(400).json({
            message: `${field.charAt(0).toUpperCase() + field.slice(1)} "${duplicateValue}" is already taken. Please use a different ${field}.`
        });
    }

    res.status(statusCode).json({
        message: err.message,
        errName: err.name
    })
}