/* global React, ReactDOM, gsap, ScrollTrigger, Lenis */

const { useEffect, useMemo, useState } = React;

const AREAS = [
  ["01", "Direito Civil", "Relações privadas, obrigações, contratos, responsabilidade civil e questões patrimoniais."],
  ["02", "Família e Sucessões", "Orientação em relações familiares, planejamento sucessório, inventários e partilhas."],
  ["03", "Direito do Trabalho", "Atuação em relações de trabalho, prevenção de conflitos e demandas trabalhistas."],
  ["04", "Direito Previdenciário", "Análise e acompanhamento de questões previdenciárias e benefícios."],
  ["05", "Direito do Consumidor", "Atuação em relações de consumo, contratos, cobranças e proteção de direitos."],
  ["06", "Direito Empresarial", "Suporte jurídico a empresas, contratos, relações societárias e prevenção de riscos."],
  ["07", "Direito Tributário", "Análise de questões fiscais, obrigações tributárias e defesa de interesses do contribuinte."],
  ["08", "Direito Criminal", "Defesa técnica e acompanhamento jurídico em matérias de natureza criminal."],
  ["09", "Direito Administrativo", "Atuação em relações com a Administração Pública e procedimentos administrativos."],
];

const TEAM = [
  {
    name: "Dr. Marcus Vinicius da Silva Medeiros Tomé",
    oab: "OAB/MG 243.765",
    role: "Advogado responsável",
    image: "assets/marcus-vinicius.png",
    className: "portrait--marcus",
  },
  {
    name: "Dra. Rafaella Silva de Vasconcelos",
    oab: "OAB/MG 250.459",
    role: "Advogada responsável",
    image: "assets/rafaella-vasconcelos.jpeg",
    className: "portrait--rafaella",
  },
  {
    name: "Dra. Rafaele Hemanuele Monteiro Rodrigues Ferreira",
    oab: "OAB/MG 246.172",
    role: "Advogada responsável",
    image: "assets/rafaele-monteiro.jpeg",
    className: "portrait--rafaele",
  },
];

