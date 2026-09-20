/* global React, ReactDOM, gsap */
const {useEffect,useMemo,useState}=React;
const h=React.createElement;

const LAWYERS=[
  {id:'rafaella',short:'Dra. R. Vasconcelos',name:'Dra. Rafaella Silva de Vasconcelos',oab:'OAB/MG 250.459',image:'assets/rafaela.png',text:'Atuação orientada por escuta atenta, análise criteriosa e comunicação objetiva com o cliente. Conduz cada demanda de forma individualizada, buscando compreender o contexto apresentado, organizar as informações relevantes e oferecer orientação jurídica clara ao longo de todas as etapas do atendimento.'},
  {id:'rafaele',short:'Dra. Rafaele Monteiro',name:'Dra. Rafaele Hemanuele Monteiro Rodrigues Ferreira',oab:'OAB/MG 246.172',image:'assets/rafaele.png',text:'Atuação pautada pela proximidade, organização e atenção aos detalhes de cada caso. O atendimento é desenvolvido de forma individualizada, com análise cuidadosa das circunstâncias apresentadas, clareza na comunicação e construção de estratégias jurídicas compatíveis com as necessidades de cada cliente.'},
  {id:'marcus',short:'Dr. Medeiros',name:'Dr. Marcus Vinicius da Silva Medeiros Tomé',oab:'OAB/MG 243.765',image:'assets/marcus-vinicius.png',text:'Atuação com foco na análise técnica e estratégica das demandas, acompanhando cada situação com responsabilidade e atenção às suas particularidades. Prioriza uma comunicação direta e compreensível, organização das informações e definição de caminhos jurídicos coerentes com o contexto apresentado pelo cliente.'},
];

const AREAS=[
  {title:'Direito Civil',icon:'assets/area-civil.webp',desc:'Relações obrigacionais, contratos, responsabilidade civil, questões patrimoniais e demais conflitos de natureza civil.'},
  {title:'Direito de Família e Sucessões',icon:'assets/area-familia.webp',desc:'Orientação em temas familiares e sucessórios, com abordagem técnica e atenção à natureza sensível das relações envolvidas.'},
  {title:'Direito do Trabalho',icon:'assets/area-trabalho.webp',desc:'Atuação consultiva e contenciosa em relações de trabalho, direitos, deveres e prevenção de conflitos.'},
  {title:'Direito Previdenciário',icon:'assets/area-previdenciario.webp',desc:'Orientação em benefícios e questões previdenciárias, com análise documental e acompanhamento jurídico.'},
  {title:'Direito do Consumidor',icon:'assets/area-consumidor.webp',desc:'Questões decorrentes das relações de consumo, responsabilidade, contratos e proteção de direitos.'},
  {title:'Direito Empresarial',icon:'assets/area-empresarial.webp',desc:'Suporte jurídico a empresas em contratos, relações societárias, organização preventiva e demandas empresariais.'},
  {title:'Direito Tributário',icon:'assets/area-tributario.webp',desc:'Análise e orientação em questões tributárias, obrigações e situações que exijam acompanhamento jurídico especializado.'},
  {title:'Direito Criminal',icon:'assets/area-criminal.webp',desc:'Atuação jurídica em matéria criminal com análise técnica, sigilo profissional e observância das garantias legais.'},
  {title:'Direito Administrativo',icon:'assets/area-administrativo.webp',desc:'Orientação em relações com a Administração Pública e questões de natureza administrativa.'},
];

const PROCESS=[
  ['Primeiro contato','Compreensão inicial do assunto e organização das informações essenciais para direcionar o atendimento.'],
  ['Análise jurídica','Leitura técnica dos fatos e, quando necessário, dos documentos relacionados à demanda.'],
  ['Definição de estratégia','Apresentação dos caminhos jurídicos possíveis de forma clara, compatível com cada situação concreta.'],
  ['Acompanhamento','Comunicação organizada sobre movimentações, documentos e próximos passos durante o atendimento.'],
];

