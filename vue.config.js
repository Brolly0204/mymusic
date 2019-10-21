const path = require('path')
const axios = require('axios')

const resolve = dir => path.resolve(__dirname, dir)

module.exports = {
  devServer: {
    before(app) {
      const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
      app.get('/api/getDiscList', (req, res) => {
        axios
          .get(url, {
            headers: {
              referer: 'https://c.y.qq.com',
              host: 'c.y.qq.com'
            },
            params: req.query
          })
          .then(response => {
            res.send(response.data)
          })
          .catch(err => {
            console.log('err', err)
          })
      })
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        assets: resolve('src/assets'),
        api: resolve('src/api'),
        base: resolve('src/base'),
        utils: resolve('src/utils')
      }
    }
  }
}
