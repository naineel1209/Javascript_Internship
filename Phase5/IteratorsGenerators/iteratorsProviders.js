const getStudentId = function (id) {
    return new Promise((resolve, reject) => {
        // if (id === 10) resolve(null)
        setTimeout(() => {
            resolve({
                name: ['John', 'Doe', 'Smith', 'Peter', 'Jane', 'Mary'][id % 6],
                id
            })
        }, 2000)
    })
}


const getStudentCourses = function (studentId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['CS101', 'CS102', 'CS103'])
        }, 2000)
    })
}

module.exports = { getStudentCourses, getStudentId }