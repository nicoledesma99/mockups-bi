import { useState } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, ComposedChart, Area, Legend } from "recharts";

const COLORS = {
  bg: "#0f1117",
  card: "#1a1d27",
  cardHover: "#1e2130",
  border: "#2a2d3a",
  primary: "#c8102e",
  primaryLight: "#e8384f",
  accent: "#f59e0b",
  green: "#10b981",
  greenLight: "#34d399",
  red: "#ef4444",
  blue: "#3b82f6",
  purple: "#8b5cf6",
  text: "#e2e8f0",
  textMuted: "#94a3b8",
  textDim: "#64748b",
};

const faenaData = [
  { mes: "Ene", cabezas: 1820, kgNeto: 327600, rinde: 54.2, facturacion: 89.5 },
  { mes: "Feb", cabezas: 1650, kgNeto: 294000, rinde: 53.8, facturacion: 80.2 },
  { mes: "Mar", cabezas: 1940, kgNeto: 355020, rinde: 54.6, facturacion: 97.1 },
  { mes: "Abr", cabezas: 2100, kgNeto: 386400, rinde: 55.1, facturacion: 105.8 },
  { mes: "May", cabezas: 2250, kgNeto: 418500, rinde: 55.4, facturacion: 114.5 },
  { mes: "Jun", cabezas: 2080, kgNeto: 381680, rinde: 54.8, facturacion: 104.3 },
  { mes: "Jul", cabezas: 2310, kgNeto: 431070, rinde: 55.7, facturacion: 117.9 },
  { mes: "Ago", cabezas: 2180, kgNeto: 400680, rinde: 55.0, facturacion: 109.6 },
  { mes: "Sep", cabezas: 2400, kgNeto: 451200, rinde: 56.1, facturacion: 123.4 },
  { mes: "Oct", cabezas: 2520, kgNeto: 478800, rinde: 56.5, facturacion: 131.0 },
  { mes: "Nov", cabezas: 2350, kgNeto: 440150, rinde: 55.8, facturacion: 120.4 },
  { mes: "Dic", cabezas: 2580, kgNeto: 494880, rinde: 56.8, facturacion: 135.4 },
];

const rentabilidadClientes = [
  { cliente: "Carnicerías del Sur", ventas: 18.5, margen: 22.4, estado: "green" },
  { cliente: "Dist. Pampa", ventas: 15.2, margen: 18.1, estado: "green" },
  { cliente: "Supermercados Central", ventas: 24.8, margen: 12.3, estado: "yellow" },
  { cliente: "Exportadora Plata", ventas: 31.2, margen: 8.5, estado: "yellow" },
  { cliente: "Frigorífico Reenvío SA", ventas: 12.4, margen: -2.1, estado: "red" },
  { cliente: "Mayorista Norte", ventas: 8.9, margen: 24.8, estado: "green" },
  { cliente: "Rest. Premium Group", ventas: 6.2, margen: 31.2, estado: "green" },
  { cliente: "Dist. Ruta 9", ventas: 11.3, margen: 5.2, estado: "yellow" },
];

const cortesData = [
  { corte: "Asado", kg: 42500, precio: 5200, margen: 28.5 },
  { corte: "Vacío", kg: 18200, precio: 7800, margen: 35.2 },
  { corte: "Nalga", kg: 31000, precio: 5800, margen: 22.1 },
  { corte: "Bola de lomo", kg: 22400, precio: 5500, margen: 24.8 },
  { corte: "Cuadrada", kg: 19800, precio: 5100, margen: 19.4 },
  { corte: "Peceto", kg: 12600, precio: 8200, margen: 38.1 },
  { corte: "Lomo", kg: 8400, precio: 12500, margen: 42.3 },
  { corte: "Paleta", kg: 28900, precio: 3800, margen: 15.2 },
];

const cobranzasData = [
  { rango: "Al día", monto: 45.2, porcentaje: 52 },
  { rango: "1-30 días", monto: 22.8, porcentaje: 26 },
  { rango: "31-60 días", monto: 11.4, porcentaje: 13 },
  { rango: "61-90 días", monto: 5.2, porcentaje: 6 },
  { rango: "+90 días", monto: 2.6, porcentaje: 3 },
];

