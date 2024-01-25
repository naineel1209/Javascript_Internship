const { getStudentCourses, getStudentId } = require('./iteratorsProviders')

// Async iterators are a new kind of iterator that can be consumed asynchronously.
let asyncItr = {
    [Symbol.asyncIterator]: function () {
        let count = 0;
        console.log('inside asyncItr')

        return {
            next: async function () {
                //! basically we fetch the data asynchronously and return it, if we don't have any data to return we return done: true

                const student = await getStudentId(count)
                // const courses = await getStudentCourses(student.id)

                count++

                if (student) {
                    return {
                        value: student,
                        done: false
                    }
                } else {
                    return {
                        done: true
                    }
                }
            }
        }
    }
};

(async () => {
    for await (const student of asyncItr) {
        console.log(student)
    }
})()