const FAQS = [
  ["Como funciona o primeiro contato?", "A equipe recebe a sua demanda, identifica o assunto e orienta os próximos passos para o atendimento jurídico."],
  ["Quais documentos devo separar?", "A documentação depende do caso. No primeiro contato, o escritório informa quais documentos são necessários para uma análise adequada."],
  ["Como escolho a área jurídica correta?", "Você não precisa classificar o problema antes de falar conosco. Descreva a situação e a equipe direcionará o atendimento para a área correspondente."],
  ["Como faço para agendar um atendimento?", "Entre em contato pelo telefone do escritório ou pelo e-mail institucional. A equipe confirma a disponibilidade e os detalhes do atendimento."],
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7.3 3.5 4.8 5.2c-.7.5-1 1.4-.7 2.2 2.3 6.4 6.1 10.2 12.5 12.5.8.3 1.7 0 2.2-.7l1.7-2.5a1.6 1.6 0 0 0-.3-2.1l-3-2.4a1.6 1.6 0 0 0-2 .1l-1.2 1c-2-1-3.3-2.3-4.3-4.3l1-1.2c.5-.6.5-1.5.1-2l-2.4-3a1.6 1.6 0 0 0-2.1-.3Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 6.5h18v11H3z" /><path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <a className="brand" href="#inicio" onClick={close} aria-label="MVM - início">
        <span className="brand-monogram">M<span>V</span>M</span>
        <span className="brand-copy">Medeiros, Vasconcelos<br />&amp; Monteiro</span>
      </a>

      <nav className={`main-nav ${open ? "is-open" : ""}`} aria-label="Navegação principal">
        <a href="#escritorio" onClick={close}>Escritório</a>
        <a href="#areas" onClick={close}>Áreas de atuação</a>
        <a href="#equipe" onClick={close}>Advogados</a>
        <a href="#contato" onClick={close}>Contato</a>
        <a className="nav-cta" href="tel:+5534996600327" onClick={close}>
          <PhoneIcon /> <span>(34) 99660-0327</span>
        </a>
      </nav>

      <button
        className={`menu-toggle ${open ? "is-open" : ""}`}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="menu"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
      >
        <span></span><span></span>
      </button>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="hero-grain" aria-hidden="true"></div>
      <div className="hero-line hero-line--one" aria-hidden="true"></div>
      <div className="hero-line hero-line--two" aria-hidden="true"></div>

      <div className="container hero-grid">
        <div className="hero-copy" data-reveal="up">
          <p className="eyebrow">Sociedade de Advogados <span></span> OAB/MG 23.417</p>
          <h1 id="hero-title">
            Estratégia jurídica<br />
            <em>com precisão,</em><br />
            discrição e presença.
          </h1>
          <p className="hero-lead">
            Medeiros, Vasconcelos &amp; Monteiro reúne atuação técnica e atendimento cuidadoso
            em diferentes áreas do Direito, com análise individual de cada demanda.
          </p>
          <div className="hero-actions">
            <a className="button button--gold" href="#contato">Falar com o escritório <ArrowIcon /></a>
            <a className="text-link" href="#areas">Conhecer áreas de atuação <span>↘</span></a>
          </div>
        </div>

        <div className="hero-visual" data-reveal="fade">
          <div className="hero-frame">
            <div className="hero-photo hero-photo--main">
              <img src="assets/marcus-vinicius.png" alt="Dr. Marcus Vinicius da Silva Medeiros Tomé" fetchPriority="high" />
            </div>
            <div className="hero-photo hero-photo--top">
              <img src="assets/rafaella-vasconcelos.jpeg" alt="Dra. Rafaella Silva de Vasconcelos" fetchPriority="high" />
            </div>
            <div className="hero-photo hero-photo--bottom">
              <img src="assets/rafaele-monteiro.jpeg" alt="Dra. Rafaele Hemanuele Monteiro Rodrigues Ferreira" fetchPriority="high" />
            </div>
            <div className="hero-seal" aria-hidden="true">
              <span>MVM</span>
              <small>Sociedade de Advogados</small>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-rail" aria-label="Áreas em destaque">
        <span>Direito Civil</span><i></i><span>Família &amp; Sucessões</span><i></i><span>Trabalho</span><i></i><span>Empresarial</span><i></i><span>Tributário</span>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about section" id="escritorio">
      <div className="container about-grid">
        <div className="section-kicker" data-reveal="up">
          <span>01</span>
          <p>O escritório</p>
        </div>

        <div className="about-content">
          <h2 className="display-title" data-reveal="up">
            Técnica jurídica com uma postura <em>próxima e responsável.</em>
          </h2>
          <div className="about-columns" data-reveal="up">
            <p>
              A Medeiros, Vasconcelos &amp; Monteiro | Sociedade de Advogados atua em demandas
              de pessoas, famílias e empresas, sempre a partir de uma leitura cuidadosa dos fatos,
              dos documentos e dos objetivos envolvidos.
            </p>
            <p>
              O trabalho parte de uma comunicação clara, do estudo individual do caso e da definição
              de caminhos jurídicos compatíveis com cada situação, preservando a seriedade que a
              advocacia exige.
            </p>
          </div>

          <div className="principles" data-reveal="up">
            <article><b>01</b><h3>Análise criteriosa</h3><p>Compreensão do contexto antes da definição da estratégia jurídica.</p></article>
            <article><b>02</b><h3>Comunicação clara</h3><p>Orientação objetiva para que cada etapa seja compreendida com segurança.</p></article>
            <article><b>03</b><h3>Atuação responsável</h3><p>Condução técnica, ética e compatível com as particularidades de cada demanda.</p></article>
          </div>
        </div>
      </div>
    </section>
  );
}

