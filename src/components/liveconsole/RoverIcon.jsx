// LEGO-style rover SVG icon for the ecosystem map.
export default function RoverIcon({ size = 34, heading = 0 }) {
  return (
    <g transform={`rotate(${heading} 0 0)`}>
      {/* chassis */}
      <rect x={-size * 0.5} y={-size * 0.34} width={size} height={size * 0.68} rx={size * 0.12} fill="#173F32" stroke="#202925" strokeWidth={1.2} />
      {/* wheels */}
      {[[ -size*0.32, -size*0.34 ], [ size*0.32, -size*0.34 ], [ -size*0.32, size*0.34 ], [ size*0.32, size*0.34 ]].map(([wx, wy], i) => (
        <circle key={i} cx={wx} cy={wy} r={size * 0.14} fill="#202925" stroke="#4a4a4a" strokeWidth={1} />
      ))}
      {/* hub */}
      <rect x={-size * 0.16} y={-size * 0.16} width={size * 0.32} height={size * 0.32} rx={3} fill="#9ABF82" opacity={0.9} />
      {/* phone mount */}
      <rect x={-size * 0.1} y={-size * 0.5} width={size * 0.2} height={size * 0.22} rx={2} fill="#438B78" />
      {/* phone */}
      <rect x={-size * 0.08} y={-size * 0.62} width={size * 0.16} height={size * 0.26} rx={2} fill="#F4F0E5" stroke="#173F32" strokeWidth={1} />
      <circle cx={0} cy={-size * 0.49} r={size * 0.04} fill="#173F32" />
      {/* front distance sensor */}
      <rect x={-size * 0.08} y={size * 0.3} width={size * 0.16} height={size * 0.08} rx={1.5} fill="#202925" />
      <rect x={-size * 0.05} y={size * 0.36} width={size * 0.1} height={size * 0.04} rx={1} fill="#B5654A" />
    </g>
  );
}