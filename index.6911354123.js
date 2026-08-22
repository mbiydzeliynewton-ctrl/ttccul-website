const SUPABASE_URL = "https://rsphnnhihngekkjzbeji.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzcGhubmhpaG5nZWtranpiZWppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYzMjA4NTAsImV4cCI6MjEwMTg5Njg1MH0.-keZ2nlMghxPxEYXVQ65RQlWTq0s3XiomeN7ptLY4xA";
let db = null;
if (typeof supabase !== 'undefined' && SUPABASE_URL.indexOf('YOUR_') !== 0) {
db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}
function escapeHTML(a) {
if (a === null || a === undefined) return '';
return String(a)
.replace(/&/g, '&amp;')
.replace(/</g, '&lt;')
.replace(/>/g, '&gt;')
.replace(/"/g, '&quot;')
.replace(/'/g, '&#39;');
}
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
loans: { label: "Loans & Credit", icon: "loan" },
other: { label: "Other Financial Services", icon: "globe" }
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
function icon(d, g) {
g = g || 22;
return '<svg viewBox="0 0 24 24" width="' + g + '" height="' + g + '" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">' + (icons[d] || '') + '</svg>';
}
function applySiteContent() {
document.querySelectorAll('[data-content]').forEach(function (h) {
const j = h.dataset.content;
const k = siteContent[j];
if (k === undefined) return;
if (j === 'about_overview') {
h.innerHTML = k.split(/\n\s*\n/).map(function (o) {
return '<p style="margin-bottom:16px;">' + escapeHTML(o.trim()) + '</p>';
}).join('');
} else {
h.textContent = k;
}
});
document.querySelectorAll('[data-content-href]').forEach(function (q) {
const u = q.dataset.contentHref;
if (u === 'whatsapp_number') {
if (siteContent.whatsapp_number) {
q.href = 'https://wa.me/' + String(siteContent.whatsapp_number).replace(/[^0-9]/g, '');
}
} else if (siteContent[u]) {
q.href = siteContent[u];
}
});
['facebook', 'instagram', 'twitter', 'linkedin'].forEach(function (w) {
const x = document.getElementById('social' + w.charAt(0).toUpperCase() + w.slice(1));
const z = siteContent['social_' + w + '_url'];
if (!x) return;
if (z) {
x.href = z;
x.removeAttribute('aria-disabled');
} else {
x.removeAttribute('href');
x.setAttribute('aria-disabled', 'true');
}
});
const aa = function (ab) {
const ac = String(ab || '').replace(/[^0-9]/g, '');
if (!ac) return '';
return 'tel:+' + (ac.length <= 9 ? '237' + ac : ac);
};
const ad = document.getElementById('callPhone1Link');
if (ad && siteContent.contact_phone_1) ad.href = aa(siteContent.contact_phone_1);
const ae = document.getElementById('callPhone2Link');
if (ae && siteContent.contact_phone_2) ae.href = aa(siteContent.contact_phone_2);
const af = document.getElementById('emailUsLink');
if (af && siteContent.contact_email) af.href = 'mailto:' + siteContent.contact_email;
applyPageBanners();
applyImageField('about_image_url', 'aboutOverviewImg');
applyImageField('mission_image_url', 'missionImg');
applyImageField('vision_image_url', 'visionImg');
applyImageField('gm_photo_url', 'gmPhotoImg', 'gmAvatar');
const ag = document.getElementById('heroSection');
const ah = document.getElementById('heroBgVideo');
const ai = document.getElementById('heroBgImage');
if (ag && ah && ai) {
if (siteContent.hero_video_url) {
if (ah.getAttribute('src') !== siteContent.hero_video_url) {
ah.src = siteContent.hero_video_url;
}
ah.hidden = false;
ai.hidden = true;
ag.classList.add('has-bg-media');
} else if (siteContent.hero_image_url) {
ai.src = siteContent.hero_image_url;
ai.hidden = false;
ah.hidden = true;
ag.classList.add('has-bg-media');
} else {
ah.hidden = true;
ai.hidden = true;
ag.classList.remove('has-bg-media');
}
}
}
const pageBannerKeys = {
aboutBanner: 'about_hero_image_url',
servicesBanner: 'services_hero_image_url',
membershipBanner: 'membership_hero_image_url',
branchesBanner: 'branches_hero_image_url',
reportsBanner: 'reports_hero_image_url',
contactBanner: 'contact_hero_image_url'
};
function applyPageBanners() {
Object.keys(pageBannerKeys).forEach(function (aj) {
const ak = document.getElementById(aj);
if (!ak) return;
const al = ak.querySelector('.page-banner-media img');
if (!al) return;
const am = siteContent[pageBannerKeys[aj]];
if (am) {
if (al.getAttribute('src') !== am) al.src = am;
al.hidden = false;
ak.classList.add('has-banner-img');
} else {
al.hidden = true;
ak.classList.remove('has-banner-img');
}
});
}
function applyImageField(an, ao, ap) {
const aq = document.getElementById(ao);
if (!aq) return;
const ar = ap ? document.getElementById(ap) : aq.closest('.img-fallback-wrap');
const as = siteContent[an];
if (as) {
if (aq.getAttribute('src') !== as) aq.src = as;
aq.hidden = false;
if (ar) ar.classList.add('has-image');
} else {
aq.hidden = true;
if (ar) ar.classList.remove('has-image');
}
}
let statsObserver = null;
function initStatsCountUp() {
const at = document.querySelectorAll('.stat-item strong[data-content]');
if (!at.length || !('IntersectionObserver' in window)) return;
if (!statsObserver) {
statsObserver = new IntersectionObserver(function (au) {
au.forEach(function (av) {
if (av.isIntersecting) {
animateStatValue(av.target);
statsObserver.unobserve(av.target);
}
});
}, { threshold: 0.4 });
}
at.forEach(function (aw) {
if (aw.dataset.countInit) return;
const ax = aw.textContent.trim();
const ay = ax.match(/^([\d,]+)(.*)$/);
if (!ay) return;
aw.dataset.countInit = '1';
aw.dataset.finalText = ax;
aw.textContent = '0' + ay[2];
statsObserver.observe(aw);
});
}
function animateStatValue(az) {
const ba = az.dataset.finalText || az.textContent;
const bb = ba.match(/^([\d,]+)(.*)$/);
if (!bb) { az.textContent = ba; return; }
const bc = parseInt(bb[1].replace(/,/g, ''), 10);
if (isNaN(bc)) { az.textContent = ba; return; }
const bd = bb[1].indexOf(',') !== -1;
const be = bb[2];
if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
az.textContent = ba;
return;
}
const bf = 1100;
const bg = performance.now();
function frame(bh) {
const bi = Math.min((bh - bg) / bf, 1);
const bj = 1 - Math.pow(1 - bi, 3);
const bk = Math.round(bc * bj);
az.textContent = (bd ? bk.toLocaleString('en-US') : String(bk)) + be;
if (bi < 1) requestAnimationFrame(frame);
else az.textContent = ba;
}
requestAnimationFrame(frame);
}
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
if (svc.data) services.splice(0, services.length, ...svc.data.map(function (bl) { return { name: bl.name, cat: bl.category, desc: bl.description }; }));
if (val.data) coreValues.splice(0, coreValues.length, ...val.data.map(function (bm) { return { title: bm.title, desc: bm.description, icon: bm.icon }; }));
if (board.data) boardMembers.splice(0, boardMembers.length, ...board.data.map(function (bn) { return { id: bn.id, role: bn.role, name: bn.name, photo_url: bn.photo_url, bio: bn.bio }; }));
if (news.data) newsItems.splice(0, newsItems.length, ...news.data.map(function (bo) { return { title: bo.title, body: bo.body, tag: bo.tag }; }));
if (rep.data) reports.splice(0, reports.length, ...rep.data.map(function (bp) { return { id: bp.id, title: bp.title, year: bp.year, desc: bp.description, image_url: bp.image_url, file_url: bp.file_url }; }));
if (frm.data) downloadForms.splice(0, downloadForms.length, ...frm.data.map(function (bq) { return { name: bq.name, desc: bq.description, file_url: bq.file_url }; }));
if (sc.data) sc.data.forEach(function (br) { siteContent[br.key] = br.value; });
if (faq.data) faqs.splice(0, faqs.length, ...faq.data.map(function (bs) { return { question: bs.question, answer: bs.answer, category: bs.category }; }));
if (brc.data) branches.splice(0, branches.length, ...brc.data.map(function (bt) { return { name: bt.name, address: bt.address, phone: bt.phone, hours: bt.hours, is_headquarters: bt.is_headquarters, tags: bt.tags, photo_url: bt.photo_url }; }));
if (tst.data) testimonials.splice(0, testimonials.length, ...tst.data.map(function (bu) { return { name: bu.name, role: bu.role, message: bu.message, rating: bu.rating, photo_url: bu.photo_url }; }));
return true;
} catch (bv) {
console.warn('Supabase content fetch failed, staying on defaults:', bv);
return false;
}
}
function staggerDelay(bw) {
return Math.min(bw * 50, 400) + 'ms';
}
function renderValues() {
const bx = document.getElementById('valuesGrid');
if (!bx) return;
bx.innerHTML = coreValues.map(function (by, bz) {
return '<div class="card value-card reveal-fade" style="transition-delay:' + staggerDelay(bz) + '"><div class="icon-circle">' + icon(by.icon) + '</div><h4>' + escapeHTML(by.title) + '</h4><p>' + escapeHTML(by.desc) + '</p></div>';
}).join('');
}
function renderServices() {
const ca = document.getElementById('servicesContent');
if (!ca) return;
const cb = ['savings', 'loans', 'other'];
ca.innerHTML = cb.map(function (cc) {
const cd = services.filter(function (ce) { return ce.cat === cc; });
if (!cd.length) return '';
const cf = categoryMeta[cc];
const cg = cd.map(function (ch, ci) {
return '<div class="service-card reveal-fade" style="transition-delay:' + staggerDelay(ci) + '"><div class="icon-circle">' + icon(cf.icon, 20) + '</div><h4>' + escapeHTML(ch.name) + '</h4><p>' + escapeHTML(ch.desc) + '</p><a href="#membership" data-page="membership" class="btn btn-outline btn-sm card-cta">Open an Account</a></div>';
}).join('');
return '<div class="service-group"><h3 class="service-group-title">' + escapeHTML(cf.label) + '</h3><div class="service-cards">' + cg + '</div></div>';
}).join('');
}
function renderBoard() {
const cj = document.getElementById('boardGrid');
if (!cj) return;
cj.innerHTML = boardMembers.map(function (ck, cl) {
const cm = ck.name ? escapeHTML(ck.name) : escapeHTML(ck.role);
const cn = ck.name
? '<p style="font-size:0.85rem; margin-bottom:12px;">' + escapeHTML(ck.role) + '</p>'
: '<span class="tag-soon">Profile Coming Soon</span>';
const co = ck.photo_url
? '<img src="' + escapeHTML(ck.photo_url) + '" alt="" style="width:64px; height:64px; border-radius:50%; object-fit:cover; margin:0 auto 16px; display:block;">'
: '<div class="icon-circle" style="margin:0 auto 16px; width:64px; height:64px;">' + icon('person', 28) + '</div>';
const cp = ck.name
? '<a href="#board/' + encodeURIComponent(ck.id) + '" data-page="board" class="btn btn-outline btn-sm" style="margin-top:4px;">Read About</a>'
: '';
return '<div class="card reveal-fade" style="text-align:center; transition-delay:' + staggerDelay(cl) + '">' + co + '<h4 style="font-size:0.98rem; margin-bottom:6px;">' + cm + '</h4>' + cn + cp + '</div>';
}).join('');
}
function renderBoardDetail(cq) {
const cr = document.getElementById('boardDetailContent');
if (!cr) return;
const cs = cq.photo_url
? '<img src="' + escapeHTML(cq.photo_url) + '" alt="" style="width:100%; max-width:340px; aspect-ratio:1; object-fit:cover; border-radius:var(--radius-lg); box-shadow:var(--shadow-lift); margin-bottom:32px;">'
: '<div class="icon-circle" style="width:180px; height:180px; margin-bottom:32px;">' + icon('person', 80) + '</div>';
const ct = cq.bio
? cq.bio.split(/\n\s*\n/).map(function (cu) { return '<p style="margin-bottom:16px;">' + escapeHTML(cu.trim()) + '</p>'; }).join('')
: '<p style="margin-bottom:16px;">A full biography for ' + escapeHTML(cq.name) + ' is coming soon.</p>';
cr.innerHTML =
'<div class="reveal" style="text-align:center;">' + cs + '</div>' +
'<div class="reveal">' +
'<span class="eyebrow"><span class="dot"></span>' + escapeHTML(cq.role) + '</span>' +
'<h2 style="margin-bottom:22px;">' + escapeHTML(cq.name) + '</h2>' +
ct +
'</div>';
}
function renderNews() {
const cv = document.getElementById('newsGrid');
if (!cv) return;
if (!newsItems.length) {
cv.innerHTML = '<div class="card" style="grid-column:1/-1; text-align:center; padding:50px 30px;"><p style="margin:0;">No news posted yet — check back soon.</p></div>';
return;
}
cv.innerHTML = newsItems.map(function (cw, cx) {
const cy = cw.tag ? '<span class="tag-soon" style="margin-bottom:14px;">' + escapeHTML(cw.tag) + '</span>' : '';
return '<div class="card reveal-fade" style="transition-delay:' + staggerDelay(cx) + '"><div class="icon-circle">' + icon('calendar') + '</div>' + cy + '<h4>' + escapeHTML(cw.title) + '</h4><p>' + escapeHTML(cw.body) + '</p></div>';
}).join('');
}
function reportCardHTML(cz, da) {
const dc = cz.image_url
? '<img src="' + escapeHTML(cz.image_url) + '" alt="" style="width:100%; aspect-ratio:4/3; object-fit:cover; border-radius:var(--radius-md) var(--radius-md) 0 0;">'
: '<div style="width:100%; aspect-ratio:4/3; background:var(--sky-tint); border-radius:var(--radius-md) var(--radius-md) 0 0; display:flex; align-items:center; justify-content:center; color:var(--muted);">' + icon('doc', 30) + '</div>';
const dd = cz.file_url
? '<a href="' + escapeHTML(cz.file_url) + '" target="_blank" rel="noopener" class="btn btn-outline btn-sm" style="margin-top:10px;">Report Document</a>'
: '';
return '<div class="card reveal-fade" style="padding:0; overflow:hidden; text-align:left; transition-delay:' + staggerDelay(da || 0) + '">' + dc +
'<div style="padding:22px;"><h4 style="margin-bottom:6px;">' + escapeHTML(cz.title) + '</h4>' +
(cz.desc ? '<p>' + escapeHTML(cz.desc) + '</p>' : '') + dd + '</div></div>';
}
function reportYears() {
return Array.from(new Set(reports.map(function (de) { return de.year || 'Undated'; }))).sort().reverse();
}
function renderReports(df) {
const dg = document.getElementById('reportsGrid');
if (!dg) return;
if (!reports.length) {
dg.innerHTML = '<div class="card" style="max-width:520px; margin:0 auto; text-align:center; padding:50px 30px;"><div class="icon-circle" style="margin:0 auto 18px;">' + icon('doc') + '</div><h4 style="margin-bottom:8px;">AGM Photos Coming Soon</h4><p style="margin:0;">Check back here for photos from our Annual General Meetings.</p></div>';
return;
}
if (df) {
const dh = reports.filter(function (di) { return String(di.year || 'Undated') === String(df); });
dg.innerHTML = !dh.length
? '<div class="card" style="max-width:520px; margin:0 auto; text-align:center; padding:50px 30px;"><h4 style="margin-bottom:8px;">No Photos for ' + escapeHTML(df) + ' Yet</h4><p style="margin:0;">Try another year, or check back soon.</p></div>'
: '<div class="grid grid-3">' + dh.map(reportCardHTML).join('') + '</div>';
return;
}
dg.innerHTML = reportYears().map(function (dj) {
const dk = reports.filter(function (dl) { return (dl.year || 'Undated') === dj; });
return '<div class="service-group"><h3 class="service-group-title">' + escapeHTML(dj) + '</h3><div class="grid grid-3">' + dk.map(reportCardHTML).join('') + '</div></div>';
}).join('');
}
function renderReportsYearPills(dm) {
const dn = document.getElementById('reportsYearPills');
if (!dn) return;
const dp = reportYears();
if (!dp.length) { dn.innerHTML = ''; return; }
const dq = '<a href="#reports" data-page="reports" class="btn btn-sm ' + (!dm ? 'btn-primary' : 'btn-outline') + '">All Years</a>';
dn.innerHTML = dq + dp.map(function (dr) {
const ds = String(dm) === String(dr);
return '<a href="#reports/' + encodeURIComponent(dr) + '" data-page="reports" class="btn btn-sm ' + (ds ? 'btn-primary' : 'btn-outline') + '">' + escapeHTML(dr) + '</a>';
}).join('');
}
function populateReportsYearMenu() {
const dt = document.getElementById('reportsYearMenu');
if (!dt) return;
const du = reportYears();
dt.innerHTML = '<a href="#reports">All Years</a>' + du.map(function (dv) {
return '<a href="#reports/' + encodeURIComponent(dv) + '">' + escapeHTML(dv) + '</a>';
}).join('');
}
function renderForms() {
const dw = document.getElementById('formsGrid');
if (!dw) return;
dw.innerHTML = downloadForms.map(function (dx, dy) {
const dz = dx.file_url
? '<a href="' + escapeHTML(dx.file_url) + '" target="_blank" rel="noopener" class="btn btn-outline btn-sm" style="margin-top:2px;">Download' + icon('arrow', 15) + '</a>'
: '<span class="tag-soon">Available at Our Office</span>';
return '<div class="card reveal-fade" style="display:flex; gap:18px; align-items:flex-start; transition-delay:' + staggerDelay(dy) + '"><div class="icon-circle" style="flex-shrink:0;">' + icon('doc') + '</div><div><h4 style="margin-bottom:6px;">' + escapeHTML(dx.name) + '</h4><p style="margin-bottom:10px;">' + escapeHTML(dx.desc) + '</p>' + dz + '</div></div>';
}).join('');
}
let faqActiveCategory = null;
let faqSearchTerm = '';
function faqCategories() {
return Array.from(new Set(faqs.map(function (ea) { return ea.category || 'General'; })));
}
function renderFaqPills() {
const eb = document.getElementById('faqCategoryPills');
if (!eb) return;
const ec = faqCategories();
const ed = '<button type="button" class="btn btn-sm ' + (!faqActiveCategory ? 'btn-primary' : 'btn-outline') + '" data-faq-cat="">All</button>';
eb.innerHTML = ed + ec.map(function (ee) {
return '<button type="button" class="btn btn-sm ' + (faqActiveCategory === ee ? 'btn-primary' : 'btn-outline') + '" data-faq-cat="' + escapeHTML(ee) + '">' + escapeHTML(ee) + '</button>';
}).join('');
}
function renderFaqList() {
const ef = document.getElementById('faqList');
if (!ef) return;
const eg = faqSearchTerm.trim().toLowerCase();
const eh = faqs.filter(function (ei) {
const ej = !faqActiveCategory || (ei.category || 'General') === faqActiveCategory;
const ek = !eg || (ei.question + ' ' + ei.answer).toLowerCase().indexOf(eg) !== -1;
return ej && ek;
});
if (!eh.length) {
ef.innerHTML = '<p style="text-align:center; color:var(--muted); padding:30px 0;">No matching questions — try a different search or category.</p>';
return;
}
ef.innerHTML = eh.map(function (em, en) {
return '<details class="numbered-step-wrap reveal" style="transition-delay:' + staggerDelay(en) + '"><summary class="numbered-step" style="gap:14px;"><div class="step-body"><h4 style="margin-bottom:0;">' + escapeHTML(em.question) + '</h4></div>' +
'<svg class="step-chevron" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></summary>' +
'<div class="step-extra"><div class="step-extra-inner" style="padding-left:0;">' + escapeHTML(em.answer) + '</div></div></details>';
}).join('');
}
function renderFaqs() {
renderFaqPills();
renderFaqList();
}
document.addEventListener('click', function (eo) {
const ep = eo.target.closest('[data-faq-cat]');
if (!ep) return;
faqActiveCategory = ep.dataset.faqCat || null;
renderFaqs();
observeReveals();
});
document.addEventListener('input', function (eq) {
if (eq.target && eq.target.id === 'faqSearch') {
faqSearchTerm = eq.target.value;
renderFaqList();
observeReveals();
}
});
function renderBranches() {
const er = document.getElementById('branchesGrid');
if (!er) return;
if (!branches.length) {
er.innerHTML = '<div class="card" style="grid-column:1/-1; text-align:center; padding:50px 30px;"><p style="margin:0;">Branch details coming soon.</p></div>';
return;
}
er.innerHTML = branches.map(function (es, et) {
const eu = es.photo_url
? '<img src="' + escapeHTML(es.photo_url) + '" alt="" style="width:100%; aspect-ratio:4/3; object-fit:cover; border-radius:var(--radius-md) var(--radius-md) 0 0;">'
: '<div style="width:100%; aspect-ratio:4/3; background:var(--sky-tint); border-radius:var(--radius-md) var(--radius-md) 0 0; display:flex; align-items:center; justify-content:center; color:var(--slate-blue); opacity:0.55;">' + icon('pin', 40) + '</div>';
const ew = es.is_headquarters ? '<span class="tag-soon" style="margin-bottom:10px;">Headquarters</span>' : '';
const ex = (es.tags || '').split(',').map(function (ey) { return ey.trim(); }).filter(Boolean)
.map(function (ez) { return '<span class="tag-soon" style="margin:0 6px 6px 0;">' + escapeHTML(ez) + '</span>'; }).join('');
return '<div class="card reveal-fade" style="padding:0; overflow:hidden; text-align:left; transition-delay:' + staggerDelay(et) + '">' + eu +
'<div style="padding:24px;">' + ew +
'<h4 style="margin-bottom:12px;">' + escapeHTML(es.name) + '</h4>' +
(es.address ? '<p style="font-size:0.88rem; margin-bottom:6px; display:flex; gap:8px;">' + icon('pin', 16) + escapeHTML(es.address) + '</p>' : '') +
(es.phone ? '<p style="font-size:0.88rem; margin-bottom:6px; display:flex; gap:8px;">' + icon('phone', 16) + escapeHTML(es.phone) + '</p>' : '') +
(es.hours ? '<p style="font-size:0.88rem; margin-bottom:14px; display:flex; gap:8px;">' + icon('clock', 16) + escapeHTML(es.hours) + '</p>' : '') +
'<div style="margin-bottom:6px;">' + ex + '</div>' +
'<a href="#contact" data-page="contact" class="btn btn-outline btn-sm card-cta">Contact Us</a>' +
'</div></div>';
}).join('');
}
function renderTestimonials() {
const fa = document.getElementById('testimonialsGrid');
if (!fa) return;
if (!testimonials.length) {
fa.innerHTML = '<div class="card" style="grid-column:1/-1; text-align:center; padding:50px 30px;"><p style="margin:0;">Member reviews are on the way.</p></div>';
return;
}
fa.innerHTML = testimonials.map(function (fb, fc) {
const fd = Math.max(0, Math.min(5, parseInt(fb.rating, 10) || 5));
const fe = Array.from({ length: 5 }).map(function (ff, fg) {
const fh = fg < fd;
return '<svg viewBox="0 0 24 24" width="14" height="14" fill="' + (fh ? 'currentColor' : 'none') + '" stroke="currentColor" stroke-width="1.6" class="' + (fh ? '' : 'star-off') + '">' + icons.star + '</svg>';
}).join('');
const fi = fb.photo_url
? '<img src="' + escapeHTML(fb.photo_url) + '" alt="">'
: icon('person', 20);
return '<div class="card testimonial-card reveal-fade" style="transition-delay:' + staggerDelay(fc) + '">' +
'<div class="testimonial-stars">' + fe + '</div>' +
'<p class="testimonial-message">"' + escapeHTML(fb.message) + '"</p>' +
'<div class="testimonial-person">' +
'<div class="testimonial-avatar">' + fi + '</div>' +
'<div><div class="testimonial-name">' + escapeHTML(fb.name) + '</div>' +
(fb.role ? '<div class="testimonial-role">' + escapeHTML(fb.role) + '</div>' : '') + '</div>' +
'</div></div>';
}).join('');
}
function formatFCFA(fj) {
return Math.round(fj).toLocaleString('en-US') + ' FCFA';
}
function calcLoanRepayment(fk, fl) {
const fm = parseFloat(siteContent.loan_interest_rate_annual) || 15;
const fn = fm / 100 / 12;
const fo = fn === 0 ? fk / fl : (fk * fn * Math.pow(1 + fn, fl)) / (Math.pow(1 + fn, fl) - 1);
const fp = fo * fl;
return { monthly: fo, totalInterest: fp - fk, totalPayable: fp };
}
function calcSavingsGrowth(fq, fr) {
const fs = parseFloat(siteContent.savings_interest_rate_annual) || 5;
const ft = fs / 100 / 12;
const fu = ft === 0 ? fq * fr : fq * ((Math.pow(1 + ft, fr) - 1) / ft);
const fv = fq * fr;
return { futureValue: fu, totalContributed: fv, interestEarned: fu - fv };
}
let calcMode = 'loan';
function updateCalculator() {
const fw = document.getElementById('calcLoanAmount');
if (!fw) return;
const fx = Number(fw.value);
const fy = Number(document.getElementById('calcLoanTerm').value);
const fz = Number(document.getElementById('calcSavingsAmount').value);
const ga = Number(document.getElementById('calcSavingsTerm').value);
document.getElementById('calcLoanAmountLabel').textContent = formatFCFA(fx);
document.getElementById('calcLoanTermLabel').textContent = fy + ' Months';
document.getElementById('calcSavingsAmountLabel').textContent = formatFCFA(fz);
document.getElementById('calcSavingsTermLabel').textContent = ga + ' Months';
const gb = document.getElementById('calcOutput');
if (calcMode === 'loan') {
const gc = calcLoanRepayment(fx, fy);
gb.innerHTML =
'<div style="font-size:0.8rem; opacity:0.7; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:6px;">Estimated Monthly Repayment</div>' +
'<div class="calc-result-value">' + formatFCFA(gc.monthly) + '</div>' +
'<div class="calc-output-row"><span style="opacity:0.75;">Total Interest (est.)</span><strong>' + formatFCFA(gc.totalInterest) + '</strong></div>' +
'<div class="calc-output-row"><span style="opacity:0.75;">Total Payable</span><strong>' + formatFCFA(gc.totalPayable) + '</strong></div>';
} else {
const gd = calcSavingsGrowth(fz, ga);
gb.innerHTML =
'<div style="font-size:0.8rem; opacity:0.7; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:6px;">Projected Savings</div>' +
'<div class="calc-result-value">' + formatFCFA(gd.futureValue) + '</div>' +
'<div class="calc-output-row"><span style="opacity:0.75;">Total Contributed</span><strong>' + formatFCFA(gd.totalContributed) + '</strong></div>' +
'<div class="calc-output-row"><span style="opacity:0.75;">Interest Earned (est.)</span><strong>' + formatFCFA(gd.interestEarned) + '</strong></div>';
}
}
function initCalculator() {
const ge = document.getElementById('calcModeLoanBtn');
const gf = document.getElementById('calcModeSavingsBtn');
const gg = document.getElementById('calcLoanPanel');
const gh = document.getElementById('calcSavingsPanel');
if (!ge) return;
ge.addEventListener('click', function () {
calcMode = 'loan';
ge.className = 'btn btn-primary btn-sm';
gf.className = 'btn btn-outline btn-sm';
gg.hidden = false;
gh.hidden = true;
updateCalculator();
});
gf.addEventListener('click', function () {
calcMode = 'savings';
gf.className = 'btn btn-primary btn-sm';
ge.className = 'btn btn-outline btn-sm';
gh.hidden = false;
gg.hidden = true;
updateCalculator();
});
['calcLoanAmount', 'calcLoanTerm', 'calcSavingsAmount', 'calcSavingsTerm'].forEach(function (gi) {
document.getElementById(gi).addEventListener('input', updateCalculator);
});
updateCalculator();
}
document.addEventListener('submit', function (gj) {
if (gj.target && gj.target.id === 'applicationForm') {
gj.preventDefault();
submitApplication(gj.target);
}
});
async function submitApplication(gk) {
const gl = document.getElementById('applicationStatus');
const gm = gk.querySelector('button[type="submit"]');
const gn = gk.elements.full_name.value.trim();
const go = gk.elements.phone.value.trim();
if (!gn || !go) return;
const gp = {
full_name: gn,
phone: go,
email: gk.elements.email.value.trim() || null,
account_type: gk.elements.account_type.value,
message: gk.elements.message.value.trim() || null,
terms_accepted: !!(gk.elements.terms_accepted && gk.elements.terms_accepted.checked)
};
gm.disabled = true;
gl.textContent = '';
gl.style.color = '';
if (!db) {
gl.textContent = "Online submission isn't connected yet — please call or WhatsApp us instead.";
gm.disabled = false;
return;
}
const { error } = await db.from('membership_applications').insert(gp);
gm.disabled = false;
if (error) {
gl.textContent = 'Something went wrong — please call us instead, or try again.';
gl.style.color = 'var(--danger, #B3432B)';
return;
}
gk.reset();
gl.textContent = "Application received — we'll be in touch soon. Thank you!";
gl.style.color = 'var(--tea-green)';
}
function openAccordion(gq) {
const gr = gq.querySelector('.step-extra');
if (!gr || gq.dataset.animating) return;
gq.dataset.animating = '1';
gq.setAttribute('open', '');
gq.classList.add('is-open');
const gs = gr.scrollHeight;
gr.style.height = '0px';
requestAnimationFrame(function () {
requestAnimationFrame(function () { gr.style.height = gs + 'px'; });
});
gr.addEventListener('transitionend', function handler(gt) {
if (gt.propertyName && gt.propertyName !== 'height') return;
gr.style.height = '';
gr.removeEventListener('transitionend', handler);
delete gq.dataset.animating;
});
}
function closeAccordion(gu) {
const gv = gu.querySelector('.step-extra');
if (!gv || gu.dataset.animating) return;
gu.dataset.animating = '1';
gu.classList.remove('is-open');
gv.style.height = gv.scrollHeight + 'px';
requestAnimationFrame(function () {
requestAnimationFrame(function () { gv.style.height = '0px'; });
});
gv.addEventListener('transitionend', function handler(gw) {
if (gw.propertyName && gw.propertyName !== 'height') return;
gu.removeAttribute('open');
gv.style.height = '';
gv.removeEventListener('transitionend', handler);
delete gu.dataset.animating;
});
}
document.addEventListener('click', function (gx) {
const gy = gx.target.closest('.numbered-step-wrap > summary');
if (!gy) return;
gx.preventDefault();
const gz = gy.parentElement;
if (!gz.querySelector('.step-extra') || gz.dataset.animating) return;
if (gz.hasAttribute('open')) {
closeAccordion(gz);
return;
}
if (gz.parentElement) {
Array.from(gz.parentElement.children).forEach(function (ha) {
if (ha !== gz && ha.classList && ha.classList.contains('numbered-step-wrap') && ha.hasAttribute('open')) {
closeAccordion(ha);
}
});
}
openAccordion(gz);
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
const hb = pages.filter(function (hc) { return hc.classList.contains('active'); })[0];
if (!hb) return;
const hd = (window.location.hash || '').slice(1);
const he = hd.indexOf('/');
const hf = he === -1 ? null : decodeURIComponent(hd.slice(he + 1));
if (hb.id === 'reports') {
renderReports(hf);
renderReportsYearPills(hf);
}
if (hb.id === 'board-detail' && hf) {
const hg = boardMembers.find(function (hh) { return String(hh.id) === String(hf); });
if (hg) renderBoardDetail(hg);
}
}
const pages = Array.from(document.querySelectorAll('.page'));
const navLinks = Array.from(document.querySelectorAll('.nav-link'));
function showPage(hi, hj) {
const hk = pages.some(function (hl) { return hl.id === hi; });
const hm = hk ? hi : 'home';
pages.filter(function (hn) { return hn.id !== hm; }).forEach(function (ho) { ho.classList.remove('active'); });
pages.filter(function (hp) { return hp.id === hm; }).forEach(function (hq) { hq.classList.add('active'); });
navLinks.forEach(function (hr) { hr.classList.remove('active'); });
navLinks.filter(function (hs) { return hs.dataset.page === hm; }).forEach(function (ht) { ht.classList.add('active'); });
if (hm === 'reports') {
renderReports(hj || null);
renderReportsYearPills(hj || null);
}
if (hm === 'terms') {
switchLegalTab(hj === 'cookies' ? 'cookies' : 'terms');
}
const hu = pages.filter(function (hv) { return hv.id === hm; })[0];
const hw = hu ? hu.dataset.title : 'Home';
document.title = (hm === 'home' ? 'Tole Tea Cooperative Credit Union Ltd | TTCCUL' : hw + ' | TTCCUL');
if (hm === 'contact' && hj === 'faq') {
requestAnimationFrame(function () {
const hx = document.getElementById('faqSection');
if (hx) hx.scrollIntoView({ block: 'start' });
});
} else {
window.scrollTo(0, 0);
}
closeMobileMenu();
requestAnimationFrame(observeReveals);
}
function showBoardDetail(hy) {
const hz = boardMembers.find(function (ia) { return String(ia.id) === String(hy); });
if (!hz || !hz.name) {
showPage('board');
return;
}
renderBoardDetail(hz);
showPage('board-detail');
document.title = hz.name + ' | TTCCUL';
}
function handleHash() {
const ib = (window.location.hash || '#home').slice(1);
const ic = ib.indexOf('/');
const ie = ic === -1 ? ib : ib.slice(0, ic);
const ig = ic === -1 ? null : decodeURIComponent(ib.slice(ic + 1));
if (ie === 'board' && ig) {
showBoardDetail(ig);
return;
}
showPage(ie, ig);
}
window.addEventListener('hashchange', handleHash);
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
navToggle.addEventListener('click', function () {
const ih = mainNav.classList.toggle('open');
navToggle.classList.toggle('open', ih);
navToggle.setAttribute('aria-expanded', ih);
});
function closeMobileMenu() {
mainNav.classList.remove('open');
navToggle.classList.remove('open');
navToggle.setAttribute('aria-expanded', 'false');
}
const siteHeader = document.getElementById('siteHeader');
window.addEventListener('scroll', function () {
siteHeader.classList.toggle('scrolled', window.scrollY > 10);
});
let revealObserver;
function observeReveals() {
const ii = document.querySelectorAll('.page.active .reveal:not(.visible), .page.active .reveal-fade:not(.visible)');
if (!('IntersectionObserver' in window)) {
ii.forEach(function (ij) { ij.classList.add('visible'); });
return;
}
if (!revealObserver) {
revealObserver = new IntersectionObserver(function (ik) {
ik.forEach(function (il) {
if (il.isIntersecting) {
il.target.classList.add('visible');
revealObserver.unobserve(il.target);
}
});
}, { threshold: 0.15 });
}
ii.forEach(function (im) { revealObserver.observe(im); });
}
document.addEventListener('submit', function (io) {
if (io.target && io.target.id === 'contactForm') {
io.preventDefault();
const ip = io.target;
const iq = ip.elements.name.value.trim();
const ir = ip.elements.email.value.trim();
const is = ip.elements.message.value.trim();
const it = encodeURIComponent('Website enquiry from ' + iq);
const iu = encodeURIComponent(is + '\n\n— ' + iq + ' (' + ir + ')');
window.location.href = 'mailto:' + siteContent.contact_email + '?subject=' + it + '&body=' + iu;
}
});
function switchLegalTab(iv) {
const iw = document.getElementById('termsTabBtn');
const ix = document.getElementById('cookiesTabBtn');
const iy = document.getElementById('termsTabPanel');
const iz = document.getElementById('cookiesTabPanel');
if (!iw || !ix || !iy || !iz) return;
const ja = iv === 'cookies';
iw.classList.toggle('active', !ja);
ix.classList.toggle('active', ja);
iy.classList.toggle('active', !ja);
iz.classList.toggle('active', ja);
}
document.addEventListener('click', function (jb) {
const jc = jb.target.closest('.tab-btn[data-tab]');
if (!jc) return;
switchLegalTab(jc.dataset.tab);
if (history.replaceState) {
history.replaceState(null, '', jc.dataset.tab === 'cookies' ? '#terms/cookies' : '#terms');
}
});
(function () {
const jd = document.getElementById('cookieBanner');
if (!jd) return;
const je = 'ttccul_cookie_consent';
let jf = null;
try { jf = localStorage.getItem(je); } catch (jg) { jf = null; }
if (!jf) {
setTimeout(function () {
jd.classList.add('visible');
document.body.classList.add('cookie-banner-visible');
}, 700);
}
function dismiss(jh) {
try { localStorage.setItem(je, jh); } catch (ji) {  }
jd.classList.remove('visible');
document.body.classList.remove('cookie-banner-visible');
}
const jj = document.getElementById('cookieAcceptBtn');
const jk = document.getElementById('cookieDeclineBtn');
if (jj) jj.addEventListener('click', function () { dismiss('accepted'); });
if (jk) jk.addEventListener('click', function () { dismiss('declined'); });
})();
(function () {
try {
console.log('%cStop!', 'font-size:46px; font-weight:800; color:#B3432B;');
console.log('%cThis is a browser feature meant for developers. If someone told you to paste something here to "verify your account," get a refund, or unlock a feature, it is a scam — pasting it will give them access to your account.', 'font-size:15px; color:#0F2C4C; line-height:1.6;');
console.log('%cTTCCUL will never ask you to paste anything into this console.', 'font-size:15px; font-weight:700; color:#0F2C4C;');
} catch (jl) {  }
})();
renderAll();
handleHash();
observeReveals();
initCalculator();
loadContent().then(function (jm) {
if (jm) {
renderAll();
refreshDynamicContent();
observeReveals();
updateCalculator();
}
});