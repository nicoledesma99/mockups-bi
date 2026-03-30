import { useState } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, ComposedChart, Area, Legend, RadialBarChart, RadialBar } from "recharts";

const C = {
  bg: "#f8fafb",
  card: "#ffffff",
  border: "#e8ecf1",
  primary: "#0e7490",
  primaryLight: "#22d3ee",
  accent: "#6366f1",
  accentLight: "#a5b4fc",
  green: "#059669",
  greenBg: "#ecfdf5",
  red: "#dc2626",
  redBg: "#fef2f2",
  yellow: "#d97706",
  yellowBg: "#fffbeb",
  blue: "#2563eb",
  blueBg: "#eff6ff",
  text: "#0f172a",
  textMuted: "#475569",
  textDim: "#94a3b8",
  headerBg: "#0e7490",
};

const evolucionMensual = [
  { mes: "Ene", ingresos: 48.2, costoMedico: 37.5, siniestralidad: 77.8, afiliados: 12400 },
  { mes: "Feb", ingresos: 47.8, costoMedico: 38.2, siniestralidad: 79.9, afiliados: 12350 },
  { mes: "Mar", ingresos: 49.1, costoMedico: 39.8, siniestralidad: 81.1, afiliados: 12280 },
  { mes: "Abr", ingresos: 50.4, costoMedico: 38.9, siniestralidad: 77.2, afiliados: 12310 },
  { mes: "May", ingresos: 51.2, costoMedico: 40.1, siniestralidad: 78.3, afiliados: 12290 },
  { mes: "Jun", ingresos: 52.8, costoMedico: 42.5, siniestralidad: 80.5, afiliados: 12250 },
  { mes: "Jul", ingresos: 53.1, costoMedico: 41.8, siniestralidad: 78.7, afiliados: 12320 },
  { mes: "Ago", ingresos: 54.5, costoMedico: 43.2, siniestralidad: 79.3, afiliados: 12380 },
  { mes: "Sep", ingresos: 55.2, costoMedico: 44.8, siniestralidad: 81.2, afiliados: 12340 },
  { mes: "Oct", ingresos: 56.8, costoMedico: 44.1, siniestralidad: 77.6, afiliados: 12410 },
  { mes: "Nov", ingresos: 57.4, costoMedico: 46.2, siniestralidad: 80.5, afiliados: 12450 },
  { mes: "Dic", ingresos: 58.9, costoMedico: 47.8, siniestralidad: 81.2, afiliados: 12480 },
];

const prestacionesData = [
  { prestacion: "Consultas médicas", cantidad: 18420, costo: 12.4, porcentaje: 26 },
  { prestacion: "Estudios diagnóstico", cantidad: 8640, costo: 9.8, porcentaje: 21 },
  { prestacion: "Internaciones", cantidad: 342, costo: 14.2, porcentaje: 30 },
  { prestacion: "Cirugías", cantidad: 186, costo: 6.8, porcentaje: 14 },
  { prestacion: "Medicamentos", cantidad: 24800, costo: 4.1, porcentaje: 9 },
];

const PIE_COLORS = ["#0e7490", "#6366f1", "#dc2626", "#d97706", "#059669"];

const segmentoAfiliados = [
  { segmento: "Bajo consumo", afiliados: 6240, porcentaje: 50, costoPromedio: 18500, riesgo: "green" },
  { segmento: "Consumo medio", afiliados: 3744, porcentaje: 30, costoPromedio: 42000, riesgo: "yellow" },
  { segmento: "Alto consumo", afiliados: 1872, porcentaje: 15, costoPromedio: 98000, riesgo: "yellow" },
  { segmento: "Críticos", afiliados: 624, porcentaje: 5, costoPromedio: 285000, riesgo: "red" },
];

const bajasData = [
  { mes: "Ene", altas: 145, bajas: 192, neto: -47 },
  { mes: "Feb", altas: 128, bajas: 178, neto: -50 },
  { mes: "Mar", altas: 162, bajas: 234, neto: -72 },
  { mes: "Abr", altas: 195, bajas: 165, neto: 30 },
  { mes: "May", altas: 178, bajas: 198, neto: -20 },
  { mes: "Jun", altas: 155, bajas: 195, neto: -40 },
  { mes: "Jul", altas: 212, bajas: 142, neto: 70 },
  { mes: "Ago", altas: 198, bajas: 138, neto: 60 },
  { mes: "Sep", altas: 165, bajas: 205, neto: -40 },
  { mes: "Oct", altas: 225, bajas: 155, neto: 70 },
  { mes: "Nov", altas: 188, bajas: 148, neto: 40 },
  { mes: "Dic", altas: 210, bajas: 180, neto: 30 },
];

