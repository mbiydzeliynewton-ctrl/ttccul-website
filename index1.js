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
// DATA — hardcoded defaults. Supabase (once configured)
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
  { id: "default-1", role: "Board Chairperson", name: null, photo_url: null, bio: null },
  { id: "default-2", role: "Vice Chairperson", name: null, photo_url: null, bio: null },
  { id: "default-3", role: "Secretary", name: null, photo_url: null, bio: null },
  { id: "default-4", role: "Treasurer", name: null, photo_url: null, bio: null },
  { id: "default-5", role: "Supervisory Committee Member", name: null, photo_url: null, bio: null }
];

const newsItems = [
  { title: "Welcome to Our New Website", body: "TTCCUL now has a home online. Explore our services, learn how to join, and reach us directly from anywhere.", tag: "2026" },
  { title: "More Updates on the Way", body: "We'll share news on products, community initiatives and union milestones right here.", tag: "Coming Soon" }
];

const reports = [];

const faqs = [
  { question: "How do I become a member of TTCCUL?", answer: "Visit our office in Tole-Buea or reach out by phone or email, complete a membership application, provide valid identification, and open a shares account. See the Membership page for the full step-by-step process.", category: "Membership" },
  { question: "What savings options does TTCCUL offer?", answer: "Shares accounts, savings accounts, deposit accounts, minors accounts, group accounts, and daily savings (Akawo) collection. See the Services page for details on each.", category: "Savings" },
  { question: "What is Akawo?", answer: "Akawo is doorstep daily savings collection — a traditional, convenient way to build your savings a little at a time without needing to visit the office every day.", category: "Akawo" },
  { question: "What loans can I apply for?", answer: "Personal, business, agricultural and building loans, plus school fees loans, Akawo-linked loans, overdraft facilities and contract financing. Full list on the Services page.", category: "Loans" },
  { question: "Do I need to be a member before applying for a loan?", answer: "Yes — loans are a membership benefit. Join first (see the Membership page), then loan products become available to you.", category: "Loans" }
];

const branches = [
  { name: "Tole Main Branch (Headquarters)", address: "Tole, Buea, Southwest Region, Cameroon", phone: "675 062 254", hours: "Monday – Friday, 8:00 AM – 4:00 PM", is_headquarters: true, tags: "Headquarters, Full Loan Services, Customer Care", photo_url: null }
];

const testimonials = [
  { name: "Akoson E.", role: "Member since 2016", message: "TTCCUL helped me open my first business loan when no bank in town would look at me twice. Fair rates and people who actually know your name.", rating: 5, photo_url: null },
  { name: "Divine N.", role: "Member since 2019", message: "The Akawo daily savings collection changed how I save. Small amounts every day added up faster than I expected, and the staff make it easy.", rating: 5, photo_url: null },
  { name: "Grace M.", role: "Member since 2012", message: "One member, one vote actually means something here. I've watched this union grow for over a decade and it still feels like it belongs to us.", rating: 5, photo_url: null }
];

const downloadForms = [
  { name: "Membership Application Form", desc: "Start your journey to becoming a TTCCUL member.", file_url: null },
  { name: "Account Opening Form", desc: "Open a savings, deposit or shares account.", file_url: null },
  { name: "Loan Application Form", desc: "Apply for a personal, business or agricultural loan.", file_url: null },
  { name: "Next of Kin Form", desc: "Keep your account details safe and up to date.", file_url: null }
];

