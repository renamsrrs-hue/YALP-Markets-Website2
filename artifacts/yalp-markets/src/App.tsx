import { useEffect, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, LineChart, Menu, MoveRight, ShieldCheck, X } from 'lucide-react';
import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

const navItems = [
  { label: 'A abordagem', href: '#abordagem' },
  { label: 'Estudos', href: '#estudos' },
  { label: 'Princípios', href: '#principios' },
];

const cases = [
  {
    title: 'SPY · leitura de contexto',
    type: 'Opções / índice',
    image: '/assets/Predict_!_SPY_PUT_765_copy_1789207167742.jpeg',
    copy: 'Uma leitura documentada de estrutura, cenário e invalidação. O gráfico como hipótese — nunca como promessa.',
    mark: '01',
  },
  {
    title: 'DAIC · quando o preço acelera',
    type: 'Ação / momentum',
    image: '/assets/DAIC_-_228_(24-250826)_copy_1789207167745.jpeg',
    copy: 'Observar o que mudou antes de decidir o que fazer. Volume, níveis e comportamento no mesmo enquadramento.',
    mark: '02',
  },
  {
    title: 'GameStop · plano antes da posição',
    type: 'Ação / estrutura',
    image: '/assets/GAMESTOP_-_366!!!!!_20260911C20.5_copy_1789207167745.jpeg',
    copy: 'Um estudo sobre assimetria, risco definido e o espaço entre uma ideia interessante e uma ideia executável.',
    mark: '03',
  },
];

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('.reveal');
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function BrandMark() {
  return (
    <a href="#top" className="flex items-center gap-3" data-testid="link-brand">
      <span className="flex h-9 w-9 items-center justify-center bg-[var(--lime)] text-[var(--navy)] font-bold text-sm tracking-[-.08em]">Y/</span>
      <span className="font-semibold tracking-[-.04em] text-[17px]">YALP <span className="font-normal opacity-50">Markets</span></span>
    </a>
  );
}

