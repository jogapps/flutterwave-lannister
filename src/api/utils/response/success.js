exports.successMessage = (res) => {
    res.status(200).json({
        status: "ok"
    });
}

exports.successMessageWelcome = (res, message) => {
    res.status(200).json({
        status: "ok",
        message: `${message}`
    });
}

exports.successData = (res, data) => {
    res.status(200).json(data);
}