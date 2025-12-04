const ConfettiDecoration = () => {
  const confettiPieces = [
    { color: 'bg-primary', left: '10%', delay: '0s', size: 'w-3 h-3' },
    { color: 'bg-secondary', left: '20%', delay: '0.5s', size: 'w-2 h-4' },
    { color: 'bg-accent', left: '35%', delay: '1s', size: 'w-4 h-2' },
    { color: 'bg-lavender', left: '50%', delay: '0.3s', size: 'w-3 h-3' },
    { color: 'bg-primary', left: '65%', delay: '0.8s', size: 'w-2 h-2' },
    { color: 'bg-secondary', left: '75%', delay: '0.2s', size: 'w-4 h-3' },
    { color: 'bg-accent', left: '85%', delay: '0.6s', size: 'w-3 h-2' },
    { color: 'bg-lavender', left: '90%', delay: '1.2s', size: 'w-2 h-3' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {confettiPieces.map((piece, index) => (
        <div
          key={index}
          className={`absolute ${piece.color} ${piece.size} rounded-sm opacity-30 animate-float`}
          style={{
            left: piece.left,
            top: `${Math.random() * 100}%`,
            animationDelay: piece.delay,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
};

export default ConfettiDecoration;
