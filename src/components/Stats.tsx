<<<<<<< HEAD
export default function Stats() {
  const stats = [
    { metric: '98%', label: 'Insertion CHU & Cliniques' },
    { metric: '180', label: 'Crédits ECTS Reconnus' },
    { metric: '1400h', label: 'Pratique Clinique & Gardes' },
    { metric: '100%', label: 'Diplômes Accrédités' },
  ]

  return (
    <section className="bg-slate-50 border-b border-slate-200">
      {/* Stats Bar */}
      <div className="bg-white border-b border-slate-100 py-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <p className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                {item.metric}
              </p>
              <p className="text-xs md:text-sm font-semibold text-slate-500">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
=======
export default function Stats() {
  const stats = [
    { metric: '98%', label: 'Insertion CHU & Cliniques' },
    { metric: '180', label: 'Crédits ECTS Reconnus' },
    { metric: '1400h', label: 'Pratique Clinique & Gardes' },
    { metric: '100%', label: 'Diplômes Accrédités' },
  ]

  return (
    <section className="bg-slate-50 border-b border-slate-200">
      {/* Stats Bar */}
      <div className="bg-white border-b border-slate-100 py-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((item, idx) => (
            <div key={idx} className="space-y-1">
              <p className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                {item.metric}
              </p>
              <p className="text-xs md:text-sm font-semibold text-slate-500">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
>>>>>>> 457e53bffdd5c743a5f18f591fbcaa394793bfcb
}