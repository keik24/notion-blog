// Blog Page
import Link from 'next/link'
// import Header from '../../components/header'
import styled from 'styled-components'
import blogStyles from '../../styles/blog.module.css'
import sharedStyles from '../../styles/shared.module.css'
import { Card, CardContent } from '@material-ui/core'
import Footer from '../../components/footer'

import {
  getBlogLink,
  getDateStr,
  postIsPublished,
} from '../../lib/blog-helpers'
import { textBlock } from '../../lib/notion/renderers'
import getNotionUsers from '../../lib/notion/getNotionUsers'
import getBlogIndex from '../../lib/notion/getBlogIndex'

const StyledCard = styled(Card)`
  overflow: hidden;
  max-width: 744px;
  margin: auto;
`

const Header = styled.div`
  margin-top: 48px;
`

export async function getStaticProps({ preview }) {
  const postsTable = await getBlogIndex()

  const authorsToGet: Set<string> = new Set()
  const posts: any[] = Object.keys(postsTable)
    .map((slug) => {
      const post = postsTable[slug]
      // remove draft posts in production
      if (!preview && !postIsPublished(post)) {
        return null
      }
      post.Authors = post.Authors || []
      for (const author of post.Authors) {
        authorsToGet.add(author)
      }
      return post
    })
    .filter(Boolean)

  const { users } = await getNotionUsers([...authorsToGet])

  posts.map((post) => {
    post.Authors = post.Authors.map((id) => users[id].full_name)
  })

  return {
    props: {
      preview: preview || false,
      posts,
    },
    revalidate: 10,
  }
}

export default ({ posts = [], preview }) => {
  return (
    <>
      <Header />
      {preview && (
        <div className={blogStyles.previewAlertContainer}>
          <div className={blogStyles.previewAlert}>
            <b>Note:</b>
            Viewing in preview mode
            <Link href={`/api/clear-preview`}>
              <button className={blogStyles.escapePreview}>Exit Preview</button>
            </Link>
          </div>
        </div>
      )}
      <div className={`${sharedStyles.layout} ${blogStyles.blogIndex}`}>
        <img
          src="/zeit-and-notion.png"
          height="85"
          width="250"
          alt="Vercel + Notion"
        />
        <h1>Json HardCoder Blog</h1>
        <div className="explanation">
          <p>日々の開発で学んだこととかを投稿するブログ。</p>
        </div>
        {posts.length === 0 && (
          <p className={blogStyles.noPosts}>There are no posts yet</p>
        )}
        {posts.map((post) => {
          return (
            <>
              <StyledCard>
                <CardContent>
                  <div className={blogStyles.postPreview} key={post.Slug}>
                    <h3>
                      <Link href="/blog/[slug]" as={getBlogLink(post.Slug)}>
                        <div className={blogStyles.titleContainer}>
                          {!post.Published && (
                            <span className={blogStyles.draftBadge}>Draft</span>
                          )}
                          <a>{post.Page}</a>
                        </div>
                      </Link>
                    </h3>
                    {post.Authors.length > 0 && (
                      <div className="authors">
                        By: {post.Authors.join(' ')}
                      </div>
                    )}
                    {post.Date && (
                      <div className="posted">
                        Posted: {getDateStr(post.Date)}
                      </div>
                    )}
                    <p>
                      {(!post.preview || post.preview.length === 0) &&
                        'No preview available'}
                      {(post.preview || []).map((block, idx) =>
                        textBlock(block, true, `${post.Slug}${idx}`)
                      )}
                    </p>
                  </div>
                </CardContent>
              </StyledCard>
            </>
          )
        })}
      </div>
      <Footer />
    </>
  )
}
