const { getStudentCourses, getStudentId } = require('./iteratorsProviders');

let customRange = {
    [Symbol.asyncIterator]: async function* () {
        let i = 0;
        while (true) {
            const student = await getStudentId(i++)
            if (student) {
                yield student
            } else {
                return;
            }
        }

        //! this is the same as above
        // let count = 0;
        // console.log('inside asyncItr')

        // return {
        //     next: async function () {
        //         //! basically we fetch the data asynchronously and return it, if we don't have any data to return we return done: true

        //         const student = await getStudentId(count)
        //         // const courses = await getStudentCourses(student.id)

        //         count++

        //         if (student) {
        //             return {
        //                 value: student,
        //                 done: false
        //             }
        //         } else {
        //             return {
        //                 done: true
        //             }
        //         }
        //     }
        // }
    }
};
(async () => {
    for await (const student of customRange) {
        console.log(student)
    }
})()