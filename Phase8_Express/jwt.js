const jwt = require('jsonwebtoken');

const data = {
    name: 'John Doe',
    age: 30,
    address: '123, Park Street, New York, NY',
}
const token = jwt.sign(data, 'secretData123', {
    expiresIn: '1hr',
    algorithm: 'HS256',
})

console.log(token)

console.log(jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4ga2hhbGFzIiwiaWF0IjoxNTE2MjM5MDIyfQ.3KeHMnQbmOpU7ZybdYo7cVJwbKuBVxLRqZU3d8Bf5EA', 'jigarkhalas'))
