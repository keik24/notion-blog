import '../styles/global.css'
import ExtLink from '../components/ext-link'

import * as gtag from '../lib/gtag'

export default ({ Component, pageProps }) => (
  <>
    <Component {...pageProps} />

    <footer>
      <span></span>
      <span>
        <ExtLink href="">
        </ExtLink>
      </span>
    </footer>
  </>
)
