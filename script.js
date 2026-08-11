
// ============================================
// SUPABASE CONFIG
// Fill these in after running schema.sql (see SETUP.md).
// Until then, the site runs entirely on the defaults below.
// ============================================
const SUPABASE_URL = "https://rsphnnhihngekkjzbeji.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzcGhubmhpaG5nZWtranpiZWppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYzMjA4NTAsImV4cCI6MjEwMTg5Njg1MH0.-keZ2nlMghxPxEYXVQ65RQlWTq0s3XiomeN7ptLY4xA";
let db = null;
if (typeof supabase !== 'undefined' && SUPABASE_URL.indexOf('YOUR_') !== 0) {
  db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

function escapeHTML(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ============================================
// DATA - hardcoded defaults. Supabase (once configured)
// overrides all of this after page load; if it's not
// configured, or the fetch fails, the site runs on
// exactly what's below, unchanged.
// ============================================
const services = [
  { name: "Shares Accounts", cat: "savings", desc: "Own a stake in the union and unlock full membership benefits." },
  { name: "Savings Accounts", cat: "savings", desc: "Flexible, interest-earning accounts for everyday saving." },
  { name: "Deposit Accounts", cat: "savings", desc: "Secure fixed and flexible deposit options for your goals." },
  { name: "Minors Accounts", cat: "savings", desc: "Start a saving habit early, held safely in a child's name." },
  { name: "Group Accounts", cat: "savings", desc: "Shared accounts for njangi groups, unions and associations." },
  { name: "Daily Savings (Akawo)", cat: "savings", desc: "Doorstep daily collection savings, done the trusted way." },
  { name: "Personal Loans", cat: "loans", desc: "Fair-rate credit for life's everyday personal needs." },
  { name: "Business Loans", cat: "loans", desc: "Capital to start, run or grow a small business." },
  { name: "Agricultural Loans", cat: "loans", desc: "Financing built for farmers and tea-growing households." },
  { name: "Building Loans", cat: "loans", desc: "Credit to build or improve a family home." },
  { name: "School Fees Loans", cat: "loans", desc: "Keep children in school without missing a term." },
  { name: "Akawo Loans", cat: "loans", desc: "Loans linked directly to your daily savings record." },
  { name: "Overdraft Facilities", cat: "loans", desc: "Short-term breathing room when you need it most." },
  { name: "Contract Financing", cat: "loans", desc: "Working capital secured against confirmed contracts." },
  { name: "Western Union & Remittances", cat: "other", desc: "Send and receive money from anywhere in the world." },
  { name: "MOMO Services", cat: "other", desc: "Mobile money deposits, withdrawals and transfers." },
  { name: "Container Clearing", cat: "other", desc: "Financing support to help clear goods at the port." },
  { name: "Cheque Clearing", cat: "other", desc: "Fast, dependable cheque processing." },
  { name: "Payment of Salaries", cat: "other", desc: "Payroll services for local businesses and organisations." },
  { name: "Business Counselling", cat: "other", desc: "Practical guidance to help members' ventures thrive." },
  { name: "Insurance Schemes", cat: "other", desc: "Protection plans that safeguard what members build." }
];

const categoryMeta = {
  savings: { label: "Savings & Deposits", icon: "piggy" },
  loans:   { label: "Loans & Credit", icon: "loan" },
  other:   { label: "Other Financial Services", icon: "globe" }
};

const coreValues = [
  { title: "Integrity", desc: "We conduct every activity honestly, ethically and transparently.", icon: "shield" },
  { title: "Member Focus", desc: "The needs and welfare of our members sit at the centre of every decision.", icon: "users" },
  { title: "Professionalism", desc: "We deliver financial services with competence, efficiency and respect.", icon: "check" },
  { title: "Equity & Fairness", desc: "Equal opportunity for every member, without discrimination.", icon: "scale" },
  { title: "Innovation", desc: "We keep improving our products and processes to meet changing needs.", icon: "leaf" }
];

const boardMembers = [
  { role: "Board Chairperson", name: null, photo_url: null },
  { role: "Vice Chairperson", name: null, photo_url: null },
  { role: "Secretary", name: null, photo_url: null },
  { role: "Treasurer", name: null, photo_url: null },
  { role: "Supervisory Committee Member", name: null, photo_url: null }
];

const newsItems = [
  { title: "Welcome to Our New Website", body: "TTCCUL now has a home online. Explore our services, learn how to join, and reach us directly from anywhere.", tag: "2026" },
  { title: "More Updates on the Way", body: "We'll share news on products, community initiatives and union milestones right here.", tag: "Coming Soon" }
];

const reports = [];

const downloadForms = [
  { name: "Membership Application Form", desc: "Start your journey to becoming a TTCCUL member.", file_url: null },
  { name: "Account Opening Form", desc: "Open a savings, deposit or shares account.", file_url: null },
  { name: "Loan Application Form", desc: "Apply for a personal, business or agricultural loan.", file_url: null },
  { name: "Next of Kin Form", desc: "Keep your account details safe and up to date.", file_url: null }
];

const siteContent = {
  hero_badge: "Serving Tole-Buea Since 1970",
  hero_headline: "Where Community Saves, Grows & Thrives Together",
  hero_lead: "A member-owned cooperative credit union built on mutual trust - savings, loans and financial inclusion for the people of Tole and beyond, at fair and honest rates.",
  stat1_value: "1970", stat1_label: "Founded",
  stat2_value: "56+", stat2_label: "Years of Continuous Service",
  stat3_value: "21+", stat3_label: "Products & Services Offered",
  stat4_value: "5", stat4_label: "Core Values We Operate By",
  mission_text: "To continuously develop and sustain a secure, law-abiding cooperative credit union that provides quick and reliable financial services to our members for their financial and social development - while paying a fair rate of interest on their savings.",
  vision_text: "To become a one-stop-shop financial institution, offering every product and service found at other microfinance institutions - delivering digital, accessible financial inclusion to our members at competitive rates.",
  about_overview: "As a microfinance institution, we promote financial inclusion by offering affordable financial services - especially to low- and middle-income individuals with limited access to commercial banks.\n\nWe mobilize savings from our members and use these funds to grant loans at fair, relatively low interest rates. TTCCUL operates on the principle of mutual assistance and democratic control: every member holds equal voting rights, regardless of the amount they've saved.\n\nBy encouraging saving habits and providing accessible credit, we contribute to poverty reduction, entrepreneurship development, and improved living standards across the communities we serve.",
  gm_quote: "For over five decades, Tole Tea Cooperative Credit Union has stood by our members through every season. We built this institution on trust, fairness, and the belief that when our members thrive, we all thrive.",
  gm_name: "Joseph Atabong Beja",
  gm_title: "General Manager",
  contact_phone_1: "675 062 254",
  contact_phone_2: "674 227 692",
  contact_email: "info@ttccul.com",
  contact_address: "Tole, Buea, Southwest Region, Cameroon",
  office_hours: "Monday – Friday, 8:00 AM – 4:00 PM",
  whatsapp_number: "237675062254"
};

// ============================================
// ICONS
// ============================================
const icons = {
  piggy: '<path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.7-1-2.3V5Z"/><circle cx="16" cy="9" r="0.5" fill="currentColor"/>',
  loan: '<rect x="3" y="8" width="18" height="12" rx="2"/><path d="M8 8V6a4 4 0 0 1 8 0v2"/><path d="M12 12v4"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a13 13 0 0 1 0 18M12 3a13 13 0 0 0 0 18"/>',
  shield: '<path d="M12 2 3 7v6c0 5 4 9 9 9s9-4 9-9V7l-9-5Z"/>',
  users: '<circle cx="9" cy="8" r="3"/><path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6"/><circle cx="17" cy="8" r="2.4"/><path d="M17.5 14.2c2.6.5 4.5 2.7 4.5 5.8"/>',
  check: '<circle cx="12" cy="12" r="9"/><path d="m8.5 12.5 2.3 2.3L16 10"/>',
  scale: '<path d="M12 3v18M5 8h14M5 8l-3 6a4 4 0 0 0 8 0L5 8ZM19 8l-3 6a4 4 0 0 0 8 0L19 8Z"/>',
  leaf: '<path d="M50,74 C33,60 28,38 50,18 C72,38 67,60 50,74 Z" transform="translate(-38 -8) scale(0.46)"/>',
  doc: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M9 13h6M9 17h6M9 9h1"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
  person: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .7 3a2 2 0 0 1-.4 2.1L8 10.2a16 16 0 0 0 6 6l1.4-1.4a2 2 0 0 1 2.1-.4c1 .4 2 .6 3 .7a2 2 0 0 1 1.7 2Z"/>',
  mail: '<path d="m22 6-10 7L2 6"/><rect x="2" y="4" width="20" height="16" rx="2"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>'
};
function icon(name, size) {
  size = size || 22;
  return '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size + '" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">' + (icons[name] || '') + '</svg>';
}

// ============================================
// APPLY SITE TEXT CONTENT
// ============================================
function applySiteContent() {
  document.querySelectorAll('[data-content]').forEach(function (el) {
    const key = el.dataset.content;
    const val = siteContent[key];
    if (val === undefined) return;
    if (key === 'about_overview') {
      el.innerHTML = val.split(/\n\s*\n/).map(function (p) {
        return '<p style="margin-bottom:16px;">' + escapeHTML(p.trim()) + '</p>';
      }).join('');
    } else {
      el.textContent = val;
    }
  });
  document.querySelectorAll('[data-content-href]').forEach(function (el) {
    const key = el.dataset.contentHref;
    if (key === 'whatsapp_number' && siteContent.whatsapp_number) {
      el.href = 'https://wa.me/' + String(siteContent.whatsapp_number).replace(/[^0-9]/g, '');
    }
  });
}

// ============================================
// LOAD FROM SUPABASE - overrides defaults in place.
// Returns true if anything was actually fetched.
// ============================================
async function loadContent() {
  if (!db) return false;
  try {
    const [svc, val, board, news, rep, frm, sc] = await Promise.all([
      db.from('services').select('*').order('sort_order'),
      db.from('core_values').select('*').order('sort_order'),
      db.from('board_members').select('*').order('sort_order'),
      db.from('news_items').select('*').order('sort_order'),
      db.from('reports').select('*').order('sort_order'),
      db.from('forms').select('*').order('sort_order'),
      db.from('site_content').select('*')
    ]);
    if (svc.error) throw svc.error;

    if (svc.data) services.splice(0, services.length, ...svc.data.map(function (r) { return { name: r.name, cat: r.category, desc: r.description }; }));
    if (val.data) coreValues.splice(0, coreValues.length, ...val.data.map(function (r) { return { title: r.title, desc: r.description, icon: r.icon }; }));
    if (board.data) boardMembers.splice(0, boardMembers.length, ...board.data.map(function (r) { return { role: r.role, name: r.name, photo_url: r.photo_url }; }));
    if (news.data) newsItems.splice(0, newsItems.length, ...news.data.map(function (r) { return { title: r.title, body: r.body, tag: r.tag }; }));
    if (rep.data) reports.splice(0, reports.length, ...rep.data.map(function (r) { return { title: r.title, year: r.year, desc: r.description }; }));
    if (frm.data) downloadForms.splice(0, downloadForms.length, ...frm.data.map(function (r) { return { name: r.name, desc: r.description, file_url: r.file_url }; }));
    if (sc.data) sc.data.forEach(function (row) { siteContent[row.key] = row.value; });
    return true;
  } catch (err) {
    console.warn('Supabase content fetch failed, staying on defaults:', err);
    return false;
  }
}

// ============================================
// RENDER - data-driven sections (uses filter())
// ============================================
function renderValues() {
  const el = document.getElementById('valuesGrid');
  if (!el) return;
  el.innerHTML = coreValues.map(function (v) {
    return '<div class="card value-card"><div class="icon-circle">' + icon(v.icon) + '</div><h4>' + escapeHTML(v.title) + '</h4><p>' + escapeHTML(v.desc) + '</p></div>';
  }).join('');
}

function renderServices() {
  const el = document.getElementById('servicesContent');
  if (!el) return;
  const cats = ['savings', 'loans', 'other'];
  el.innerHTML = cats.map(function (cat) {
    const items = services.filter(function (s) { return s.cat === cat; });
    if (!items.length) return '';
    const meta = categoryMeta[cat];
    const cards = items.map(function (s) {
      return '<div class="service-card"><div class="icon-circle">' + icon(meta.icon, 20) + '</div><h4>' + escapeHTML(s.name) + '</h4><p>' + escapeHTML(s.desc) + '</p></div>';
    }).join('');
    return '<div class="service-group"><h3 class="service-group-title">' + escapeHTML(meta.label) + '</h3><div class="service-cards">' + cards + '</div></div>';
  }).join('');
}

function renderBoard() {
  const el = document.getElementById('boardGrid');
  if (!el) return;
  el.innerHTML = boardMembers.map(function (m) {
    const heading = m.name ? escapeHTML(m.name) : escapeHTML(m.role);
    const sub = m.name
      ? '<p style="font-size:0.85rem; margin-bottom:0;">' + escapeHTML(m.role) + '</p>'
      : '<span class="tag-soon">Profile Coming Soon</span>';
    const avatar = m.photo_url
      ? '<img src="' + escapeHTML(m.photo_url) + '" alt="" style="width:64px; height:64px; border-radius:50%; object-fit:cover; margin:0 auto 16px; display:block;">'
      : '<div class="icon-circle" style="margin:0 auto 16px; width:64px; height:64px;">' + icon('person', 28) + '</div>';
    return '<div class="card" style="text-align:center;">' + avatar + '<h4 style="font-size:0.98rem; margin-bottom:6px;">' + heading + '</h4>' + sub + '</div>';
  }).join('');
}

function renderNews() {
  const el = document.getElementById('newsGrid');
  if (!el) return;
  if (!newsItems.length) {
    el.innerHTML = '<div class="card" style="grid-column:1/-1; text-align:center; padding:50px 30px;"><p style="margin:0;">No news posted yet - check back soon.</p></div>';
    return;
  }
  el.innerHTML = newsItems.map(function (n) {
    const tag = n.tag ? '<span class="tag-soon" style="margin-bottom:14px;">' + escapeHTML(n.tag) + '</span>' : '';
    return '<div class="card"><div class="icon-circle">' + icon('calendar') + '</div>' + tag + '<h4>' + escapeHTML(n.title) + '</h4><p>' + escapeHTML(n.body) + '</p></div>';
  }).join('');
}

function renderReports() {
  const el = document.getElementById('reportsGrid');
  if (!el) return;
  if (!reports.length) {
    el.innerHTML = '<div class="card" style="grid-column:1/-1; max-width:520px; margin:0 auto; text-align:center; padding:50px 30px;"><div class="icon-circle" style="margin:0 auto 18px;">' + icon('doc') + '</div><h4 style="margin-bottom:8px;">Reports Coming Soon</h4><p style="margin:0;">Check back here, or contact our office directly to request a copy.</p></div>';
    return;
  }
  el.innerHTML = reports.map(function (r) {
    const tag = r.year ? '<span class="tag-soon" style="margin-bottom:14px;">' + escapeHTML(r.year) + '</span>' : '';
    const desc = r.desc ? '<p>' + escapeHTML(r.desc) + '</p>' : '';
    return '<div class="card"><div class="icon-circle">' + icon('doc') + '</div>' + tag + '<h4>' + escapeHTML(r.title) + '</h4>' + desc + '</div>';
  }).join('');
}

function renderForms() {
  const el = document.getElementById('formsGrid');
  if (!el) return;
  el.innerHTML = downloadForms.map(function (f) {
    const action = f.file_url
      ? '<a href="' + escapeHTML(f.file_url) + '" target="_blank" rel="noopener" class="btn btn-outline btn-sm" style="margin-top:2px;">Download' + icon('arrow', 15) + '</a>'
      : '<span class="tag-soon">Available at Our Office</span>';
    return '<div class="card" style="display:flex; gap:18px; align-items:flex-start;"><div class="icon-circle" style="flex-shrink:0;">' + icon('doc') + '</div><div><h4 style="margin-bottom:6px;">' + escapeHTML(f.name) + '</h4><p style="margin-bottom:10px;">' + escapeHTML(f.desc) + '</p>' + action + '</div></div>';
  }).join('');
}

function renderAll() {
  applySiteContent();
  renderValues();
  renderServices();
  renderBoard();
  renderNews();
  renderReports();
  renderForms();
}


// ============================================
// ROUTER - <a href="#page"> links, filtered by hash
// ============================================
const pages = Array.from(document.querySelectorAll('.page'));
const navLinks = Array.from(document.querySelectorAll('.nav-link'));

function showPage(id) {
  const exists = pages.some(function (p) { return p.id === id; });
  const target = exists ? id : 'home';

  // Hide everything that isn't the target, show only the target - via filter()
  pages.filter(function (p) { return p.id !== target; }).forEach(function (p) { p.classList.remove('active'); });
  pages.filter(function (p) { return p.id === target; }).forEach(function (p) { p.classList.add('active'); });

  navLinks.forEach(function (l) { l.classList.remove('active'); });
  navLinks.filter(function (l) { return l.dataset.page === target; }).forEach(function (l) { l.classList.add('active'); });

  const activePage = pages.filter(function (p) { return p.id === target; })[0];
  const title = activePage ? activePage.dataset.title : 'Home';
  document.title = (target === 'home' ? 'Tole Tea Cooperative Credit Union Ltd | TTCCUL' : title + ' | TTCCUL');

  window.scrollTo(0, 0);
  closeMobileMenu();
  requestAnimationFrame(observeReveals);
}

function handleHash() {
  const id = (window.location.hash || '#home').slice(1);
  showPage(id);
}

window.addEventListener('hashchange', handleHash);

// ============================================
// MOBILE NAV
// ============================================
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
navToggle.addEventListener('click', function () {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});
function closeMobileMenu() {
  mainNav.classList.remove('open');
  navToggle.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}

// ============================================
// HEADER SCROLL STATE
// ============================================
const siteHeader = document.getElementById('siteHeader');
window.addEventListener('scroll', function () {
  siteHeader.classList.toggle('scrolled', window.scrollY > 10);
});

// ============================================
// SCROLL REVEAL
// ============================================
let revealObserver;
function observeReveals() {
  const items = document.querySelectorAll('.page.active .reveal:not(.visible)');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('visible'); });
    return;
  }
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
  }
  items.forEach(function (el) { revealObserver.observe(el); });
}

// ============================================
// CONTACT FORM - no backend, opens a prefilled email
// ============================================
document.addEventListener('submit', function (e) {
  if (e.target && e.target.id === 'contactForm') {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const subject = encodeURIComponent('Website enquiry from ' + name);
    const body = encodeURIComponent(message + '\n\n- ' + name + ' (' + email + ')');
    window.location.href = 'mailto:' + siteContent.contact_email + '?subject=' + subject + '&body=' + body;
  }
});

// ============================================
// INIT - render instantly from defaults (zero delay,
// works identically whether or not Supabase is set up
// yet), then silently upgrade to live data if available.
// ============================================
renderAll();
handleHash();
observeReveals();

loadContent().then(function (updated) {
  if (updated) {
    renderAll();
    observeReveals();
  }
});