const morosidadData = [
  { rango: "Al día", cantidad: 8736, monto: 38.2, porcentaje: 70 },
  { rango: "1-30 días", cantidad: 1872, monto: 8.4, porcentaje: 15 },
  { rango: "31-60 días", cantidad: 874, monto: 4.1, porcentaje: 7 },
  { rango: "61-90 días", cantidad: 499, monto: 2.8, porcentaje: 4 },
  { rango: "+90 días", cantidad: 499, monto: 3.5, porcentaje: 4 },
];

const MORA_COLORS = ["#059669", "#2563eb", "#d97706", "#ea580c", "#dc2626"];

const topPrestadores = [
  { prestador: "Sanatorio Allende", monto: 8.4, desvio: "+12%", estado: "red" },
  { prestador: "Clínica Universitaria", monto: 6.2, desvio: "+3%", estado: "yellow" },
  { prestador: "Hospital Privado", monto: 5.8, desvio: "-2%", estado: "green" },
  { prestador: "Centro Diagnóstico Sur", monto: 4.1, desvio: "+8%", estado: "red" },
  { prestador: "Lab. Análisis Central", monto: 3.9, desvio: "+1%", estado: "green" },
  { prestador: "Instituto Cardiovascular", monto: 3.5, desvio: "+15%", estado: "red" },
  { prestador: "Clínica Reina Fabiola", monto: 3.2, desvio: "-1%", estado: "green" },
  { prestador: "Fundación Rusculleda", monto: 2.7, desvio: "+5%", estado: "yellow" },
];

const motivosBaja = [
  { motivo: "Precio / cuota alta", porcentaje: 34 },
  { motivo: "Cambio de OS / empleo", porcentaje: 22 },
  { motivo: "Insatisfacción servicio", porcentaje: 18 },
  { motivo: "Mudanza", porcentaje: 12 },
  { motivo: "Otros / sin dato", porcentaje: 14 },
];

const KPI = ({ icon, title, value, sub, badge, badgeColor }) => (
  <div style={{
    background: C.card, borderRadius: 14, padding: "20px 22px",
    border: `1px solid ${C.border}`, boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
  }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
      <span style={{ fontSize: 12, color: C.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>
        {icon} {title}
      </span>
      {badge && (
        <span style={{
          fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 6,
          background: badgeColor === "green" ? C.greenBg : badgeColor === "red" ? C.redBg : C.yellowBg,
          color: badgeColor === "green" ? C.green : badgeColor === "red" ? C.red : C.yellow,
        }}>{badge}</span>
      )}
    </div>
    <div style={{ fontSize: 28, fontWeight: 800, color: C.text, letterSpacing: -1 }}>{value}</div>
    <div style={{ fontSize: 12, color: C.textDim, marginTop: 2 }}>{sub}</div>
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div style={{
      background: "#ffffffee", border: `1px solid ${C.border}`,
      borderRadius: 10, padding: "10px 14px", fontSize: 12, boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    }}>
      <div style={{ color: C.text, fontWeight: 700, marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color || C.textMuted, marginTop: 2 }}>
          {p.name}: <strong>{typeof p.value === "number" && Math.abs(p.value) > 100 ? p.value.toLocaleString() : p.value}</strong>
        </div>
      ))}
    </div>
  );
};