function Navigation({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) {
  return (
    <header className="absolute left-0 right-0 top-0 z-40">
      <div className="yalp-shell flex h-[82px] items-center justify-between border-b hairline">
        <BrandMark />
        <nav className="hidden items-center gap-9 md:flex" aria-label="Navegação principal">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="nav-link eyebrow text-[var(--navy)]" data-testid={`link-nav-${item.label.toLowerCase().replace(' ', '-')}`}>
              {item.label}
            </a>
          ))}
          <a href="mailto:hello@yalp.info" className="button-arrow bg-[var(--navy)] px-5 py-3 text-[var(--paper)]" data-testid="link-contact-nav">
            <span className="eyebrow">Falar connosco</span><ArrowUpRight size={15} strokeWidth={1.5} />
          </a>
        </nav>
        <button type="button" onClick={() => setIsOpen(!isOpen)} className="flex h-10 w-10 items-center justify-center md:hidden" aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={isOpen} data-testid="button-mobile-menu">
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {isOpen && (
        <div className="yalp-shell border-b border-[var(--navy)]/20 bg-[var(--paper)] py-7 md:hidden">
          <nav className="flex flex-col gap-6" aria-label="Navegação móvel">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setIsOpen(false)} className="eyebrow" data-testid={`link-mobile-${item.label.toLowerCase().replace(' ', '-')}`}>
                {item.label}
              </a>
            ))}
            <a href="mailto:hello@yalp.info" onClick={() => setIsOpen(false)} className="button-arrow w-fit bg-[var(--navy)] px-5 py-3 text-[var(--paper)]" data-testid="link-contact-mobile">
              <span className="eyebrow">Falar connosco</span><ArrowUpRight size={15} />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="hero-grid relative min-h-[730px] pt-[82px]">
      <div className="yalp-shell grid min-h-[648px] items-center gap-12 py-20 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
        <div>
          <div className="reveal mb-9 flex items-center gap-3">
            <span className="h-px w-9 bg-[var(--moss)]" /><span className="eyebrow text-[var(--moss)]">Educação de mercado · Portugal</span>
          </div>
          <h1 className="reveal delay-1 display max-w-[700px] text-[clamp(4.1rem,9.3vw,8.7rem)] leading-[.83]">
            Aprende a <em className="text-[var(--moss)]">ler</em> o mercado.
          </h1>
          <p className="reveal delay-2 mt-9 max-w-[460px] text-[17px] leading-[1.55] text-[var(--navy)]/70">
            Estudo real, pensamento independente e disciplina para tomar melhores decisões — mesmo quando o mercado não dá respostas fáceis.
          </p>
          <div className="reveal delay-3 mt-10 flex flex-wrap items-center gap-5">
            <a href="#abordagem" className="button-arrow bg-[var(--navy)] px-6 py-4 text-[var(--paper)]" data-testid="link-hero-approach">
              <span className="eyebrow">Conhecer a abordagem</span><MoveRight size={17} strokeWidth={1.5} />
            </a>
            <a href="#estudos" className="eyebrow border-b border-[var(--navy)]/40 pb-1" data-testid="link-hero-studies">Ver estudos</a>
          </div>
        </div>
        <div className="reveal delay-2 relative lg:mt-12">
          <div className="image-frame aspect-[1.12/1] lg:aspect-[1.08/1]">
            <img src="/assets/trading_cover_1789207188908.png" alt="Trader a observar vários gráficos num espaço de estudo" />
            <div className="absolute bottom-0 left-0 bg-[var(--lime)] px-4 py-3">
              <span className="eyebrow">O trabalho acontece antes da entrada.</span>
            </div>
          </div>
          <div className="absolute -right-3 -top-3 hidden h-20 w-20 border-r border-t border-[var(--moss)] sm:block" />
          <div className="absolute -bottom-4 -left-4 hidden h-20 w-20 border-b border-l border-[var(--moss)] sm:block" />
        </div>
      </div>
      <div className="yalp-shell absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center justify-between md:flex">
        <span className="eyebrow text-[var(--navy)]/45">01 / 05</span>
        <a href="#abordagem" className="flex items-center gap-3 text-[var(--navy)]/50" data-testid="link-scroll-down"><span className="eyebrow">Descer</span><ArrowDownRight size={16} /></a>
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section id="abordagem" className="bg-[var(--navy)] py-28 text-[var(--paper)] md:py-40">
      <div className="yalp-shell">
        <div className="grid gap-14 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
          <div className="reveal">
            <p className="eyebrow text-[var(--lime)]">O ponto de partida</p>
            <p className="mt-8 max-w-[220px] text-sm leading-relaxed text-[var(--paper)]/55">O mercado não é um adversário a vencer. É um sistema a observar com atenção.</p>
          </div>
          <div>
            <h2 className="reveal display max-w-[860px] text-[clamp(3rem,6vw,6rem)] leading-[.93]">
              O mercado não se domina. <span className="text-[var(--lime)]">Aprende-se a lê-lo.</span>
            </h2>
            <p className="reveal delay-1 mt-10 max-w-[620px] text-lg leading-[1.55] text-[var(--paper)]/65">
              A YALP Markets nasceu de uma prática simples: voltar ao gráfico, fazer perguntas melhores e aceitar quando uma hipótese deixa de ser válida. Aqui não há atalhos, sinais mágicos ou certezas fabricadas.
            </p>
            <div className="reveal delay-2 mt-14 grid gap-8 border-t border-[var(--paper)]/20 pt-8 sm:grid-cols-3">
              <div><p className="eyebrow text-[var(--lime)]">01</p><p className="mt-4 font-serif text-2xl">Ler antes de agir.</p></div>
              <div><p className="eyebrow text-[var(--lime)]">02</p><p className="mt-4 font-serif text-2xl">Definir o risco.</p></div>
              <div><p className="eyebrow text-[var(--lime)]">03</p><p className="mt-4 font-serif text-2xl">Pensar por si.</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Studies() {
  return (
    <section id="estudos" className="py-28 md:py-40">
      <div className="yalp-shell">
        <div className="mb-16 flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <div className="reveal">
            <p className="eyebrow text-[var(--moss)]">Gráficos, não troféus</p>
            <h2 className="display mt-5 max-w-[580px] text-[clamp(3.2rem,6.5vw,6rem)] leading-[.88]">O estudo é o produto.</h2>
          </div>
          <p className="reveal delay-1 max-w-[310px] text-sm leading-relaxed text-[var(--navy)]/60">Casos reais, contextos incompletos, decisões que precisam de ser revistas. Evidência para estudar — não resultados para copiar.</p>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {cases.map((item, index) => (
            <article key={item.mark} className={`case-card reveal delay-${index + 1} group ${index === 0 ? 'lg:row-span-2' : ''}`} data-testid={`card-study-${item.mark}`}>
              <div className={`${index === 0 ? 'aspect-[1.12/1]' : 'aspect-[1.7/1]'} image-frame`}>
                <img src={item.image} alt={`Gráfico de estudo: ${item.title}`} />
                <span className="absolute left-4 top-4 bg-[var(--lime)] px-2 py-1 font-mono text-[10px] text-[var(--navy)]">{item.mark}</span>
              </div>
              <div className="flex items-start justify-between gap-5 p-6 md:p-8">
                <div><p className="case-meta eyebrow">{item.type}</p><h3 className="mt-3 font-serif text-3xl leading-none">{item.title}</h3><p className="mt-4 max-w-[360px] text-sm leading-relaxed text-[var(--paper)]/62">{item.copy}</p></div>
                <ArrowUpRight className="mt-1 shrink-0 text-[var(--lime)] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" size={20} strokeWidth={1.5} />
              </div>
            </article>
          ))}
        </div>
        <div className="reveal mt-5 grid gap-5 md:grid-cols-2">
          <div className="image-frame aspect-[1.7/1] bg-[var(--navy)]"><img src="/assets/Screenshot_2026-09-03_at_15.48.31_1789207181948.png" alt="Estudo visual de estrutura de preço no gráfico GameStop" /><span className="absolute bottom-4 left-4 bg-[var(--paper)] px-2 py-1 font-mono text-[10px] text-[var(--navy)]">ARQUIVO DE ESTUDO / 04</span></div>
          <div className="flex flex-col justify-between border border-[var(--navy)]/20 p-7 md:p-10"><div><p className="eyebrow text-[var(--moss)]">A documentação importa</p><p className="mt-6 font-serif text-3xl leading-[1.05]">Uma decisão sem contexto é apenas uma imagem.</p></div><a href="mailto:hello@yalp.info" className="button-arrow mt-12 w-fit border-b border-[var(--navy)] pb-2" data-testid="link-studies-contact"><span className="eyebrow">Pedir contexto</span><ArrowUpRight size={15} /></a></div>
        </div>
      </div>
    </section>
  );
}

