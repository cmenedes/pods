import Content from 'nyc-lib/nyc/Content'
import pods from './pods'
import App from './App'

Content.loadCsv({
  url: pods.CONTENT_URL,
}).then(content => {
  let url = pods.PODS_URL
  if (content.message('active') === true) {
    url += endcodeURIComponent(pod.ACTIVE_POD_WHERE_CLAUSE)
  }
  new App(content, url)
})