const siteContent = {
  hero_image_url: "",
  hero_video_url: "",
  hero_badge: "Serving Tole-Buea Since 1970",
  hero_headline: "Where Community Saves, Grows & Thrives Together",
  hero_lead: "A member-owned cooperative credit union built on mutual trust — savings, loans and financial inclusion for the people of Tole and beyond, at fair and honest rates.",
  stat1_value: "1970", stat1_label: "Founded",
  stat2_value: "56+", stat2_label: "Years of Continuous Service",
  stat3_value: "21+", stat3_label: "Products & Services Offered",
  stat4_value: "5", stat4_label: "Core Values We Operate By",
  mission_text: "To continuously develop and sustain a secure, law-abiding cooperative credit union that provides quick and reliable financial services to our members for their financial and social development — while paying a fair rate of interest on their savings.",
  vision_text: "To become a one-stop-shop financial institution, offering every product and service found at other microfinance institutions — delivering digital, accessible financial inclusion to our members at competitive rates.",
  about_overview: "As a microfinance institution, we promote financial inclusion by offering affordable financial services — especially to low- and middle-income individuals with limited access to commercial banks.\n\nWe mobilize savings from our members and use these funds to grant loans at fair, relatively low interest rates. TTCCUL operates on the principle of mutual assistance and democratic control: every member holds equal voting rights, regardless of the amount they've saved.\n\nBy encouraging saving habits and providing accessible credit, we contribute to poverty reduction, entrepreneurship development, and improved living standards across the communities we serve.",
  gm_quote: "For over five decades, Tole Tea Cooperative Credit Union has stood by our members through every season. We built this institution on trust, fairness, and the belief that when our members thrive, we all thrive.",
  gm_name: "Joseph Atabong Beja",
  gm_title: "General Manager",
  contact_phone_1: "675 062 254",
  contact_phone_2: "674 227 692",
  contact_email: "info@ttccul.com",
  contact_address: "Tole, Buea, Southwest Region, Cameroon",
  office_hours: "Monday – Friday, 8:00 AM – 4:00 PM",
  whatsapp_number: "237675062254",
  loan_interest_rate_annual: "15",
  savings_interest_rate_annual: "5",
  step1_detail: "Bring a valid ID. No appointment needed — walk-ins are welcome during office hours.",
  step2_detail: "Applications are usually reviewed the same week.",
  step3_detail: "Bring a national ID card or passport, plus any document we ask for when you apply.",
  step4_detail: "Your shares purchase is what officially makes you a part-owner of the union.",
  step5_detail: "From here, loan products and every other service become available to you.",
  about_hero_image_url: "",
  services_hero_image_url: "",
  membership_hero_image_url: "",
  branches_hero_image_url: "",
  reports_hero_image_url: "",
  contact_hero_image_url: "",
  about_image_url: "",
  mission_image_url: "",
  vision_image_url: "",
  gm_photo_url: "",
  social_facebook_url: "",
  social_instagram_url: "",
  social_twitter_url: "",
  social_linkedin_url: "",
  terms_conditions_text: "Welcome to the Tole Tea Cooperative Credit Union Ltd (TTCCUL) website. By accessing or using this website, you agree to be bound by the following terms and conditions. Please read them carefully before proceeding.",
  cookies_policy_text: "This Cookie Policy explains how Tole Tea Cooperative Credit Union Ltd (TTCCUL) uses cookies and similar technologies on this website."
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
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>',
  star: '<path d="M12 2.5 14.6 8.6 21.3 9.3 16.3 13.7 17.8 20.3 12 16.8 6.2 20.3 7.7 13.7 2.7 9.3 9.4 8.6 12 2.5Z"/>',
  facebook: '<path d="M17 3H8a5 5 0 0 0-5 5v8a5 5 0 0 0 5 5h4v-7H9.5v-3H12V9.3A3.3 3.3 0 0 1 15.3 6H18v3h-2.2c-.7 0-1.3.6-1.3 1.3V11h3.3l-.5 3H14.5v7H16a5 5 0 0 0 5-5V8a5 5 0 0 0-5-5Z"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="0.7" fill="currentColor" stroke="none"/>',
  twitter: '<path d="M4.5 4.5l15 15M19.5 4.5l-15 15"/>',
  linkedin: '<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="7.3" cy="7.3" r="0.9" fill="currentColor" stroke="none"/><path d="M7.3 11v6.5M11.5 17.5V13a2.3 2.3 0 0 1 4.6 0v4.5M11.5 11v.3"/>',
  calc: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 19h.01M12 19h.01M16 19h.01"/>'
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
    if (key === 'whatsapp_number') {
      if (siteContent.whatsapp_number) {
        el.href = 'https://wa.me/' + String(siteContent.whatsapp_number).replace(/[^0-9]/g, '');
      }
    } else if (siteContent[key]) {
      el.href = siteContent[key];
    }
  });

  // Social quick links (footer icons) — left as-is until a URL is set,
  // since an empty href would otherwise reload the current page.
  ['facebook', 'instagram', 'twitter', 'linkedin'].forEach(function (name) {
    const el = document.getElementById('social' + name.charAt(0).toUpperCase() + name.slice(1));
    const url = siteContent['social_' + name + '_url'];
    if (!el) return;
    if (url) {
      el.href = url;
      el.removeAttribute('aria-disabled');
    } else {
      el.removeAttribute('href');
      el.setAttribute('aria-disabled', 'true');
    }
  });

  // Tap-to-call / tap-to-email quick action buttons on the Contact page
  const toTelHref = function (raw) {
    const digits = String(raw || '').replace(/[^0-9]/g, '');
    if (!digits) return '';
    return 'tel:+' + (digits.length <= 9 ? '237' + digits : digits);
  };
  const callBtn1 = document.getElementById('callPhone1Link');
  if (callBtn1 && siteContent.contact_phone_1) callBtn1.href = toTelHref(siteContent.contact_phone_1);
  const callBtn2 = document.getElementById('callPhone2Link');
  if (callBtn2 && siteContent.contact_phone_2) callBtn2.href = toTelHref(siteContent.contact_phone_2);
  const emailBtn = document.getElementById('emailUsLink');
  if (emailBtn && siteContent.contact_email) emailBtn.href = 'mailto:' + siteContent.contact_email;

  applyPageBanners();
  applyImageField('about_image_url', 'aboutOverviewImg');
  applyImageField('mission_image_url', 'missionImg');
  applyImageField('vision_image_url', 'visionImg');
  applyImageField('gm_photo_url', 'gmPhotoImg', 'gmAvatar');

  const heroSection = document.getElementById('heroSection');
  const heroBgVideo = document.getElementById('heroBgVideo');
  const heroBgImage = document.getElementById('heroBgImage');
  if (heroSection && heroBgVideo && heroBgImage) {
    if (siteContent.hero_video_url) {
      if (heroBgVideo.getAttribute('src') !== siteContent.hero_video_url) {
        heroBgVideo.src = siteContent.hero_video_url;
      }
      heroBgVideo.hidden = false;
      heroBgImage.hidden = true;
      heroSection.classList.add('has-bg-media');
    } else if (siteContent.hero_image_url) {
      heroBgImage.src = siteContent.hero_image_url;
      heroBgImage.hidden = false;
      heroBgVideo.hidden = true;
      heroSection.classList.add('has-bg-media');
    } else {
      heroBgVideo.hidden = true;
      heroBgImage.hidden = true;
      heroSection.classList.remove('has-bg-media');
    }
  }
}

// ============================================
// PAGE BANNERS — background image on the About / Services /
// Membership / Branches / Reports / Contact page headers.
// Shows the branded gradient alone until an image is set.
// ============================================
const pageBannerKeys = {
  aboutBanner: 'about_hero_image_url',
  servicesBanner: 'services_hero_image_url',
  membershipBanner: 'membership_hero_image_url',
  branchesBanner: 'branches_hero_image_url',
  reportsBanner: 'reports_hero_image_url',
  contactBanner: 'contact_hero_image_url'
};
function applyPageBanners() {
  Object.keys(pageBannerKeys).forEach(function (bannerId) {
    const banner = document.getElementById(bannerId);
    if (!banner) return;
    const img = banner.querySelector('.page-banner-media img');
    if (!img) return;
    const url = siteContent[pageBannerKeys[bannerId]];
    if (url) {
      if (img.getAttribute('src') !== url) img.src = url;
      img.hidden = false;
      banner.classList.add('has-banner-img');
    } else {
      img.hidden = true;
      banner.classList.remove('has-banner-img');
    }
  });
}

// ============================================
// IMAGE FIELD HELPER — for single static images (About page
// Overview / Mission / Vision / GM photo). Shows a themed icon
// fallback until a real image is set via the admin dashboard.
// ============================================
function applyImageField(key, imgId, wrapId) {
  const img = document.getElementById(imgId);
  if (!img) return;
  const wrap = wrapId ? document.getElementById(wrapId) : img.closest('.img-fallback-wrap');
  const url = siteContent[key];
  if (url) {
    if (img.getAttribute('src') !== url) img.src = url;
    img.hidden = false;
    if (wrap) wrap.classList.add('has-image');
  } else {
    img.hidden = true;
    if (wrap) wrap.classList.remove('has-image');
  }
}

