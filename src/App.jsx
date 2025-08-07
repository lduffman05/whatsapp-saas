import React, { useState } from 'react';
import './index.css';

export default function App() {
  const [phone, setPhone] = useState('');
  const [template, setTemplate] = useState('');
  const [params, setParams] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://whatsapp-saas-2yo3.onrender.com/api/send-template', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          template,
          params: params.split(',').map(p => p.trim())
        })
      });
      const data = await res.json();
      setResponse(data);
    } catch (e) {
      setResponse({ error: String(e) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Enviar Plantilla WhatsApp</h1>
      <input placeholder="📞 Número (ej: 54911...)" value={phone} onChange={e => setPhone(e.target.value)} />
      <input placeholder="📄 Nombre de la plantilla" value={template} onChange={e => setTemplate(e.target.value)} />
      <input placeholder="🧩 Parámetros separados por coma" value={params} onChange={e => setParams(e.target.value)} />
      <button onClick={handleSend} disabled={loading}>{loading ? 'Enviando...' : 'Enviar'}</button>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
}
