const http = require('http')
const mysql = require('mysql');
const url = require('url')

// 服务端
const server = http.createServer(async (req, res) => {
    const pathName = url.parse(req.url).pathname;
    let message = await route(pathName)

    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain;charset=utf-8')
    res.end(message + '')
})

// 监听
const port = 8080
server.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}/`)
})

// 路由
async function route(pathName) {
    switch (pathName) {
        case '/':
            return 'Hello World'
            break;
        case '/mysql':
            return mysqlTest()
            break;
        default:
            return 'invalid route'
            break;
    }
}

// MySql测试
function mysqlTest() {

    // MySql
    const connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'eilikce',
        password: 'eilikce',
        database: 'eilikce_test'
    })

    connection.connect(err => {
        if (err) throw err;
        console.log('mysql connncted success!');
    })

    return new Promise((resolve, reject) => {
        const sql = 'select * from eilikce'
        connection.query(sql, (err, result) => {
            if (err) throw err;
            resolve('MySql Result :' + JSON.stringify(result))
        });
    })
}