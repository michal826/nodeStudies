const level = require('level');

const db = level('./db', {
    valueEncoding: 'json'
});

// db.put('1', { title: 'Hello world' }, err => {
//     if (err) return console.log(`error: ${err.message}`);

//     console.log('saved todo');

//     db.get('1', (err, val) => {
//         if (err) return console.log(`error: ${err.message}`);
    
//         console.log(val);
//     });

//     db.del('1', err => {
//         if (err) return console.log(`error: ${err.message}`);

//         console.log('deleted "1"')
//         db.get('1', (err, val) => {
//             if (err) return console.log(`error: ${err.message}`);
        
//             console.log(val)
//         });
//     });
// });