import { useState, useEffect, useRef } from 'react';

const TerminalText = ({ children, delay = 0 }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);
  return (
    <span style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(10px)',
      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      display: 'inline-block'
    }}>
      {children}
    </span>
  );
};

const TypewriterText = ({ text, delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  
  useEffect(() => {
    const startTimer = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
          setTimeout(() => setShowCursor(false), 1500);
        }
      }, 50);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(startTimer);
  }, [text, delay]);

  return (
    <span>
      {displayText}
      {showCursor && <span style={{ animation: 'blink 1s step-end infinite', color: '#00ffd5' }}>▌</span>}
    </span>
  );
};

const ScrollReveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
    </div>
  );
};

const GlowCard = ({ children, style = {}, isMobile = false }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current || isMobile) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%)',
        border: '1px solid rgba(0, 255, 213, 0.15)',
        borderRadius: isMobile ? '12px' : '16px',
        padding: isMobile ? '20px' : '32px',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        transform: isHovered && !isMobile ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered && !isMobile
          ? '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 60px rgba(0, 255, 213, 0.1)' 
          : '0 8px 32px rgba(0, 0, 0, 0.3)',
        ...style
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: mousePos.y - 100,
          left: mousePos.x - 100,
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(0, 255, 213, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />
      {children}
    </div>
  );
};

const SkillCard = ({ icon, title, skills, color = '#00ffd5', size = 'normal', isMobile = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%)',
        border: `1px solid ${isHovered && !isMobile ? color : 'rgba(255, 255, 255, 0.1)'}`,
        borderRadius: isMobile ? '12px' : '16px',
        padding: isMobile ? '20px' : (size === 'large' ? '32px' : '24px'),
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: isHovered && !isMobile ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered && !isMobile
          ? `0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px ${color}20` 
          : '0 8px 32px rgba(0, 0, 0, 0.2)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{
        width: isMobile ? '40px' : '48px',
        height: isMobile ? '40px' : '48px',
        borderRadius: isMobile ? '10px' : '12px',
        background: `${color}15`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: isMobile ? '16px' : '20px',
        fontSize: isMobile ? '20px' : '24px',
        transition: 'all 0.3s ease',
        transform: isHovered && !isMobile ? 'scale(1.1)' : 'scale(1)',
      }}>
        {icon}
      </div>
      <h3 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: isMobile ? '16px' : '18px',
        fontWeight: '600',
        color: '#f8fafc',
        marginBottom: isMobile ? '12px' : '16px',
      }}>
        {title}
      </h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: isMobile ? '6px' : '8px' }}>
        {skills.map((skill) => (
          <span
            key={skill}
            style={{
              padding: isMobile ? '4px 10px' : '6px 12px',
              background: `${color}10`,
              border: `1px solid ${color}30`,
              borderRadius: '6px',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: isMobile ? '10px' : '12px',
              color: '#e2e8f0',
              transition: 'all 0.2s ease',
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

const TimelineItem = ({ title, company, period, description, isLast = false, delay = 0, isMobile = false }) => (
  <ScrollReveal delay={delay}>
    <div style={{ display: 'flex', gap: isMobile ? '12px' : '24px', position: 'relative' }}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        flexShrink: 0 
      }}>
        <div style={{
          width: isMobile ? '12px' : '16px',
          height: isMobile ? '12px' : '16px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #00ffd5, #00b4d8)',
          boxShadow: '0 0 20px rgba(0, 255, 213, 0.5)',
          zIndex: 1,
        }} />
        {!isLast && (
          <div style={{
            width: '2px',
            flexGrow: 1,
            background: 'linear-gradient(180deg, rgba(0, 255, 213, 0.5), rgba(0, 255, 213, 0.1))',
            marginTop: '8px',
          }} />
        )}
      </div>
      <div style={{ paddingBottom: isLast ? '0' : (isMobile ? '32px' : '48px'), flex: 1 }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: isMobile ? '10px' : '12px',
          color: '#00ffd5',
          marginBottom: '8px',
          letterSpacing: '1px',
        }}>
          {period}
        </div>
        <h3 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: isMobile ? '18px' : '22px',
          fontWeight: '600',
          color: '#f8fafc',
          marginBottom: '4px',
        }}>
          {title}
        </h3>
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: isMobile ? '14px' : '16px',
          color: '#94a3b8',
          marginBottom: '16px',
        }}>
          {company}
        </div>
        <p style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: isMobile ? '14px' : '15px',
          lineHeight: '1.7',
          color: '#cbd5e1',
        }}>
          {description}
        </p>
      </div>
    </div>
  </ScrollReveal>
);

