import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = 'http://localhost:5000';

function getImageSrc(member) {
  if (member.image) return `${API}/uploads/${member.image}`;
  if (member.imageUrl) return member.imageUrl;
  return `https://api.dicebear.com/9.x/pixel-art/svg?seed=${encodeURIComponent(member.name)}&backgroundColor=b6e3f4`;
}

export default function ViewMembers() {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    axios
      .get(`${API}/api/members`)
      .then((res) => { setMembers(res.data); setLoading(false); })
      .catch(() => { setError('Could not fetch members. Is the backend running?'); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <div className="page">
        <div className="loading-screen">
          <div className="spinner" />
          <p className="loading-text">Fetching the roster…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <div className="loading-screen">
          <div style={{ fontSize: '2.5rem' }}>⚠️</div>
          <p style={{ color: 'var(--accent-red)', fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem' }}>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">
            Meet Our <span>Amazing</span> Team
          </h1>
          <p className="page-subtitle">
            {members.length} member{members.length !== 1 ? 's' : ''} · Birds in the TRAP
          </p>
        </div>

        {members.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🪶</div>
            <p className="empty-title">No Members Yet</p>
            <p className="empty-sub">Add the first bird to the trap.</p>
            <div style={{ marginTop: '24px' }}>
              <a href="/add" className="btn btn-primary btn-sm">+ Add First Member</a>
            </div>
          </div>
        ) : (
          <div className="members-grid">
            {members.map((m) => (
              <div className="member-card" key={m._id} onClick={() => navigate(`/member/${m._id}`)}>
                <div className="card-img-wrap">
                  <img
                    src={getImageSrc(m)}
                    alt={m.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://api.dicebear.com/9.x/pixel-art/svg?seed=${encodeURIComponent(m.name)}`;
                    }}
                  />
                  <div className="card-img-overlay" />
                </div>

                <div className="card-body">
                  <div className="card-name">{m.name}</div>
                  <div className="card-role">{m.role}</div>
                  <div className="card-roll" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    Roll: {m.roll}
                  </div>
                </div>

                <div className="card-footer">
                  <button
                    className="btn btn-secondary btn-sm"
                    style={{ width: '100%', justifyContent: 'center' }}
                    onClick={(e) => { e.stopPropagation(); navigate(`/member/${m._id}`); }}
                  >
                    VIEW DETAILS →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
