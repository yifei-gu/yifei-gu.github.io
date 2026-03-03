import ScrollReveal from './ScrollReveal';

// IMPORTANT: Update these URLs with your actual profiles
// TODO: Replace the placeholder URLs below with your actual links
const links = [
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    label: 'GitHub',
    href: 'https://github.com/YOUR_USERNAME', // TODO: Replace with your GitHub username
    color: 'hover:text-white',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
        <circle cx="12" cy="17" r="3.5" />
      </svg>
    ),
    label: 'Google Scholar',
    href: 'https://scholar.google.com/citations?user=YOUR_ID', // TODO: Replace with your Google Scholar ID
    color: 'hover:text-blue-500',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
    label: 'Email',
    href: 'mailto:your.email@hku.hk', // TODO: Replace with your actual email
    color: 'hover:text-ocean-400',
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-deep-100/30 dark:bg-deep-900/30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-ocean-500/20 to-transparent" />

      <div className="max-w-2xl mx-auto text-center relative">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-ocean-500 font-mono text-lg block mb-2">{'// contact'}</span>
            <span className="text-deep-800 dark:text-white">Get in Touch</span>
          </h2>
          <p className="text-deep-600 dark:text-deep-300 mt-4 mb-10 max-w-lg mx-auto leading-relaxed">
            Interested in collaboration, have questions about my software tools, or want to discuss
            marine ecology and AI? I'd love to hear from you.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="flex justify-center gap-4 sm:gap-6">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative glass rounded-xl p-5 text-deep-500 dark:text-deep-400 transition-all hover:-translate-y-2 hover:shadow-xl hover:shadow-ocean-500/15 hover:border-ocean-500/40 flex flex-col items-center gap-2 min-w-[100px]"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-xl bg-ocean-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 flex flex-col items-center">
                  <div className={`w-10 h-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${link.color}`}>
                    {link.icon}
                  </div>
                  <span className="text-xs font-medium mt-2 text-deep-600 dark:text-deep-300">{link.label}</span>
                </div>
              </a>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mt-12">
            {/*
              IMPORTANT: To enable CV download:
              1. Place your CV PDF file in the /public folder
              2. Rename it to CV_YifeiGu.pdf (or update the href below)
              
              If you don't have a CV yet, you can remove this section.
            */}
            <a
              href="/CV_YifeiGu.pdf"
              download
              className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 bg-ocean-500 hover:bg-ocean-400 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-ocean-500/30 hover:-translate-y-1 overflow-hidden"
            >
              {/* Button shine effect */}
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <svg className="w-5 h-5 relative z-10 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="relative z-10">Download CV (PDF)</span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
