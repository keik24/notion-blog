import Link from 'next/link'
import Header from '../components/header'
import ExtLink from '../components/ext-link'
import Features from '../components/features'
import sharedStyles from '../styles/shared.module.css'
import Footer from '../components/footer'

export default () => (
  <>
    <Header titlePre="Home" />
    <div className={sharedStyles.layout}>
      <img
        src="/zeit-and-notion.png"
        height="85"
        width="250"
        alt="Vercel + Notion"
      />
      <h1>Json HardCoder Blog</h1>
      <h2>
        Next.jsを使った Notion ブログ
        <ExtLink
          href="https://github.com/zeit/next.js/issues/9524"
          style={{ color: 'inherit' }}
        >
          SSG
        </ExtLink>
      </h2>

      {/* 以下のコンポーネントいらん */}
      {/* <Features /> */}

      <div className="explanation">
        <p>日々の開発で学んだこととかを投稿するブログ。</p>
      </div>
    </div>
    <Footer />
  </>
)
