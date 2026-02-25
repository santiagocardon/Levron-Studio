// ================================
// PRISM PORTFOLIO - JAVASCRIPT
// ================================

document.addEventListener('DOMContentLoaded', () => {

    // ================================
    // MOBILE MENU
    // ================================

    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu    = document.querySelector('.mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        const openMenu  = () => {
            mobileMenuBtn.classList.add('active');
            mobileMenu.classList.add('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        };
        const closeMenu = () => {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        };

        mobileMenuBtn.addEventListener('click', () =>
            mobileMenu.classList.contains('active') ? closeMenu() : openMenu()
        );

        mobileMenu.querySelectorAll('.mobile-link, .mobile-link-cta')
            .forEach(link => link.addEventListener('click', closeMenu));

        mobileMenu.addEventListener('click', e => { if (e.target === mobileMenu) closeMenu(); });

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) closeMenu();
        });
    }

    // ================================
    // CUSTOM CURSOR (Desktop only)
    // ================================

    if (window.innerWidth > 1024) {
        const cursor   = document.querySelector('.cursor');
        const follower = document.querySelector('.cursor-follower');

        if (cursor && follower) {
            let mouseX = 0, mouseY = 0, fX = 0, fY = 0;

            document.addEventListener('mousemove', e => {
                mouseX = e.clientX;
                mouseY = e.clientY;
                cursor.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
            });

            const animateFollower = () => {
                fX += (mouseX - fX) * 0.1;
                fY += (mouseY - fY) * 0.1;
                follower.style.transform = `translate(${fX - 20}px, ${fY - 20}px)`;
                requestAnimationFrame(animateFollower);
            };
            animateFollower();

            document.querySelectorAll('a, button, input, textarea, select, .spectrum-visual')
                .forEach(el => {
                    el.addEventListener('mouseenter', () => {
                        cursor.classList.add('active');
                        follower.style.borderColor = 'rgba(139,92,246,0.6)';
                    });
                    el.addEventListener('mouseleave', () => {
                        cursor.classList.remove('active');
                        follower.style.borderColor = 'rgba(139,92,246,0.3)';
                    });
                });
        }
    }

    // ================================
    // SMOOTH SCROLL
    // ================================

    const navHeight = document.querySelector('.nav')?.offsetHeight ?? 70;

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href   = this.getAttribute('href');
            const target = href && href !== '#' ? document.querySelector(href) : null;
            if (target) {
                e.preventDefault();
                window.scrollTo({ top: target.offsetTop - navHeight, behavior: 'smooth' });
            }
        });
    });

    // ================================
    // NAVBAR ON SCROLL
    // ================================

    const nav = document.querySelector('.nav');
    if (nav) {
        const updateNav = () => {
            const scrolled = window.scrollY > 100;
            nav.style.background      = scrolled ? 'rgba(10,10,10,0.9)' : 'transparent';
            nav.style.backdropFilter  = scrolled ? 'blur(20px)' : 'none';
            nav.style.borderBottom    = scrolled ? '1px solid rgba(255,255,255,0.1)' : 'none';
        };
        window.addEventListener('scroll', updateNav, { passive: true });
    }

    // ================================
    // HERO TITLE HOVER
    // ================================

    document.querySelectorAll('.char').forEach(char => {
        char.addEventListener('mouseenter', () => {
            char.style.transform = 'scale(1.1) translateY(-5px)';
            char.style.filter = 'drop-shadow(0 0 20px rgba(139,92,246,0.8))';
        });
        char.addEventListener('mouseleave', () => {
            char.style.transform = '';
            char.style.filter = '';
        });
    });

    // ================================
    // SCROLL REVEAL — PROJECTS
    // ================================

    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.spectrum-item').forEach(item => revealObserver.observe(item));

    // ================================
    // PRICING CARDS REVEAL
    // ================================

    const pricingObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity   = '1';
                entry.target.style.transform = 'translateY(0)';
                pricingObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.pricing-card').forEach((card, i) => {
        card.style.transition = `opacity 0.7s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.15}s,
                                  transform 0.7s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.15}s`;
        pricingObserver.observe(card);
    });

    // ================================
    // SECTION REVEAL (excluding hero)
    // ================================

    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity   = '1';
                entry.target.style.transform = 'translateY(0)';
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05 });

    document.querySelectorAll('section:not(.hero), footer').forEach(el => {
        el.style.opacity   = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.34,1.56,0.64,1), transform 0.8s cubic-bezier(0.34,1.56,0.64,1)';
        sectionObserver.observe(el);
    });

    // ================================
    // PARALLAX ON PROJECT IMAGES (Desktop)
    // ================================

    if (window.innerWidth > 768) {
        document.querySelectorAll('.spectrum-visual').forEach(visual => {
            visual.addEventListener('mousemove', e => {
                const rect = visual.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width  / 2) / 25;
                const y = (e.clientY - rect.top  - rect.height / 2) / 25;
                const img = visual.querySelector('img');
                if (img) img.style.transform = `scale(1.1) translate(${x}px, ${y}px)`;
            });
            visual.addEventListener('mouseleave', () => {
                const img = visual.querySelector('img');
                if (img) img.style.transform = '';
            });
        });
    }

    // ================================
    // PRISM LIGHTS FOLLOW MOUSE (Desktop)
    // ================================

    if (window.innerWidth > 768) {
        const prismLights = document.querySelectorAll('.prism-light');
        let rafId = null;

        document.addEventListener('mousemove', e => {
            if (rafId) return;
            rafId = requestAnimationFrame(() => {
                const mx = e.clientX / window.innerWidth;
                const my = e.clientY / window.innerHeight;
                prismLights.forEach((light, i) => {
                    const s = (i + 1) * 0.02;
                    light.style.transform = `translate(${mx * 30 * s}px, ${my * 30 * s}px)`;
                });
                rafId = null;
            });
        });
    }

    // ================================
    // METHOD STEPS HOVER DIM
    // ================================

    const methodSteps = document.querySelectorAll('.method-step');
    methodSteps.forEach(step => {
        step.addEventListener('mouseenter', () => {
            methodSteps.forEach(s => { if (s !== step) s.style.opacity = '0.5'; });
        });
        step.addEventListener('mouseleave', () => {
            methodSteps.forEach(s => s.style.opacity = '1');
        });
    });

    // ================================
    // STAT COUNTER ANIMATION
    // ================================

    const statsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.querySelectorAll('.metric-number').forEach(stat => {
                const text = stat.textContent;
                const match = text.match(/(\+?)(\d+)(%?)/);
                if (!match) return;
                const [, plus, num, suffix] = match;
                const end = parseInt(num);
                let start = null;
                const tick = ts => {
                    if (!start) start = ts;
                    const progress = Math.min((ts - start) / 2000, 1);
                    stat.textContent = `${plus}${Math.floor(progress * end)}${suffix}`;
                    if (progress < 1) requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
            });
            statsObserver.unobserve(entry.target);
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.spectrum-metrics').forEach(m => statsObserver.observe(m));

    // ================================
    // CARD TILT (Desktop)
    // ================================

    if (window.innerWidth > 768) {
        document.querySelectorAll('.stat-card, .info-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const rx = (e.clientY - rect.top  - rect.height / 2) / 10;
                const ry = (rect.width  / 2 - (e.clientX - rect.left)) / 10;
                card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
            });
            card.addEventListener('mouseleave', () => { card.style.transform = ''; });
        });
    }

    // ================================
    // LOGO REFRACTION PULSE
    // ================================

    document.querySelectorAll('.logo-refraction').forEach(ref => {
        setInterval(() => {
            ref.style.width   = '50px';
            ref.style.opacity = '1';
            setTimeout(() => {
                ref.style.width   = '';
                ref.style.opacity = '';
            }, 300);
        }, 3000);
    });

    // ================================
    // VIEWPORT HEIGHT FIX (iOS)
    // ================================

    const setVH = () =>
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    setVH();
    window.addEventListener('resize', setVH, { passive: true });

    // ================================
    // MULTI-STEP CONTACT FORM
    // ================================

    initMultiStepForm();

}); // end DOMContentLoaded


