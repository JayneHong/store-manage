import { Plugin } from 'vite'

export default function cssModulePlugin(): Plugin {
  return {
    // 插件名称
    name: 'vite-css-module-plugin',

    // pre 会较于 post 先执行
    enforce: 'pre', // post

    // 指明它们仅在 'build' 或 'serve' 模式时调用
    apply: 'serve', // apply 亦可以是一个函数

    load(code) {
      if (code.indexOf('.scss') !== -1) {
        console.log('>>>>>>这里是load钩子', code)
      }
    },

    // transform(code, id, opt) {
    //   if (code.indexOf('.scss') !== -1) {
    //     console.log('这里是transform钩子', code, id, opt)

    //     return code.replace(`import styles from './index.scss'`, `import styles from './index.module.scss'`)
        
    //   }

    //   return code
    // },

    // config(config, { command }) {
    //   console.log('这里是config钩子', config, command)
    // },

    // configResolved(resolvedConfig) {
    //   console.log('这里是configResolved钩子', resolvedConfig)
    // },

    // configureServer(server) {
    //   console.log('这里是configureServer钩子', server)
    // },

    // transformIndexHtml(html) {
    //   console.log('这里是transformIndexHtml钩子', html)
    // },
  }
}
