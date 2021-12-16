function createDateAsUTC(date) {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(),
        date.getDate(), date.getHours() + 7, date.getMinutes(), date.getSeconds()));
}

let getTimeWeb = (req, res, next) => {
    let time = new Date();

    req.getTime = time;
    next();
}

let getTimeApi = (req, res, next) => {
    let time = new Date();
    let getTime = createDateAsUTC(time);

    req.getTime = getTime;
    next();
}

module.exports = { getTimeWeb, getTimeApi };