// ============================================
// STATS COUNT-UP — animates numeric stat values
// from 0 when scrolled into view, once per page load.
// ============================================
let statsObserver = null;
function initStatsCountUp() {
  const statEls = document.querySelectorAll('.stat-item strong[data-content]');
  if (!statEls.length || !('IntersectionObserver' in window)) return;
  if (!statsObserver) {
    statsObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateStatValue(entry.target);
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
  }
  statEls.forEach(function (el) {
    if (el.dataset.countInit) return;
    const finalText = el.textContent.trim();
    const match = finalText.match(/^([\d,]+)(.*)$/);
    if (!match) return;
    el.dataset.countInit = '1';
    el.dataset.finalText = finalText;
    el.textContent = '0' + match[2];
    statsObserver.observe(el);
  });
}

function animateStatValue(el) {
  const finalText = el.dataset.finalText || el.textContent;
  const match = finalText.match(/^([\d,]+)(.*)$/);
  if (!match) { el.textContent = finalText; return; }
  const target = parseInt(match[1].replace(/,/g, ''), 10);
  if (isNaN(target)) { el.textContent = finalText; return; }
  const hasComma = match[1].indexOf(',') !== -1;
  const suffix = match[2];
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = finalText;
    return;
  }
  const duration = 1100;
  const start = performance.now();
  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(target * eased);
    el.textContent = (hasComma ? current.toLocaleString('en-US') : String(current)) + suffix;
    if (progress < 1) requestAnimationFrame(frame);
    else el.textContent = finalText;
  }
  requestAnimationFrame(frame);
}

// ============================================
// LOAD FROM SUPABASE — overrides defaults in place.
// Returns true if anything was actually fetched.
// ============================================
async function loadContent() {
  if (!db) return false;
  try {
    const [svc, val, board, news, rep, frm, sc, faq, brc, tst] = await Promise.all([
      db.from('services').select('*').order('sort_order'),
      db.from('core_values').select('*').order('sort_order'),
      db.from('board_members').select('*').order('sort_order'),
      db.from('news_items').select('*').order('sort_order'),
      db.from('reports').select('*').order('sort_order'),
      db.from('forms').select('*').order('sort_order'),
      db.from('site_content').select('*'),
      db.from('faqs').select('*').order('sort_order'),
      db.from('branches').select('*').order('sort_order'),
      db.from('testimonials').select('*').order('sort_order')
    ]);
    if (svc.error) throw svc.error;

    if (svc.data) services.splice(0, services.length, ...svc.data.map(function (r) { return { name: r.name, cat: r.category, desc: r.description }; }));
    if (val.data) coreValues.splice(0, coreValues.length, ...val.data.map(function (r) { return { title: r.title, desc: r.description, icon: r.icon }; }));
    if (board.data) boardMembers.splice(0, boardMembers.length, ...board.data.map(function (r) { return { id: r.id, role: r.role, name: r.name, photo_url: r.photo_url, bio: r.bio }; }));
    if (news.data) newsItems.splice(0, newsItems.length, ...news.data.map(function (r) { return { title: r.title, body: r.body, tag: r.tag }; }));
    if (rep.data) reports.splice(0, reports.length, ...rep.data.map(function (r) { return { id: r.id, title: r.title, year: r.year, desc: r.description, image_url: r.image_url, file_url: r.file_url }; }));
    if (frm.data) downloadForms.splice(0, downloadForms.length, ...frm.data.map(function (r) { return { name: r.name, desc: r.description, file_url: r.file_url }; }));
    if (sc.data) sc.data.forEach(function (row) { siteContent[row.key] = row.value; });
    if (faq.data) faqs.splice(0, faqs.length, ...faq.data.map(function (r) { return { question: r.question, answer: r.answer, category: r.category }; }));
    if (brc.data) branches.splice(0, branches.length, ...brc.data.map(function (r) { return { name: r.name, address: r.address, phone: r.phone, hours: r.hours, is_headquarters: r.is_headquarters, tags: r.tags, photo_url: r.photo_url }; }));
    if (tst.data) testimonials.splice(0, testimonials.length, ...tst.data.map(function (r) { return { name: r.name, role: r.role, message: r.message, rating: r.rating, photo_url: r.photo_url }; }));
    return true;
  } catch (err) {
    console.warn('Supabase content fetch failed, staying on defaults:', err);
    return false;
  }
}

// ============================================
// RENDER — data-driven sections (uses filter())
// ============================================
function staggerDelay(idx) {
  return Math.min(idx * 50, 400) + 'ms';
}

function renderValues() {
  const el = document.getElementById('valuesGrid');
  if (!el) return;
  el.innerHTML = coreValues.map(function (v, idx) {
    return '<div class="card value-card reveal-fade" style="transition-delay:' + staggerDelay(idx) + '"><div class="icon-circle">' + icon(v.icon) + '</div><h4>' + escapeHTML(v.title) + '</h4><p>' + escapeHTML(v.desc) + '</p></div>';
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
    const cards = items.map(function (s, idx) {
      return '<div class="service-card reveal-fade" style="transition-delay:' + staggerDelay(idx) + '"><div class="icon-circle">' + icon(meta.icon, 20) + '</div><h4>' + escapeHTML(s.name) + '</h4><p>' + escapeHTML(s.desc) + '</p><a href="#membership" data-page="membership" class="btn btn-outline btn-sm card-cta">Open an Account</a></div>';
    }).join('');
    return '<div class="service-group"><h3 class="service-group-title">' + escapeHTML(meta.label) + '</h3><div class="service-cards">' + cards + '</div></div>';
  }).join('');
}

