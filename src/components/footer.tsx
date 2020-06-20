import ExtLink from './ext-link'
import styled from 'styled-components'
import { contacts } from '../pages/contact'

const StyledFooter = styled.footer`
  background-color: #3e3e3e;
  margin-top: 32px;
  padding: 32px 16px;
  color: #fff;
`

const Container = styled.div`
  max-width: 980px;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const FooterTitle = styled.div`
  width: -webkit-fill-available;
  height: 33.5px;
  font-size: 24px;
  text-align: left;
`

const LinksContent = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1rem;
  max-width: 500px;
  text-align: center;
`

const CompWrapper = styled.div`
  margin-left: 12px;
`

const Span = styled.span`
  order: 2;
  flex-basis: 100%;
  margin-top: 10px;
  text-align: center;
  font-size: 16px;
  text-align: left;
`

export default () => {
  return (
    <>
      <StyledFooter>
        <Container>
          <FooterTitle>JSON HardCoder BLOG</FooterTitle>
          <LinksContent>
            {contacts.map(({ Comp, link, alt }) => {
              return (
                <ExtLink key={link} href={link} aria-label={alt}>
                  <CompWrapper>
                    <Comp height={40} />
                  </CompWrapper>
                </ExtLink>
              )
            })}
          </LinksContent>

          <Span>© 2020, Built with Now createdBy Json HardCoder</Span>
        </Container>
      </StyledFooter>
    </>
  )
}