function routeFromHash(){
  const raw=(location.hash||'#inicio').replace(/^#/,'').replace(/^\//,'');
  const [page,anchor]=raw.split('/');
  return {page:['inicio','escritorio','sobre','especialidades','contato'].includes(page)?page:'inicio',anchor:anchor||null};
}

function Header({route}){
  const [scrolled,setScrolled]=useState(false);
  const [open,setOpen]=useState(false);
  const [teamOpen,setTeamOpen]=useState(false);

  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>18);fn();
    addEventListener('scroll',fn,{passive:true});
    return()=>removeEventListener('scroll',fn);
  },[]);

  const closeMenu=()=>{
    setOpen(false);
    setTeamOpen(false);
  };

  useEffect(()=>{
    closeMenu();
  },[route.page,route.anchor]);

  useEffect(()=>{
    document.body.classList.toggle('menu-open',open);
    if(!open)return;
    const onKey=e=>{if(e.key==='Escape')closeMenu();};
    addEventListener('keydown',onKey);
    return()=>removeEventListener('keydown',onKey);
  },[open]);

  useEffect(()=>()=>document.body.classList.remove('menu-open'),[]);

  const toggle=()=>setOpen(v=>!v);
  const light=false;
  return h('header',{className:`site-header ${scrolled?'scrolled':''} ${light?'on-light':''} ${open?'menu-visible':''}`},
    h('a',{className:'brand',href:'#inicio','aria-label':'Ir para o início',onClick:closeMenu},
      h('img',{className:'brand-logo',src:'assets/logo-mvm-navbar.png',alt:'MVM'}),
      h('span',{className:'brand-name'},
        h('span',null,'Medeiros, Vasconcelos & Monteiro'),
        h('small',null,'Sociedade de Advogados'))),
    h('button',{className:`menu-toggle ${open?'open':''}`,onClick:toggle,'aria-label':open?'Fechar menu':'Abrir menu','aria-expanded':open,'aria-controls':'main-navigation'},h('span'),h('span'),h('span')),
    h('nav',{id:'main-navigation',className:`nav ${open?'open':''}`,'aria-label':'Navegação principal'},
      h('div',{className:'nav-item'},h('a',{className:`nav-link ${route.page==='inicio'?'active':''}`,href:'#inicio',onClick:closeMenu},'Início')),
      h('div',{className:'nav-item'},h('a',{className:`nav-link ${route.page==='escritorio'?'active':''}`,href:'#escritorio',onClick:closeMenu},'Escritório')),
      h('div',{className:`nav-item nav-item-about ${teamOpen?'submenu-open':''}`},
        h('div',{className:'nav-row'},
          h('a',{className:`nav-link ${route.page==='sobre'?'active':''}`,href:'#sobre',onClick:closeMenu},'Sobre Nós',h('span',{className:'chevron'},'▼')),
          h('button',{className:'submenu-toggle',type:'button',onClick:()=>setTeamOpen(v=>!v),'aria-label':teamOpen?'Fechar submenu da equipe':'Abrir submenu da equipe','aria-expanded':teamOpen},h('span',null,'+'))),
        h('div',{className:`dropdown ${teamOpen?'open':''}`},LAWYERS.map(l=>h('a',{key:l.id,href:`#sobre/${l.id}`,onClick:closeMenu},l.short)))),
      h('div',{className:'nav-item'},h('a',{className:`nav-link ${route.page==='especialidades'?'active':''}`,href:'#especialidades',onClick:closeMenu},'Especialidades')),
      h('div',{className:'nav-item'},h('a',{className:`nav-link nav-contact ${route.page==='contato'?'active':''}`,href:'#contato',onClick:closeMenu},'Contato'))));
}

