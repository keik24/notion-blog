export default () => (
  <>
    <script
      async
      src={`https://www.googletagmanager.com/gtag/js?id=UA-168771799-1`}
    />
    <script
      dangerouslySetInnerHTML={{
        __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'UA-168771799-1');
            `,
      }}
    />
  </>
)