const PIE_COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#f97316", "#ef4444"];

const rindeComparativo = [
  { categoria: "Novillo", propio: 56.2, mercado: 54.8 },
  { categoria: "Vaquillona", propio: 54.8, mercado: 53.5 },
  { categoria: "Vaca", propio: 51.3, mercado: 50.1 },
  { categoria: "Toro", propio: 52.8, mercado: 52.0 },
];

const KPICard = ({ title, value, subtitle, trend, trendValue, icon }) => (
  <div style={{
    background: COLORS.card,
    borderRadius: 12,
    padding: "20px 22px",
    border: `1px solid ${COLORS.border}`,
    position: "relative",
    overflow: "hidden",
  }}>
    <div style={{
      position: "absolute", top: 0, right: 0, width: 80, height: 80,
      background: `radial-gradient(circle at top right, ${COLORS.primary}15, transparent 70%)`,
    }} />
    <div style={{ fontSize: 12, color: COLORS.textMuted, fontWeight: 500, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 8 }}>
      {icon} {title}
    </div>
    <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.text, lineHeight: 1.1, marginBottom: 4 }}>
      {value}
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span style={{ fontSize: 11, color: COLORS.textDim }}>{subtitle}</span>
      {trend && (
        <span style={{
          fontSize: 11, fontWeight: 600,
          color: trend === "up" ? COLORS.green : COLORS.red,
          background: trend === "up" ? "#10b98118" : "#ef444418",
          padding: "2px 6px", borderRadius: 4,
        }}>
          {trend === "up" ? "▲" : "▼"} {trendValue}
        </span>
      )}
    </div>
  </div>
);

const SemaforoBar = ({ cliente, ventas, margen, estado }) => {
  const color = estado === "green" ? COLORS.green : estado === "yellow" ? COLORS.accent : COLORS.red;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: `1px solid ${COLORS.border}` }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0 }} />
      <div style={{ flex: 1, fontSize: 13, color: COLORS.text, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {cliente}
      </div>
      <div style={{ fontSize: 12, color: COLORS.textMuted, width: 70, textAlign: "right" }}>
        ${ventas}M
      </div>
      <div style={{
        fontSize: 12, fontWeight: 600, width: 55, textAlign: "right",
        color: margen >= 0 ? COLORS.green : COLORS.red,
      }}>
        {margen > 0 ? "+" : ""}{margen}%
      </div>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div style={{
      background: "#1e2130ee", border: `1px solid ${COLORS.border}`,
      borderRadius: 8, padding: "10px 14px", fontSize: 12,
    }}>
      <div style={{ color: COLORS.text, fontWeight: 600, marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color || COLORS.textMuted, marginTop: 2 }}>
          {p.name}: <strong>{typeof p.value === "number" && p.value > 1000 ? p.value.toLocaleString() : p.value}</strong>
        </div>
      ))}
    </div>
  );
};