function PageHero({type,kicker,title,em,subtitle,primary,secondary}){
  return h('section',{className:`photo-hero hero-${type}`},
    h('div',{className:'hero-noise'}),
    h('div',{className:'container hero-content'},
      h('p',{className:'hero-kicker'},kicker),
      h('h1',{className:'hero-title'},title,' ',h('em',null,em)),
      h('p',{className:'hero-subtitle'},subtitle),
      h('div',{className:'hero-actions'},
        primary&&h('a',{className:'btn btn-primary',href:primary.href},primary.label),
        secondary&&h('a',{className:'btn btn-ghost',href:secondary.href},secondary.label)),
      h('div',{className:'hero-meta'},h('strong',null,'OAB/MG 23.417'),'Sociedade de Advogados')),
    h('div',{className:'scroll-cue'},h('i'),h('span',null,'role para explorar')));
}

function SectionHeading({number,title,em,intro,dark=false}){
  const label=(number||'').replace(/^\s*\d+\s*\/\s*/,'');
  return h('div',{className:'section-head'},
    h('div',{className:'section-number'},label),
    h('div',null,
      h('h2',{className:'section-title'},title,' ',h('em',null,em)),
      intro&&h('p',{className:'section-intro'},intro)));
}

function AreaCards({compact=false}){
  return h('div',{className:`practice-grid ${compact?'practice-grid-home':''}`},
    AREAS.map(area=>h('article',{className:'practice-card','data-reveal':true,key:area.title},
      h('div',{className:'practice-top'},
        h('img',{className:'practice-icon',src:area.icon,alt:'',loading:'lazy','aria-hidden':'true'})),
      h('h3',null,area.title),
      h('p',null,area.desc))));
}

function ProcessSection({dark=false}){
  return h('section',{className:`section ${dark?'section-navy':'section-paper'} process-section`},
    h('div',{className:'container'},
      h(SectionHeading,{number:'ATENDIMENTO',title:'Um processo',em:'organizado.',intro:'Uma experiência de atendimento estruturada para dar clareza ao cliente sem transformar cada caso em uma fórmula pronta.'}),
      h('div',{className:'process-grid'},PROCESS.map(([t,d])=>h('article',{className:'process-card','data-reveal':true,key:t},
        h('h3',null,t),h('p',null,d))))));
}


function CtaBand({title='Conheça a equipe e as áreas de atuação do escritório.',href='#sobre',label='Sobre Nós'}){
  return h('section',{className:'cta-band'},h('div',{className:'container cta-band-grid'},
    h('h2',null,title),h('a',{className:'btn',href},label)));
}

function Home(){
  return h('main',{id:'page-content',className:'page page-enter'},
    h(PageHero,{type:'home',kicker:'Medeiros, Vasconcelos & Monteiro',title:'Advocacia com',em:'compromisso e estratégia',subtitle:'Atendimento jurídico técnico, próximo e responsável, com atuação multidisciplinar e comunicação objetiva do início ao fim.',primary:{href:'#contato',label:'Falar com o escritório'},secondary:{href:'#escritorio',label:'Conhecer o escritório'}}),

    h('section',{className:'section section-paper'},h('div',{className:'container'},
      h('div',{className:'home-intro-grid'},
        h('div',{className:'home-intro-copy','data-reveal':true},
          h('div',{className:'section-number'},'SOCIEDADE'),
          h('h2',null,'Estratégia jurídica sem perder a ',h('span',{style:{color:'#9c7731'}},'proximidade.')),
          h('p',null,'A MVM Sociedade de Advogados reúne atuação multidisciplinar, análise cuidadosa e organização para orientar cada demanda de forma individualizada. A proposta é combinar rigor técnico, linguagem clara e acompanhamento próximo.')),
        h('div',{className:'statement','data-reveal':true},'“Cada atendimento começa pela compreensão do contexto, não por respostas prontas.”')),
      h('div',{className:'home-values','data-reveal':true},
        h('article',null,h('h3',null,'Escuta'),h('p',null,'Compreensão cuidadosa do contexto antes da definição dos caminhos jurídicos.')),
        h('article',null,h('h3',null,'Estratégia'),h('p',null,'Análise técnica e definição de medidas compatíveis com cada situação concreta.')),
        h('article',null,h('h3',null,'Clareza'),h('p',null,'Comunicação objetiva para que o cliente compreenda etapas, documentos e próximos passos.'))))),

    h('section',{className:'section section-dark home-practice'},h('div',{className:'container'},
      h(SectionHeading,{number:'ÁREAS DE ATUAÇÃO',title:'Atuação',em:'multidisciplinar.',intro:'Nove frentes jurídicas apresentadas de forma institucional. A estratégia de cada caso depende da análise individual dos fatos e documentos.'}),
      h(AreaCards,{compact:true}),
      h('div',{className:'section-actions'},h('a',{className:'btn btn-ghost',href:'#especialidades'},'Ver especialidades em detalhes')))),

    h(ProcessSection),
    h('section',{className:'section home-office-teaser'},
      h('div',{className:'container office-teaser-grid'},
        h('div',{'data-reveal':true},
          h('div',{className:'section-number'},'O ESCRITÓRIO'),
          h('h2',{className:'section-title'},'Uma estrutura pensada para ',h('em',null,'atender bem.')),
          h('p',{className:'section-intro'},'Conheça a identidade institucional da sociedade, a forma de trabalho e os princípios que orientam o atendimento jurídico.'),
          h('a',{className:'text-link',href:'#escritorio'},'Conhecer o escritório →')),
        h('div',{className:'teaser-image','data-reveal':true,'aria-hidden':'true'}))),
    h(CtaBand,{title:'Precisa falar com a equipe? Utilize os canais institucionais do escritório.',href:'#contato',label:'Contato'}));
}

