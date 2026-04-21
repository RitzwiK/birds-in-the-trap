import React from 'react';
import { Link } from 'react-router-dom';

const MEMBERS_PREVIEW = [
  { name: 'Kanye West',       role: 'Creative Director' },
  { name: 'Drake',            role: 'Content Strategist' },
  { name: 'Linus Torvalds',   role: 'Lead Developer' },
  { name: 'Elon Musk',        role: 'Systems Architect' },
  { name: 'Jeff Bezos',       role: 'Product Manager' },
  { name: 'Tyler the Creator',role: 'UI/UX Designer' },
];

export default function Home() {
  return (
    <div className="page">
      <section className="home-hero">
        <span className="hero-tag">✦ SRM Institute · Full Stack Development · 21CSS301T</span>

        <h1 className="hero-title">
          Birds<br />
          <span className="gold">in the</span><br />
          TRAP
        </h1>

        <p className="hero-sub">
          Six visionaries. One team. Building the future of technology,
          design, and culture — one commit at a time.
        </p>

        <div className="hero-actions">
          <Link to="/add" className="btn btn-primary">
            <span>+</span> Add Member
          </Link>
          <Link to="/view" className="btn btn-secondary">
            View Team →
          </Link>
        </div>

        {/* Stats strip */}
        <div className="glass home-stats" style={{ borderRadius: '16px', overflow: 'hidden' }}>
          {[
            { num: '6',     label: 'Members' },
            { num: 'MERN',  label: 'Stack' },
            { num: '100%',  label: 'Committed' },
            { num: '2024',  label: 'Cohort' },
          ].map((s) => (
            <div className="stat-item" key={s.label}>
              <div className="stat-num">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Team roll section */}
      <section style={{ padding: '40px 0 100px' }}>
        <div className="container">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '32px',
            }}
          >
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2rem', letterSpacing: '0.06em' }}>
              The <span style={{ color: 'var(--accent-gold)' }}>Roster</span>
            </h2>
            <Link to="/view" className="btn btn-secondary btn-sm">
              See Full Profiles →
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '16px',
            }}
          >
            {MEMBERS_PREVIEW.map((m, i) => (
              <div
                key={m.name}
                className="glass"
                style={{
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  borderRadius: '16px',
                  animation: `fadeUp 0.5s ${0.05 * i}s ease both`,
                  transition: 'all 0.25s ease',
                }}
              >
                {/* Avatar initials */}
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'var(--accent-gold-glow)',
                    border: '1px solid var(--border-accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '1.2rem',
                    color: 'var(--accent-gold)',
                    flexShrink: 0,
                  }}
                >
                  {m.name.split(' ').map((n) => n[0]).join('').slice(0,2)}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {m.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.62rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--text-muted)',
                      marginTop: '2px',
                    }}
                  >
                    {m.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