const NavDot = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '8px 0',
      opacity: active ? 1 : 0.5,
      transition: 'all 0.3s ease',
    }}
  >
    <div style={{
      width: active ? '24px' : '8px',
      height: '8px',
      borderRadius: '4px',
      background: active ? '#00ffd5' : 'rgba(255, 255, 255, 0.5)',
      transition: 'all 0.3s ease',
      boxShadow: active ? '0 0 12px rgba(0, 255, 213, 0.8)' : 'none',
    }} />
    <span style={{
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: '11px',
      color: active ? '#00ffd5' : '#94a3b8',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      opacity: active ? 1 : 0,
      transform: active ? 'translateX(0)' : 'translateX(-8px)',
      transition: 'all 0.3s ease',
    }}>
      {label}
    </span>
  </button>
);

export default function ResumeSite() {
  const [activeSection, setActiveSection] = useState('hello');
  const [isMobile, setIsMobile] = useState(false);
  const sections = ['hello', 'about', 'experience', 'skills', 'education', 'contact'];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0f1c 0%, #0f172a 50%, #1a1f35 100%)',
      color: '#f8fafc',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap');
        
        @keyframes blink {
          50% { opacity: 0; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #0a0f1c;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #00ffd5, #00b4d8);
          border-radius: 4px;
        }
        
        @media (max-width: 768px) {
          ::-webkit-scrollbar {
            width: 4px;
          }
        }
      `}</style>

      {/* Animated background elements */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(0, 255, 213, 0.08) 0%, transparent 70%)',
          animation: 'pulse 8s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(0, 180, 216, 0.08) 0%, transparent 70%)',
          animation: 'pulse 6s ease-in-out infinite 2s',
        }} />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.05) 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          animation: 'pulse 10s ease-in-out infinite 4s',
        }} />
        
        {/* Grid pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0, 255, 213, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 213, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />
      </div>

      {/* Navigation dots */}
      {!isMobile && (
        <nav style={{
          position: 'fixed',
          right: '32px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}>
          {sections.map((section) => (
            <NavDot
              key={section}
              label={section}
              active={activeSection === section}
              onClick={() => scrollToSection(section)}
            />
          ))}
        </nav>
      )}
      
      {/* Mobile Navigation */}
      {isMobile && (
        <nav style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100,
          display: 'flex',
          gap: '8px',
          background: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(10px)',
          padding: '12px 16px',
          borderRadius: '24px',
          border: '1px solid rgba(0, 255, 213, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        }}>
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: activeSection === section ? '#00ffd5' : 'rgba(255, 255, 255, 0.3)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.3s ease',
                boxShadow: activeSection === section ? '0 0 12px rgba(0, 255, 213, 0.8)' : 'none',
              }}
              aria-label={section}
            />
          ))}
        </nav>
      )}

      {/* Hero Section */}
      <section
        id="hello"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: isMobile ? '20px 16px' : '40px',
        }}
      >
        <div style={{ maxWidth: '900px', textAlign: 'center', zIndex: 1 }}>
          <TerminalText delay={200}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '14px',
              color: '#00ffd5',
              marginBottom: '24px',
              letterSpacing: '3px',
            }}>
              {'>'} INITIALIZING PROFILE...
            </div>
          </TerminalText>
          
          <TerminalText delay={600}>
            <h1 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(48px, 10vw, 96px)',
              fontWeight: '700',
              lineHeight: '1.1',
              marginBottom: '24px',
              background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 50%, #94a3b8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Sam Jacobs
            </h1>
          </TerminalText>
          
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 'clamp(16px, 3vw, 24px)',
            color: '#94a3b8',
            marginBottom: '40px',
          }}>
            <TypewriterText text="Director, Product Strategy" delay={1200} />
          </div>
          
          <TerminalText delay={2400}>
            <div style={{
              display: 'flex',
              gap: isMobile ? '8px' : '16px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}>
              {['Azure', 'Product Management', 'Innovation', 'Automation'].map((tag, i) => (
                <span
                  key={tag}
                  style={{
                    padding: isMobile ? '6px 14px' : '8px 20px',
                    background: 'rgba(0, 255, 213, 0.1)',
                    border: '1px solid rgba(0, 255, 213, 0.3)',
                    borderRadius: '24px',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: isMobile ? '10px' : '12px',
                    color: '#00ffd5',
                    letterSpacing: '1px',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </TerminalText>
          
          {!isMobile && (
            <TerminalText delay={2800}>
              <div style={{
                marginTop: '80px',
                animation: 'float 3s ease-in-out infinite',
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00ffd5" strokeWidth="2">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </div>
            </TerminalText>
          )}
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        style={{
          minHeight: isMobile ? 'auto' : '100vh',
          display: 'flex',
          alignItems: 'center',
          padding: isMobile ? '60px 16px' : '80px 40px',
        }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <ScrollReveal>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12px',
              color: '#00ffd5',
              marginBottom: '16px',
              letterSpacing: '3px',
            }}>
              {'// ABOUT'}
            </div>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(32px, 6vw, 56px)',
              fontWeight: '600',
              marginBottom: '40px',
              background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Building the future of<br />financial technology
            </h2>
          </ScrollReveal>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: isMobile ? '20px' : '32px' 
          }}>
            <ScrollReveal delay={200}>
              <GlowCard isMobile={isMobile}>
                <p style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: isMobile ? '15px' : '17px',
                  lineHeight: '1.8',
                  color: '#cbd5e1',
                }}>
                  With over a decade of experience driving innovation in financial services, I bridge the gap between 
                  technology and business strategy. At <span style={{ color: '#00ffd5' }}>Credigy</span>, I've led 
                  transformative initiatives modernizing our technology stack and enabling data-driven decisions.
                </p>
              </GlowCard>
            </ScrollReveal>
            
            <ScrollReveal delay={400}>
              <GlowCard isMobile={isMobile}>
                <p style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: isMobile ? '15px' : '17px',
                  lineHeight: '1.8',
                  color: '#cbd5e1',
                }}>
                  I'm passionate about leveraging emerging technologies—from Azure cloud infrastructure to AI-powered 
                  automation—to solve complex business challenges. My approach combines strategic thinking with 
                  hands-on technical execution.
                </p>
              </GlowCard>
            </ScrollReveal>
          </div>
          
          <ScrollReveal delay={600}>
            <div style={{
              display: 'flex',
              gap: isMobile ? '24px' : '48px',
              marginTop: isMobile ? '32px' : '48px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
              {[
                { value: '10+', label: 'Years Experience' },
                { value: '350+', label: 'Deals Closed (Firm)' },
                { value: '$23B+', label: 'Invested (Firm)' },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: 'center', flex: isMobile ? '1 1 calc(50% - 12px)' : 'none', minWidth: isMobile ? '120px' : 'auto' }}>
                  <div style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: isMobile ? '36px' : '48px',
                    fontWeight: '700',
                    background: 'linear-gradient(135deg, #00ffd5, #00b4d8)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: isMobile ? '10px' : '12px',
                    color: '#94a3b8',
                    letterSpacing: '1px',
                    marginTop: '8px',
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        style={{
          minHeight: isMobile ? 'auto' : '100vh',
          padding: isMobile ? '60px 16px' : '80px 40px',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <ScrollReveal>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12px',
              color: '#00ffd5',
              marginBottom: '16px',
              letterSpacing: '3px',
            }}>
              {'// EXPERIENCE'}
            </div>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(32px, 6vw, 56px)',
              fontWeight: '600',
              marginBottom: '64px',
              background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Career Timeline
            </h2>
          </ScrollReveal>

          <TimelineItem
            title="Director, Product Strategy"
            company="Credigy Solutions"
            period="NOV 2022 — PRESENT"
            description="Managing the portfolio and roadmap for IT-supported applications, driving alignment between technology initiatives and business objectives. Leading strategic modernization efforts including Azure migration, Snowflake reporting transitions, and Master Data Management implementation."
            delay={200}
            isMobile={isMobile}
          />
          <TimelineItem
            title="Product Manager"
            company="Credigy Solutions"
            period="AUG 2018 — NOV 2022"
            description="Led innovation efforts to accelerate the investment lifecycle through strategic automation. Oversaw initiatives from ideation through development and implementation, ensuring stakeholder adoption and change management success."
            delay={400}
            isMobile={isMobile}
          />
          <TimelineItem
            title="Senior Business Systems Analyst"
            company="Credigy Solutions"
            period="DEC 2017 — AUG 2018"
            description="Integrated core revenue-generating business processes into comprehensive web applications. Built intelligent automation workflows and enabled data-driven decisions through enterprise content analysis."
            delay={600}
            isMobile={isMobile}
          />
          <TimelineItem
            title="Business Systems Analyst"
            company="Credigy Solutions"
            period="OCT 2015 — DEC 2017"
            description="Collaborated with internal customers to analyze needs and deliver business scenarios, process flows, and functional/non-functional requirements."
            delay={800}
            isMobile={isMobile}
          />
          <TimelineItem
            title="Co-Founder"
            company="GoodSurv"
            period="MAY 2013 — OCT 2015"
            description="Created a mobile application that collected feedback on consumer opinions and shared insights with business partners. Gained invaluable experience in innovation, communication, and building technical solutions."
            isLast={true}
            delay={1000}
            isMobile={isMobile}
          />
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        style={{
          minHeight: isMobile ? 'auto' : '100vh',
          display: 'flex',
          alignItems: 'center',
          padding: isMobile ? '60px 16px' : '80px 40px',
        }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
          <ScrollReveal>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12px',
              color: '#00ffd5',
              marginBottom: '16px',
              letterSpacing: '3px',
            }}>
              {'// SKILLS'}
            </div>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(32px, 6vw, 56px)',
              fontWeight: '600',
              marginBottom: '64px',
              background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Technical Arsenal
            </h2>
          </ScrollReveal>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', 
            gridTemplateRows: isMobile ? 'auto' : 'auto auto',
            gap: isMobile ? '16px' : '20px',
          }}>
            <ScrollReveal delay={200}>
              <SkillCard
                icon={<span style={{ color: '#00ffd5' }}>☁️</span>}
                title="Cloud & Infrastructure"
                skills={['Azure', 'Snowflake', 'ETL Pipelines', 'Cloud Migration', 'Data Architecture']}
                color="#00ffd5"
                isMobile={isMobile}
              />
            </ScrollReveal>
            
            <ScrollReveal delay={300}>
              <SkillCard
                icon={<span style={{ color: '#a78bfa' }}>🎯</span>}
                title="Product Strategy"
                skills={['Roadmap Planning', 'Stakeholder Alignment', 'Business Analysis', 'Requirements']}
                color="#a78bfa"
                isMobile={isMobile}
              />
            </ScrollReveal>
            
            <ScrollReveal delay={400}>
              <SkillCard
                icon={<span style={{ color: '#f97316' }}>⚡</span>}
                title="Automation & AI"
                skills={['Process Automation', 'RPA', 'Machine Learning', 'Intelligent Workflows']}
                color="#f97316"
                isMobile={isMobile}
              />
            </ScrollReveal>
            
            <ScrollReveal delay={500}>
              <SkillCard
                icon={<span style={{ color: '#22d3ee' }}>👥</span>}
                title="Leadership"
                skills={['Change Management', 'Team Development', 'Cross-functional Collaboration']}
                color="#22d3ee"
                isMobile={isMobile}
              />
            </ScrollReveal>
            
            <ScrollReveal delay={600}>
              <SkillCard
                icon={<span style={{ color: '#4ade80' }}>🔄</span>}
                title="Agile & Delivery"
                skills={['Scrum', 'Jira', 'Sprint Planning', 'Vendor Management']}
                color="#4ade80"
                isMobile={isMobile}
              />
            </ScrollReveal>
            
            <ScrollReveal delay={700}>
              <SkillCard
                icon={<span style={{ color: '#fb7185' }}>💡</span>}
                title="Innovation"
                skills={['Design Thinking', 'Ideation', 'Digital Transformation', 'Prototyping']}
                color="#fb7185"
                isMobile={isMobile}
              />
            </ScrollReveal>
          </div>

          <ScrollReveal delay={600}>
            <div style={{ marginTop: '48px' }}>
              <h3 style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '14px',
                color: '#94a3b8',
                marginBottom: '24px',
                letterSpacing: '2px',
              }}>
                CERTIFICATIONS
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: isMobile ? '8px' : '12px' }}>
                {[
                  'PMP®',
                  'Certified ScrumMaster',
                  'Azure Fundamentals',
                  'MIT AI Strategy',
                  'Design Thinking',
                  'TAG Pathways (2025)',
                ].map((cert) => (
                  <span
                    key={cert}
                    style={{
                      padding: isMobile ? '8px 16px' : '12px 24px',
                      background: 'linear-gradient(135deg, rgba(0, 255, 213, 0.1), rgba(0, 180, 216, 0.1))',
                      border: '1px solid rgba(0, 255, 213, 0.2)',
                      borderRadius: '8px',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: isMobile ? '11px' : '13px',
                      color: '#e2e8f0',
                    }}
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Education Section */}
      <section
        id="education"
        style={{
          minHeight: isMobile ? 'auto' : '60vh',
          display: 'flex',
          alignItems: 'center',
          padding: isMobile ? '60px 16px' : '80px 40px',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
          <ScrollReveal>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12px',
              color: '#00ffd5',
              marginBottom: '16px',
              letterSpacing: '3px',
            }}>
              {'// EDUCATION'}
            </div>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(32px, 6vw, 56px)',
              fontWeight: '600',
              marginBottom: '48px',
              background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Academic Foundation
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <GlowCard isMobile={isMobile}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: isMobile ? '16px' : '24px',
              }}>
                <div style={{ flex: 1, minWidth: isMobile ? '100%' : 'auto' }}>
                  <h3 style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: isMobile ? '20px' : '24px',
                    fontWeight: '600',
                    color: '#f8fafc',
                    marginBottom: '8px',
                  }}>
                    North Dakota State University
                  </h3>
                  <p style={{
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    fontSize: isMobile ? '14px' : '16px',
                    color: '#94a3b8',
                    marginBottom: '16px',
                  }}>
                    B.S. Business Management • Accounting Minor
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: isMobile ? '6px' : '8px' }}>
                    {['Beta Gamma Sigma Honor Society', 'Accounting Club PR Officer', 'Legacy Leadership'].map((item) => (
                      <span
                        key={item}
                        style={{
                          padding: isMobile ? '4px 10px' : '6px 14px',
                          background: 'rgba(0, 255, 213, 0.1)',
                          border: '1px solid rgba(0, 255, 213, 0.2)',
                          borderRadius: '16px',
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: isMobile ? '9px' : '11px',
                          color: '#00ffd5',
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: isMobile ? '12px' : '14px',
                  color: '#00ffd5',
                  letterSpacing: '1px',
                  flexShrink: 0,
                }}>
                  2008 — 2013
                </div>
              </div>
            </GlowCard>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        style={{
          minHeight: isMobile ? 'auto' : '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: isMobile ? '60px 16px 100px' : '80px 40px',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: '600px', textAlign: 'center', zIndex: 1 }}>
          <ScrollReveal>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12px',
              color: '#00ffd5',
              marginBottom: '16px',
              letterSpacing: '3px',
            }}>
              {'// CONNECT'}
            </div>
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(32px, 6vw, 56px)',
              fontWeight: '600',
              marginBottom: '24px',
              background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Let's Build Something
            </h2>
            <p style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: isMobile ? '16px' : '18px',
              color: '#94a3b8',
              marginBottom: isMobile ? '32px' : '48px',
              lineHeight: '1.7',
            }}>
              Ready to discuss how technology can transform your business? 
              I'm always open to new opportunities and conversations.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', width: '100%' }}>
              <a
                href="mailto:sam@samjacobs.io"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: isMobile ? '14px 32px' : '16px 40px',
                  background: 'linear-gradient(135deg, #00ffd5, #00b4d8)',
                  borderRadius: '12px',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: isMobile ? '14px' : '16px',
                  fontWeight: '600',
                  color: '#0a0f1c',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 24px rgba(0, 255, 213, 0.3)',
                  width: isMobile ? '100%' : 'auto',
                  justifyContent: 'center',
                }}
              >
                <svg width={isMobile ? "18" : "20"} height={isMobile ? "18" : "20"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                sam@samjacobs.io
              </a>
              
              <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                <a
                  href="https://linkedin.com/in/sdjacobs"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: isMobile ? '44px' : '48px',
                    height: isMobile ? '44px' : '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(0, 255, 213, 0.1)',
                    border: '1px solid rgba(0, 255, 213, 0.3)',
                    borderRadius: '12px',
                    color: '#00ffd5',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <svg width={isMobile ? "18" : "20"} height={isMobile ? "18" : "20"} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a
                  href="tel:+17012129659"
                  style={{
                    width: isMobile ? '44px' : '48px',
                    height: isMobile ? '44px' : '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(0, 255, 213, 0.1)',
                    border: '1px solid rgba(0, 255, 213, 0.3)',
                    borderRadius: '12px',
                    color: '#00ffd5',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <svg width={isMobile ? "18" : "20"} height={isMobile ? "18" : "20"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </a>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={400}>
            <div style={{
              marginTop: isMobile ? '48px' : '80px',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: isMobile ? '10px' : '12px',
              color: '#475569',
              letterSpacing: '1px',
            }}>
              © 2024 Sam Jacobs • Alpharetta, GA
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