function Office(){
  return h('main',{id:'page-content',className:'page page-enter'},
    h(PageHero,{type:'office',kicker:'Escritório',title:'Uma sociedade construída sobre',em:'responsabilidade',subtitle:'Medeiros, Vasconcelos & Monteiro | Sociedade de Advogados. Uma estrutura jurídica multidisciplinar com atendimento organizado, linguagem clara e análise individual de cada demanda.',primary:{href:'#escritorio/institucional',label:'Conhecer a sociedade'},secondary:{href:'#contato',label:'Entrar em contato'}}),

    h('section',{className:'section section-paper',id:'institucional'},h('div',{className:'container office-story'},
      h('div',{'data-reveal':true},
        h('div',{className:'section-number'},'INSTITUCIONAL'),
        h('h2',{className:'section-title',style:{marginTop:'16px'}},'Medeiros, Vasconcelos ',h('em',null,'& Monteiro.')),
        h('p',{className:'office-lead'},'A sociedade reúne três advogados responsáveis e atuação em nove áreas do Direito. O atendimento é organizado para permitir compreensão do caso, análise documental e construção de caminhos jurídicos compatíveis com a situação apresentada.'),
        h('p',null,'A identidade do escritório parte de três pontos: seriedade técnica, comunicação acessível e proximidade no acompanhamento. Cada demanda possui características próprias e, por isso, é tratada de forma individualizada.')),
      h('aside',{className:'office-register','data-reveal':true},
        h('small',null,'Registro da sociedade'),
        h('strong',null,'OAB/MG 23.417'),
        h('span',null,'MEDEIROS, VASCONCELOS & MONTEIRO'),
        h('span',null,'SOCIEDADE DE ADVOGADOS')))),

    h('section',{className:'section section-ivory'},h('div',{className:'container'},
      h(SectionHeading,{number:'PRINCÍPIOS',title:'Como o escritório',em:'trabalha.',intro:'Princípios institucionais que orientam a experiência de atendimento e a organização das demandas.'}),
      h('div',{className:'principles-grid'},
        h('article',{'data-reveal':true},h('h3',null,'Análise individual'),h('p',null,'Cada situação é observada a partir de seus fatos, documentos e objetivos, evitando soluções genéricas.')),
        h('article',{'data-reveal':true},h('h3',null,'Comunicação clara'),h('p',null,'Informações jurídicas traduzidas em linguagem objetiva para facilitar decisões conscientes.')),
        h('article',{'data-reveal':true},h('h3',null,'Organização'),h('p',null,'Documentos, etapas e próximos passos tratados de forma estruturada ao longo do atendimento.')),
        h('article',{'data-reveal':true},h('h3',null,'Sigilo e responsabilidade'),h('p',null,'Tratamento profissional das informações compartilhadas no contexto jurídico e institucional.'))))),

    h(ProcessSection,{dark:true}),
    h(CtaBand,{title:'Conheça os profissionais responsáveis pela sociedade.',href:'#sobre',label:'Sobre Nós'}));
}

