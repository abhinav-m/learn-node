//A very simple example of what an async function tries to do.
var getUser = (id, cb) => {
    var user = {
        name: 'abhinav',
        id: 11
    }
    setTimeout(() => {
        cb(user);
    }, 3000)
};

getUser(11, (u) => {
    console.log(u.name)
})