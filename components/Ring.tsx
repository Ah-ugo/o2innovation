export default function Ring({ p, size = 64 }: { p: number; size?: number }) {
  const r = size / 2 - 6, c = 2 * Math.PI * r;
  return (<svg width={size} height={size} role="img" aria-label={`${p}% complete`}><circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeOpacity=".15" strokeWidth="6" />
    <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#ff8c1e" strokeWidth="6" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - p / 100)} transform={`rotate(-90 ${size / 2} ${size / 2})`} style={{ transition: "stroke-dashoffset 1s" }} />
    <text x="50%" y="54%" textAnchor="middle" fontSize={size / 4.5} fontWeight="700" fill="currentColor">{p}%</text></svg>);
}
