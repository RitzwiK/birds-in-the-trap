import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = 'http://localhost:5000';

const REQUIRED = ['name', 'roll', 'year', 'degree', 'role', 'email'];

const FIELDS = [
  { id: 'name',         label: 'Full Name',              placeholder: 'e.g. Kanye West',        half: true,  required: true  },
  { id: 'roll',         label: 'Roll Number',            placeholder: 'e.g. TRAP001',           half: true,  required: true  },
  { id: 'year',         label: 'Year',                   placeholder: 'e.g. 2024',              half: true,  required: true  },
  { id: 'degree',       label: 'Degree',                 placeholder: 'e.g. B.Tech',            half: true,  required: true  },
  { id: 'role',         label: 'Role / Designation',     placeholder: 'e.g. Lead Developer',    half: true,  required: true  },
  { id: 'email',        label: 'Email Address',          placeholder: 'you@email.com',          half: true,  required: true  },
  { id: 'project',      label: 'About Project',          placeholder: 'Describe your project…', half: false, required: false, textarea: true },
  { id: 'hobbies',      label: 'Hobbies (comma-separated)', placeholder: 'Reading, Coding, Music…', half: false, required: false },
  { id: 'certificate',  label: 'Certificate',            placeholder: 'e.g. AWS Certified',     half: true,  required: false },
  { id: 'internship',   label: 'Internship',             placeholder: 'e.g. Google Summer',     half: true,  required: false },
  { id: 'aboutYourAim', label: 'About Your Aim',         placeholder: 'Your goals and vision…', half: false, required: false, textarea: true },
];

function validate(form) {
  const errs = {};
  REQUIRED.forEach((k) => {
    if (!form[k] || !form[k].trim()) errs[k] = 'This field is required';
  });
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errs.email = 'Enter a valid email address';
  }
  return errs;
}

export default function AddMember() {
  const navigate = useNavigate();
  const fileRef  = useRef(null);

  const [form, setForm] = useState({
    name: '', roll: '', year: '', degree: '', role: '', email: '',
    project: '', hobbies: '', certificate: '', internship: '', aboutYourAim: '',
  });
  const [errors,   setErrors]   = useState({});
  const [image,    setImage]    = useState(null);
  const [preview,  setPreview]  = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [status,   setStatus]   = useState(null); // { type: 'success'|'error', msg }
  const [loading,  setLoading]  = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((f) => ({ ...f, [id]: value }));
    if (errors[id]) setErrors((er) => { const n = { ...er }; delete n[id]; return n; });
  };

  const handleFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setStatus({ type: 'error', msg: 'Only image files are allowed.' });
      return;
    }
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const onFileChange = (e) => handleFile(e.target.files[0]);

  const onDrop = (e) => {
    e.preventDefault(); setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    try {
      setLoading(true);
      setStatus(null);
      const data = new FormData();
      Object.entries(form).forEach(([k, v]) => data.append(k, v));
      if (image) data.append('image', image);

      await axios.post(`${API}/api/members`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setStatus({ type: 'success', msg: 'Member added successfully! Redirecting…' });
      setTimeout(() => navigate('/view'), 1800);
    } catch (err) {
      setStatus({ type: 'error', msg: err.response?.data?.error || 'Failed to add member. Is the backend running?' });
    } finally {
      setLoading(false);
    }
  };

  /* ── Render ─────────────────────────────────────────────────── */
  return (
    <div className="page form-page">
      <div className="container">
        <div className="form-card">
          <h1 className="form-title">
            Add <span>Member</span>
          </h1>

          {status && (
            <div className={`alert alert-${status.type}`}>
              {status.type === 'success' ? '✅' : '❌'} {status.msg}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            {/* Render paired + solo fields */}
            {renderFields(form, errors, handleChange)}

            {/* Image upload */}
            <div className="form-group">
              <label className="form-label">
                Profile Photo <span style={{ color: 'var(--text-muted)', fontWeight: 300 }}>(optional)</span>
              </label>

              <div
                className={`upload-zone ${dragOver ? 'drag-over' : ''}`}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={onDrop}
                onClick={() => fileRef.current?.click()}
              >
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}
                  style={{ display: 'none' }}
                />
                <div className="upload-icon">📸</div>
                <div className="upload-text">
                  <strong>Click to upload</strong> or drag & drop<br />
                  PNG, JPG, WEBP up to 5 MB
                </div>
              </div>

              {preview && (
                <div className="upload-preview" style={{ marginTop: '12px' }}>
                  <img src={preview} alt="Preview" />
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ width: '100%', justifyContent: 'center', marginTop: '8px', fontSize: '1rem', padding: '16px' }}
            >
              {loading ? (
                <>
                  <span className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} />
                  Submitting…
                </>
              ) : (
                'Submit Member +'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* Renders form fields handling half-width pairs */
function renderFields(form, errors, handleChange) {
  const rows = [];
  let i = 0;
  while (i < FIELDS.length) {
    const f = FIELDS[i];
    if (f.half && FIELDS[i + 1]?.half) {
      rows.push(
        <div className="form-row" key={f.id}>
          {[f, FIELDS[i + 1]].map((field) => (
            <FieldGroup key={field.id} field={field} value={form[field.id]} error={errors[field.id]} onChange={handleChange} />
          ))}
        </div>
      );
      i += 2;
    } else {
      rows.push(
        <FieldGroup key={f.id} field={f} value={form[f.id]} error={errors[f.id]} onChange={handleChange} full />
      );
      i++;
    }
  }
  return rows;
}

function FieldGroup({ field, value, error, onChange, full }) {
  return (
    <div className={`form-group${full ? ' full' : ''}`}>
      <label className="form-label" htmlFor={field.id}>
        {field.label}
        {field.required && <span className="req"> *</span>}
      </label>
      {field.textarea ? (
        <textarea
          className={`form-textarea${error ? ' form-input-error' : ''}`}
          id={field.id}
          placeholder={field.placeholder}
          value={value}
          onChange={onChange}
          style={error ? { borderColor: 'var(--accent-red)' } : {}}
        />
      ) : (
        <input
          className={`form-input${error ? ' form-input-error' : ''}`}
          type={field.id === 'email' ? 'email' : 'text'}
          id={field.id}
          placeholder={field.placeholder}
          value={value}
          onChange={onChange}
          style={error ? { borderColor: 'var(--accent-red)' } : {}}
        />
      )}
      {error && <span className="form-error">⚠ {error}</span>}
    </div>
  );
}