function renderBoard() {
  const el = document.getElementById('boardGrid');
  if (!el) return;
  el.innerHTML = boardMembers.map(function (m, idx) {
    const heading = m.name ? escapeHTML(m.name) : escapeHTML(m.role);
    const sub = m.name
      ? '<p style="font-size:0.85rem; margin-bottom:12px;">' + escapeHTML(m.role) + '</p>'
      : '<span class="tag-soon">Profile Coming Soon</span>';
    const avatar = m.photo_url
      ? '<img src="' + escapeHTML(m.photo_url) + '" alt="" style="width:64px; height:64px; border-radius:50%; object-fit:cover; margin:0 auto 16px; display:block;">'
      : '<div class="icon-circle" style="margin:0 auto 16px; width:64px; height:64px;">' + icon('person', 28) + '</div>';
    const readMore = m.name
      ? '<a href="#board/' + encodeURIComponent(m.id) + '" data-page="board" class="btn btn-outline btn-sm" style="margin-top:4px;">Read About</a>'
      : '';
    return '<div class="card reveal-fade" style="text-align:center; transition-delay:' + staggerDelay(idx) + '">' + avatar + '<h4 style="font-size:0.98rem; margin-bottom:6px;">' + heading + '</h4>' + sub + readMore + '</div>';
  }).join('');
}

function renderBoardDetail(m) {
  const el = document.getElementById('boardDetailContent');
  if (!el) return;
  const avatar = m.photo_url
    ? '<img src="' + escapeHTML(m.photo_url) + '" alt="" style="width:100%; max-width:340px; aspect-ratio:1; object-fit:cover; border-radius:var(--radius-lg); box-shadow:var(--shadow-lift); margin-bottom:32px;">'
    : '<div class="icon-circle" style="width:180px; height:180px; margin-bottom:32px;">' + icon('person', 80) + '</div>';
  const bio = m.bio
    ? m.bio.split(/\n\s*\n/).map(function (p) { return '<p style="margin-bottom:16px;">' + escapeHTML(p.trim()) + '</p>'; }).join('')
    : '<p style="margin-bottom:16px;">A full biography for ' + escapeHTML(m.name) + ' is coming soon.</p>';
  el.innerHTML =
    '<div class="reveal" style="text-align:center;">' + avatar + '</div>' +
    '<div class="reveal">' +
      '<span class="eyebrow"><span class="dot"></span>' + escapeHTML(m.role) + '</span>' +
      '<h2 style="margin-bottom:22px;">' + escapeHTML(m.name) + '</h2>' +
      bio +
    '</div>';
}

function renderNews() {
  const el = document.getElementById('newsGrid');
  if (!el) return;
  if (!newsItems.length) {
    el.innerHTML = '<div class="card" style="grid-column:1/-1; text-align:center; padding:50px 30px;"><p style="margin:0;">No news posted yet — check back soon.</p></div>';
    return;
  }
  el.innerHTML = newsItems.map(function (n, idx) {
    const tag = n.tag ? '<span class="tag-soon" style="margin-bottom:14px;">' + escapeHTML(n.tag) + '</span>' : '';
    return '<div class="card reveal-fade" style="transition-delay:' + staggerDelay(idx) + '"><div class="icon-circle">' + icon('calendar') + '</div>' + tag + '<h4>' + escapeHTML(n.title) + '</h4><p>' + escapeHTML(n.body) + '</p></div>';
  }).join('');
}

function reportCardHTML(r, idx) {
  const img = r.image_url
    ? '<img src="' + escapeHTML(r.image_url) + '" alt="" style="width:100%; aspect-ratio:4/3; object-fit:cover; border-radius:var(--radius-md) var(--radius-md) 0 0;">'
    : '<div style="width:100%; aspect-ratio:4/3; background:var(--sky-tint); border-radius:var(--radius-md) var(--radius-md) 0 0; display:flex; align-items:center; justify-content:center; color:var(--muted);">' + icon('doc', 30) + '</div>';
  const doc = r.file_url
    ? '<a href="' + escapeHTML(r.file_url) + '" target="_blank" rel="noopener" class="btn btn-outline btn-sm" style="margin-top:10px;">Report Document</a>'
    : '';
  return '<div class="card reveal-fade" style="padding:0; overflow:hidden; text-align:left; transition-delay:' + staggerDelay(idx || 0) + '">' + img +
    '<div style="padding:22px;"><h4 style="margin-bottom:6px;">' + escapeHTML(r.title) + '</h4>' +
    (r.desc ? '<p>' + escapeHTML(r.desc) + '</p>' : '') + doc + '</div></div>';
}

function reportYears() {
  return Array.from(new Set(reports.map(function (r) { return r.year || 'Undated'; }))).sort().reverse();
}

function renderReports(yearFilter) {
  const el = document.getElementById('reportsGrid');
  if (!el) return;

  if (!reports.length) {
    el.innerHTML = '<div class="card" style="max-width:520px; margin:0 auto; text-align:center; padding:50px 30px;"><div class="icon-circle" style="margin:0 auto 18px;">' + icon('doc') + '</div><h4 style="margin-bottom:8px;">AGM Photos Coming Soon</h4><p style="margin:0;">Check back here for photos from our Annual General Meetings.</p></div>';
    return;
  }

  if (yearFilter) {
    const items = reports.filter(function (r) { return String(r.year || 'Undated') === String(yearFilter); });
    el.innerHTML = !items.length
      ? '<div class="card" style="max-width:520px; margin:0 auto; text-align:center; padding:50px 30px;"><h4 style="margin-bottom:8px;">No Photos for ' + escapeHTML(yearFilter) + ' Yet</h4><p style="margin:0;">Try another year, or check back soon.</p></div>'
      : '<div class="grid grid-3">' + items.map(reportCardHTML).join('') + '</div>';
    return;
  }

  el.innerHTML = reportYears().map(function (y) {
    const items = reports.filter(function (r) { return (r.year || 'Undated') === y; });
    return '<div class="service-group"><h3 class="service-group-title">' + escapeHTML(y) + '</h3><div class="grid grid-3">' + items.map(reportCardHTML).join('') + '</div></div>';
  }).join('');
}

