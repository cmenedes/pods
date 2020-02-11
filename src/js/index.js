import Content from 'nyc-lib/nyc/Content'
import App from './App'
import pods from './pods'

Content.loadCsv({
  url: pods.CONTENT_URL,
}).then(content => {
  new App(content)
})
