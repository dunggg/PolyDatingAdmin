const hbs = require('hbs');

// hbs.registerHelper('compare', (object) => {
//     const s1 = Number(object.data.root.page);
//     const s2 = object.data.index + 1;
//     return s1 === s2
//         ? `<li class="page-item active "><a class="page-link" href="/users/page/${s1}">${s1}</a></li>`
//         : `<li class="page-item"><a class="page-link" href="/users/page/${s2}">${s2}</a></li>`;
// });

hbs.registerHelper({
    eq: (v1, v2) => v1 === v2,
    ne: (v1, v2) => v1 !== v2,
    lt: (v1, v2) => v1 < v2,
    gt: (v1, v2) => v1 > v2,
    lte: (v1, v2) => v1 <= v2,
    gte: (v1, v2) => v1 >= v2,
    and() {
        return Array.prototype.every.call(arguments, Boolean);
    },
    or() {
        return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
    }
});

module.exports = hbs;