function renderReportsYearPills(activeYear) {
  const el = document.getElementById('reportsYearPills');
  if (!el) return;
  const years = reportYears();
  if (!years.length) { el.innerHTML = ''; return; }
  const allPill = '<a href="#reports" data-page="reports" class="btn btn-sm ' + (!activeYear ? 'btn-primary' : 'btn-outline') + '">All Years</a>';
  el.innerHTML = allPill + years.map(function (y) {
    const isActive = String(activeYear) === String(y);
    return '<a href="#reports/' + encodeURIComponent(y) + '" data-page="reports" class="btn btn-sm ' + (isActive ? 'btn-primary' : 'btn-outline') + '">' + escapeHTML(y) + '</a>';
  }).join('');
}

function populateReportsYearMenu() {
  const el = document.getElementById('reportsYearMenu');
  if (!el) return;
  const years = reportYears();
  el.innerHTML = '<a href="#reports">All Years</a>' + years.map(function (y) {
    return '<a href="#reports/' + encodeURIComponent(y) + '">' + escapeHTML(y) + '</a>';
  }).join('');
}

function renderForms() {
  const el = document.getElementById('formsGrid');
  if (!el) return;
  el.innerHTML = downloadForms.map(function (f, idx) {
    const action = f.file_url
      ? '<a href="' + escapeHTML(f.file_url) + '" target="_blank" rel="noopener" class="btn btn-outline btn-sm" style="margin-top:2px;">Download' + icon('arrow', 15) + '</a>'
      : '<span class="tag-soon">Available at Our Office</span>';
    return '<div class="card reveal-fade" style="display:flex; gap:18px; align-items:flex-start; transition-delay:' + staggerDelay(idx) + '"><div class="icon-circle" style="flex-shrink:0;">' + icon('doc') + '</div><div><h4 style="margin-bottom:6px;">' + escapeHTML(f.name) + '</h4><p style="margin-bottom:10px;">' + escapeHTML(f.desc) + '</p>' + action + '</div></div>';
  }).join('');
}

// ============================================
// FAQ — search + category filter
// ============================================
let faqActiveCategory = null;
let faqSearchTerm = '';

function faqCategories() {
  return Array.from(new Set(faqs.map(function (f) { return f.category || 'General'; })));
}

function renderFaqPills() {
  const el = document.getElementById('faqCategoryPills');
  if (!el) return;
  const cats = faqCategories();
  const allBtn = '<button type="button" class="btn btn-sm ' + (!faqActiveCategory ? 'btn-primary' : 'btn-outline') + '" data-faq-cat="">All</button>';
  el.innerHTML = allBtn + cats.map(function (c) {
    return '<button type="button" class="btn btn-sm ' + (faqActiveCategory === c ? 'btn-primary' : 'btn-outline') + '" data-faq-cat="' + escapeHTML(c) + '">' + escapeHTML(c) + '</button>';
  }).join('');
}

function renderFaqList() {
  const el = document.getElementById('faqList');
  if (!el) return;
  const term = faqSearchTerm.trim().toLowerCase();
  const items = faqs.filter(function (f) {
    const matchesCategory = !faqActiveCategory || (f.category || 'General') === faqActiveCategory;
    const matchesSearch = !term || (f.question + ' ' + f.answer).toLowerCase().indexOf(term) !== -1;
    return matchesCategory && matchesSearch;
  });
  if (!items.length) {
    el.innerHTML = '<p style="text-align:center; color:var(--muted); padding:30px 0;">No matching questions — try a different search or category.</p>';
    return;
  }
  el.innerHTML = items.map(function (f, idx) {
    return '<details class="numbered-step-wrap reveal" style="transition-delay:' + staggerDelay(idx) + '"><summary class="numbered-step" style="gap:14px;"><div class="step-body"><h4 style="margin-bottom:0;">' + escapeHTML(f.question) + '</h4></div>' +
      '<svg class="step-chevron" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></summary>' +
      '<div class="step-extra"><div class="step-extra-inner" style="padding-left:0;">' + escapeHTML(f.answer) + '</div></div></details>';
  }).join('');
}

function renderFaqs() {
  renderFaqPills();
  renderFaqList();
}

document.addEventListener('click', function (e) {
  const btn = e.target.closest('[data-faq-cat]');
  if (!btn) return;
  faqActiveCategory = btn.dataset.faqCat || null;
  renderFaqs();
  observeReveals();
});

document.addEventListener('input', function (e) {
  if (e.target && e.target.id === 'faqSearch') {
    faqSearchTerm = e.target.value;
    renderFaqList();
    observeReveals();
  }
});

// ============================================
// BRANCHES
// ============================================
function renderBranches() {
  const el = document.getElementById('branchesGrid');
  if (!el) return;
  if (!branches.length) {
    el.innerHTML = '<div class="card" style="grid-column:1/-1; text-align:center; padding:50px 30px;"><p style="margin:0;">Branch details coming soon.</p></div>';
    return;
  }
  el.innerHTML = branches.map(function (b, idx) {
    const img = b.photo_url
      ? '<img src="' + escapeHTML(b.photo_url) + '" alt="" style="width:100%; aspect-ratio:4/3; object-fit:cover; border-radius:var(--radius-md) var(--radius-md) 0 0;">'
      : '<div style="width:100%; aspect-ratio:4/3; background:var(--sky-tint); border-radius:var(--radius-md) var(--radius-md) 0 0; display:flex; align-items:center; justify-content:center; color:var(--slate-blue); opacity:0.55;">' + icon('pin', 40) + '</div>';
    const badge = b.is_headquarters ? '<span class="tag-soon" style="margin-bottom:10px;">Headquarters</span>' : '';
    const tags = (b.tags || '').split(',').map(function (t) { return t.trim(); }).filter(Boolean)
      .map(function (t) { return '<span class="tag-soon" style="margin:0 6px 6px 0;">' + escapeHTML(t) + '</span>'; }).join('');
    return '<div class="card reveal-fade" style="padding:0; overflow:hidden; text-align:left; transition-delay:' + staggerDelay(idx) + '">' + img +
      '<div style="padding:24px;">' + badge +
      '<h4 style="margin-bottom:12px;">' + escapeHTML(b.name) + '</h4>' +
      (b.address ? '<p style="font-size:0.88rem; margin-bottom:6px; display:flex; gap:8px;">' + icon('pin', 16) + escapeHTML(b.address) + '</p>' : '') +
      (b.phone ? '<p style="font-size:0.88rem; margin-bottom:6px; display:flex; gap:8px;">' + icon('phone', 16) + escapeHTML(b.phone) + '</p>' : '') +
      (b.hours ? '<p style="font-size:0.88rem; margin-bottom:14px; display:flex; gap:8px;">' + icon('clock', 16) + escapeHTML(b.hours) + '</p>' : '') +
      '<div style="margin-bottom:6px;">' + tags + '</div>' +
      '<a href="#contact" data-page="contact" class="btn btn-outline btn-sm card-cta">Contact Us</a>' +
      '</div></div>';
  }).join('');
}

