.status-icon.warning {
  background-color: rgba(234, 179, 8, 0.1);
}<script setup>
import { ref, onMounted } from 'vue'

// 定义props，接收url参数
const props = defineProps({
  url: {
    type: String,
    required: true
  },
  checkInterval: {
    type: Number,
    default: 30000 // 默认30秒检查一次
  },
  timeout: {
    type: Number,
    default: 10000 // 默认超时时间10秒
  }
})

// 状态变量
const isAvailable = ref(false)
const latency = ref(null)
const loading = ref(true)
const errorMessage = ref('')
const intervalId = ref(null)
const copySuccess = ref(false)
const isHttp = ref(false)

// 检查URL是否是HTTP
const checkIfHttp = () => {
  isHttp.value = props.url.toLowerCase().startsWith('http:')
}

// 复制URL到剪贴板
const copyToClipboard = () => {
  navigator.clipboard.writeText(props.url)
    .then(() => {
      copySuccess.value = true
      setTimeout(() => {
        copySuccess.value = false
      }, 2000)
    })
    .catch(err => {
      console.error('无法复制URL: ', err)
    })
}

// 检查服务状态的方法
const checkService = async () => {
  loading.value = true
  errorMessage.value = ''
  checkIfHttp()
  
  // 如果是HTTP URL，不执行实际检测
  if (isHttp.value) {
    loading.value = false
    isAvailable.value = false
    errorMessage.value = '由于浏览器安全限制，无法检测HTTP服务'
    return
  }
  
  try {
    const startTime = performance.now()
    
    // 使用fetch API进行请求
    const response = await Promise.race([
      fetch(props.url, { 
        method: 'HEAD',
        cache: 'no-cache',
        mode: 'no-cors'
      }),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('请求超时')), props.timeout)
      )
    ])
    
    const endTime = performance.now()
    
    // 计算延迟时间
    latency.value = Math.round(endTime - startTime)
    isAvailable.value = true
  } catch (error) {
    isAvailable.value = false
    errorMessage.value = error.message
    latency.value = null
  } finally {
    loading.value = false
  }
}

// 组件挂载时开始检查，并设置定时器
onMounted(() => {
  checkIfHttp()
  checkService()
  
  // 定时检查服务状态，只在非HTTP URL时设置
  if (props.checkInterval > 0 && !isHttp.value) {
    intervalId.value = setInterval(checkService, props.checkInterval)
  }
})

// 组件卸载时清除定时器
const onBeforeUnmount = () => {
  if (intervalId.value) {
    clearInterval(intervalId.value)
  }
}
</script>

<template>
  <div class="service-card">
    <div class="service-header">
      <div class="url-display">{{ url }}</div>
      <button @click="copyToClipboard" class="btn-copy" :class="{ 'copied': copySuccess }">
        {{ copySuccess ? '已复制' : '复制' }}
      </button>
    </div>
    
    <div class="service-body">
      <div v-if="loading" class="loading-indicator">
        <div class="loader"></div>
      </div>
      
      <div v-else class="status-display">
        <div class="status-icon" :class="{ 'available': isAvailable, 'unavailable': !isAvailable, 'warning': isHttp }">
          <svg v-if="isAvailable" class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6L9 17L4 12" stroke="rgb(16, 185, 129)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg v-else-if="isHttp" class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 9V13" stroke="rgb(234, 179, 8)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 17H12.01" stroke="rgb(234, 179, 8)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="rgb(234, 179, 8)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg v-else class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="rgb(220, 38, 38)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6 6L18 18" stroke="rgb(220, 38, 38)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        
        <div class="status-info">
          <div class="status-text">
            <span v-if="isAvailable">可用</span>
            <span v-else-if="isHttp">无法检测</span>
            <span v-else>不可用</span>
          </div>
          <div v-if="isAvailable" class="latency">{{ latency }}ms</div>
          <div v-if="!isAvailable && errorMessage" class="error">
            <template v-if="isHttp">
              由于浏览器安全限制，无法检测HTTP服务。请复制URL手动验证。
            </template>
            <template v-else>
              {{ errorMessage }}
            </template>
          </div>
        </div>
        
        <button @click="checkService" class="btn-refresh" title="重新检测">
          重新检测
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.service-card {
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  background-color: var(--vp-c-bg-soft);
  margin: 12px 0;
  overflow: hidden;
  max-width: 100%;
}

.service-header {
  padding: 8px 12px;
  background-color: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider-light);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.url-display {
  font-family: var(--vp-font-family-mono);
  font-size: 0.85em;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 70%;
}

.btn-copy {
  background-color: transparent;
  border: 1px solid var(--vp-c-brand);
  color: var(--vp-c-brand);
  font-size: 0.75em;
  padding: 2px 6px;
  border-radius: 3px;
  cursor: pointer;
}

.btn-copy:hover {
  background-color: var(--vp-c-brand-dimm);
}

.btn-copy.copied {
  background-color: var(--vp-c-green-dimm);
  color: var(--vp-c-green);
  border-color: var(--vp-c-green);
}

.service-body {
  padding: 10px 12px;
  min-height: 40px;
}

.loading-indicator {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
}

.loader {
  width: 18px;
  height: 18px;
  border: 2px solid var(--vp-c-brand-dimm);
  border-top-color: var(--vp-c-brand);
  border-radius: 50%;
  animation: spin 1s infinite linear;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.status-display {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.status-icon {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.status-icon.available {
  background-color: rgba(16, 185, 129, 0.1);
}

.status-icon.unavailable {
  background-color: rgba(220, 38, 38, 0.1);
}

.icon {
  width: 16px;
  height: 16px;
}

.status-info {
  flex: 1;
  padding: 0 12px;
}

.status-text {
  font-weight: 500;
  font-size: 0.9em;
}

.latency {
  font-size: 0.8em;
  color: var(--vp-c-text-2);
}

.error {
  font-size: 0.75em;
  color: var(--vp-c-red);
  margin-top: 2px;
  word-break: break-word;
}

.btn-refresh {
  background-color: transparent;
  border: none;
  color: var(--vp-c-text-2);
  font-size: 0.75em;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 3px;
  transition: background-color 0.2s, opacity 0.2s;
}

.btn-refresh:hover {
  background-color: var(--vp-c-bg-alt);
  opacity: 1;
}
</style>