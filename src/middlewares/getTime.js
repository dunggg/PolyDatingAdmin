function createDateAsUTC(date) {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(),
        date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
}

let getTimeZone = (req, res, next) => {
    let time = new Date();
    let getTime = createDateAsUTC(time);

    req.getTime = time;
    next();
}

module.exports = getTimeZone;