function renderTestimonials() {
  const el = document.getElementById('testimonialsGrid');
  if (!el) return;
  if (!testimonials.length) {
    el.innerHTML = '<div class="card" style="grid-column:1/-1; text-align:center; padding:50px 30px;"><p style="margin:0;">Member reviews are on the way.</p></div>';
    return;
  }
  el.innerHTML = testimonials.map(function (t, idx) {
    const rating = Math.max(0, Math.min(5, parseInt(t.rating, 10) || 5));
    const stars = Array.from({ length: 5 }).map(function (_, i) {
      const filled = i < rating;
      return '<svg viewBox="0 0 24 24" width="14" height="14" fill="' + (filled ? 'currentColor' : 'none') + '" stroke="currentColor" stroke-width="1.6" class="' + (filled ? '' : 'star-off') + '">' + icons.star + '</svg>';
    }).join('');
    const avatar = t.photo_url
      ? '<img src="' + escapeHTML(t.photo_url) + '" alt="">'
      : icon('person', 20);
    return '<div class="card testimonial-card reveal-fade" style="transition-delay:' + staggerDelay(idx) + '">' +
      '<div class="testimonial-stars">' + stars + '</div>' +
      '<p class="testimonial-message">"' + escapeHTML(t.message) + '"</p>' +
      '<div class="testimonial-person">' +
      '<div class="testimonial-avatar">' + avatar + '</div>' +
      '<div><div class="testimonial-name">' + escapeHTML(t.name) + '</div>' +
      (t.role ? '<div class="testimonial-role">' + escapeHTML(t.role) + '</div>' : '') + '</div>' +
      '</div></div>';
  }).join('');
}

// ============================================
// LOAN / SAVINGS CALCULATOR
// ============================================
function formatFCFA(n) {
  return Math.round(n).toLocaleString('en-US') + ' FCFA';
}

function calcLoanRepayment(principal, months) {
  const annualRate = parseFloat(siteContent.loan_interest_rate_annual) || 15;
  const r = annualRate / 100 / 12;
  const monthly = r === 0 ? principal / months : (principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);
  const totalPayable = monthly * months;
  return { monthly: monthly, totalInterest: totalPayable - principal, totalPayable: totalPayable };
}

function calcSavingsGrowth(monthlyDeposit, months) {
  const annualRate = parseFloat(siteContent.savings_interest_rate_annual) || 5;
  const r = annualRate / 100 / 12;
  const futureValue = r === 0 ? monthlyDeposit * months : monthlyDeposit * ((Math.pow(1 + r, months) - 1) / r);
  const totalContributed = monthlyDeposit * months;
  return { futureValue: futureValue, totalContributed: totalContributed, interestEarned: futureValue - totalContributed };
}

let calcMode = 'loan';

function updateCalculator() {
  const loanAmountEl = document.getElementById('calcLoanAmount');
  if (!loanAmountEl) return;
  const loanAmount = Number(loanAmountEl.value);
  const loanTerm = Number(document.getElementById('calcLoanTerm').value);
  const savingsAmount = Number(document.getElementById('calcSavingsAmount').value);
  const savingsTerm = Number(document.getElementById('calcSavingsTerm').value);

  document.getElementById('calcLoanAmountLabel').textContent = formatFCFA(loanAmount);
  document.getElementById('calcLoanTermLabel').textContent = loanTerm + ' Months';
  document.getElementById('calcSavingsAmountLabel').textContent = formatFCFA(savingsAmount);
  document.getElementById('calcSavingsTermLabel').textContent = savingsTerm + ' Months';

  const output = document.getElementById('calcOutput');
  if (calcMode === 'loan') {
    const r = calcLoanRepayment(loanAmount, loanTerm);
    output.innerHTML =
      '<div style="font-size:0.8rem; opacity:0.7; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:6px;">Estimated Monthly Repayment</div>' +
      '<div class="calc-result-value">' + formatFCFA(r.monthly) + '</div>' +
      '<div class="calc-output-row"><span style="opacity:0.75;">Total Interest (est.)</span><strong>' + formatFCFA(r.totalInterest) + '</strong></div>' +
      '<div class="calc-output-row"><span style="opacity:0.75;">Total Payable</span><strong>' + formatFCFA(r.totalPayable) + '</strong></div>';
  } else {
    const s = calcSavingsGrowth(savingsAmount, savingsTerm);
    output.innerHTML =
      '<div style="font-size:0.8rem; opacity:0.7; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:6px;">Projected Savings</div>' +
      '<div class="calc-result-value">' + formatFCFA(s.futureValue) + '</div>' +
      '<div class="calc-output-row"><span style="opacity:0.75;">Total Contributed</span><strong>' + formatFCFA(s.totalContributed) + '</strong></div>' +
      '<div class="calc-output-row"><span style="opacity:0.75;">Interest Earned (est.)</span><strong>' + formatFCFA(s.interestEarned) + '</strong></div>';
  }
}

function initCalculator() {
  const loanBtn = document.getElementById('calcModeLoanBtn');
  const savingsBtn = document.getElementById('calcModeSavingsBtn');
  const loanPanel = document.getElementById('calcLoanPanel');
  const savingsPanel = document.getElementById('calcSavingsPanel');
  if (!loanBtn) return;

  loanBtn.addEventListener('click', function () {
    calcMode = 'loan';
    loanBtn.className = 'btn btn-primary btn-sm';
    savingsBtn.className = 'btn btn-outline btn-sm';
    loanPanel.hidden = false;
    savingsPanel.hidden = true;
    updateCalculator();
  });
  savingsBtn.addEventListener('click', function () {
    calcMode = 'savings';
    savingsBtn.className = 'btn btn-primary btn-sm';
    loanBtn.className = 'btn btn-outline btn-sm';
    savingsPanel.hidden = false;
    loanPanel.hidden = true;
    updateCalculator();
  });
  ['calcLoanAmount', 'calcLoanTerm', 'calcSavingsAmount', 'calcSavingsTerm'].forEach(function (id) {
    document.getElementById(id).addEventListener('input', updateCalculator);
  });
  updateCalculator();
}

