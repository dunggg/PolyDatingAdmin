let getTimeZone = (req, res, next) => {
    let time = new Date();

    req.getTime = time;
    next();
}

module.exports = getTimeZone;