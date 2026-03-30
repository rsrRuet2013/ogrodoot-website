export function Footer() {
  return (
    <footer className="relative bg-deep-space text-star-white overflow-hidden pt-20 border-t border-white/5">
      {/* Animated Horizon Line */}
      <div className="absolute top-0 left-0 right-0 h-1 object-cover">
        <svg
          className="w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 100 1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,0 Q25,1 50,0 T100,0"
            fill="none"
            stroke="var(--color-mars-red)"
            strokeWidth="0.5"
            className="animate-pulse-glow"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full border border-white/20 bg-white/5 p-2">
                <img src="/logo-white.png" alt="Team Ogrodoot" className="w-full h-full object-contain" />
              </div>
              <span className="font-orbitron font-bold text-xl tracking-wider">
                OGRODOOT
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Designing the future of Mars exploration — from Bangladesh to the Universe. Official rover team of RUET.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com/team.ogrodoot" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/30 transition-colors">
                <span className="sr-only">Facebook</span>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
              </a>
              <a href="https://linkedin.com/company/team-ogrodoot" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/30 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-6">
            <h4 className="font-orbitron tracking-widest text-sm text-mars-red">QUICK LINKS</h4>
            <nav className="flex flex-col gap-3 text-sm text-muted-foreground">
              {['Home', 'About Us', 'The Team', 'Rover Showcase', 'Achievements'].map(link => (
                <a key={link} href="#" className="hover:text-star-white transition-colors w-fit">{link}</a>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact */}
          <div className="flex flex-col gap-6">
            <h4 className="font-orbitron tracking-widest text-sm text-mars-red">CONTACT</h4>
            <address className="flex flex-col gap-4 not-italic text-sm text-muted-foreground">
              <p className="flex items-start gap-3">
                <span className="text-mars-orange">📍</span>
                <span>Rajshahi University of Engineering &<br/>Technology (RUET)<br/>Rajshahi 6204, Bangladesh</span>
              </p>
              <p className="flex items-center gap-3">
                <span className="text-mars-orange">✉️</span>
                <a href="mailto:contact@teamogrodoot.com" className="hover:text-white transition-colors">contact@teamogrodoot.com</a>
              </p>
            </address>
          </div>

          {/* Column 4: Competitions */}
          <div className="flex flex-col gap-6">
            <h4 className="font-orbitron tracking-widest text-sm text-mars-red">COMPETITIONS</h4>
            <div className="flex flex-col gap-3 text-sm text-muted-foreground">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span>University Rover Challenge (URC)</span>
                <span className="text-xs bg-white/10 px-2 py-1 rounded">2026</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span>Int'l Rover Design Challenge</span>
                <span className="text-xs bg-white/10 px-2 py-1 rounded">2025</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span>Indian Rover Challenge</span>
                <span className="text-xs bg-white/10 px-2 py-1 rounded">2025</span>
              </div>
              <div className="flex items-center justify-between pb-2">
                <span>European Rover Challenge</span>
                <span className="text-xs bg-white/10 px-2 py-1 rounded">2019</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/40">
        <div className="container mx-auto px-4 md:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-jetbrains-mono text-muted-foreground">
          <p>© {new Date().getFullYear()} Team Ogrodoot. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Powered by</span>
            <span className="text-white font-bold tracking-wider">RUET</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