// ================================
// PAGE LOAD FADE-IN
// ================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    requestAnimationFrame(() => {
        document.body.style.transition = 'opacity 0.4s ease';
        document.body.style.opacity    = '1';
    });
});


// ================================
// MULTI-STEP CONTACT FORM
// ================================

function initMultiStepForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    // ── Build HTML ──────────────────────────────────────────────────────────
    // IMPORTANT: error element IDs use the pattern "err-{fieldId}"
    // so validateField(id) can find them as $('err-' + id)
    form.innerHTML = `
        <div class="prism-progress">
            <div class="prism-progress-track"></div>
            <div class="prism-progress-fill" id="progressFill"></div>
            <div class="prism-step-dot active" data-step="1"><span class="dot-num">01</span></div>
            <div class="prism-step-spacer"></div>
            <div class="prism-step-dot" data-step="2"><span class="dot-num">02</span></div>
            <div class="prism-step-spacer"></div>
            <div class="prism-step-dot" data-step="3"><span class="dot-num">03</span></div>
        </div>

        <!-- STEP 1 -->
        <div class="prism-step-panel active" id="step-1">
            <div class="step-heading">
                <div class="step-eyebrow">Paso 1 de 3</div>
                <h4>CUÉNTAME SOBRE TI</h4>
            </div>
            <div class="form-group" id="grp-fname">
                <label for="fname">Nombre</label>
                <input type="text" id="fname" name="name" autocomplete="name"
                       placeholder="Tu nombre o el de tu negocio">
                <span class="field-error" id="err-fname"></span>
            </div>
            <div class="form-group" id="grp-femail">
                <label for="femail">Email</label>
                <input type="email" id="femail" name="email" autocomplete="email"
                       placeholder="tucorreo@email.com">
                <span class="field-error" id="err-femail"></span>
            </div>
            <div class="form-nav">
                <button type="button" class="btn-next" id="nextBtn1">SIGUIENTE →</button>
            </div>
        </div>

        <!-- STEP 2 -->
        <div class="prism-step-panel" id="step-2">
            <div class="step-heading">
                <div class="step-eyebrow">Paso 2 de 3</div>
                <h4>¿Qué proyecto necesitas?</h4>
            </div>
            <div class="plan-cards">
                <div class="plan-card" data-value="starter">
                    <div class="plan-check" aria-hidden="true">✓</div>
                    <div class="plan-price">€300</div>
                    <div class="plan-name">Starter</div>
                    <div class="plan-desc">Landing page · 5 días</div>
                </div>
                <div class="plan-card" data-value="pro">
                    <div class="plan-check" aria-hidden="true">✓</div>
                    <div class="plan-price">€500</div>
                    <div class="plan-name">Pro</div>
                    <div class="plan-desc">Web completa · 7 días</div>
                </div>
                <div class="plan-card" data-value="premium">
                    <div class="plan-check" aria-hidden="true">✓</div>
                    <div class="plan-price">€750</div>
                    <div class="plan-name">Premium</div>
                    <div class="plan-desc">E-commerce · 10 días</div>
                </div>
                <div class="plan-card" data-value="custom">
                    <div class="plan-check" aria-hidden="true">✓</div>
                    <div class="plan-price" style="font-size:clamp(13px,2.5vw,18px)">Custom</div>
                    <div class="plan-name">A medida</div>
                    <div class="plan-desc">Algo distinto en mente</div>
                </div>
            </div>
            <p class="plan-error" id="planError">Elige el tipo de proyecto para continuar.</p>
            <div class="form-nav">
                <button type="button" class="btn-back" id="backBtn2">← VOLVER</button>
                <button type="button" class="btn-next" id="nextBtn2">SIGUIENTE →</button>
            </div>
        </div>

        <!-- STEP 3 -->
        <div class="prism-step-panel" id="step-3">
            <div class="step-heading">
                <div class="step-eyebrow">Paso 3 de 3</div>
                <h4>Cuéntame tu proyecto</h4>
            </div>
            <div class="form-summary" id="formSummary"></div>
            <div class="form-group" id="grp-fmessage">
                <label for="fmessage">Mensaje</label>
                <textarea id="fmessage" name="message" rows="4"
                          placeholder="¿A qué te dedicas? ¿Qué quieres conseguir? Cuanto más me cuentes, mejor propuesta puedo hacerte."></textarea>
                <span class="field-error" id="err-fmessage"></span>
            </div>
            <div class="char-counter" id="charCounter">0 / 1000</div>
            <div class="form-nav">
                <button type="button" class="btn-back" id="backBtn3">← VOLVER</button>
                <button type="button" class="btn-next" id="submitBtn">ENVIAR →</button>
            </div>
            <p class="form-footer-note">Respondo en menos de 24h &nbsp;·&nbsp; Sin compromisos</p>
            <div class="contact-cta-row">
                <span style="font-size:clamp(11px,1.6vw,12px);color:#555;">¿Prefieres hablar ahora?</span>
                <a href="https://wa.me/34633890456?text=Hola%2C%20me%20interesa%20una%20web%20con%20PRISM"
                   class="whatsapp-btn" target="_blank" rel="noopener noreferrer">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WHATSAPP
                </a>
            </div>
        </div>

        <!-- SUCCESS -->
        <div class="prism-success" id="prismSuccess" aria-live="polite">
            <svg class="success-prism" viewBox="0 0 80 80" fill="none" aria-hidden="true">
                <defs>
                    <linearGradient id="sg1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%"  stop-color="#6366f1"/>
                        <stop offset="50%" stop-color="#8b5cf6"/>
                        <stop offset="100%" stop-color="#C0C0C0"/>
                    </linearGradient>
                </defs>
                <path d="M40 8L68 24L40 40L12 24L40 8Z" stroke="url(#sg1)" stroke-width="2" fill="none"/>
                <path d="M40 40V72" stroke="url(#sg1)" stroke-width="2"/>
                <path d="M12 24V56L40 72" stroke="url(#sg1)" stroke-width="2" fill="none"/>
                <path d="M68 24V56L40 72" stroke="url(#sg1)" stroke-width="2" fill="none"/>
                <circle cx="40" cy="24" r="3" fill="url(#sg1)" opacity="0.8"/>
                <circle cx="40" cy="72" r="3" fill="url(#sg1)" opacity="0.8"/>
                <circle cx="12" cy="24" r="3" fill="url(#sg1)" opacity="0.6"/>
                <circle cx="68" cy="24" r="3" fill="url(#sg1)" opacity="0.6"/>
                <circle cx="12" cy="56" r="3" fill="url(#sg1)" opacity="0.4"/>
                <circle cx="68" cy="56" r="3" fill="url(#sg1)" opacity="0.4"/>
            </svg>
            <div class="success-title">Mensaje recibido</div>
            <p class="success-sub">Gracias. Te respondo en menos de 24 horas con una propuesta concreta para tu proyecto.</p>
            <div class="success-meta">
                <div class="success-badge">
                    <span class="badge-val">&lt; 24h</span>
                    <span class="badge-label">Respuesta</span>
                </div>
                <div class="success-divider" aria-hidden="true"></div>
                <div class="success-badge">
                    <span class="badge-val">0€</span>
                    <span class="badge-label">Compromiso</span>
                </div>
                <div class="success-divider" aria-hidden="true"></div>
                <div class="success-badge">
                    <span class="badge-val">7 días</span>
                    <span class="badge-label">Entrega</span>
                </div>
            </div>
        </div>
    `;

    // ── State ──────────────────────────────────────────────────────────────

    let currentStep  = 1;
    let selectedPlan = '';
    const TOTAL_STEPS = 3;

    const PLAN_LABELS = {
        starter: 'Starter — Landing page (€300)',
        pro:     'Pro — Web completa (€500)',
        premium: 'Premium — E-commerce (€750)',
        custom:  'A medida — Proyecto especial'
    };

    const $ = id => document.getElementById(id);

    // ── Validation rules ───────────────────────────────────────────────────
    // Keys MUST match field IDs exactly so $('err-' + id) finds the right element

    const RULES = {
        fname: [
            { test: v => v.trim().length > 0,   msg: 'Este campo es obligatorio.' },
            { test: v => v.trim().length >= 2,   msg: 'Mínimo 2 caracteres.' },
            { test: v => v.trim().length <= 80,  msg: 'Máximo 80 caracteres.' },
        ],
        femail: [
            { test: v => v.trim().length > 0,                              msg: 'El email es obligatorio.' },
            { test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),     msg: 'Introduce un email válido.' },
        ],
        fmessage: [
            { test: v => v.trim().length > 0,    msg: 'Cuéntame algo sobre tu proyecto.' },
            { test: v => v.trim().length >= 20,  msg: 'Añade un poco más de detalle (mínimo 20 caracteres).' },
            { test: v => v.trim().length <= 1000, msg: 'Máximo 1000 caracteres.' },
        ]
    };

    // FIX: looks for err-{id} and grp-{id} — now IDs in HTML match this pattern
    function validateField(id) {
        const el    = $(id);
        const group = $('grp-' + id);
        const err   = $('err-' + id);
        if (!el || !group || !err) return true;

        for (const rule of RULES[id] || []) {
            if (!rule.test(el.value)) {
                group.classList.add('error');
                group.classList.remove('success');
                err.textContent = rule.msg;
                err.classList.add('visible');
                return false;
            }
        }
        group.classList.remove('error');
        group.classList.add('success');
        err.classList.remove('visible');
        return true;
    }

    // Live validation: show error on blur, clear as user fixes
    ['fname', 'femail', 'fmessage'].forEach(id => {
        const el = $(id);
        if (!el) return;
        el.addEventListener('blur', () => validateField(id));
        el.addEventListener('input', () => {
            if ($('grp-' + id).classList.contains('error')) validateField(id);
        });
    });

    // ── Progress bar ───────────────────────────────────────────────────────

    function updateProgress(step) {
        $('progressFill').style.width = `${((step - 1) / (TOTAL_STEPS - 1)) * 100}%`;
        document.querySelectorAll('.prism-step-dot').forEach(dot => {
            // FIX: 's' was previously undefined; now correctly named 'n'
            const n = parseInt(dot.dataset.step, 10);
            dot.className = 'prism-step-dot' + (n < step ? ' done' : n === step ? ' active' : '');
        });
    }

    // ── Step transitions ───────────────────────────────────────────────────
    // FIX: removed all style.display manipulation — use CSS classes only.
    // CSS: .prism-step-panel { display: none }
    //      .prism-step-panel.active { display: block }

    function goToStep(next) {
        const cur  = $('step-' + currentStep);
        const dest = $('step-' + next);
        if (!cur || !dest) return;

        cur.classList.add('exit');
        setTimeout(() => {
            cur.classList.remove('active', 'exit');   // CSS hides it (no .active = display:none)
            dest.classList.add('active');              // CSS shows it
            currentStep = next;
            updateProgress(currentStep);
        }, 280);
    }

    // ── Plan cards ─────────────────────────────────────────────────────────

    document.querySelectorAll('.plan-card').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.plan-card').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedPlan = card.dataset.value;
            $('planError').classList.remove('visible');
        });
    });

    // ── Char counter ───────────────────────────────────────────────────────

    const msgEl   = $('fmessage');
    const counter = $('charCounter');
    if (msgEl && counter) {
        msgEl.addEventListener('input', () => {
            const len = msgEl.value.length;
            counter.textContent = `${len} / 1000`;
            counter.className = 'char-counter' + (len > 900 ? ' limit' : len > 700 ? ' warn' : '');
        });
    }

    // ── Summary (step 3) ───────────────────────────────────────────────────

    function buildSummary() {
        const summary = $('formSummary');
        if (!summary) return;
        const name  = escapeHtml(($('fname')?.value  || '').trim());
        const email = escapeHtml(($('femail')?.value || '').trim());
        summary.innerHTML = `
            <div class="summary-row">
                <span class="summary-key">Nombre</span>
                <span class="summary-val">${name}</span>
            </div>
            <div class="summary-row">
                <span class="summary-key">Email</span>
                <span class="summary-val">${email}</span>
            </div>
            <div class="summary-row">
                <span class="summary-key">Plan</span>
                <span class="summary-val plan-highlight">${PLAN_LABELS[selectedPlan] || '—'}</span>
            </div>`;
    }

    function escapeHtml(str) {
        return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
    }

    // ── Navigation ─────────────────────────────────────────────────────────

    // FIX: was `validateField('fname') & validateField('femail')` (bitwise &)
    // which coerces booleans to integers and doesn't short-circuit — second field
    // may not show its error. Now both are called explicitly and results checked separately.
    $('nextBtn1').addEventListener('click', () => {
        const ok1 = validateField('fname');
        const ok2 = validateField('femail');
        if (ok1 && ok2) goToStep(2);
    });

    $('backBtn2').addEventListener('click', () => goToStep(1));

    $('nextBtn2').addEventListener('click', () => {
        if (!selectedPlan) {
            $('planError').classList.add('visible');
            return;
        }
        buildSummary();
        goToStep(3);
    });

    $('backBtn3').addEventListener('click', () => goToStep(2));

    // ── Submit — EmailJS ───────────────────────────────────────────────────

    $('submitBtn').addEventListener('click', () => {
        if (!validateField('fmessage')) return;

        const btn = $('submitBtn');
        btn.textContent = 'ENVIANDO...';
        btn.disabled    = true;

        // Datos listos para EmailJS
        const templateParams = {
            from_name:  ($('fname')?.value  || '').trim(),
            from_email: ($('femail')?.value || '').trim(),
            plan:       PLAN_LABELS[selectedPlan] || selectedPlan,
            message:    ($('fmessage')?.value || '').trim()
        };

        Promise.all([
    emailjs.send('service_mx6aka4', 'template_gulpjyj', templateParams),
    emailjs.send('service_mx6aka4', 'template_az602jf', templateParams)
])
.then(() => {
    showSuccess();
})
.catch(err => {
    console.error('EmailJS error:', err);
    btn.textContent = 'ENVIAR →';
    btn.disabled = false;
    alert('Hubo un error al enviar. Escríbeme directamente a studiolevron@gmail.com');
});
        
    });

    // ── Pantalla de éxito ──────────────────────────────────────────────────

    function showSuccess() {
        // Hide all step panels using classes only (no style.display)
        for (let i = 1; i <= TOTAL_STEPS; i++) {
            const p = $('step-' + i);
            if (p) p.classList.remove('active', 'exit');
        }
        // Hide progress bar
        const prog = form.querySelector('.prism-progress');
        if (prog) prog.style.display = 'none';
        // Show success
        $('prismSuccess').classList.add('visible');
    }

    // Initialise progress dots
    updateProgress(1);
}