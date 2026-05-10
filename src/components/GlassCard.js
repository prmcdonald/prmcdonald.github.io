export default function GlassCard({ children, style = {}, dark = false, padding = 22, blur = 22 }) {
  return (
    <div style={{
      background: dark ? 'rgba(20,18,32,0.42)' : 'rgba(255,253,247,0.62)',
      border: '1px solid ' + (dark ? 'rgba(255,255,255,0.16)' : 'rgba(26,24,20,0.10)'),
      borderRadius: 18,
      backdropFilter: `blur(${blur}px)`,
      WebkitBackdropFilter: `blur(${blur}px)`,
      padding,
      ...style,
    }}>
      {children}
    </div>
  );
}
