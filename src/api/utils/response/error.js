exports.errorMessage = (res, currency) => {
    res.status(500).json({
        "Error": `No fee configuration for ${currency} transactions.`
    });
}

exports.errorData = (res, message) => {
    res.status(500).json({
        status: "error",
        message: message ? message : null,
    });
}