export default function SaludDashboard() {
  const [tab, setTab] = useState("general");

  const tabs = [
    { id: "general", label: "📊 Resumen", icon: "" },
    { id: "siniestralidad", label: "🏥 Siniestralidad", icon: "" },
    { id: "afiliados", label: "👥 Afiliados", icon: "" },
    { id: "cobranzas", label: "💳 Morosidad", icon: "" },
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${C.headerBg} 0%, #155e75 60%, #164e63 100%)`,
        padding: "20px 30px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 12,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 42, height: 42, borderRadius: 12,
            background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20,
          }}>🏥</div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", letterSpacing: -0.3 }}>
              Salud Integral Córdoba
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.65)" }}>
              Dashboard de Gestión • Prepaga • Actualizado 27/03/2026
            </div>
          </div>
        </div>
        <div style={{
          background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: 20, padding: "5px 14px", fontSize: 11,
          color: "#fff", fontWeight: 600, display: "flex", alignItems: "center", gap: 6,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399" }} />
          Conectado al sistema de gestión
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex", gap: 2, padding: "0 30px",
        background: C.card, borderBottom: `1px solid ${C.border}`,
        overflowX: "auto",
      }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            background: "transparent",
            border: "none", borderBottom: tab === t.id ? `3px solid ${C.primary}` : "3px solid transparent",
            color: tab === t.id ? C.primary : C.textDim,
            padding: "14px 20px", fontSize: 13, fontWeight: 700,
            cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap",
          }}>
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ padding: "22px 30px 36px" }}>

        {/* GENERAL */}
        {tab === "general" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 14, marginBottom: 18 }}>
              <KPI icon="👥" title="Afiliados activos" value="12,480" sub="Cierre Dic 2025" badge="▲ 0.6%" badgeColor="green" />
              <KPI icon="💰" title="Ingresos mensuales" value="$58.9M" sub="Cuotas + copagos" badge="▲ 4.2%" badgeColor="green" />
              <KPI icon="🏥" title="Costo médico" value="$47.8M" sub="Prestaciones totales" badge="▲ 6.1%" badgeColor="red" />
              <KPI icon="📊" title="Siniestralidad" value="81.2%" sub="Costo / Ingresos" badge="Meta: 78%" badgeColor="red" />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 14 }}>
              <div style={{ background: C.card, borderRadius: 14, padding: 22, border: `1px solid ${C.border}`, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 4 }}>Ingresos vs Costo Médico</div>
                <div style={{ fontSize: 11, color: C.textDim, marginBottom: 16 }}>Evolución mensual en millones ARS</div>
                <ResponsiveContainer width="100%" height={260}>
                  <ComposedChart data={evolucionMensual}>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                    <XAxis dataKey="mes" tick={{ fill: C.textDim, fontSize: 11 }} axisLine={{ stroke: C.border }} />
                    <YAxis tick={{ fill: C.textDim, fontSize: 11 }} axisLine={{ stroke: C.border }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Area type="monotone" dataKey="ingresos" name="Ingresos ($M)" fill="#0e749015" stroke={C.primary} strokeWidth={2.5} dot={{ r: 3, fill: C.primary }} />
                    <Area type="monotone" dataKey="costoMedico" name="Costo Médico ($M)" fill="#dc262610" stroke={C.red} strokeWidth={2} strokeDasharray="5 3" dot={{ r: 3, fill: C.red }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              <div style={{ background: C.card, borderRadius: 14, padding: 22, border: `1px solid ${C.border}`, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 4 }}>Distribución del Costo Médico</div>
                <div style={{ fontSize: 11, color: C.textDim, marginBottom: 12 }}>Por tipo de prestación</div>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={prestacionesData} dataKey="porcentaje" nameKey="prestacion" cx="50%" cy="50%" innerRadius={48} outerRadius={82} paddingAngle={3}>
                      {prestacionesData.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ display: "flex", flexDirection: "column", gap: 5, marginTop: 8 }}>
                  {prestacionesData.map((d, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: C.textMuted }}>
                      <div style={{ width: 8, height: 8, borderRadius: 2, background: PIE_COLORS[i], flexShrink: 0 }} />
                      <span style={{ flex: 1 }}>{d.prestacion}</span>
                      <strong style={{ color: C.text }}>{d.porcentaje}%</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* SINIESTRALIDAD */}
        {tab === "siniestralidad" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 14, marginBottom: 18 }}>
              <KPI icon="📊" title="Siniestralidad actual" value="81.2%" sub="Meta objetivo: 78%" badge="▲ 3.2pp vs meta" badgeColor="red" />
              <KPI icon="🏥" title="Internaciones" value="342" sub="Este mes • $14.2M" badge="30% del costo" badgeColor="yellow" />
              <KPI icon="💊" title="Costo por afiliado" value="$3,829" sub="Promedio mensual" badge="▲ 5.8%" badgeColor="red" />
              <KPI icon="🔍" title="Prestadores con desvío" value="3 de 8" sub="Superan tarifa pactada" badge="Revisar" badgeColor="red" />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div style={{ background: C.card, borderRadius: 14, padding: 22, border: `1px solid ${C.border}`, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 4 }}>Evolución de Siniestralidad</div>
                <div style={{ fontSize: 11, color: C.textDim, marginBottom: 16 }}>% Costo médico / Ingresos — Línea roja = meta 78%</div>
                <ResponsiveContainer width="100%" height={270}>
                  <ComposedChart data={evolucionMensual}>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                    <XAxis dataKey="mes" tick={{ fill: C.textDim, fontSize: 11 }} axisLine={{ stroke: C.border }} />
                    <YAxis domain={[74, 84]} tick={{ fill: C.textDim, fontSize: 11 }} axisLine={{ stroke: C.border }} unit="%" />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="siniestralidad" name="Siniestralidad %" radius={[6, 6, 0, 0]}>
                      {evolucionMensual.map((e, i) => (
                        <Cell key={i} fill={e.siniestralidad > 80 ? "#dc262640" : e.siniestralidad > 78 ? "#d9770640" : "#05966940"} stroke={e.siniestralidad > 80 ? C.red : e.siniestralidad > 78 ? C.yellow : C.green} strokeWidth={1.5} />
                      ))}
                    </Bar>
                    <Line type="monotone" dataKey={() => 78} name="Meta 78%" stroke={C.red} strokeWidth={2} strokeDasharray="8 4" dot={false} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              <div style={{ background: C.card, borderRadius: 14, padding: 22, border: `1px solid ${C.border}`, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 4 }}>Prestadores — Desvío vs Tarifa Pactada</div>
                <div style={{ fontSize: 11, color: C.textDim, marginBottom: 12 }}>
                  <span style={{ color: C.green }}>●</span> En línea &nbsp;
                  <span style={{ color: C.yellow }}>●</span> Leve desvío &nbsp;
                  <span style={{ color: C.red }}>●</span> Desvío crítico
                </div>
                {topPrestadores.map((p, i) => {
                  const color = p.estado === "green" ? C.green : p.estado === "yellow" ? C.yellow : C.red;
                  return (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", gap: 10, padding: "9px 0",
                      borderBottom: `1px solid ${C.border}`,
                    }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0 }} />
                      <div style={{ flex: 1, fontSize: 13, color: C.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.prestador}</div>
                      <div style={{ fontSize: 12, color: C.textMuted, width: 55, textAlign: "right" }}>${p.monto}M</div>
                      <div style={{ fontSize: 12, fontWeight: 700, width: 50, textAlign: "right", color }}>{p.desvio}</div>
                    </div>
                  );
                })}
                <div style={{
                  marginTop: 14, padding: "10px 14px", borderRadius: 10,
                  background: C.redBg, border: `1px solid #fecaca`,
                  fontSize: 12, color: C.red,
                }}>
                  ⚠️ <strong>3 prestadores</strong> superan la tarifa pactada. Sobrecosto estimado: <strong>$2.8M/mes</strong>. Renegociar contratos con Sanatorio Allende e Inst. Cardiovascular.
                </div>
              </div>
            </div>
          </>
        )}

        {/* AFILIADOS */}
        {tab === "afiliados" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 14, marginBottom: 18 }}>
              <KPI icon="👥" title="Afiliados activos" value="12,480" sub="Dic 2025" badge="▲ 0.6%" badgeColor="green" />
              <KPI icon="📈" title="Altas del mes" value="210" sub="Nuevos afiliados" badge="▲ 12%" badgeColor="green" />
              <KPI icon="📉" title="Bajas del mes" value="180" sub="Desafiliaciones" badge="▼ 8%" badgeColor="green" />
              <KPI icon="🔄" title="Tasa de churn" value="1.44%" sub="Bajas / Activos" badge="Meta: 1.2%" badgeColor="yellow" />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14, marginBottom: 14 }}>
              <div style={{ background: C.card, borderRadius: 14, padding: 22, border: `1px solid ${C.border}`, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 4 }}>Altas vs Bajas — Movimiento Mensual</div>
                <div style={{ fontSize: 11, color: C.textDim, marginBottom: 16 }}>Barras verdes = altas, rojas = bajas. Línea = neto</div>
                <ResponsiveContainer width="100%" height={260}>
                  <ComposedChart data={bajasData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                    <XAxis dataKey="mes" tick={{ fill: C.textDim, fontSize: 11 }} axisLine={{ stroke: C.border }} />
                    <YAxis tick={{ fill: C.textDim, fontSize: 11 }} axisLine={{ stroke: C.border }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Bar dataKey="altas" name="Altas" fill={C.green} radius={[4, 4, 0, 0]} opacity={0.8} />
                    <Bar dataKey="bajas" name="Bajas" fill={C.red} radius={[4, 4, 0, 0]} opacity={0.6} />
                    <Line type="monotone" dataKey="neto" name="Neto" stroke={C.accent} strokeWidth={2.5} dot={{ r: 3, fill: C.accent }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              <div style={{ background: C.card, borderRadius: 14, padding: 22, border: `1px solid ${C.border}`, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 4 }}>Motivos de Baja</div>
                <div style={{ fontSize: 11, color: C.textDim, marginBottom: 16 }}>Distribución sobre total de bajas</div>
                {motivosBaja.map((m, i) => (
                  <div key={i} style={{ marginBottom: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: C.text, marginBottom: 4 }}>
                      <span>{m.motivo}</span>
                      <strong>{m.porcentaje}%</strong>
                    </div>
                    <div style={{ background: C.border, borderRadius: 6, height: 8, overflow: "hidden" }}>
                      <div style={{
                        height: "100%", borderRadius: 6,
                        width: `${m.porcentaje}%`,
                        background: i === 0 ? C.red : i === 1 ? C.yellow : i === 2 ? "#ea580c" : C.textDim,
                        transition: "width 0.5s ease",
                      }} />
                    </div>
                  </div>
                ))}
                <div style={{
                  marginTop: 14, padding: "10px 14px", borderRadius: 10,
                  background: C.yellowBg, border: `1px solid #fde68a`,
                  fontSize: 12, color: C.yellow,
                }}>
                  💡 El <strong>34% de las bajas</strong> son por precio. Oportunidad: campaña de retención con planes alternativos para afiliados en riesgo.
                </div>
              </div>
            </div>

            <div style={{ background: C.card, borderRadius: 14, padding: 22, border: `1px solid ${C.border}`, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 4 }}>Segmentación de Afiliados por Consumo</div>
              <div style={{ fontSize: 11, color: C.textDim, marginBottom: 16 }}>El 5% de los afiliados genera el 30% del costo médico</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
                {segmentoAfiliados.map((s, i) => {
                  const color = s.riesgo === "green" ? C.green : s.riesgo === "yellow" ? C.yellow : C.red;
                  const bgColor = s.riesgo === "green" ? C.greenBg : s.riesgo === "yellow" ? C.yellowBg : C.redBg;
                  return (
                    <div key={i} style={{
                      background: bgColor, borderRadius: 12, padding: "16px 18px",
                      border: `1px solid ${color}25`,
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{s.segmento}</span>
                        <span style={{ fontSize: 11, fontWeight: 700, color, background: `${color}18`, padding: "2px 8px", borderRadius: 6 }}>
                          {s.porcentaje}%
                        </span>
                      </div>
                      <div style={{ fontSize: 22, fontWeight: 800, color: C.text }}>{s.afiliados.toLocaleString()}</div>
                      <div style={{ fontSize: 11, color: C.textMuted, marginTop: 4 }}>
                        Costo promedio: <strong style={{ color: C.text }}>${(s.costoPromedio / 1000).toFixed(1)}K</strong> / mes
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* MOROSIDAD */}
        {tab === "cobranzas" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 14, marginBottom: 18 }}>
              <KPI icon="✅" title="Cobranza al día" value="70%" sub="$38.2M de $57M" badge="Meta: 80%" badgeColor="yellow" />
              <KPI icon="💳" title="Deuda total" value="$57M" sub="Cuotas pendientes" />
              <KPI icon="🔴" title="Mora +60 días" value="$6.3M" sub="8% de la cartera" badge="▲ 1.2pp" badgeColor="red" />
              <KPI icon="📊" title="Afiliados morosos" value="3,744" sub="30% del padrón" badge="Atención" badgeColor="yellow" />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 14 }}>
              <div style={{ background: C.card, borderRadius: 14, padding: 22, border: `1px solid ${C.border}`, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 4 }}>Antigüedad de Deuda</div>
                <div style={{ fontSize: 11, color: C.textDim, marginBottom: 16 }}>Distribución de cartera por días de mora</div>
                <ResponsiveContainer width="100%" height={210}>
                  <PieChart>
                    <Pie data={morosidadData} dataKey="monto" nameKey="rango" cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={3}>
                      {morosidadData.map((_, i) => (
                        <Cell key={i} fill={MORA_COLORS[i]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 10 }}>
                  {morosidadData.map((d, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 8, height: 8, borderRadius: 2, background: MORA_COLORS[i] }} />
                        <span style={{ color: C.textMuted }}>{d.rango}</span>
                      </div>
                      <div>
                        <strong style={{ color: C.text }}>${d.monto}M</strong>
                        <span style={{ color: C.textDim, marginLeft: 6 }}>({d.cantidad})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: C.card, borderRadius: 14, padding: 22, border: `1px solid ${C.border}`, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 4 }}>Impacto de la Morosidad en el Negocio</div>
                <div style={{ fontSize: 11, color: C.textDim, marginBottom: 16 }}>Relación entre mora, bajas y costo de recupero</div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                  <div style={{ background: C.redBg, borderRadius: 10, padding: 14, border: "1px solid #fecaca" }}>
                    <div style={{ fontSize: 11, color: C.red, fontWeight: 600, marginBottom: 4 }}>RIESGO DE INCOBRABILIDAD</div>
                    <div style={{ fontSize: 24, fontWeight: 800, color: C.red }}>$3.5M</div>
                    <div style={{ fontSize: 11, color: C.textMuted }}>499 afiliados con +90 días</div>
                  </div>
                  <div style={{ background: C.yellowBg, borderRadius: 10, padding: 14, border: "1px solid #fde68a" }}>
                    <div style={{ fontSize: 11, color: C.yellow, fontWeight: 600, marginBottom: 4 }}>MOROSOS EN RIESGO DE BAJA</div>
                    <div style={{ fontSize: 24, fontWeight: 800, color: C.yellow }}>1,373</div>
                    <div style={{ fontSize: 11, color: C.textMuted }}>Mora &gt;30 días sin plan de pago</div>
                  </div>
                </div>

                <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 10 }}>Acciones sugeridas</div>
                {[
                  { icon: "📱", text: "Campaña WhatsApp automática a mora 1-30 días (1,872 afiliados)", prioridad: "Alta" },
                  { icon: "📞", text: "Gestión telefónica a mora 31-60 días con oferta de plan de pago", prioridad: "Alta" },
                  { icon: "✉️", text: "Carta documento a mora +90 días (499 afiliados, $3.5M en riesgo)", prioridad: "Urgente" },
                  { icon: "📊", text: "Análisis de correlación: morosos → bajas para priorizar retención", prioridad: "Media" },
                ].map((a, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 10, padding: "9px 0",
                    borderBottom: `1px solid ${C.border}`,
                  }}>
                    <span style={{ fontSize: 16 }}>{a.icon}</span>
                    <span style={{ flex: 1, fontSize: 12, color: C.text }}>{a.text}</span>
                    <span style={{
                      fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 6,
                      background: a.prioridad === "Urgente" ? C.redBg : a.prioridad === "Alta" ? C.yellowBg : C.blueBg,
                      color: a.prioridad === "Urgente" ? C.red : a.prioridad === "Alta" ? C.yellow : C.blue,
                    }}>{a.prioridad}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div style={{
        textAlign: "center", padding: "16px 30px 26px",
        borderTop: `1px solid ${C.border}`,
        fontSize: 11, color: C.textDim,
      }}>
        <span style={{ opacity: 0.5 }}>MOCKUP DEMOSTRATIVO</span> • Desarrollado por <strong style={{ color: C.text }}>Nicolás Ledesma</strong> • Consultor BI
        <br />
        <span style={{ opacity: 0.4 }}>Los datos presentados son ficticios y representan un ejemplo de tablero de gestión para empresas de salud</span>
      </div>
    </div>
  );
}