export default function FrigorificoDashboard() {
  const [tab, setTab] = useState("general");

  const tabs = [
    { id: "general", label: "📊 Resumen General" },
    { id: "rentabilidad", label: "💰 Rentabilidad" },
    { id: "faena", label: "🥩 Faena & Rinde" },
    { id: "cobranzas", label: "📋 Cobranzas" },
  ];

  return (
    <div style={{
      background: COLORS.bg, minHeight: "100vh", fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      color: COLORS.text, padding: 0,
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.card} 0%, #12141d 100%)`,
        borderBottom: `1px solid ${COLORS.border}`,
        padding: "18px 28px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 12,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, fontWeight: 700, color: "#fff",
          }}>F</div>
          <div>
            <div style={{ fontSize: 17, fontWeight: 700, color: COLORS.text, letterSpacing: -0.3 }}>
              Frigorífico San Martín
            </div>
            <div style={{ fontSize: 11, color: COLORS.textDim }}>
              Dashboard de Gestión • Datos actualizados al 27/03/2026
            </div>
          </div>
        </div>
        <div style={{
          background: "#10b98118", border: "1px solid #10b98140",
          borderRadius: 20, padding: "5px 14px", fontSize: 11,
          color: COLORS.green, fontWeight: 600, display: "flex", alignItems: "center", gap: 5,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.green }} />
          Conectado a sistema ERP
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex", gap: 4, padding: "12px 28px 0",
        borderBottom: `1px solid ${COLORS.border}`,
        overflowX: "auto",
      }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            background: tab === t.id ? COLORS.card : "transparent",
            border: "none", borderBottom: tab === t.id ? `2px solid ${COLORS.primary}` : "2px solid transparent",
            color: tab === t.id ? COLORS.text : COLORS.textDim,
            padding: "10px 18px", fontSize: 13, fontWeight: 600,
            cursor: "pointer", borderRadius: "8px 8px 0 0",
            transition: "all 0.2s", whiteSpace: "nowrap",
          }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "20px 28px 32px" }}>

        {/* TAB: GENERAL */}
        {tab === "general" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginBottom: 20 }}>
              <KPICard icon="🐄" title="Cabezas faenadas" value="26,180" subtitle="Acumulado 2025" trend="up" trendValue="12.4%" />
              <KPICard icon="⚖️" title="Kg Neto producidos" value="4.86M" subtitle="Kg carne en gancho" trend="up" trendValue="8.7%" />
              <KPICard icon="📈" title="Rinde promedio" value="55.4%" subtitle="Kg Neto / Kg Desb" trend="up" trendValue="1.2pp" />
              <KPICard icon="💵" title="Facturación" value="$1,329M" subtitle="Millones ARS" trend="up" trendValue="15.3%" />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 14 }}>
              <div style={{ background: COLORS.card, borderRadius: 12, padding: 20, border: `1px solid ${COLORS.border}` }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 14 }}>Evolución Mensual — Cabezas & Facturación</div>
                <ResponsiveContainer width="100%" height={260}>
                  <ComposedChart data={faenaData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                    <XAxis dataKey="mes" tick={{ fill: COLORS.textDim, fontSize: 11 }} axisLine={{ stroke: COLORS.border }} />
                    <YAxis yAxisId="left" tick={{ fill: COLORS.textDim, fontSize: 11 }} axisLine={{ stroke: COLORS.border }} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fill: COLORS.textDim, fontSize: 11 }} axisLine={{ stroke: COLORS.border }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar yAxisId="left" dataKey="cabezas" name="Cabezas" fill={COLORS.primary} radius={[4, 4, 0, 0]} opacity={0.85} />
                    <Line yAxisId="right" type="monotone" dataKey="facturacion" name="Facturación ($M)" stroke={COLORS.accent} strokeWidth={2.5} dot={{ fill: COLORS.accent, r: 3 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              <div style={{ background: COLORS.card, borderRadius: 12, padding: 20, border: `1px solid ${COLORS.border}` }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>Top Clientes por Rentabilidad</div>
                <div style={{ fontSize: 11, color: COLORS.textDim, marginBottom: 12 }}>Margen neto después de costos</div>
                {rentabilidadClientes.slice(0, 6).map((c, i) => (
                  <SemaforoBar key={i} {...c} />
                ))}
              </div>
            </div>
          </>
        )}

        {/* TAB: RENTABILIDAD */}
        {tab === "rentabilidad" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginBottom: 20 }}>
              <KPICard icon="💰" title="Margen bruto" value="18.7%" subtitle="Promedio ponderado" trend="up" trendValue="2.1pp" />
              <KPICard icon="📉" title="Costo x Kg producido" value="$2,145" subtitle="ARS / Kg neto" trend="down" trendValue="3.2%" />
              <KPICard icon="🚨" title="Clientes en rojo" value="1 de 8" subtitle="Margen negativo" />
              <KPICard icon="🏆" title="Corte más rentable" value="Lomo" subtitle="42.3% margen" />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div style={{ background: COLORS.card, borderRadius: 12, padding: 20, border: `1px solid ${COLORS.border}` }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 14 }}>Margen por Corte (%)</div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={cortesData.sort((a, b) => b.margen - a.margen)} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} horizontal={false} />
                    <XAxis type="number" tick={{ fill: COLORS.textDim, fontSize: 11 }} axisLine={{ stroke: COLORS.border }} unit="%" />
                    <YAxis type="category" dataKey="corte" tick={{ fill: COLORS.textMuted, fontSize: 11 }} width={90} axisLine={{ stroke: COLORS.border }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="margen" name="Margen %" radius={[0, 6, 6, 0]}>
                      {cortesData.sort((a, b) => b.margen - a.margen).map((entry, i) => (
                        <Cell key={i} fill={entry.margen > 30 ? COLORS.green : entry.margen > 20 ? COLORS.blue : COLORS.accent} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div style={{ background: COLORS.card, borderRadius: 12, padding: 20, border: `1px solid ${COLORS.border}` }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>Rentabilidad por Cliente</div>
                <div style={{ fontSize: 11, color: COLORS.textDim, marginBottom: 12 }}>
                  <span style={{ color: COLORS.green }}>●</span> {">"}20% &nbsp;
                  <span style={{ color: COLORS.accent }}>●</span> 5-20% &nbsp;
                  <span style={{ color: COLORS.red }}>●</span> {"<"}5% / Negativo
                </div>
                {rentabilidadClientes.sort((a, b) => b.margen - a.margen).map((c, i) => (
                  <SemaforoBar key={i} {...c} />
                ))}
                <div style={{
                  marginTop: 14, padding: "10px 14px", borderRadius: 8,
                  background: "#ef444412", border: "1px solid #ef444430",
                  fontSize: 12, color: "#fca5a5",
                }}>
                  ⚠️ <strong>Frigorífico Reenvío SA</strong> tiene margen negativo (-2.1%). Revisar condiciones comerciales o renegociar precios.
                </div>
              </div>
            </div>
          </>
        )}

        {/* TAB: FAENA & RINDE */}
        {tab === "faena" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginBottom: 20 }}>
              <KPICard icon="🐄" title="Faena del mes" value="2,580" subtitle="Cabezas Dic 2025" trend="up" trendValue="9.8%" />
              <KPICard icon="⚖️" title="Peso promedio" value="452 kg" subtitle="Kg bruto por cabeza" />
              <KPICard icon="📊" title="Rinde Dic" value="56.8%" subtitle="Mejor del año" trend="up" trendValue="0.6pp" />
              <KPICard icon="📦" title="Kg en cámara" value="82,400" subtitle="Stock actual" />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14 }}>
              <div style={{ background: COLORS.card, borderRadius: 12, padding: 20, border: `1px solid ${COLORS.border}` }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 14 }}>Evolución del Rinde Mensual (%)</div>
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={faenaData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                    <XAxis dataKey="mes" tick={{ fill: COLORS.textDim, fontSize: 11 }} axisLine={{ stroke: COLORS.border }} />
                    <YAxis domain={[52, 58]} tick={{ fill: COLORS.textDim, fontSize: 11 }} axisLine={{ stroke: COLORS.border }} unit="%" />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="rinde" name="Rinde %" stroke={COLORS.green} strokeWidth={2.5} dot={{ fill: COLORS.green, r: 4, strokeWidth: 2, stroke: COLORS.bg }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div style={{ background: COLORS.card, borderRadius: 12, padding: 20, border: `1px solid ${COLORS.border}` }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 14 }}>Rinde vs Mercado por Categoría</div>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={rindeComparativo} barCategoryGap="25%">
                    <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                    <XAxis dataKey="categoria" tick={{ fill: COLORS.textDim, fontSize: 11 }} axisLine={{ stroke: COLORS.border }} />
                    <YAxis domain={[48, 58]} tick={{ fill: COLORS.textDim, fontSize: 11 }} axisLine={{ stroke: COLORS.border }} unit="%" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: 11, color: COLORS.textMuted }} />
                    <Bar dataKey="propio" name="Propio" fill={COLORS.primary} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="mercado" name="Mercado" fill={COLORS.textDim} radius={[4, 4, 0, 0]} opacity={0.5} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {/* TAB: COBRANZAS */}
        {tab === "cobranzas" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginBottom: 20 }}>
              <KPICard icon="✅" title="Cobranza al día" value="52%" subtitle="$45.2M de $87.2M" />
              <KPICard icon="⏰" title="Deuda total" value="$87.2M" subtitle="Ctas corrientes activas" />
              <KPICard icon="🔴" title="Mora +60 días" value="$7.8M" subtitle="9% de la deuda" trend="down" trendValue="-2.1%" />
              <KPICard icon="📅" title="Días prom. cobro" value="34 días" subtitle="DSO" trend="up" trendValue="3 días" />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 14 }}>
              <div style={{ background: COLORS.card, borderRadius: 12, padding: 20, border: `1px solid ${COLORS.border}` }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 14 }}>Antigüedad de Deuda</div>
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie data={cobranzasData} dataKey="monto" nameKey="rango" cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3}>
                      {cobranzasData.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginTop: 8 }}>
                  {cobranzasData.map((d, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: COLORS.textMuted }}>
                      <div style={{ width: 8, height: 8, borderRadius: 2, background: PIE_COLORS[i] }} />
                      {d.rango} ({d.porcentaje}%)
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: COLORS.card, borderRadius: 12, padding: 20, border: `1px solid ${COLORS.border}` }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>Detalle por Cliente — Semáforo de Cobranza</div>
                <div style={{ fontSize: 11, color: COLORS.textDim, marginBottom: 12 }}>Ordenado por riesgo de incobrabilidad</div>
                
                {[
                  { cliente: "Frigorífico Reenvío SA", deuda: 4.8, dias: 95, estado: "red" },
                  { cliente: "Dist. Ruta 9", deuda: 3.2, dias: 67, estado: "red" },
                  { cliente: "Supermercados Central", deuda: 8.4, dias: 38, estado: "yellow" },
                  { cliente: "Exportadora Plata", deuda: 12.1, dias: 28, estado: "yellow" },
                  { cliente: "Dist. Pampa", deuda: 6.8, dias: 15, estado: "green" },
                  { cliente: "Carnicerías del Sur", deuda: 4.2, dias: 8, estado: "green" },
                  { cliente: "Mayorista Norte", deuda: 2.8, dias: 5, estado: "green" },
                  { cliente: "Rest. Premium Group", deuda: 1.9, dias: 3, estado: "green" },
                ].map((c, i) => {
                  const color = c.estado === "green" ? COLORS.green : c.estado === "yellow" ? COLORS.accent : COLORS.red;
                  return (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", gap: 10, padding: "8px 0",
                      borderBottom: `1px solid ${COLORS.border}`,
                    }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0 }} />
                      <div style={{ flex: 1, fontSize: 13, color: COLORS.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {c.cliente}
                      </div>
                      <div style={{ fontSize: 12, color: COLORS.textMuted, width: 65, textAlign: "right" }}>
                        ${c.deuda}M
                      </div>
                      <div style={{
                        fontSize: 11, fontWeight: 600, width: 60, textAlign: "right",
                        color: color,
                      }}>
                        {c.dias} días
                      </div>
                    </div>
                  );
                })}

                <div style={{
                  marginTop: 14, padding: "10px 14px", borderRadius: 8,
                  background: "#ef444412", border: "1px solid #ef444430",
                  fontSize: 12, color: "#fca5a5",
                }}>
                  ⚠️ <strong>2 clientes</strong> superan los 60 días de mora. Deuda en riesgo: <strong>$8.0M</strong> (9.2% del total).
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Footer watermark */}
      <div style={{
        textAlign: "center", padding: "16px 28px 24px",
        borderTop: `1px solid ${COLORS.border}`,
        fontSize: 11, color: COLORS.textDim,
      }}>
        <span style={{ opacity: 0.6 }}>MOCKUP DEMOSTRATIVO</span> • Desarrollado por <strong style={{ color: COLORS.text }}>Nicolás Ledesma</strong> • Consultor BI
        <br />
        <span style={{ opacity: 0.5 }}>Los datos presentados son ficticios y representan un ejemplo de tablero de gestión para frigoríficos</span>
      </div>
    </div>
  );
}
