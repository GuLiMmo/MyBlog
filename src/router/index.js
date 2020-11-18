import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: () => import('../components/Welcome.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../components/Login.vue')
  },
  {
    path: '/Console',
    name: 'Console',
    component: () => import('../components/Console.vue'),
    beforeEnter: (to, from, next) => {
      if (to.path === '/Login' || to.path === '/Sourcecode' || to.path === '/about' || to.path === '/Comment') return next()
      const tokenStr = window.sessionStorage.getItem('token')
      // console.log(tokenStr)
      if (!tokenStr) {
        return next('/Login')
      }
      next()
      // window.sessionStorage.removeItem('token')
    }
  },
  {
    path: '/Article',
    name: 'Article',
    component: () => import('../components/Article.vue'),
    redirect: '/Blog',
    children: [
      {
        path: '/Blog',
        name: 'Blog',
        component: () => import('../components/blog.vue')
      },
      {
        path: '/articleCont/:id',
        name: 'articleCont',
        component: () => import('../components/articleCont.vue')
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('../components/about.vue')
      },
      {
        path: '/Sourcecode',
        name: 'Sourcecode',
        component: () => import('../components/Sourcecode.vue')
      },
      {
        path: '/Comment',
        name: 'Comment',
        component: () => import('../components/comment.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
