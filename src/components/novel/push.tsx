// push.tsx — the toys' thumb-sized button, and the glow that says "press me".
// Shared by every chapter's toys, so the glow means the same thing everywhere.

/** The glow itself. Glow only, never size: a swelling button is a moving
 *  target. Any element with class `beckon` gets it while this is mounted. */
export const BeckonStyle: React.FC = () => (
  <style>{`
    @keyframes beckon { 0%, 100% { box-shadow: 0 0 0 0 rgba(251,191,36,.0), 0 0 8px 2px rgba(251,191,36,.45) }
                        50% { box-shadow: 0 0 0 5px rgba(251,191,36,.4), 0 0 28px 10px rgba(251,191,36,.75) } }
    .beckon { animation: beckon 1.4s ease-in-out infinite }
    @media (prefers-reduced-motion: reduce) { .beckon { animation: none; box-shadow: 0 0 14px 4px rgba(251,191,36,.5) } }
  `}</style>
);

/** A push button big enough for a thumb.
 *
 *  `beckon` makes it GLOW until it has been pressed — the button the story is
 *  waiting on. A kid who tried the chapter did not realise the +1¢ button was
 *  something to press: an amber box sitting beside two others says nothing.
 *  Only one button beckons at a time, and it stops the moment it has done its
 *  job, so it never becomes a moving target. Reduced motion: a steady glow. */
export const Push: React.FC<{ onClick: () => void; children: React.ReactNode; tone?: 'amber' | 'ghost'; label?: string; beckon?: boolean }> =
  ({ onClick, children, tone = 'amber', label, beckon = false }) => (
    <button
      onClick={onClick}
      aria-label={label}
      className={`flex-1 touch-manipulation rounded-lg border px-3 text-[0.9375rem] font-semibold transition-colors active:brightness-125 ${beckon ? 'beckon' : ''}`}
      style={{
        minHeight: 44,
        borderColor: tone === 'amber' ? '#fbbf24' : '#3f3a56',
        background: beckon ? 'rgba(251,191,36,.30)' : tone === 'amber' ? 'rgba(251,191,36,.16)' : '#15122a',
        color: tone === 'amber' ? '#fde68a' : '#a5a1bd',
      }}
    >
      {beckon && <BeckonStyle />}
      {children}
    </button>
  );

