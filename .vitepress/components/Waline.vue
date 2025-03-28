<template>
  <div id="waline"></div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { inBrowser } from 'vitepress'

let walineInstance = null

onMounted(() => {
  if (inBrowser) {
    // 动态加载样式
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://unpkg.com/@waline/client@v3/dist/waline.css'
    document.head.appendChild(link)

    // 动态加载脚本
    import('https://unpkg.com/@waline/client@v3/dist/waline.js').then(module => {
      const { init } = module

      walineInstance = init({
        el: '#waline',
        serverURL: 'https://feedback.yby.zone',
        reaction: false,
      })
    })
  }
})

onBeforeUnmount(() => {
  // 组件卸载时销毁Waline实例
  if (walineInstance && typeof walineInstance.destroy === 'function') {
    walineInstance.destroy()
  }
})
</script>