const { createServer } = require('https')
const { parse } = require('url')
const next = require('next')
const fs = require('fs')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const httpsOptions = {
	key: fs.readFileSync('./key.pem'),
	cert: fs.readFileSync('./cert.pem'),
}

app.prepare().then(() => {
	createServer(httpsOptions, (req, res) => {    
		const parsedUrl = parse(req.url, true)
		const { pathname, query } = parsedUrl

		if (pathname === '/login') {
			app.render(req, res, '/login', query)
		} else {
			handle(req, res, parsedUrl)
		}
	}).listen(port, err => {
		if (err) throw err
		console.log(`> Ready on https://localhost:${port}`)
	})
})