function AboutOpening(){
  return h('section',{className:'about-opening'},
    h('div',{className:'about-architectural','aria-hidden':'true'}),
    h('div',{className:'container about-opening-grid'},
      h('div',{className:'about-opening-copy','data-reveal':true},
        h('div',{className:'eyebrow-line'},'ESCRITÓRIO'),
        h('h1',null,
          h('span',{className:'about-title-line about-title-white'},'Medeiros,'),
          h('span',{className:'about-title-line about-title-gold'},'Vasconcelos'),
          h('span',{className:'about-title-line about-title-white about-title-last'},'& Monteiro')),
        h('p',null,'A MVM Sociedade de Advogados conta com uma estrutura pensada para oferecer atendimento jurídico acolhedor, discreto e profissional. Mais do que uma identificação institucional, o escritório representa o compromisso com a escuta atenta, a análise cuidadosa de cada situação e a construção de soluções jurídicas compatíveis com cada contexto.'),
        h('p',null,'Cada atendimento é conduzido com ética, transparência e responsabilidade, buscando compreender as necessidades apresentadas de forma individualizada. Seja para orientações preventivas, acompanhamento de processos, elaboração de documentos ou defesa de direitos, o cliente encontra uma equipe preparada para receber suas demandas com respeito, clareza e comprometimento.'),
        h('p',null,'A organização do escritório reforça a proximidade no atendimento e permite que cada cliente tenha acesso a uma advocacia mais humana, estratégica e atenta aos detalhes. Aqui, cada caso é tratado com seriedade e dedicação.'),
        h('a',{className:'btn btn-dark',href:'#contato'},'Entrar em contato')),
      h('div',{className:'about-opening-visual','data-reveal':true},
        h('div',{className:'about-photo-frame'},
          h('img',{src:'assets/about-opening-scales.webp',alt:'Balança da justiça em ambiente jurídico',loading:'eager'}),
          h('span',{className:'about-photo-accent','aria-hidden':'true'})))));
}

function About(){
  return h('main',{id:'page-content',className:'page page-enter about-page'},
    h(AboutOpening),
    h('section',{className:'section section-ivory',id:'equipe'},h('div',{className:'container'},
      h(SectionHeading,{number:'EQUIPE',title:'Advogados',em:'responsáveis.',intro:'Perfis institucionais e números de inscrição informados para identificação profissional.'}),
      h('div',{className:'team-grid'},LAWYERS.map(l=>h('article',{key:l.id,id:l.id,className:'lawyer-card lawyer-anchor','data-reveal':true},
        h('div',{className:'lawyer-photo'},h('img',{src:l.image,alt:l.name,loading:'lazy'})),
        h('div',{className:'lawyer-info'},h('small',null,'Advocacia'),h('h3',null,l.name),h('div',{className:'oab'},l.oab),h('p',null,l.text))))))),
    h(CtaBand,{title:'Conheça as áreas em que a sociedade atua.',href:'#especialidades',label:'Especialidades'}));
}

