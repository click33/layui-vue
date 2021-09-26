import Layout from './App.vue'
import { App, createApp as _createApp, createSSRApp } from 'vue'
import { createRouter } from './router/index'
import { Router } from 'vue-router'
import Layui from '/@src/index'
import LayCode from './components/LayCode.vue'
import './styles/index.css'

export function createApp(): {
  app: App<Element>
  router: Router
} {
  const app =
    import.meta.env.MODE === 'production'
      ? createSSRApp(Layout)
      : _createApp(Layout)
  const router = createRouter()

  app
    .use(router)
    .component('LayCode', LayCode)
    .use(Layui)

  return { app, router }
}
