import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'DM Sans', sans-serif", padding: 24,
    }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{
          fontSize: 14, fontWeight: 600, color: '#22d3ee', letterSpacing: 2,
          textTransform: 'uppercase', marginBottom: 12,
        }}>Mockups Demostrativos</div>
        <h1 style={{
          fontSize: 36, fontWeight: 800, color: '#f1f5f9',
          lineHeight: 1.2, marginBottom: 12,
        }}>
          Dashboards de Gestión
        </h1>
        <p style={{ fontSize: 16, color: '#94a3b8', maxWidth: 480, margin: '0 auto' }}>
          Ejemplos interactivos de tableros que transforman los datos de tu empresa en decisiones.
        </p>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 20, maxWidth: 680, width: '100%',
      }}>
        <Link to="/frigorifico" style={{ textDecoration: 'none' }}>
          <div style={{
            background: '#1a1d27', borderRadius: 16, padding: 28,
            border: '1px solid #2a2d3a', cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = '#c8102e'
            e.currentTarget.style.transform = 'translateY(-4px)'
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(200,16,46,0.15)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = '#2a2d3a'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}>
            <div style={{ fontSize: 36, marginBottom: 14 }}>🥩</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#f1f5f9', marginBottom: 6 }}>
              Frigorífico
            </div>
            <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.6 }}>
              Faena, rinde, rentabilidad por corte, semáforo de clientes y cobranzas.
            </p>
            <div style={{
              marginTop: 18, fontSize: 13, fontWeight: 600, color: '#c8102e',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              Ver dashboard →
            </div>
          </div>
        </Link>

        <Link to="/salud" style={{ textDecoration: 'none' }}>
          <div style={{
            background: '#ffffff', borderRadius: 16, padding: 28,
            border: '1px solid #e8ecf1', cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = '#0e7490'
            e.currentTarget.style.transform = 'translateY(-4px)'
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(14,116,144,0.15)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = '#e8ecf1'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}>
            <div style={{ fontSize: 36, marginBottom: 14 }}>🏥</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>
              Salud / Prepaga
            </div>
            <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>
              Siniestralidad, costo médico, segmentación de afiliados y morosidad.
            </p>
            <div style={{
              marginTop: 18, fontSize: 13, fontWeight: 600, color: '#0e7490',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              Ver dashboard →
            </div>
          </div>
        </Link>
      </div>

      <div style={{
        marginTop: 48, textAlign: 'center', fontSize: 12, color: '#475569',
      }}>
        Desarrollado por <strong style={{ color: '#e2e8f0' }}>Nicolás Ledesma</strong> • Consultor BI • Córdoba, Argentina
      </div>
    </div>
  )
}