function Specialties(){
  return h('main',{id:'page-content',className:'page page-enter'},
    h(PageHero,{type:'specialties',kicker:'Especialidades',title:'Conhecimento jurídico',em:'Visão integrada',subtitle:'Atuação em nove áreas do Direito, com análise individual de cada demanda e encaminhamento técnico conforme suas particularidades.',primary:{href:'#especialidades/areas',label:'Ver áreas de atuação'},secondary:{href:'#contato',label:'Solicitar contato'}}),
    h('section',{className:'section section-dark',id:'areas'},h('div',{className:'container'},
      h(SectionHeading,{number:'ATUAÇÃO',title:'Áreas de',em:'atuação.',intro:'Cada área é apresentada em caráter institucional. A definição de estratégia depende da análise dos fatos e documentos de cada caso.'}),
      h(AreaCards),
      h('div',{className:'disclaimer'},'As informações deste site têm caráter exclusivamente institucional e informativo e não substituem consulta jurídica individualizada.'))),
    h(CtaBand,{title:'Quer entender qual área se relaciona ao seu caso?',href:'#contato',label:'Falar com o escritório'}));
}

function ContactForm(){
  const [status,setStatus]=useState('');
  const submit=e=>{
    e.preventDefault();
    const fd=new FormData(e.currentTarget);
    const nome=(fd.get('nome')||'').toString().trim();
    const email=(fd.get('email')||'').toString().trim();
    const telefone=(fd.get('telefone')||'').toString().trim();
    const area=(fd.get('area')||'').toString();
    const mensagem=(fd.get('mensagem')||'').toString().trim();
    if(!nome||!email||!mensagem){setStatus('Preencha nome, e-mail e mensagem.');return;}
    const sub=encodeURIComponent(`Contato pelo site — ${area||'Atendimento jurídico'}`);
    const body=encodeURIComponent(`Nome: ${nome}\nE-mail: ${email}\nTelefone: ${telefone||'Não informado'}\nÁrea: ${area||'Não informada'}\n\nMensagem:\n${mensagem}`);
    location.href=`mailto:contato@mvmadvocacia.com.br?subject=${sub}&body=${body}`;
    setStatus('Seu aplicativo de e-mail será aberto com a mensagem preenchida.');
  };
  return h('form',{className:'contact-form',onSubmit:submit,noValidate:true,'data-reveal':true},
    h('div',{className:'field-row'},
      h('label',null,h('span',null,'Nome'),h('input',{name:'nome',autoComplete:'name',placeholder:'Seu nome'})),
      h('label',null,h('span',null,'E-mail'),h('input',{name:'email',type:'email',autoComplete:'email',placeholder:'voce@email.com'}))),
    h('div',{className:'field-row'},
      h('label',null,h('span',null,'Telefone'),h('input',{name:'telefone',type:'tel',autoComplete:'tel',placeholder:'(00) 00000-0000'})),
      h('label',null,h('span',null,'Área'),h('select',{name:'area',defaultValue:''},h('option',{value:''},'Selecione'),AREAS.map(a=>h('option',{value:a.title,key:a.title},a.title))))),
    h('label',null,h('span',null,'Mensagem'),h('textarea',{name:'mensagem',placeholder:'Descreva brevemente o assunto do contato.'})),
    h('div',{className:'form-actions'},h('button',{className:'btn btn-primary',type:'submit'},'Preparar e-mail'),h('p',{className:'form-status','aria-live':'polite'},status)));
}