// ============================================
// MEMBERSHIP APPLICATION FORM — no .select() after
// insert on purpose: anon can only INSERT on this
// table, never read rows back (see schema.sql).
// ============================================
document.addEventListener('submit', function (e) {
  if (e.target && e.target.id === 'applicationForm') {
    e.preventDefault();
    submitApplication(e.target);
  }
});

async function submitApplication(form) {
  const statusEl = document.getElementById('applicationStatus');
  const btn = form.querySelector('button[type="submit"]');
  const fullName = form.elements.full_name.value.trim();
  const phone = form.elements.phone.value.trim();
  if (!fullName || !phone) return;

  const payload = {
    full_name: fullName,
    phone: phone,
    email: form.elements.email.value.trim() || null,
    account_type: form.elements.account_type.value,
    message: form.elements.message.value.trim() || null,
    terms_accepted: !!(form.elements.terms_accepted && form.elements.terms_accepted.checked)
  };

  btn.disabled = true;
  statusEl.textContent = '';
  statusEl.style.color = '';

  if (!db) {
    statusEl.textContent = "Online submission isn't connected yet — please call or WhatsApp us instead.";
    btn.disabled = false;
    return;
  }

  const { error } = await db.from('membership_applications').insert(payload);
  btn.disabled = false;
  if (error) {
    statusEl.textContent = 'Something went wrong — please call us instead, or try again.';
    statusEl.style.color = 'var(--danger, #B3432B)';
    return;
  }
  form.reset();
  statusEl.textContent = "Application received — we'll be in touch soon. Thank you!";
  statusEl.style.color = 'var(--tea-green)';
}

// ============================================
// SMOOTH ACCORDION — one delegated listener drives every
// .numbered-step-wrap on the page (FAQ answers, the 5 membership
// steps). Delegation means items rendered later by renderFaqList()
// are covered automatically, with no re-init call needed anywhere.
// The .is-open class (not the native [open] attribute) drives the
// chevron rotation, so it turns in sync with the height animation
// in both directions instead of lagging behind on close.
// Each list is also "exclusive": opening one item smoothly closes
// whichever sibling item (within that same list) was already open,
// so only one FAQ — or one of the 5 steps — is expanded at a time.
// ============================================
function openAccordion(details) {
  const content = details.querySelector('.step-extra');
  if (!content || details.dataset.animating) return;
  details.dataset.animating = '1';
  details.setAttribute('open', '');
  details.classList.add('is-open');
  const target = content.scrollHeight;
  content.style.height = '0px';
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { content.style.height = target + 'px'; });
  });
  content.addEventListener('transitionend', function handler(ev) {
    if (ev.propertyName && ev.propertyName !== 'height') return;
    content.style.height = '';
    content.removeEventListener('transitionend', handler);
    delete details.dataset.animating;
  });
}

function closeAccordion(details) {
  const content = details.querySelector('.step-extra');
  if (!content || details.dataset.animating) return;
  details.dataset.animating = '1';
  details.classList.remove('is-open');
  content.style.height = content.scrollHeight + 'px';
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { content.style.height = '0px'; });
  });
  content.addEventListener('transitionend', function handler(ev) {
    if (ev.propertyName && ev.propertyName !== 'height') return;
    details.removeAttribute('open');
    content.style.height = '';
    content.removeEventListener('transitionend', handler);
    delete details.dataset.animating;
  });
}

document.addEventListener('click', function (e) {
  const summary = e.target.closest('.numbered-step-wrap > summary');
  if (!summary) return;
  e.preventDefault();
  const details = summary.parentElement;
  if (!details.querySelector('.step-extra') || details.dataset.animating) return;

  if (details.hasAttribute('open')) {
    closeAccordion(details);
    return;
  }

  // Opening this one — collapse any other open item in the same
  // list first (same parent = same accordion group), so FAQ answers
  // and the 5 membership steps each only ever show one at a time.
  if (details.parentElement) {
    Array.from(details.parentElement.children).forEach(function (el) {
      if (el !== details && el.classList && el.classList.contains('numbered-step-wrap') && el.hasAttribute('open')) {
        closeAccordion(el);
      }
    });
  }
  openAccordion(details);
});

function renderAll() {
  applySiteContent();
  renderValues();
  renderServices();
  renderBoard();
  renderNews();
  populateReportsYearMenu();
  renderForms();
  renderFaqs();
  renderBranches();
  renderTestimonials();
  initStatsCountUp();
}

function refreshDynamicContent() {
  // Re-applies whatever's currently on screen after a background data
  // refresh, WITHOUT touching scroll position or nav state — a full
  // showPage()/handleHash() re-run would yank the user back to the top.
  const activePage = pages.filter(function (p) { return p.classList.contains('active'); })[0];
  if (!activePage) return;
  const raw = (window.location.hash || '').slice(1);
  const slashIdx = raw.indexOf('/');
  const param = slashIdx === -1 ? null : decodeURIComponent(raw.slice(slashIdx + 1));

  if (activePage.id === 'reports') {
    renderReports(param);
    renderReportsYearPills(param);
  }
  if (activePage.id === 'board-detail' && param) {
    const member = boardMembers.find(function (m) { return String(m.id) === String(param); });
    if (member) renderBoardDetail(member);
  }
}


// ============================================
// ROUTER — <a href="#page"> links, filtered by hash
// ============================================
const pages = Array.from(document.querySelectorAll('.page'));
const navLinks = Array.from(document.querySelectorAll('.nav-link'));