function Principles() {
  return (
    <section id="principios" className="bg-[var(--moss)] py-28 text-[var(--paper)] md:py-36">
      <div className="yalp-shell">
        <div className="grid gap-14 lg:grid-cols-[.7fr_1.3fr] lg:gap-24">
          <div className="reveal"><p className="eyebrow text-[var(--lime)]">Uma forma de estar</p><p className="mt-8 max-w-[230px] text-sm leading-relaxed text-[var(--paper)]/65">A técnica serve a clareza. A clareza protege o processo.</p></div>
          <div>
            <h2 className="reveal display max-w-[720px] text-[clamp(3rem,6vw,5.8rem)] leading-[.9]">Menos ruído. Mais leitura.</h2>
            <div className="mt-14 grid gap-0 border-t border-[var(--paper)]/30">
              <div className="reveal delay-1 grid gap-5 border-b border-[var(--paper)]/30 py-8 sm:grid-cols-[90px_1fr]"><span className="font-mono text-xs text-[var(--lime)]">01</span><div><h3 className="font-serif text-3xl">Disciplina</h3><p className="mt-3 max-w-[480px] text-sm leading-relaxed text-[var(--paper)]/65">O plano não elimina a incerteza. Impede que a incerteza escreva o plano por nós.</p></div></div>
              <div className="reveal delay-2 grid gap-5 border-b border-[var(--paper)]/30 py-8 sm:grid-cols-[90px_1fr]"><span className="font-mono text-xs text-[var(--lime)]">02</span><div><h3 className="font-serif text-3xl">Risco</h3><p className="mt-3 max-w-[480px] text-sm leading-relaxed text-[var(--paper)]/65">Pensar no que pode correr mal não é pessimismo. É o início de uma decisão adulta.</p></div></div>
              <div className="reveal delay-3 grid gap-5 border-b border-[var(--paper)]/30 py-8 sm:grid-cols-[90px_1fr]"><span className="font-mono text-xs text-[var(--lime)]">03</span><div><h3 className="font-serif text-3xl">Independência</h3><p className="mt-3 max-w-[480px] text-sm leading-relaxed text-[var(--paper)]/65">Aprender a construir uma tese é mais valioso do que encontrar alguém que pense por nós.</p></div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Statement() {
  return (
    <section className="bg-[var(--lime)] py-24 md:py-36">
      <div className="yalp-shell grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-end">
        <div className="reveal"><div className="flex h-12 w-12 items-center justify-center border border-[var(--navy)]/35"><LineChart size={22} strokeWidth={1.25} /></div><p className="eyebrow mt-7">A YALP Markets é para quem quer</p></div>
        <div className="reveal delay-1"><p className="display text-[clamp(3rem,6.2vw,6.7rem)] leading-[.86]">Aprender a observar. Decidir com critério. Continuar a estudar.</p><a href="mailto:hello@yalp.info" className="button-arrow mt-10 w-fit bg-[var(--navy)] px-6 py-4 text-[var(--paper)]" data-testid="link-statement-contact"><span className="eyebrow">Entrar em contacto</span><ArrowUpRight size={16} /></a></div>
      </div>
    </section>
  );
}

function AboutAndDisclaimer() {
  return (
    <section className="py-28 md:py-36">
      <div className="yalp-shell grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
        <div className="reveal">
          <p className="eyebrow text-[var(--moss)]">Por trás da YALP</p>
          <h2 className="display mt-5 text-[clamp(3.2rem,5vw,5.4rem)] leading-[.88]">O estudo é contínuo.</h2>
          <p className="mt-8 max-w-[470px] text-base leading-relaxed text-[var(--navy)]/65">A YALP Markets é uma marca portuguesa criada por um trader que documenta o próprio processo de estudo. O foco está na leitura: técnica, contexto, psicologia e a honestidade de rever uma ideia quando os dados mudam.</p>
          <a href="mailto:hello@yalp.info" className="button-arrow mt-9 w-fit border-b border-[var(--navy)] pb-2" data-testid="link-about-contact"><span className="eyebrow">hello@yalp.info</span><ArrowUpRight size={15} /></a>
        </div>
        <div className="reveal delay-1">
          <div className="border-t-2 border-[var(--navy)] pt-6">
            <div className="flex items-center gap-3"><ShieldCheck size={20} strokeWidth={1.5} /><p className="eyebrow">Nota importante</p></div>
            <p className="mt-7 font-serif text-3xl leading-[1.05]">Educação não é recomendação.</p>
            <p className="mt-5 text-sm leading-[1.7] text-[var(--navy)]/65">O conteúdo da YALP Markets é exclusivamente educacional e informativo e não constitui aconselhamento financeiro personalizado, recomendação de investimento ou solicitação para comprar ou vender instrumentos financeiros. Cada pessoa deve fazer a sua própria pesquisa e, se necessário, procurar aconselhamento profissional independente. O desempenho passado não garante resultados futuros. Investir envolve risco de perda de capital.</p>
          </div>
          <div className="mt-12 image-frame aspect-[1.6/1]"><img src="/assets/Screenshot_2026-08-29_at_17.00.38_1789207181945.png" alt="Princípios de estudo e observação apresentados num arquivo visual" /></div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[var(--navy)] py-12 text-[var(--paper)]">
      <div className="yalp-shell">
        <div className="flex flex-col justify-between gap-10 border-b border-[var(--paper)]/20 pb-12 md:flex-row md:items-end">
          <div><a href="#top" className="flex items-center gap-3" data-testid="link-footer-brand"><span className="flex h-9 w-9 items-center justify-center bg-[var(--lime)] text-[var(--navy)] font-bold text-sm">Y/</span><span className="font-semibold tracking-[-.04em]">YALP <span className="font-normal text-[var(--paper)]/50">Markets</span></span></a><p className="mt-6 max-w-[290px] text-sm leading-relaxed text-[var(--paper)]/50">Uma prática de leitura para mercados que não param de mudar.</p></div>
          <a href="mailto:hello@yalp.info" className="group flex items-center gap-4" data-testid="link-footer-contact"><span className="font-serif text-3xl group-hover:text-[var(--lime)]">hello@yalp.info</span><ArrowUpRight size={19} className="text-[var(--lime)]" /></a>
        </div>
        <div className="flex flex-col justify-between gap-3 pt-7 text-[10px] text-[var(--paper)]/40 sm:flex-row"><span className="eyebrow">© {new Date().getFullYear()} YALP Markets</span><span className="eyebrow">Educação · Processo · Clareza</span></div>
      </div>
    </footer>
  );
}

function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useReveal();
  return (
    <main className="yalp-page" data-testid="page-home">
      <Navigation isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      <Hero />
      <Approach />
      <Studies />
      <Principles />
      <Statement />
      <AboutAndDisclaimer />
      <Footer />
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;