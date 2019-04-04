import Content from 'nyc-lib/nyc/Content'
import pods from './pods'
import App from './App'

Content.loadCsv({
  url: pods.CONTENT_URL,
}).then(content => {
  let url = content.message('pods_url')
  if (content.message('active') === 'true') {
    url += encodeURIComponent(pods.ACTIVE_POD_WHERE_CLAUSE)
  }
  new App(content, url)
})
