var Mock = require('mockjs')

Mock.mock('http://localhost/login', function(options) {
    console.log(options);
    return Mock.mock({
        "data|1": {
            'data|0-1': 0
        }
    });
});