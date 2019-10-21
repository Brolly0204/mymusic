import axios from 'axios'
import jsonp from '@/utils/jsonp'
import { commonParams, options } from './config.js'

const isDev = process.env.NODE_ENV === 'development'

export const getRecommend = () => {
  const url =
    'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, commonParams, {
    uin: 0,
    platform: 'h5',
    needNewCode: 1
  })
  return jsonp(url, data, options)
}

export const getDiscList = () => {
  // const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  const url = '/api/getDiscList'
  const data = Object.assign({}, commonParams, {
    platform: 'yqq.json',
    format: 'json', // 获取json格式数据 JSONP时 才参数因为 'jsonp'
    needNewCode: 0,
    hostUin: 0,
    sin: 0,
    ein: 19,
    sortId: 5,
    categoryId: 10000000,
    rnd: Math.random()
  })

  // return jsonp(url, data, options)
  return axios
    .get(url, {
      params: data
    })
    .then(res => res.data)
}
