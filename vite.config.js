const {resolve} = require('path')
console.log(resolve(__dirname, './src'))
export default {
  alias: {
    '/@/': resolve(__dirname, './src')
  }
}