function Contact(){
  return h('main',{id:'page-content',className:'page page-enter'},
    h(PageHero,{type:'contact',kicker:'Contato',title:'Um primeiro contato',em:'Com clareza',subtitle:'Fale diretamente com o escritório pelos canais institucionais abaixo. Para análise jurídica, a equipe poderá solicitar documentos e informações adicionais.',primary:{href:'#contato/canais',label:'Ver canais de contato'},secondary:{href:'mailto:contato@mvmadvocacia.com.br',label:'Enviar e-mail'}}),
    h('section',{className:'section section-navy',id:'canais'},h('div',{className:'container contact-grid'},
      h('div',{'data-reveal':true},
        h('div',{className:'section-number'},'CONTATO'),
        h('h2',{className:'section-title',style:{marginTop:'16px'}},'Fale com o ',h('em',null,'escritório.')),
        h('p',{className:'section-intro'},'Utilize o e-mail institucional ou os telefones informados. Para uma análise adequada, a equipe poderá solicitar informações e documentos adicionais.'),
        h('div',{className:'contact-list'},
          h('div',{className:'contact-item'},h('div',null,h('small',null,'E-mail institucional'),h('b',null,'contato@mvmadvocacia.com.br')),h('a',{href:'mailto:contato@mvmadvocacia.com.br'},'Enviar e-mail')),
          h('div',{className:'contact-item'},h('div',null,h('small',null,'Telefone do escritório'),h('b',null,'(34) 99660-0327')),h('a',{href:'tel:+5534996600327'},'Ligar')),
          h('div',{className:'contact-item'},h('div',null,h('small',null,'Dra. Rafaella'),h('b',null,'(34) 99143-9667')),h('a',{href:'tel:+5534991439667'},'Ligar')),
          h('div',{className:'contact-item'},h('div',null,h('small',null,'Dra. Rafaele'),h('b',null,'(34) 99770-6151')),h('a',{href:'tel:+5534997706151'},'Ligar')))),
      h(ContactForm))));
}

function WhatsAppFloat(){
  const href = 'https://wa.me/5534996600327?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20o%20escrit%C3%B3rio%20Medeiros%2C%20Vasconcelos%20%26%20Monteiro';

  return h('a',{
    className:'whatsapp-float',
    href,
    target:'_blank',
    rel:'noopener noreferrer',
    'aria-label':'Falar com o escritório pelo WhatsApp',
    title:'WhatsApp do escritório'
  },

    // Ícone inline: não depende de biblioteca externa e funciona também no GitHub Pages/mobile
    h('svg',{className:'whatsapp-icon',viewBox:'0 0 24 24','aria-hidden':'true'},
      h('path',{d:'M20.5 11.7a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.4-4.2A8.5 8.5 0 1 1 20.5 11.7Z'}),
      h('path',{d:'M8.15 7.55c.34-.35.92-.3 1.2.1l1.08 1.48c.22.31.2.73-.05 1.02l-.67.77c.75 1.55 1.77 2.57 3.33 3.33l.77-.67c.29-.25.71-.27 1.02-.05l1.48 1.08c.4.28.45.86.1 1.2l-.63.63c-.68.68-1.68.9-2.57.56-3.52-1.36-6.26-4.1-7.62-7.62-.34-.89-.12-1.89.56-2.57l.5-.5'})),

    // MANTÉM O ÍCONE DE JUSTIÇA
    h('span',{
      className:'whatsapp-legal-badge',
      'aria-hidden':'true'
    },
      h('svg',{viewBox:'0 0 16 16'},
        h('path',{
          d:'M8 2v10M4 4h8M3.2 5.2 1.8 8h2.8L3.2 5.2Zm9.6 0L11.4 8h2.8l-1.4-2.8ZM5.5 13h5'
        })
      )
    )
  );
}

