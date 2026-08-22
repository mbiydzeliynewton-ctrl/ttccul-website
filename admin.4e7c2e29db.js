const SUPABASE_URL = "https://rsphnnhihngekkjzbeji.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzcGhubmhpaG5nZWtranpiZWppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYzMjA4NTAsImV4cCI6MjEwMTg5Njg1MH0.-keZ2nlMghxPxEYXVQ65RQlWTq0s3XiomeN7ptLY4xA";
const isConfigured = typeof supabase !== 'undefined' && SUPABASE_URL.indexOf('YOUR_') !== 0;
const db = isConfigured ? supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;
function escapeHTML(a) {
if (a === null || a === undefined) return '';
return String(a).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function showToast(c, d) {
const g = document.getElementById('toast');
g.textContent = c;
g.classList.toggle('danger', !!d);
g.hidden = false;
clearTimeout(showToast._timer);
showToast._timer = setTimeout(function () { g.hidden = true; }, 3200);
}
const tableConfigs = {
services: {
label: 'Services', table: 'services', orderBy: 'sort_order',
fields: [
{ key: 'name', label: 'Name', type: 'text', required: true },
{ key: 'category', label: 'Category', type: 'select', options: [['savings', 'Savings & Deposits'], ['loans', 'Loans & Credit'], ['other', 'Other Financial Services']], default: 'savings' },
{ key: 'description', label: 'Description', type: 'textarea', required: true },
{ key: 'sort_order', label: 'Sort Order (lower shows first)', type: 'number', default: 0 }
],
listTitle: function (h) { return h.name; },
listSubtitle: function (i) { return i.category; }
},
core_values: {
label: 'Core Values', table: 'core_values', orderBy: 'sort_order',
fields: [
{ key: 'title', label: 'Title', type: 'text', required: true },
{ key: 'description', label: 'Description', type: 'textarea', required: true },
{ key: 'icon', label: 'Icon', type: 'select', options: [['shield', 'Shield'], ['users', 'People'], ['check', 'Checkmark'], ['scale', 'Scale'], ['leaf', 'Leaf']], default: 'leaf' },
{ key: 'sort_order', label: 'Sort Order', type: 'number', default: 0 }
],
listTitle: function (j) { return j.title; }
},
board_members: {
label: 'Board Members', table: 'board_members', orderBy: 'sort_order',
fields: [
{ key: 'role', label: 'Role', type: 'text', required: true },
{ key: 'name', label: 'Name (leave blank to show "Profile Coming Soon")', type: 'text' },
{ key: 'photo_url', label: 'Photo', type: 'file', bucket: 'board-photos', accept: 'image/png,image/jpeg,image/webp,image/gif', preview: 'image', maxMB: 5 },
{ key: 'bio', label: 'About (shown on their "Read About" page — leave blank to hide that button)', type: 'textarea' },
{ key: 'sort_order', label: 'Sort Order', type: 'number', default: 0 }
],
listTitle: function (k) { return k.role; },
listSubtitle: function (l) { return l.name || 'No name set'; }
},
news_items: {
label: 'News & Updates', table: 'news_items', orderBy: 'sort_order',
fields: [
{ key: 'title', label: 'Title', type: 'text', required: true },
{ key: 'body', label: 'Body', type: 'textarea', required: true },
{ key: 'tag', label: 'Tag (e.g. a year, or "Coming Soon")', type: 'text' },
{ key: 'sort_order', label: 'Sort Order', type: 'number', default: 0 }
],
listTitle: function (n) { return n.title; }
},
testimonials: {
label: 'Members Reviews', table: 'testimonials', orderBy: 'sort_order',
fields: [
{ key: 'name', label: 'Member Name (e.g. "Grace M." — first name + initial reads well)', type: 'text', required: true },
{ key: 'role', label: 'Descriptor (e.g. "Member since 2019")', type: 'text' },
{ key: 'message', label: 'Review', type: 'textarea', required: true },
{ key: 'rating', label: 'Rating', type: 'select', asNumber: true, options: [['5', '5 Stars'], ['4', '4 Stars'], ['3', '3 Stars'], ['2', '2 Stars'], ['1', '1 Star']], default: '5' },
{ key: 'photo_url', label: 'Photo (optional)', type: 'file', bucket: 'site-images', accept: 'image/png,image/jpeg,image/webp,image/gif', preview: 'image', maxMB: 5 },
{ key: 'sort_order', label: 'Sort Order', type: 'number', default: 0 }
],
listTitle: function (p) { return p.name; },
listSubtitle: function (q) { return q.role || ''; }
},
reports: {
label: 'Annual Reports (AGM Sessions)', table: 'reports', orderBy: 'sort_order',
fields: [
{ key: 'title', label: 'Title (e.g. "2025 Annual General Meeting")', type: 'text', required: true },
{ key: 'year', label: 'Year', type: 'text', required: true },
{ key: 'image_url', label: 'AGM Photo', type: 'file', bucket: 'agm-photos', accept: 'image/png,image/jpeg,image/webp,image/gif', preview: 'image', maxMB: 8 },
{ key: 'description', label: 'Caption / Description', type: 'textarea' },
{ key: 'file_url', label: 'Report Document', type: 'file', bucket: 'forms-files', accept: '.pdf,.doc,.docx', preview: 'file', maxMB: 10 },
{ key: 'sort_order', label: 'Sort Order', type: 'number', default: 0 }
],
listTitle: function (s) { return s.title; },
listSubtitle: function (u) { return u.year || ''; }
},
forms: {
label: 'Downloadable Forms', table: 'forms', orderBy: 'sort_order',
fields: [
{ key: 'name', label: 'Name', type: 'text', required: true },
{ key: 'description', label: 'Description', type: 'textarea' },
{ key: 'file_url', label: 'File', type: 'file', bucket: 'forms-files', accept: '.pdf,.doc,.docx', preview: 'file', maxMB: 10 },
{ key: 'sort_order', label: 'Sort Order', type: 'number', default: 0 }
],
listTitle: function (w) { return w.name; }
},
faqs: {
label: 'FAQs', table: 'faqs', orderBy: 'sort_order',
fields: [
{ key: 'question', label: 'Question', type: 'text', required: true },
{ key: 'answer', label: 'Answer', type: 'textarea', required: true },
{ key: 'category', label: 'Category', type: 'select', options: [['Membership', 'Membership'], ['Loans', 'Loans'], ['Savings', 'Savings'], ['Akawo', 'Akawo'], ['General', 'General']], default: 'General' },
{ key: 'sort_order', label: 'Sort Order', type: 'number', default: 0 }
],
listTitle: function (x) { return x.question; },
listSubtitle: function (y) { return y.category; }
},
branches: {
label: 'Branches', table: 'branches', orderBy: 'sort_order',
fields: [
{ key: 'name', label: 'Branch Name', type: 'text', required: true },
{ key: 'address', label: 'Address', type: 'text' },
{ key: 'phone', label: 'Phone', type: 'text' },
{ key: 'hours', label: 'Hours', type: 'text' },
{ key: 'is_headquarters', label: 'This is the Headquarters', type: 'select', asBoolean: true, options: [['false', 'No'], ['true', 'Yes']], default: 'false' },
{ key: 'tags', label: 'Tags (comma-separated — e.g. "Full Loan Services, Customer Care")', type: 'text' },
{ key: 'photo_url', label: 'Photo', type: 'file', bucket: 'branch-photos', accept: 'image/png,image/jpeg,image/webp,image/gif', preview: 'image', maxMB: 5 },
{ key: 'sort_order', label: 'Sort Order', type: 'number', default: 0 }
],
listTitle: function (z) { return z.name; },
listSubtitle: function (aa) { return aa.is_headquarters ? 'Headquarters' : (aa.address || ''); }
},
membership_applications: {
label: 'Membership Applications', table: 'membership_applications', orderBy: 'created_at', orderDesc: true,
fields: [
{ key: 'created_at', label: 'Submitted On', type: 'readonly', format: 'datetime' },
{ key: 'full_name', label: 'Full Name', type: 'readonly' },
{ key: 'phone', label: 'Phone', type: 'readonly' },
{ key: 'email', label: 'Email', type: 'readonly' },
{ key: 'account_type', label: 'Account Type', type: 'readonly', options: [['shares', 'Shares'], ['savings', 'Savings'], ['deposit', 'Deposit'], ['group', 'Group'], ['minors', 'Minors'], ['other', 'Other']] },
{ key: 'message', label: 'Message / Notes', type: 'readonly' },
{ key: 'terms_accepted', label: 'Agreed to Terms & Conditions', type: 'readonly', asBoolean: true },
{ key: 'status', label: 'Status', type: 'select', options: [['new', 'New'], ['contacted', 'Contacted'], ['completed', 'Completed']], default: 'new' }
],
listTitle: function (ab) { return ab.full_name; },
listSubtitle: function (ac) { return (ac.phone || '') + ' — ' + (ac.status || 'new'); }
}
};
const siteContentGroups = [
{ title: 'Hero Section', fields: [
['hero_video_url', 'Background Video (MP4 or WebM — takes priority over the image below if both are set)', 'video', 'hero-video', 'video/mp4,video/webm', 30],
['hero_image_url', 'Background Image (used if no video is set — leave both empty to keep the default logo mark)', 'image', 'agm-photos', 'image/png,image/jpeg,image/webp,image/gif', 8],
['hero_badge', 'Badge Text', 'text'], ['hero_headline', 'Headline', 'text'], ['hero_lead', 'Lead Paragraph', 'textarea']
]},
{ title: 'Home Page Stats', fields: [
['stat1_value', 'Stat 1 Value', 'text'], ['stat1_label', 'Stat 1 Label', 'text'],
['stat2_value', 'Stat 2 Value', 'text'], ['stat2_label', 'Stat 2 Label', 'text'],
['stat3_value', 'Stat 3 Value', 'text'], ['stat3_label', 'Stat 3 Label', 'text'],
['stat4_value', 'Stat 4 Value', 'text'], ['stat4_label', 'Stat 4 Label', 'text']
]},
{ title: 'Mission & Vision', fields: [
['mission_text', 'Mission Statement', 'textarea'],
['mission_image_url', 'Mission Image', 'image', 'site-images', 'image/png,image/jpeg,image/webp,image/gif', 8],
['vision_text', 'Vision Statement', 'textarea'],
['vision_image_url', 'Vision Image', 'image', 'site-images', 'image/png,image/jpeg,image/webp,image/gif', 8]
]},
{ title: 'About Page Overview', fields: [
['about_overview', 'Overview — leave a blank line between paragraphs', 'textarea-lg'],
['about_image_url', 'Overview Image', 'image', 'site-images', 'image/png,image/jpeg,image/webp,image/gif', 8]
]},
{ title: 'General Manager Message', fields: [
['gm_name', 'Name', 'text'], ['gm_title', 'Title', 'text'], ['gm_quote', 'Quote', 'textarea'],
['gm_photo_url', 'Photo', 'image', 'site-images', 'image/png,image/jpeg,image/webp,image/gif', 5]
]},
{ title: 'Page Banner Images', fields: [
['about_hero_image_url', 'About Us Page', 'image', 'site-images', 'image/png,image/jpeg,image/webp,image/gif', 8],
['services_hero_image_url', 'Services Page', 'image', 'site-images', 'image/png,image/jpeg,image/webp,image/gif', 8],
['membership_hero_image_url', 'Membership Page', 'image', 'site-images', 'image/png,image/jpeg,image/webp,image/gif', 8],
['branches_hero_image_url', 'Branches Page', 'image', 'site-images', 'image/png,image/jpeg,image/webp,image/gif', 8],
['reports_hero_image_url', 'Annual Reports Page', 'image', 'site-images', 'image/png,image/jpeg,image/webp,image/gif', 8],
['contact_hero_image_url', 'Contact Us Page', 'image', 'site-images', 'image/png,image/jpeg,image/webp,image/gif', 8]
]},
{ title: 'Contact Information', fields: [
['contact_phone_1', 'Phone 1', 'text'], ['contact_phone_2', 'Phone 2', 'text'],
['contact_email', 'Email', 'text'], ['contact_address', 'Address', 'text'],
['office_hours', 'Office Hours', 'text'], ['whatsapp_number', 'WhatsApp Number (digits only, with country code)', 'text'],
['social_facebook_url', 'Facebook URL', 'text'], ['social_instagram_url', 'Instagram URL', 'text'],
['social_twitter_url', 'X (Twitter) URL', 'text'], ['social_linkedin_url', 'LinkedIn URL', 'text']
]},
{ title: 'Terms & Cookies Policy', fields: [
['terms_conditions_text', 'Terms & Conditions — leave a blank line between sections', 'textarea-lg'],
['cookies_policy_text', 'Cookie Policy — leave a blank line between sections', 'textarea-lg']
]}
];
let currentSection = 'services';
let currentRows = [];
let editingId = null; 
if (!isConfigured) {
document.getElementById('configBanner').hidden = false;
document.getElementById('loginBtn').disabled = true;
}
document.getElementById('loginForm').addEventListener('submit', async function (ad) {
ad.preventDefault();
if (!db) return;
const ae = document.getElementById('login-email').value.trim();
const af = document.getElementById('login-password').value;
const ag = document.getElementById('loginError');
ag.hidden = true;
const ah = document.getElementById('loginBtn');
ah.disabled = true;
ah.innerHTML = '<span class="spinner"></span> Signing in…';
const { error } = await db.auth.signInWithPassword({ email: ae, password: af });
ah.disabled = false;
ah.textContent = 'Sign In';
if (error) {
ag.textContent = error.message === 'Invalid login credentials' ? 'Incorrect email or password.' : error.message;
ag.hidden = false;
}
});
const mobileNavToggle = document.getElementById('mobileNavToggle');
const sidebarPanel = document.getElementById('sidebarPanel');
mobileNavToggle.addEventListener('click', function () {
const ai = sidebarPanel.classList.toggle('open');
mobileNavToggle.classList.toggle('open', ai);
mobileNavToggle.setAttribute('aria-expanded', ai);
});
function closeMobileNav() {
sidebarPanel.classList.remove('open');
mobileNavToggle.classList.remove('open');
mobileNavToggle.setAttribute('aria-expanded', 'false');
}
document.getElementById('logoutBtn').addEventListener('click', async function () {
if (db) await db.auth.signOut();
});
if (db) {
db.auth.onAuthStateChange(function (aj, ak) {
if (ak && ak.user) {
document.getElementById('loginScreen').hidden = true;
document.getElementById('dashboardScreen').hidden = false;
document.getElementById('currentUserEmail').textContent = ak.user.email;
selectSection('services');
} else {
document.getElementById('dashboardScreen').hidden = true;
document.getElementById('loginScreen').hidden = false;
}
});
}
document.getElementById('sidebarNav').addEventListener('click', function (al) {
const am = al.target.closest('button[data-section]');
if (am) selectSection(am.dataset.section);
});
function selectSection(an) {
currentSection = an;
editingId = null;
closeMobileNav();
Array.from(document.querySelectorAll('#sidebarNav button')).forEach(function (ao) {
ao.classList.toggle('active', ao.dataset.section === an);
});
document.getElementById('crudPanel').hidden = true;
document.getElementById('siteContentPanel').hidden = true;
document.getElementById('accountPanel').hidden = true;
if (an === 'site_content') {
document.getElementById('siteContentPanel').hidden = false;
loadSiteContent();
} else if (an === 'account') {
document.getElementById('accountPanel').hidden = false;
} else {
document.getElementById('crudPanel').hidden = false;
document.getElementById('crud-form-wrap').hidden = true;
const ap = tableConfigs[an];
document.getElementById('sectionTitle').textContent = ap.label;
loadTable(an);
}
}
async function loadTable(aq) {
const ar = tableConfigs[aq];
const as = document.getElementById('crud-list');
as.innerHTML = '<p style="color:var(--muted); font-size:0.88rem;">Loading…</p>';
const { data, error } = await db.from(ar.table).select('*').order(ar.orderBy, { ascending: !ar.orderDesc });
if (error) { showToast('Could not load ' + ar.label + ': ' + error.message, true); as.innerHTML = ''; return; }
currentRows = data || [];
renderList();
}
function renderList() {
const at = tableConfigs[currentSection];
const au = document.getElementById('crud-list');
if (!currentRows.length) {
au.innerHTML = '<div class="admin-empty">Nothing here yet. Click "+ Add New" to create the first entry.</div>';
return;
}
au.innerHTML = currentRows.map(function (av) {
const aw = at.listSubtitle ? at.listSubtitle(av) : '';
return '<div class="admin-row">' +
'<div class="admin-row-main"><strong>' + escapeHTML(at.listTitle(av) || '(untitled)') + '</strong>' + (aw ? '<span>' + escapeHTML(aw) + '</span>' : '') + '</div>' +
'<div class="admin-row-actions">' +
'<button class="btn btn-outline btn-sm" data-edit="' + av.id + '">Edit</button>' +
'<button class="btn btn-danger btn-sm" data-del="' + av.id + '">Delete</button>' +
'</div></div>';
}).join('');
}
document.getElementById('crud-list').addEventListener('click', function (ax) {
const ay = ax.target.closest('[data-edit]');
const az = ax.target.closest('[data-del]');
if (ay) openForm(ay.dataset.edit);
if (az) deleteRow(az.dataset.del);
});
document.getElementById('addNewBtn').addEventListener('click', function () { openForm(null); });
document.getElementById('cancelBtn').addEventListener('click', function () { document.getElementById('crud-form-wrap').hidden = true; });
const DOC_ICON_SVG = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M9 13h6M9 17h6M9 9h1"/></svg>';
function filePreviewHTML(ba, bb) {
if (!bb) return '<span class="file-empty">No file uploaded yet</span>';
if (ba.preview === 'image') return '<img src="' + escapeHTML(bb) + '" alt="">';
if (ba.preview === 'video') return '<video src="' + escapeHTML(bb) + '" controls muted style="max-width:100%; max-height:160px; border-radius:8px;"></video>';
return '<div class="file-doc-icon">' + DOC_ICON_SVG + '</div><a href="' + escapeHTML(bb) + '" target="_blank" rel="noopener">View current file</a>';
}
function renderFileField(bc, bd) {
return '<div class="form-field">' +
'<label>' + escapeHTML(bc.label) + '</label>' +
'<div class="file-widget" data-bucket="' + bc.bucket + '" data-max-mb="' + bc.maxMB + '">' +
'<div class="file-preview" data-preview-for="' + bc.key + '">' + filePreviewHTML(bc, bd) + '</div>' +
'<div class="file-widget-actions">' +
'<input type="file" accept="' + bc.accept + '" data-upload-for="' + bc.key + '">' +
(bd ? '<button type="button" class="btn btn-outline btn-sm" data-clear-for="' + bc.key + '">Remove</button>' : '') +
'</div>' +
'<p class="upload-status" data-status-for="' + bc.key + '"></p>' +
'</div>' +
'<input type="hidden" data-field="' + bc.key + '" value="' + escapeHTML(bd) + '">' +
'</div>';
}
function openForm(be) {
const bf = tableConfigs[currentSection];
editingId = be;
const bg = be ? currentRows.find(function (bh) { return String(bh.id) === String(be); }) : null;
document.getElementById('formHeading').textContent = bg ? 'Edit Entry' : 'Add Entry';
document.getElementById('deleteBtn').hidden = !bg;
document.getElementById('deleteBtn').onclick = function () { if (bg) deleteRow(bg.id); };
const bi = document.getElementById('crud-form-fields');
bi.innerHTML = bf.fields.map(function (bj) {
const bk = bg ? (bg[bj.key] !== null && bg[bj.key] !== undefined ? bg[bj.key] : '') : (bj.default !== undefined ? bj.default : '');
if (bj.type === 'readonly') {
let bl = bk;
if (bj.asBoolean) bl = (bk === true || bk === 'true') ? 'Yes' : 'No';
else if (bj.format === 'datetime' && bk) bl = new Date(bk).toLocaleString();
else if (bj.options) { const bm = bj.options.find(function (bn) { return String(bn[0]) === String(bk); }); if (bm) bl = bm[1]; }
const bo = (bl === '' || bl === null || bl === undefined)
? '<span class="readonly-empty">Not provided</span>' : escapeHTML(String(bl));
return '<div class="form-field"><label>' + escapeHTML(bj.label) + '</label><div class="readonly-field-value">' + bo + '</div></div>';
}
if (bj.type === 'file') return renderFileField(bj, bk);
if (bj.type === 'textarea') {
return '<div class="form-field"><label>' + escapeHTML(bj.label) + '</label><textarea data-field="' + bj.key + '"' + (bj.required ? ' required' : '') + '>' + escapeHTML(bk) + '</textarea></div>';
}
if (bj.type === 'select') {
const bp = bj.options.map(function (bq) { return '<option value="' + escapeHTML(bq[0]) + '"' + (String(bq[0]) === String(bk) ? ' selected' : '') + '>' + escapeHTML(bq[1]) + '</option>'; }).join('');
return '<div class="form-field"><label>' + escapeHTML(bj.label) + '</label><select data-field="' + bj.key + '">' + bp + '</select></div>';
}
return '<div class="form-field"><label>' + escapeHTML(bj.label) + '</label><input type="' + (bj.type === 'number' ? 'number' : 'text') + '" data-field="' + bj.key + '" value="' + escapeHTML(bk) + '"' + (bj.required ? ' required' : '') + '></div>';
}).join('');
document.getElementById('crud-form-wrap').hidden = false;
const br = document.getElementById('crud-form-wrap');
if (typeof br.scrollIntoView === 'function') br.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
document.getElementById('crud-form-fields').addEventListener('change', async function (bs) {
const bt = bs.target.closest('input[type="file"][data-upload-for]');
if (!bt || !bt.files || !bt.files[0]) return;
const bu = bt.files[0];
const bv = bt.dataset.uploadFor;
const bw = bt.closest('.file-widget');
const bx = bw.dataset.bucket;
const by = Number(bw.dataset.maxMb || 10);
const bz = bw.querySelector('[data-status-for="' + bv + '"]');
const ca = bw.querySelector('[data-preview-for="' + bv + '"]');
const cb = document.querySelector('#crud-form-fields [data-field="' + bv + '"]');
const cc = tableConfigs[currentSection].fields.find(function (cd) { return cd.key === bv; });
if (bu.size > by * 1024 * 1024) {
bz.textContent = 'That file is too large — max ' + by + 'MB.';
bz.className = 'upload-status error';
bt.value = '';
return;
}
bz.textContent = 'Uploading…';
bz.className = 'upload-status';
const ce = (bu.name.split('.').pop() || 'bin').toLowerCase().replace(/[^a-z0-9]/g, '') || 'bin';
const cf = bv + '/' + Date.now() + '-' + Math.random().toString(36).slice(2, 8) + '.' + ce;
const { error: upErr } = await db.storage.from(bx).upload(cf, bu, { upsert: false, contentType: bu.type || undefined });
if (upErr) {
bz.textContent = 'Upload failed: ' + upErr.message;
bz.className = 'upload-status error';
bt.value = '';
return;
}
const { data: urlData } = db.storage.from(bx).getPublicUrl(cf);
cb.value = urlData.publicUrl;
bz.textContent = 'Uploaded — click Save to keep it.';
bz.className = 'upload-status success';
ca.innerHTML = filePreviewHTML(cc, urlData.publicUrl);
if (!bw.querySelector('[data-clear-for="' + bv + '"]')) {
const cg = document.createElement('button');
cg.type = 'button';
cg.className = 'btn btn-outline btn-sm';
cg.dataset.clearFor = bv;
cg.textContent = 'Remove';
bw.querySelector('.file-widget-actions').appendChild(cg);
}
});
document.getElementById('crud-form-fields').addEventListener('click', function (ch) {
const ci = ch.target.closest('[data-clear-for]');
if (!ci) return;
const cj = ci.dataset.clearFor;
const ck = ci.closest('.file-widget');
document.querySelector('#crud-form-fields [data-field="' + cj + '"]').value = '';
ck.querySelector('[data-preview-for="' + cj + '"]').innerHTML = '<span class="file-empty">No file uploaded yet</span>';
ck.querySelector('[data-status-for="' + cj + '"]').textContent = 'Will be removed when you click Save.';
ci.remove();
});
document.getElementById('saveBtn').addEventListener('click', async function () {
const cl = tableConfigs[currentSection];
const cm = {};
let cn = false;
cl.fields.forEach(function (co) {
if (co.type === 'readonly') return; 
const cp = document.querySelector('#crud-form-fields [data-field="' + co.key + '"]');
if (!cp) return;
let cq = cp.value;
if (co.type === 'number') cq = cq === '' ? (co.default || 0) : Number(cq);
if (co.asBoolean) cq = (cq === 'true');
if (co.asNumber) cq = cq === '' ? (co.default ? Number(co.default) : 0) : Number(cq);
if (co.required && (cq === '' || cq === null)) cn = true;
cm[co.key] = (cq === '' && co.type !== 'number' && !co.asBoolean && !co.asNumber) ? null : cq;
});
if (cn) { showToast('Please fill in all required fields.', true); return; }
const cr = document.getElementById('saveBtn');
cr.disabled = true;
const cs = editingId
? db.from(cl.table).update(cm).eq('id', editingId)
: db.from(cl.table).insert(cm);
const { error } = await cs;
cr.disabled = false;
if (error) { showToast('Save failed: ' + error.message, true); return; }
showToast('Saved.');
document.getElementById('crud-form-wrap').hidden = true;
loadTable(currentSection);
});
async function deleteRow(ct) {
if (!confirm('Delete this entry? This cannot be undone.')) return;
const cu = tableConfigs[currentSection];
const { error } = await db.from(cu.table).delete().eq('id', ct);
if (error) { showToast('Delete failed: ' + error.message, true); return; }
showToast('Deleted.');
document.getElementById('crud-form-wrap').hidden = true;
loadTable(currentSection);
}
async function loadSiteContent() {
const cv = document.getElementById('siteContentGroups');
cv.innerHTML = '<p style="color:var(--muted); font-size:0.88rem;">Loading…</p>';
const { data, error } = await db.from('site_content').select('*');
if (error) { showToast('Could not load site content: ' + error.message, true); cv.innerHTML = ''; return; }
const cw = {};
(data || []).forEach(function (cx) { cw[cx.key] = cx.value; });
cv.innerHTML = siteContentGroups.map(function (cy) {
const cz = cy.fields.map(function (da) {
const dc = da[0], dd = da[1], de = da[2];
const df = cw[dc] !== undefined ? cw[dc] : '';
if (de === 'image' || de === 'video') {
const dg = da[3], dh = da[4], di = da[5];
const dj = { key: dc, preview: de };
return '<div class="form-field" style="grid-column:1/-1;">' +
'<label>' + escapeHTML(dd) + '</label>' +
'<div class="file-widget" data-bucket="' + dg + '" data-max-mb="' + di + '" data-preview-type="' + de + '">' +
'<div class="file-preview" data-preview-for="' + dc + '">' + filePreviewHTML(dj, df) + '</div>' +
'<div class="file-widget-actions">' +
'<input type="file" accept="' + dh + '" data-upload-for="' + dc + '">' +
(df ? '<button type="button" class="btn btn-outline btn-sm" data-clear-for="' + dc + '">Remove</button>' : '') +
'</div>' +
'<p class="upload-status" data-status-for="' + dc + '"></p>' +
'</div>' +
'<input type="hidden" data-sc-field="' + dc + '" value="' + escapeHTML(df) + '">' +
'</div>';
}
if (de === 'textarea' || de === 'textarea-lg') {
return '<div class="form-field" style="grid-column:1/-1;"><label>' + escapeHTML(dd) + '</label><textarea class="' + (de === 'textarea-lg' ? 'lg' : '') + '" data-sc-field="' + dc + '">' + escapeHTML(df) + '</textarea></div>';
}
return '<div class="form-field"><label>' + escapeHTML(dd) + '</label><input type="text" data-sc-field="' + dc + '" value="' + escapeHTML(df) + '"></div>';
}).join('');
return '<div class="sc-group"><h3>' + escapeHTML(cy.title) + '</h3><div class="sc-row">' + cz + '</div></div>';
}).join('');
}
document.getElementById('siteContentGroups').addEventListener('change', async function (dk) {
const dl = dk.target.closest('input[type="file"][data-upload-for]');
if (!dl || !dl.files || !dl.files[0]) return;
const dm = dl.files[0];
const dn = dl.dataset.uploadFor;
const dp = dl.closest('.file-widget');
const dq = dp.dataset.bucket;
const dr = Number(dp.dataset.maxMb || 8);
const ds = dp.querySelector('[data-status-for="' + dn + '"]');
const dt = dp.querySelector('[data-preview-for="' + dn + '"]');
const du = document.querySelector('[data-sc-field="' + dn + '"]');
if (dm.size > dr * 1024 * 1024) {
ds.textContent = 'That file is too large — max ' + dr + 'MB.';
ds.className = 'upload-status error';
dl.value = '';
return;
}
ds.textContent = 'Uploading…';
ds.className = 'upload-status';
const dv = (dm.name.split('.').pop() || 'bin').toLowerCase().replace(/[^a-z0-9]/g, '') || 'bin';
const dw = dn + '/' + Date.now() + '-' + Math.random().toString(36).slice(2, 8) + '.' + dv;
const { error: upErr } = await db.storage.from(dq).upload(dw, dm, { upsert: false, contentType: dm.type || undefined });
if (upErr) {
ds.textContent = 'Upload failed: ' + upErr.message;
ds.className = 'upload-status error';
dl.value = '';
return;
}
const { data: urlData } = db.storage.from(dq).getPublicUrl(dw);
du.value = urlData.publicUrl;
ds.textContent = 'Uploaded — click "Save All Changes" to keep it.';
ds.className = 'upload-status success';
dt.innerHTML = filePreviewHTML({ preview: dp.dataset.previewType || 'image' }, urlData.publicUrl);
if (!dp.querySelector('[data-clear-for="' + dn + '"]')) {
const dx = document.createElement('button');
dx.type = 'button';
dx.className = 'btn btn-outline btn-sm';
dx.dataset.clearFor = dn;
dx.textContent = 'Remove';
dp.querySelector('.file-widget-actions').appendChild(dx);
}
});
document.getElementById('siteContentGroups').addEventListener('click', function (dy) {
const dz = dy.target.closest('[data-clear-for]');
if (!dz) return;
const ea = dz.dataset.clearFor;
const eb = dz.closest('.file-widget');
document.querySelector('[data-sc-field="' + ea + '"]').value = '';
eb.querySelector('[data-preview-for="' + ea + '"]').innerHTML = '<span class="file-empty">No file uploaded yet</span>';
eb.querySelector('[data-status-for="' + ea + '"]').textContent = 'Will be removed when you click "Save All Changes".';
dz.remove();
});
document.getElementById('saveSiteContentBtn').addEventListener('click', async function () {
const ec = Array.from(document.querySelectorAll('[data-sc-field]'));
const ed = ec.map(function (ee) { return { key: ee.dataset.scField, value: ee.value }; });
const ef = this;
ef.disabled = true;
const { error } = await db.from('site_content').upsert(ed, { onConflict: 'key' });
ef.disabled = false;
if (error) { showToast('Save failed: ' + error.message, true); return; }
showToast('Site content saved.');
});
document.getElementById('passwordForm').addEventListener('submit', async function (eg) {
eg.preventDefault();
const eh = document.getElementById('newPassword').value;
const ei = document.getElementById('confirmPassword').value;
if (eh !== ei) { showToast('Passwords do not match.', true); return; }
if (eh.length < 8) { showToast('Password must be at least 8 characters.', true); return; }
const { error } = await db.auth.updateUser({ password: eh });
if (error) { showToast('Could not update password: ' + error.message, true); return; }
showToast('Password updated.');
eg.target.reset();
});