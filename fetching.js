fetch('https://zurutech.keka.com/k/default/api/employee/lookup/globalsearch?searchKey=ZTIN053&includeRelivedEmployees=false', {
    method: 'GET'
}).then(res => {
    console.log(res)
    return res.json();
})