function Footer(){
  const year=useMemo(()=>new Date().getFullYear(),[]);
  return h('footer',{className:'footer'},
    h('div',{className:'container footer-main'},
      h('div',{className:'footer-brand-col'},
        h('div',{className:'footer-logo-wrap'},
          h('img',{className:'footer-logo',src:'assets/logo-mvm-cropped.jpg',alt:'Logo Medeiros, Vasconcelos & Monteiro Sociedade de Advogados',loading:'lazy'})),
        h('div',{className:'footer-brand'},'Medeiros, ',h('span',null,'Vasconcelos'),' & Monteiro'),
        h('div',{className:'footer-brand-tag'},'Sociedade de Advogados'),
        h('div',{className:'footer-brand-oab'},'OAB/MG 23.417'),
        h('small',null,'CNPJ 67.853.140/0001-83')),
      h('div',null,
        h('h4',{className:'footer-title'},'Institucional'),
        h('nav',{className:'footer-nav','aria-label':'Rodapé'},
          h('a',{href:'#inicio'},'Início'),
          h('a',{href:'#escritorio'},'Escritório'),
          h('a',{href:'#sobre'},'Sobre Nós'),
          h('a',{href:'#especialidades'},'Especialidades'),
          h('a',{href:'#contato'},'Contato'))),
      h('div',null,
        h('h4',{className:'footer-title'},'Áreas de Atuação'),
        h('div',{className:'footer-areas'},
          AREAS.map(a=>h('a',{href:'#especialidades',key:a.title},a.title)))),
      h('div',null,
        h('h4',{className:'footer-title'},'Contato'),
        h('div',{className:'footer-contact'},
          h('a',{href:'tel:+5534996600327'},'(34) 99660-0327'),
          h('a',{href:'https://wa.me/5534996600327',target:'_blank',rel:'noopener noreferrer'},'(34) 99660-0327'),
          h('a',{href:'mailto:contato@mvmadvocacia.com.br'},'contato@mvmadvocacia.com.br'),
          h('span',null,'Uberlândia/MG')))),
    h('div',{className:'container footer-bottom'},
      h('span',null,`© ${year} Medeiros, Vasconcelos & Monteiro Sociedade de Advogados · CNPJ 67.853.140/0001-83`),
      h('span',null,'Uberlândia/MG · Conteúdo institucional e informativo')));
}

function App(){
  const [route,setRoute]=useState(routeFromHash());

  useEffect(()=>{
    const intro=document.getElementById('intro');
    const core=intro?.querySelector('.intro-core');
    const line=intro?.querySelector('.intro-line');
    const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
    const show=()=>{
      document.documentElement.classList.remove('intro-lock');
      const root=document.getElementById('root');
      if(root)root.style.visibility='visible';
    };
    if(!intro){show();return;}
    if(reduced){intro.remove();show();return;}
    if(window.gsap){
      const tl=gsap.timeline();
      tl.to(core,{opacity:1,y:0,duration:.34,ease:'power2.out'})
        .to(line,{width:74,duration:.34,ease:'power2.out'},'<.08')
        .to(core,{opacity:1,duration:.24})
        .to(intro,{opacity:0,duration:.36,ease:'power2.inOut',onStart:show,onComplete:()=>intro.remove()});
      return()=>tl.kill();
    }
    core.style.opacity='1';core.style.transform='none';line.style.width='74px';
    const t1=setTimeout(()=>{show();intro.style.transition='opacity .35s ease';intro.style.opacity='0'},720);
    const t2=setTimeout(()=>intro.remove(),1100);
    return()=>{clearTimeout(t1);clearTimeout(t2)};
  },[]);

  useEffect(()=>{
    const onHash=()=>setRoute(routeFromHash());
    addEventListener('hashchange',onHash);
    if(!location.hash)history.replaceState(null,'','#inicio');
    return()=>removeEventListener('hashchange',onHash);
  },[]);

  useEffect(()=>{
    const timer=setTimeout(()=>{
      if(route.anchor)document.getElementById(route.anchor)?.scrollIntoView({behavior:'auto',block:'start'});
      else window.scrollTo({top:0,left:0,behavior:'auto'});
    },40);
    return()=>clearTimeout(timer);
  },[route.page,route.anchor]);

  useEffect(()=>{
    const els=[...document.querySelectorAll('[data-reveal]')];
    const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(reduced){els.forEach(el=>el.classList.add('visible'));return;}
    const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px -8% 0px'});
    els.forEach(el=>io.observe(el));
    return()=>io.disconnect();
  },[route.page]);

  let page=h(Home);
  if(route.page==='escritorio')page=h(Office);
  if(route.page==='sobre')page=h(About);
  if(route.page==='especialidades')page=h(Specialties);
  if(route.page==='contato')page=h(Contact);
  return h(React.Fragment,null,h(Header,{route}),page,h(Footer),h(WhatsAppFloat));
}

ReactDOM.createRoot(document.getElementById('root')).render(h(App));
