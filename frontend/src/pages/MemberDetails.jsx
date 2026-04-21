import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = 'http://localhost:5000';

function getImageSrc(member) {
  if (member.image)    return `${API}/uploads/${member.image}`;
  if (member.imageUrl) return member.imageUrl;
  return `https://api.dicebear.com/9.x/pixel-art/svg?seed=${encodeURIComponent(member.name)}&backgroundColor=b6e3f4`;
}

function Field({ label, value, wide }) {
  if (!value) return null;
  return (
    <div className={`detail-field${wide ? ' wide' : ''}`}>
      <label>{label}</label>
      <p>{value}</p>
    </div>
  );
}

export default function MemberDetails() {
  const { id }   = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    axios
      .get(`${API}/api/members/${id}`)
      .then((res) => { setMember(res.data); setLoading(false); })
      .catch(() => { setError('Member not found.'); setLoading(false); });
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm(`Remove ${member.name} from the roster?`)) return;
    try {
      setDeleting(true);
      await axios.delete(`${API}/api/members/${id}`);
      navigate('/view');
    } catch {
      alert('Failed to delete member.');
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <div className="loading-screen">
          <div className="spinner" />
          <p className="loading-text">Loading member…</p>
        </div>
      </div>
    );
  }

  if (error || !member) {
    return (
      <div className="page">
        <div className="loading-screen">
          <div style={{ fontSize: '2.5rem' }}>❌</div>
          <p style={{ color: 'var(--accent-red)', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem' }}>
            {error || 'Member not found.'}
          </p>
          <button className="btn btn-secondary btn-sm" onClick={() => navigate('/view')} style={{ marginTop: 16 }}>
            ← Back to Team
          </button>
        </div>
      </div>
    );
  }

  const hobbies = member.hobbies
    ? member.hobbies.split(',').map((h) => h.trim()).filter(Boolean)
    : [];

  return (
    <div className="page detail-page">
      <div className="container">
        {/* Back link */}
        <button
          className="detail-back"
          onClick={() => navigate('/view')}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          ← Back to Team
        </button>

        <div className="detail-layout">
          {/* ── Sidebar ─────────────────────────────────────────── */}
          <aside className="detail-sidebar">
            <img
              className="detail-img"
              src={getImageSrc(member)}
              alt={member.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://api.dicebear.com/9.x/pixel-art/svg?seed=${encodeURIComponent(member.name)}`;
              }}
            />
            <div className="detail-id-block">
              <h2 className="detail-name-lg">{member.name}</h2>
              <div className="detail-role-badge">{member.role}</div>

              <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <InfoRow icon="📋" label="Roll"   value={member.roll} />
                <InfoRow icon="🎓" label="Degree" value={`${member.degree} · ${member.year}`} />
                <InfoRow icon="✉️" label="Email"  value={member.email} />
              </div>

              <button
                className="btn btn-ghost btn-sm"
                onClick={handleDelete}
                disabled={deleting}
                style={{ width: '100%', justifyContent: 'center', marginTop: '20px' }}
              >
                {deleting ? 'Removing…' : '🗑 Remove Member'}
              </button>
            </div>
          </aside>

          {/* ── Main content ──────────────────────────────────── */}
          <main className="detail-content">
            {/* Core info */}
            <div className="detail-card">
              <p className="detail-section-title">// Academic Info</p>
              <div className="detail-grid">
                <Field label="Full Name"   value={member.name} />
                <Field label="Roll Number" value={member.roll} />
                <Field label="Year"        value={member.year} />
                <Field label="Degree"      value={member.degree} />
                <Field label="Role"        value={member.role} />
                <Field label="Email"       value={member.email} />
              </div>
            </div>

            {/* Project + Aim */}
            {(member.project || member.aboutYourAim) && (
              <div className="detail-card">
                <p className="detail-section-title">// Work & Vision</p>
                <div className="detail-grid">
                  <Field label="Project"      value={member.project}      wide={true} />
                  <Field label="About Your Aim" value={member.aboutYourAim} wide={true} />
                </div>
              </div>
            )}

            {/* Achievements */}
            {(member.certificate || member.internship) && (
              <div className="detail-card">
                <p className="detail-section-title">// Achievements</p>
                <div className="detail-grid">
                  <Field label="Certificate" value={member.certificate} />
                  <Field label="Internship"  value={member.internship}  />
                </div>
              </div>
            )}

            {/* Hobbies */}
            {hobbies.length > 0 && (
              <div className="detail-card">
                <p className="detail-section-title">// Hobbies & Interests</p>
                <div className="hobbies-list">
                  {hobbies.map((h) => (
                    <span className="hobby-tag" key={h}>{h}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Meta */}
            <div
              className="detail-card"
              style={{ background: 'transparent', border: '1px dashed var(--border)' }}
            >
              <p className="detail-section-title">// Metadata</p>
              <div className="detail-grid">
                <div className="detail-field">
                  <label>Member ID</label>
                  <p className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)', wordBreak: 'break-all' }}>
                    {member._id}
                  </p>
                </div>
                <div className="detail-field">
                  <label>Added On</label>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    {new Date(member.createdAt).toLocaleDateString('en-IN', {
                      year: 'numeric', month: 'long', day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  if (!value) return null;
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
      <span style={{ flexShrink: 0, fontSize: '0.9rem' }}>{icon}</span>
      <div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
          {label}
        </div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginTop: '2px' }}>
          {value}
        </div>
      </div>
    </div>
  );
}
