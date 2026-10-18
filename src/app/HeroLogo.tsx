// Logo Porcher Menuiserie animé : le soleil se lève, ses lattes-reflets tombent
// depuis le centre, le nom s'écrit le long de l'arc. Puis respiration discrète.

const CX = 100;
const HORIZON = 100;
const SUN_R = 44;
const SLAT_COUNT = 13;
const SLAT_STEP = 6.4;
const SLAT_WIDTH = 2.9;
const SLAT_GAP = 3.5;
const TEXT_R = 66;

// Arc de 230° (de bas-gauche à bas-droite en passant par le haut)
const arcPoint = (deg: number) => {
  const a = (deg * Math.PI) / 180;
  return `${(CX + TEXT_R * Math.cos(a)).toFixed(2)} ${(HORIZON + TEXT_R * Math.sin(a)).toFixed(2)}`;
};
const TEXT_ARC = `M ${arcPoint(155)} A ${TEXT_R} ${TEXT_R} 0 1 1 ${arcPoint(25)}`;

// Les lattes dessinent la moitié basse du disque
const SLATS = Array.from({ length: SLAT_COUNT }, (_, i) => {
  const offset = (i - (SLAT_COUNT - 1) / 2) * SLAT_STEP;
  const bottom = HORIZON + Math.sqrt(SUN_R ** 2 - offset ** 2);
  const top = HORIZON + SLAT_GAP;
  return {
    x: CX + offset - SLAT_WIDTH / 2,
    y: top,
    height: bottom - top,
    fromCenter: Math.abs(i - (SLAT_COUNT - 1) / 2),
    index: i,
  };
});

export default function HeroLogo({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" aria-hidden="true">
      <defs>
        <path id="pmLogoArc" d={TEXT_ARC} />
        <clipPath id="pmLogoSky">
          <rect x="0" y="0" width="200" height={HORIZON} />
        </clipPath>
        {/* Le nom se dévoile le long de l'arc, comme tracé à la main */}
        <mask id="pmLogoWrite" maskUnits="userSpaceOnUse" x="0" y="0" width="200" height="200">
          <path
            className="pm-logo-write"
            d={TEXT_ARC}
            stroke="white"
            strokeWidth="50"
            pathLength={1}
          />
        </mask>
      </defs>

      {/* Soleil levant, masqué sous l'horizon */}
      <g clipPath="url(#pmLogoSky)">
        <g className="pm-logo-rise">
          <path
            className="pm-logo-breathe fill-logo-sun"
            d={`M ${CX - SUN_R} ${HORIZON} A ${SUN_R} ${SUN_R} 0 0 1 ${CX + SUN_R} ${HORIZON} Z`}
          />
        </g>
      </g>

      {/* Lattes : tombent du centre vers les bords, puis ondulent comme un reflet */}
      <g className="fill-logo-slat">
        {SLATS.map((s) => (
          <g key={s.index} className="pm-logo-shimmer" style={{ animationDelay: `${3 + s.index * 0.12}s` }}>
            <rect
              className="pm-logo-drop"
              x={s.x}
              y={s.y}
              width={SLAT_WIDTH}
              height={s.height}
              style={{ animationDelay: `${0.9 + s.fromCenter * 0.07}s` }}
            />
          </g>
        ))}
      </g>

      <g mask="url(#pmLogoWrite)">
        <text className="fill-logo-ink font-logo" fontSize="25" fontWeight="900">
          <textPath href="#pmLogoArc" startOffset="50%" textAnchor="middle" textLength="248" lengthAdjust="spacing">
            Porcher Menuiserie
          </textPath>
        </text>
      </g>

      <text
        className="pm-logo-fade fill-logo-ink font-logo"
        x={CX}
        y="166"
        fontSize="12"
        letterSpacing="0.6"
        textAnchor="middle"
      >
        Agencement
      </text>
    </svg>
  );
}