function PracticeAreas() {
  return (
    <section className="areas section section--dark" id="areas">
      <div className="container">
        <div className="areas-head">
          <div className="section-kicker section-kicker--light" data-reveal="up"><span>02</span><p>Áreas de atuação</p></div>
          <h2 className="display-title display-title--light" data-reveal="up">Conhecimento jurídico<br /><em>aplicado com contexto.</em></h2>
          <p className="areas-intro" data-reveal="up">Atuação multidisciplinar para demandas individuais, familiares, profissionais e empresariais.</p>
        </div>

        <div className="areas-grid">
          {AREAS.map(([num, title, desc]) => (
            <article className="area-card" key={title} data-reveal="card">
              <div className="area-card-top"><span>{num}</span><span className="area-plus">＋</span></div>
              <h3>{title}</h3>
              <p>{desc}</p>
              <div className="area-rule"></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function EditorialBreak() {
  return (
    <section className="editorial-break" aria-label="Manifesto do escritório">
      <div className="container editorial-inner" data-reveal="up">
        <p className="editorial-label">MVM · Sociedade de Advogados</p>
        <blockquote>“Direito exige técnica.<br /><em>Relações exigem confiança.</em>”</blockquote>
        <span className="editorial-mark">MVM</span>
      </div>
    </section>
  );
}

function Team() {
  return (
    <section className="team section" id="equipe">
      <div className="container">
        <div className="team-head">
          <div className="section-kicker" data-reveal="up"><span>03</span><p>Advogados responsáveis</p></div>
          <h2 className="display-title" data-reveal="up">Três profissionais.<br /><em>Uma atuação integrada.</em></h2>
        </div>

        <div className="team-grid">
          {TEAM.map((person, index) => (
            <article className="lawyer-card" key={person.name} data-reveal="card">
              <div className={`lawyer-photo ${person.className}`}>
                <img src={person.image} alt={person.name} loading={index === 0 ? "eager" : "lazy"} />
                <span className="lawyer-index">0{index + 1}</span>
              </div>
              <div className="lawyer-info">
                <p>{person.role}</p>
                <h3>{person.name}</h3>
                <span>{person.oab}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [status, setStatus] = useState("");

  function onSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const subjectArea = String(data.get("area") || "").trim();
    const message = String(data.get("message") || "").trim();

    if (!name || !email || !message) {
      setStatus("Preencha nome, e-mail e mensagem para continuar.");
      return;
    }

    const subject = encodeURIComponent(`Contato pelo site — ${subjectArea || "Atendimento jurídico"}`);
    const body = encodeURIComponent(`Nome: ${name}\nE-mail: ${email}\nTelefone: ${phone || "Não informado"}\nÁrea: ${subjectArea || "Não informada"}\n\nMensagem:\n${message}`);
    window.location.href = `mailto:contato@mvmadvocacia.com.br?subject=${subject}&body=${body}`;
    setStatus("Seu aplicativo de e-mail foi aberto com a mensagem preenchida.");
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <div className="field-row">
        <label><span>Nome</span><input name="name" type="text" autoComplete="name" placeholder="Seu nome" /></label>
        <label><span>E-mail</span><input name="email" type="email" autoComplete="email" placeholder="voce@email.com" /></label>
      </div>
      <div className="field-row">
        <label><span>Telefone</span><input name="phone" type="tel" autoComplete="tel" placeholder="(00) 00000-0000" /></label>
        <label>
          <span>Assunto</span>
          <select name="area" defaultValue="">
            <option value="" disabled>Selecione uma área</option>
            {AREAS.map(([, title]) => <option key={title} value={title}>{title}</option>)}
            <option value="Outro assunto">Outro assunto</option>
          </select>
        </label>
      </div>
      <label><span>Mensagem</span><textarea name="message" rows="5" placeholder="Conte brevemente como podemos orientar você."></textarea></label>
      <div className="form-bottom">
        <button className="button button--gold" type="submit">Preparar e-mail <ArrowIcon /></button>
        <p className="form-status" aria-live="polite">{status}</p>
      </div>
    </form>
  );
}

function Contact() {
  return (
    <section className="contact section section--ink" id="contato">
      <div className="container contact-grid">
        <div className="contact-copy">
          <div className="section-kicker section-kicker--light" data-reveal="up"><span>04</span><p>Contato</p></div>
          <h2 className="display-title display-title--light" data-reveal="up">Converse com<br /><em>o escritório.</em></h2>
          <p className="contact-lead" data-reveal="up">Envie sua mensagem ou utilize os canais abaixo para solicitar atendimento.</p>

          <div className="contact-list" data-reveal="up">
            <a href="mailto:contato@mvmadvocacia.com.br"><MailIcon /><span><small>E-mail institucional</small>contato@mvmadvocacia.com.br</span></a>
            <a href="tel:+5534996600327"><PhoneIcon /><span><small>Telefone do escritório</small>(34) 99660-0327</span></a>
            <a href="tel:+5534991439667"><PhoneIcon /><span><small>Dra. Rafaella</small>(34) 99143-9667</span></a>
            <a href="tel:+5534997706151"><PhoneIcon /><span><small>Dra. Rafaele</small>(34) 99770-6151</span></a>
          </div>
        </div>
        <div data-reveal="up"><ContactForm /></div>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="faq section">
      <div className="container faq-grid">
        <div>
          <div className="section-kicker" data-reveal="up"><span>05</span><p>Informações</p></div>
          <h2 className="display-title" data-reveal="up">Perguntas<br /><em>frequentes.</em></h2>
        </div>
        <div className="faq-list" data-reveal="up">
          {FAQS.map(([q, a], index) => (
            <article className={`faq-item ${open === index ? "is-open" : ""}`} key={q}>
              <button type="button" onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}>
                <span>{String(index + 1).padStart(2, "0")}</span><b>{q}</b><i>＋</i>
              </button>
              <div className="faq-answer"><p>{a}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = useMemo(() => new Date().getFullYear(), []);
  return (
    <footer className="footer">
      <div className="footer-logo-band">
        <img src="assets/logo-mvm.jpeg" alt="Medeiros, Vasconcelos & Monteiro — Sociedade de Advogados, OAB/MG 23.417" loading="lazy" />
      </div>
      <div className="container footer-grid">
        <div><p className="footer-brand">Medeiros, Vasconcelos &amp; Monteiro</p><span>Sociedade de Advogados · OAB/MG 23.417</span></div>
        <nav aria-label="Navegação do rodapé"><a href="#escritorio">Escritório</a><a href="#areas">Áreas</a><a href="#equipe">Advogados</a><a href="#contato">Contato</a></nav>
        <div className="footer-contact"><a href="mailto:contato@mvmadvocacia.com.br">contato@mvmadvocacia.com.br</a><a href="tel:+5534996600327">(34) 99660-0327</a></div>
      </div>
      <div className="container footer-bottom"><span>© {year} MVM Sociedade de Advogados.</span><span>Conteúdo institucional.</span></div>
    </footer>
  );
}

function App() {
  useEffect(() => {
    const preloader = document.getElementById("preloader");
    const preloaderImage = preloader?.querySelector("img");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const revealSite = () => {
      document.documentElement.classList.remove("preloading");
      gsap?.to("#root", { opacity: 1, duration: reduced ? 0 : 0.65, ease: "power2.out" });
    };

    if (preloader && window.gsap && !reduced) {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .to(preloaderImage, { opacity: 1, scale: 1, duration: 0.85 })
        .to(preloaderImage, { opacity: 1, duration: 0.8 })
        .to(preloaderImage, { opacity: 0, scale: 1.025, duration: 0.55, ease: "power2.in" })
        .to(preloader, {
          yPercent: -100,
          duration: 0.85,
          ease: "power4.inOut",
          onStart: revealSite,
          onComplete: () => preloader.remove(),
        });
    } else {
      if (preloader) preloader.remove();
      revealSite();
    }

    if (window.gsap && window.ScrollTrigger && !reduced) {
      gsap.registerPlugin(ScrollTrigger);
      const nodes = gsap.utils.toArray("[data-reveal]");
      nodes.forEach((node) => {
        const type = node.getAttribute("data-reveal");
        const from = type === "fade" ? { opacity: 0, scale: 0.985 } : type === "card" ? { opacity: 0, y: 34 } : { opacity: 0, y: 46 };
        gsap.from(node, {
          ...from,
          duration: type === "card" ? 0.85 : 1.05,
          ease: "power3.out",
          scrollTrigger: { trigger: node, start: "top 88%", once: true },
        });
      });

      gsap.to(".hero-line--one", { yPercent: 24, scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 } });
      gsap.to(".hero-line--two", { yPercent: -18, scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1 } });
    }

    let lenis = null;
    if (window.Lenis && !reduced) {
      lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: 0.9 });
      let frame;
      const raf = (time) => { lenis.raf(time); frame = requestAnimationFrame(raf); };
      frame = requestAnimationFrame(raf);
      return () => { cancelAnimationFrame(frame); lenis.destroy(); };
    }
  }, []);

  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <About />
        <PracticeAreas />
        <EditorialBreak />
        <Team />
        <Contact />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
