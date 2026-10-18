// Sceau d'artisan « Porcher Menuiserie » (v1.2 du hero) — conservé pour réutilisation.
// Une bibliothèque se trace puis s'assemble au chargement (classes pm-draw / pm-drop / pm-fade
// dans globals.css). Usage : <SealLogo className="w-full h-full" /> dans un médaillon.

export default function SealLogo({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" aria-hidden="true">
      <defs>
        <path id="sealTop" d="M 22,100 A 78,78 0 0 1 178,100" />
        <path id="sealBottom" d="M 15,100 A 85,85 0 0 0 185,100" />
      </defs>

      {/* Bande du sceau */}
      <g className="stroke-ocre" strokeWidth="1">
        <circle className="pm-draw" cx="100" cy="100" r="95" pathLength={1} style={{ animationDelay: "0s", animationDuration: "1.4s" }} />
        <circle className="pm-draw opacity-50" cx="100" cy="100" r="69" pathLength={1} style={{ animationDelay: "0.2s", animationDuration: "1.4s" }} />
      </g>
      <g className="pm-fade" style={{ animationDelay: "0.5s" }}>
        <text className="fill-ocre-dark font-headline uppercase" fontSize="13" letterSpacing="3.5">
          <textPath href="#sealTop" startOffset="50%" textAnchor="middle">
            Porcher Menuiserie
          </textPath>
        </text>
        <text className="fill-ocre-dark font-label uppercase" fontSize="8.5" letterSpacing="4.5">
          <textPath href="#sealBottom" startOffset="50%" textAnchor="middle">
            Artisan agenceur
          </textPath>
        </text>
        <circle className="fill-ocre" cx="18" cy="100" r="1.6" />
        <circle className="fill-ocre" cx="182" cy="100" r="1.6" />
      </g>

      {/* Bibliothèque : socle, montants, séparation, tablettes, puis plateau posé */}
      <g className="stroke-ocre-dark" strokeLinecap="butt">
        <path className="pm-draw" d="M 64 132 H 136" strokeWidth="2" pathLength={1} style={{ animationDelay: "0.7s" }} />
        <path className="pm-draw" d="M 72 132 V 68" strokeWidth="1.75" pathLength={1} style={{ animationDelay: "1s" }} />
        <path className="pm-draw" d="M 128 132 V 68" strokeWidth="1.75" pathLength={1} style={{ animationDelay: "1.1s" }} />
        <path className="pm-draw" d="M 100 132 V 68" strokeWidth="1.25" pathLength={1} style={{ animationDelay: "1.35s" }} />
        <path className="pm-draw" d="M 72 90 H 100" strokeWidth="1.25" pathLength={1} style={{ animationDelay: "1.6s", animationDuration: "0.4s" }} />
        <path className="pm-draw" d="M 128 101 H 100" strokeWidth="1.25" pathLength={1} style={{ animationDelay: "1.75s", animationDuration: "0.4s" }} />
        <path className="pm-draw" d="M 72 111 H 100" strokeWidth="1.25" pathLength={1} style={{ animationDelay: "1.9s", animationDuration: "0.4s" }} />
        <path className="pm-drop" d="M 64 67 H 136" strokeWidth="2" style={{ animationDelay: "2.25s" }} />
      </g>
    </svg>
  );
}
