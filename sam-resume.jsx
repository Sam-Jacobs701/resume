const colors = {
  bg: '#fafaf7',
  text: '#1a1a1a',
  muted: '#6b6b6b',
  rule: '#e6e4dd',
  accent: '#b54a2c',
};

const font =
  '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Helvetica, Arial, sans-serif';

const Section = ({ title, children }) => (
  <section style={{ marginTop: 56 }}>
    <h2
      style={{
        fontSize: 13,
        fontWeight: 500,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: colors.muted,
        marginBottom: 20,
      }}
    >
      {title}
    </h2>
    {children}
  </section>
);

const Role = ({ period, title, company, last }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '110px 1fr',
      gap: 24,
      padding: '14px 0',
      borderBottom: last ? 'none' : `1px solid ${colors.rule}`,
      fontSize: 15,
      lineHeight: 1.5,
    }}
  >
    <div style={{ color: colors.muted, fontVariantNumeric: 'tabular-nums' }}>
      {period}
    </div>
    <div>
      <div style={{ color: colors.text }}>{title}</div>
      <div style={{ color: colors.muted }}>{company}</div>
    </div>
  </div>
);

const Link = ({ href, children }) => (
  <a
    href={href}
    style={{
      color: colors.text,
      textDecoration: 'underline',
      textDecorationColor: colors.accent,
      textDecorationThickness: 1,
      textUnderlineOffset: 3,
    }}
    target={href.startsWith('http') ? '_blank' : undefined}
    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
  >
    {children}
  </a>
);

export default function ResumeSite() {
  return (
    <div
      style={{
        background: colors.bg,
        color: colors.text,
        minHeight: '100vh',
        fontFamily: font,
        fontSize: 16,
        lineHeight: 1.6,
        WebkitFontSmoothing: 'antialiased',
      }}
    >
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        a:hover { opacity: 0.7; }
        @media (max-width: 600px) {
          .role-row { grid-template-columns: 1fr !important; gap: 4px !important; }
        }
      `}</style>

      <main
        style={{
          maxWidth: 640,
          margin: '0 auto',
          padding: '96px 24px 120px',
        }}
      >
        <header>
          <h1 style={{ fontSize: 28, fontWeight: 600, letterSpacing: '-0.01em' }}>
            Sam Jacobs
          </h1>
          <p style={{ marginTop: 6, color: colors.muted, fontSize: 16 }}>
            Product leader based in Alpharetta, GA.
          </p>
        </header>

        <section style={{ marginTop: 32 }}>
          <p style={{ fontSize: 17, lineHeight: 1.7 }}>
            I build software products — currently leading product strategy at{' '}
            <Link href="https://www.credigy.com">Credigy</Link>, where I focus on
            enterprise platforms, data infrastructure, and AI-powered workflows.
            I&rsquo;ve spent the last decade turning messy business problems into
            shippable software.
          </p>
        </section>

        <section style={{ marginTop: 28, fontSize: 16 }}>
          <Link href="mailto:sam@samjacobs.io">sam@samjacobs.io</Link>
          {' · '}
          <Link href="https://linkedin.com/in/sdjacobs">LinkedIn</Link>
        </section>

        <Section title="Now">
          <ul style={{ listStyle: 'none', display: 'grid', gap: 8 }}>
            <li>Leading product strategy across data, cloud, and AI platforms.</li>
            <li>
              Exploring how AI is reshaping the way products get built — and
              shipped.
            </li>
          </ul>
        </Section>

        <Section title="Work">
          <div className="role-row">
            <Role
              period="2022 — Now"
              title="Director, Product Strategy"
              company="Credigy"
            />
          </div>
          <div className="role-row">
            <Role period="2018 — 2022" title="Product Manager" company="Credigy" />
          </div>
          <div className="role-row">
            <Role
              period="2017 — 2018"
              title="Sr. Business Systems Analyst"
              company="Credigy"
            />
          </div>
          <div className="role-row">
            <Role
              period="2015 — 2017"
              title="Business Systems Analyst"
              company="Credigy"
            />
          </div>
          <div className="role-row">
            <Role
              period="2013 — 2015"
              title="Co-Founder"
              company="GoodSurv"
              last
            />
          </div>
        </Section>

        <Section title="Education">
          <div style={{ fontSize: 15 }}>
            <div>B.S. Business Management, North Dakota State University</div>
            <div style={{ color: colors.muted, marginTop: 2 }}>
              CFP® coursework, UGA Terry College of Business
            </div>
          </div>
        </Section>

        <Section title="Certifications">
          <div style={{ fontSize: 15, color: colors.muted }}>
            PMP · Certified ScrumMaster · Azure Fundamentals · MIT AI Strategy
          </div>
        </Section>

        <footer
          style={{
            marginTop: 96,
            paddingTop: 24,
            borderTop: `1px solid ${colors.rule}`,
            fontSize: 13,
            color: colors.muted,
          }}
        >
          © {new Date().getFullYear()} Sam Jacobs
        </footer>
      </main>
    </div>
  );
}