function showPage(id, param) {
  const exists = pages.some(function (p) { return p.id === id; });
  const target = exists ? id : 'home';

  // Hide everything that isn't the target, show only the target — via filter()
  pages.filter(function (p) { return p.id !== target; }).forEach(function (p) { p.classList.remove('active'); });
  pages.filter(function (p) { return p.id === target; }).forEach(function (p) { p.classList.add('active'); });

  navLinks.forEach(function (l) { l.classList.remove('active'); });
  navLinks.filter(function (l) { return l.dataset.page === target; }).forEach(function (l) { l.classList.add('active'); });

  if (target === 'reports') {
    renderReports(param || null);
    renderReportsYearPills(param || null);
  }
  if (target === 'terms') {
    switchLegalTab(param === 'cookies' ? 'cookies' : 'terms');
  }

  const activePage = pages.filter(function (p) { return p.id === target; })[0];
  const title = activePage ? activePage.dataset.title : 'Home';
  document.title = (target === 'home' ? 'Tole Tea Cooperative Credit Union Ltd | TTCCUL' : title + ' | TTCCUL');

  if (target === 'contact' && param === 'faq') {
    requestAnimationFrame(function () {
      const faqSection = document.getElementById('faqSection');
      if (faqSection) faqSection.scrollIntoView({ block: 'start' });
    });
  } else {
    window.scrollTo(0, 0);
  }
  closeMobileMenu();
  requestAnimationFrame(observeReveals);
}

function showBoardDetail(memberId) {
  const member = boardMembers.find(function (m) { return String(m.id) === String(memberId); });
  if (!member || !member.name) {
    showPage('board');
    return;
  }
  renderBoardDetail(member);
  showPage('board-detail');
  document.title = member.name + ' | TTCCUL';
}

function handleHash() {
  const raw = (window.location.hash || '#home').slice(1);
  const slashIdx = raw.indexOf('/');
  const id = slashIdx === -1 ? raw : raw.slice(0, slashIdx);
  const param = slashIdx === -1 ? null : decodeURIComponent(raw.slice(slashIdx + 1));

  if (id === 'board' && param) {
    showBoardDetail(param);
    return;
  }
  showPage(id, param);
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
  const items = document.querySelectorAll('.page.active .reveal:not(.visible), .page.active .reveal-fade:not(.visible)');
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
// CONTACT FORM — no backend, opens a prefilled email
// ============================================
document.addEventListener('submit', function (e) {
  if (e.target && e.target.id === 'contactForm') {
    e.preventDefault();
    const form = e.target;
    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const message = form.elements.message.value.trim();
    const subject = encodeURIComponent('Website enquiry from ' + name);
    const body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
    window.location.href = 'mailto:' + siteContent.contact_email + '?subject=' + subject + '&body=' + body;
  }
});

// ============================================
// TERMS & COOKIE POLICY TABS
// ============================================
function switchLegalTab(tab) {
  const termsBtn = document.getElementById('termsTabBtn');
  const cookiesBtn = document.getElementById('cookiesTabBtn');
  const termsPanel = document.getElementById('termsTabPanel');
  const cookiesPanel = document.getElementById('cookiesTabPanel');
  if (!termsBtn || !cookiesBtn || !termsPanel || !cookiesPanel) return;
  const showCookies = tab === 'cookies';
  termsBtn.classList.toggle('active', !showCookies);
  cookiesBtn.classList.toggle('active', showCookies);
  termsPanel.classList.toggle('active', !showCookies);
  cookiesPanel.classList.toggle('active', showCookies);
}
document.addEventListener('click', function (e) {
  const btn = e.target.closest('.tab-btn[data-tab]');
  if (!btn) return;
  switchLegalTab(btn.dataset.tab);
  if (history.replaceState) {
    history.replaceState(null, '', btn.dataset.tab === 'cookies' ? '#terms/cookies' : '#terms');
  }
});

// ============================================
// COOKIE CONSENT BANNER — a lightweight, dismissible notice.
// Choice is remembered locally; this is a real deployed page
// (not a Claude artifact preview), so localStorage is fine here.
// ============================================
(function () {
  const banner = document.getElementById('cookieBanner');
  if (!banner) return;
  const STORAGE_KEY = 'ttccul_cookie_consent';
  let stored = null;
  try { stored = localStorage.getItem(STORAGE_KEY); } catch (err) { stored = null; }
  if (!stored) {
    setTimeout(function () {
      banner.classList.add('visible');
      document.body.classList.add('cookie-banner-visible');
    }, 700);
  }
  function dismiss(value) {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (err) { /* private browsing etc. — fine to no-op */ }
    banner.classList.remove('visible');
    document.body.classList.remove('cookie-banner-visible');
  }
  const acceptBtn = document.getElementById('cookieAcceptBtn');
  const declineBtn = document.getElementById('cookieDeclineBtn');
  if (acceptBtn) acceptBtn.addEventListener('click', function () { dismiss('accepted'); });
  if (declineBtn) declineBtn.addEventListener('click', function () { dismiss('declined'); });
})();

// ============================================
// CONSOLE SECURITY WARNING — a real, common attack against bank
// and credit union customers is "self-XSS": a scammer convinces a
// member to paste malicious code into their own browser console
// (e.g. "paste this to unlock a reward" / "paste this to verify
// your account"), which then runs with full access to this page.
// This warning is standard practice on banking sites for exactly
// that reason. It has nothing to do with hiding source code —
// nothing shown in DevTools ever does that; see the note further
// down before assuming otherwise.
// ============================================
(function () {
  try {
    console.log('%cStop!', 'font-size:46px; font-weight:800; color:#B3432B;');
    console.log('%cThis is a browser feature meant for developers. If someone told you to paste something here to "verify your account," get a refund, or unlock a feature, it is a scam — pasting it will give them access to your account.', 'font-size:15px; color:#0F2C4C; line-height:1.6;');
    console.log('%cTTCCUL will never ask you to paste anything into this console.', 'font-size:15px; font-weight:700; color:#0F2C4C;');
  } catch (e) { /* console unavailable in some contexts - fail silently */ }
})();

// ============================================
// INIT — render instantly from defaults (zero delay,
// works identically whether or not Supabase is set up
// yet), then silently upgrade to live data if available.
// ============================================
renderAll();
handleHash();
observeReveals();
initCalculator();

loadContent().then(function (updated) {
  if (updated) {
    renderAll();
    refreshDynamicContent();
    observeReveals();
    updateCalculator();
  }
});
