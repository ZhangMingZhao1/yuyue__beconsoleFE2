// var Mock = require('mockjs')

// // Mock.mock('http://localhost:3006/login', function(options) {
// //     console.log(options);
// //     return Mock.mock({
// //         'userName|1': ['jack', 'jim'], // 随机选取 1 个元素
// //         "data|1": {
// //             'data|0-1': 0
// //         }
// //     });
// // });
// Mock.mock('http://localhost:3006/login', function(options) {
//     console.log(options);
//     return Mock.mock({
//         "user|1-3": [{
//             'name': '@cname',
//             'id|+1': 88
//         }
//       ]
//     });
// });