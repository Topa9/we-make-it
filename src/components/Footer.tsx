<<<<<<< HEAD
import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-white font-bold text-lg mb-3">
            NOUVEAU NOM DE L'ÉCOLE {/* CHANGE SCHOOL NAME HERE */}
          </h4>
          <p className="text-xs leading-relaxed text-slate-400">
            Établissement d'enseignement supérieur accrédité formant les cadres de santé et professionnels de référence.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-3">Accès Rapide</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/login" className="hover:text-white transition">Portail des Étudiants</Link></li>
            <li><Link href="/login" className="hover:text-white transition">Espace Enseignants & Délibérations</Link></li>
            <li><Link href="/filieres" className="hover:text-white transition">Filières & Programmes LMD</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-3">Contact & Emplacement</h4>
          <p className="text-xs leading-relaxed">
            Avenue Allal El Fassi, Cité Universitaire Madinat Al Irfane, Rabat, Maroc.<br />
            Tél: +212 (0) 5 37 77 88 00<br />
            Email: contact@votre-ecole.ac.ma
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-slate-800 text-xs text-center text-slate-500">
        © 2026 NOUVEAU NOM DE L'ÉCOLE. Tous droits réservés.
      </div>
    </footer>
  );
=======
import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-sm">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-white font-bold text-lg mb-3">
            NOUVEAU NOM DE L'ÉCOLE {/* CHANGE SCHOOL NAME HERE */}
          </h4>
          <p className="text-xs leading-relaxed text-slate-400">
            Établissement d'enseignement supérieur accrédité formant les cadres de santé et professionnels de référence.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-3">Accès Rapide</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/login" className="hover:text-white transition">Portail des Étudiants</Link></li>
            <li><Link href="/login" className="hover:text-white transition">Espace Enseignants & Délibérations</Link></li>
            <li><Link href="/filieres" className="hover:text-white transition">Filières & Programmes LMD</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-3">Contact & Emplacement</h4>
          <p className="text-xs leading-relaxed">
            Avenue Allal El Fassi, Cité Universitaire Madinat Al Irfane, Rabat, Maroc.<br />
            Tél: +212 (0) 5 37 77 88 00<br />
            Email: contact@votre-ecole.ac.ma
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-slate-800 text-xs text-center text-slate-500">
        © 2026 NOUVEAU NOM DE L'ÉCOLE. Tous droits réservés.
      </div>
    </footer>
  );
>>>>>>> 457e53bffdd5c743a5f18f591fbcaa394793bfcb
}