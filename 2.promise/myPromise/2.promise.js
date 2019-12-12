let Promise = require('./promise');
let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('有钱了')
    }, 1000);
});
p.then((data) => {
    console.log(1, data);
    return data + 1
}, (err) => {
    console.log(err);
}).then((data) => {
    console.log(2, data);
}, (err) => {
    console.log(err);
})
