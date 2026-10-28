"use client";

const DOTS = Array.from({ length: 13 }, (_, row) =>
  Array.from({ length: 13 }, (_, column) => ({
    cx: 56 + column * 24,
    cy: 56 + row * 24,
    key: `${row}-${column}`,
  })),
).flat();

export default function ExperienceGlobe() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center">
      <div className="h-[320px] w-[320px] sm:h-[380px] sm:w-[380px] lg:h-[420px] lg:w-[420px]">
        <svg
          aria-label="Globe showing operations between Nigeria and the United Kingdom"
          className="h-full w-full overflow-visible"
          role="img"
          viewBox="0 0 400 400"
        >
          <defs>
            <radialGradient id="globe-glow" cx="50%" cy="45%" r="55%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
              <stop offset="72%" stopColor="#4f46e5" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#312e81" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="route-gradient" x1="0" x2="1" y1="1" y2="0">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="55%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <clipPath id="globe-clip">
              <circle cx="200" cy="200" r="137" />
            </clipPath>
            <filter id="marker-glow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur result="blur" stdDeviation="3" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <circle cx="200" cy="200" fill="url(#globe-glow)" r="178" />
          <g className="experience-globe-drift" clipPath="url(#globe-clip)">
            {DOTS.map(({ cx, cy, key }) => (
              <circle key={key} cx={cx} cy={cy} fill="#6366f1" opacity="0.48" r="1.75" />
            ))}
          </g>

          <g fill="none" stroke="#818cf8" strokeWidth="1">
            <circle cx="200" cy="200" opacity="0.32" r="137" />
            <ellipse cx="200" cy="200" opacity="0.2" rx="137" ry="52" />
            <ellipse cx="200" cy="200" opacity="0.16" rx="137" ry="96" />
            <ellipse cx="200" cy="200" opacity="0.2" rx="52" ry="137" />
            <ellipse cx="200" cy="200" opacity="0.16" rx="96" ry="137" />
          </g>

          <path
            d="M 218 228 Q 220 122 179 142"
            fill="none"
            opacity="0.72"
            stroke="url(#route-gradient)"
            strokeDasharray="5 6"
            strokeLinecap="round"
            strokeWidth="2.5"
          />
          <circle className="experience-route-light" fill="#ffffff" r="4">
            <animateMotion
              dur="3.5s"
              path="M 218 228 Q 220 122 179 142"
              repeatCount="indefinite"
            />
          </circle>

          <g filter="url(#marker-glow)">
            <circle
              className="experience-marker-pulse"
              cx="218"
              cy="228"
              fill="none"
              r="11"
              stroke="#10b981"
              strokeWidth="2"
            />
            <circle cx="218" cy="228" fill="#10b981" r="5.5" />
            <circle
              className="experience-marker-pulse experience-marker-pulse-uk"
              cx="179"
              cy="142"
              fill="none"
              r="11"
              stroke="#3b82f6"
              strokeWidth="2"
            />
            <circle cx="179" cy="142" fill="#3b82f6" r="5.5" />
          </g>
        </svg>
      </div>

      <div className="mt-4 flex gap-6 text-xs font-semibold">
        <div className="flex items-center gap-1.5 text-emerald-400">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400 motion-reduce:animate-none" />
          <span>Nigeria Operations</span>
        </div>
        <div className="flex items-center gap-1.5 text-blue-400">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-blue-400 motion-reduce:animate-none" />
          <span>UK Integrations</span>
        </div>
      </div>

      <style jsx>{`
        .experience-globe-drift {
          transform-box: fill-box;
          transform-origin: center;
          animation: globe-drift 18s ease-in-out infinite alternate;
        }

        .experience-marker-pulse {
          transform-box: fill-box;
          transform-origin: center;
          animation: marker-pulse 2s ease-out infinite;
        }

        .experience-marker-pulse-uk {
          animation-delay: 0.7s;
        }

        @keyframes globe-drift {
          from { transform: translateX(-5px); }
          to { transform: translateX(5px); }
        }

        @keyframes marker-pulse {
          0% { opacity: 0.8; transform: scale(0.65); }
          100% { opacity: 0; transform: scale(1.65); }
        }

        @media (prefers-reduced-motion: reduce) {
          .experience-globe-drift,
          .experience-marker-pulse { animation: none; }
          .experience-route-light { display: none; }
        }

        :global(.reduced-motion) .experience-globe-drift,
        :global(.reduced-motion) .experience-marker-pulse { animation: none; }
        :global(.reduced-motion) .experience-route-light { display: none; }
      `}</style>
    </div>
  );
}
