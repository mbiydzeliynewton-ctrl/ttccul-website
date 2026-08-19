// ============================================
// SUPABASE CONFIG — same project as index.html
// ============================================
const SUPABASE_URL = "https://rsphnnhihngekkjzbeji.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzcGhubmhpaG5nZWtranpiZWppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYzMjA4NTAsImV4cCI6MjEwMTg5Njg1MH0.-keZ2nlMghxPxEYXVQ65RQlWTq0s3XiomeN7ptLY4xA";
const isConfigured = typeof supabase !== 'undefined' && SUPABASE_URL.indexOf('YOUR_') !== 0;
const db = isConfigured ? supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

function escapeHTML(str) {
  if (str === null || str === undefined) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function showToast(msg, isError) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.toggle('danger', !!isError);
  t.hidden = false;
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(function () { t.hidden = true; }, 3200);
}

// ============================================
// TABLE CONFIGS — one entry per CRUD section
// ============================================
const tableConfigs = {
  services: {
    label: 'Services', table: 'services', orderBy: 'sort_order',
    fields: [
      { key: 'name', label: 'Name', type: 'text', required: true },
      { key: 'category', label: 'Category', type: 'select', options: [['savings', 'Savings & Deposits'], ['loans', 'Loans & Credit'], ['other', 'Other Financial Services']], default: 'savings' },
      { key: 'description', label: 'Description', type: 'textarea', required: true },
      { key: 'sort_order', label: 'Sort Order (lower shows first)', type: 'number', default: 0 }
    ],
    listTitle: function (r) { return r.name; },
    listSubtitle: function (r) { return r.category; }
  },
  core_values: {
    label: 'Core Values', table: 'core_values', orderBy: 'sort_order',
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'description', label: 'Description', type: 'textarea', required: true },
      { key: 'icon', label: 'Icon', type: 'select', options: [['shield', 'Shield'], ['users', 'People'], ['check', 'Checkmark'], ['scale', 'Scale'], ['leaf', 'Leaf']], default: 'leaf' },
      { key: 'sort_order', label: 'Sort Order', type: 'number', default: 0 }
    ],
    listTitle: function (r) { return r.title; }
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
    listTitle: function (r) { return r.role; },
    listSubtitle: function (r) { return r.name || 'No name set'; }
  },
  news_items: {
    label: 'News & Updates', table: 'news_items', orderBy: 'sort_order',
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true },
      { key: 'body', label: 'Body', type: 'textarea', required: true },
      { key: 'tag', label: 'Tag (e.g. a year, or "Coming Soon")', type: 'text' },
      { key: 'sort_order', label: 'Sort Order', type: 'number', default: 0 }
    ],
    listTitle: function (r) { return r.title; }
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
    listTitle: function (r) { return r.name; },
    listSubtitle: function (r) { return r.role || ''; }
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
    listTitle: function (r) { return r.title; },
    listSubtitle: function (r) { return r.year || ''; }
  },
  forms: {
    label: 'Downloadable Forms', table: 'forms', orderBy: 'sort_order',
    fields: [
      { key: 'name', label: 'Name', type: 'text', required: true },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'file_url', label: 'File', type: 'file', bucket: 'forms-files', accept: '.pdf,.doc,.docx', preview: 'file', maxMB: 10 },
      { key: 'sort_order', label: 'Sort Order', type: 'number', default: 0 }
    ],
    listTitle: function (r) { return r.name; }
  },
  faqs: {
    label: 'FAQs', table: 'faqs', orderBy: 'sort_order',
    fields: [
      { key: 'question', label: 'Question', type: 'text', required: true },
      { key: 'answer', label: 'Answer', type: 'textarea', required: true },
      { key: 'category', label: 'Category', type: 'select', options: [['Membership', 'Membership'], ['Loans', 'Loans'], ['Savings', 'Savings'], ['Akawo', 'Akawo'], ['General', 'General']], default: 'General' },
      { key: 'sort_order', label: 'Sort Order', type: 'number', default: 0 }
    ],
    listTitle: function (r) { return r.question; },
    listSubtitle: function (r) { return r.category; }
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
    listTitle: function (r) { return r.name; },
    listSubtitle: function (r) { return r.is_headquarters ? 'Headquarters' : (r.address || ''); }
  },
  membership_applications: {
    label: 'Membership Applications', table: 'membership_applications', orderBy: 'created_at', orderDesc: true,
    fields: [
      { key: 'full_name', label: 'Full Name', type: 'text', required: true },
      { key: 'phone', label: 'Phone', type: 'text', required: true },
      { key: 'email', label: 'Email', type: 'text' },
      { key: 'account_type', label: 'Account Type', type: 'select', options: [['shares', 'Shares'], ['savings', 'Savings'], ['deposit', 'Deposit'], ['group', 'Group'], ['minors', 'Minors'], ['other', 'Other']], default: 'shares' },
      { key: 'message', label: 'Message / Notes', type: 'textarea' },
      { key: 'status', label: 'Status', type: 'select', options: [['new', 'New'], ['contacted', 'Contacted'], ['completed', 'Completed']], default: 'new' }
    ],
    listTitle: function (r) { return r.full_name; },
    listSubtitle: function (r) { return (r.phone || '') + ' — ' + (r.status || 'new'); }
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

// ============================================
// STATE
// ============================================
let currentSection = 'services';
let currentRows = [];
let editingId = null; // null = adding new

// ============================================
// AUTH
// ============================================
if (!isConfigured) {
  document.getElementById('configBanner').hidden = false;
  document.getElementById('loginBtn').disabled = true;
}

document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  if (!db) return;
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const errEl = document.getElementById('loginError');
  errEl.hidden = true;
  const btn = document.getElementById('loginBtn');
  btn.disabled = true;
  btn.innerHTML = '<span class="spinner"></span> Signing in…';
  const { error } = await db.auth.signInWithPassword({ email: email, password: password });
  btn.disabled = false;
  btn.textContent = 'Sign In';
  if (error) {
    errEl.textContent = error.message === 'Invalid login credentials' ? 'Incorrect email or password.' : error.message;
    errEl.hidden = false;
  }
});

// ============================================
// MOBILE NAV DRAWER
// ============================================
const mobileNavToggle = document.getElementById('mobileNavToggle');
const sidebarPanel = document.getElementById('sidebarPanel');
mobileNavToggle.addEventListener('click', function () {
  const isOpen = sidebarPanel.classList.toggle('open');
  mobileNavToggle.classList.toggle('open', isOpen);
  mobileNavToggle.setAttribute('aria-expanded', isOpen);
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
  db.auth.onAuthStateChange(function (event, session) {
    if (session && session.user) {
      document.getElementById('loginScreen').hidden = true;
      document.getElementById('dashboardScreen').hidden = false;
      document.getElementById('currentUserEmail').textContent = session.user.email;
      selectSection('services');
    } else {
      document.getElementById('dashboardScreen').hidden = true;
      document.getElementById('loginScreen').hidden = false;
    }
  });
}

// ============================================
// SIDEBAR NAV
// ============================================
document.getElementById('sidebarNav').addEventListener('click', function (e) {
  const btn = e.target.closest('button[data-section]');
  if (btn) selectSection(btn.dataset.section);
});

function selectSection(section) {
  currentSection = section;
  editingId = null;
  closeMobileNav();
  Array.from(document.querySelectorAll('#sidebarNav button')).forEach(function (b) {
    b.classList.toggle('active', b.dataset.section === section);
  });
  document.getElementById('crudPanel').hidden = true;
  document.getElementById('siteContentPanel').hidden = true;
  document.getElementById('accountPanel').hidden = true;

  if (section === 'site_content') {
    document.getElementById('siteContentPanel').hidden = false;
    loadSiteContent();
  } else if (section === 'account') {
    document.getElementById('accountPanel').hidden = false;
  } else {
    document.getElementById('crudPanel').hidden = false;
    document.getElementById('crud-form-wrap').hidden = true;
    const cfg = tableConfigs[section];
    document.getElementById('sectionTitle').textContent = cfg.label;
    loadTable(section);
  }
}

// ============================================
// CRUD — list
// ============================================
async function loadTable(section) {
  const cfg = tableConfigs[section];
  const list = document.getElementById('crud-list');
  list.innerHTML = '<p style="color:var(--muted); font-size:0.88rem;">Loading…</p>';
  const { data, error } = await db.from(cfg.table).select('*').order(cfg.orderBy, { ascending: !cfg.orderDesc });
  if (error) { showToast('Could not load ' + cfg.label + ': ' + error.message, true); list.innerHTML = ''; return; }
  currentRows = data || [];
  renderList();
}

function renderList() {
  const cfg = tableConfigs[currentSection];
  const list = document.getElementById('crud-list');
  if (!currentRows.length) {
    list.innerHTML = '<div class="admin-empty">Nothing here yet. Click "+ Add New" to create the first entry.</div>';
    return;
  }
  list.innerHTML = currentRows.map(function (row) {
    const sub = cfg.listSubtitle ? cfg.listSubtitle(row) : '';
    return '<div class="admin-row">' +
      '<div class="admin-row-main"><strong>' + escapeHTML(cfg.listTitle(row) || '(untitled)') + '</strong>' + (sub ? '<span>' + escapeHTML(sub) + '</span>' : '') + '</div>' +
      '<div class="admin-row-actions">' +
        '<button class="btn btn-outline btn-sm" data-edit="' + row.id + '">Edit</button>' +
        '<button class="btn btn-danger btn-sm" data-del="' + row.id + '">Delete</button>' +
      '</div></div>';
  }).join('');
}

document.getElementById('crud-list').addEventListener('click', function (e) {
  const editBtn = e.target.closest('[data-edit]');
  const delBtn = e.target.closest('[data-del]');
  if (editBtn) openForm(editBtn.dataset.edit);
  if (delBtn) deleteRow(delBtn.dataset.del);
});

// ============================================
// CRUD — form (add / edit)
// ============================================
document.getElementById('addNewBtn').addEventListener('click', function () { openForm(null); });
document.getElementById('cancelBtn').addEventListener('click', function () { document.getElementById('crud-form-wrap').hidden = true; });

const DOC_ICON_SVG = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M9 13h6M9 17h6M9 9h1"/></svg>';

function filePreviewHTML(f, val) {
  if (!val) return '<span class="file-empty">No file uploaded yet</span>';
  if (f.preview === 'image') return '<img src="' + escapeHTML(val) + '" alt="">';
  if (f.preview === 'video') return '<video src="' + escapeHTML(val) + '" controls muted style="max-width:100%; max-height:160px; border-radius:8px;"></video>';
  return '<div class="file-doc-icon">' + DOC_ICON_SVG + '</div><a href="' + escapeHTML(val) + '" target="_blank" rel="noopener">View current file</a>';
}

function renderFileField(f, val) {
  return '<div class="form-field">' +
    '<label>' + escapeHTML(f.label) + '</label>' +
    '<div class="file-widget" data-bucket="' + f.bucket + '" data-max-mb="' + f.maxMB + '">' +
      '<div class="file-preview" data-preview-for="' + f.key + '">' + filePreviewHTML(f, val) + '</div>' +
      '<div class="file-widget-actions">' +
        '<input type="file" accept="' + f.accept + '" data-upload-for="' + f.key + '">' +
        (val ? '<button type="button" class="btn btn-outline btn-sm" data-clear-for="' + f.key + '">Remove</button>' : '') +
      '</div>' +
      '<p class="upload-status" data-status-for="' + f.key + '"></p>' +
    '</div>' +
    '<input type="hidden" data-field="' + f.key + '" value="' + escapeHTML(val) + '">' +
  '</div>';
}

function openForm(id) {
  const cfg = tableConfigs[currentSection];
  editingId = id;
  const row = id ? currentRows.find(function (r) { return String(r.id) === String(id); }) : null;
  document.getElementById('formHeading').textContent = row ? 'Edit Entry' : 'Add Entry';
  document.getElementById('deleteBtn').hidden = !row;
  document.getElementById('deleteBtn').onclick = function () { if (row) deleteRow(row.id); };

  const fieldsEl = document.getElementById('crud-form-fields');
  fieldsEl.innerHTML = cfg.fields.map(function (f) {
    const val = row ? (row[f.key] !== null && row[f.key] !== undefined ? row[f.key] : '') : (f.default !== undefined ? f.default : '');
    if (f.type === 'file') return renderFileField(f, val);
    if (f.type === 'textarea') {
      return '<div class="form-field"><label>' + escapeHTML(f.label) + '</label><textarea data-field="' + f.key + '"' + (f.required ? ' required' : '') + '>' + escapeHTML(val) + '</textarea></div>';
    }
    if (f.type === 'select') {
      const opts = f.options.map(function (o) { return '<option value="' + escapeHTML(o[0]) + '"' + (String(o[0]) === String(val) ? ' selected' : '') + '>' + escapeHTML(o[1]) + '</option>'; }).join('');
      return '<div class="form-field"><label>' + escapeHTML(f.label) + '</label><select data-field="' + f.key + '">' + opts + '</select></div>';
    }
    return '<div class="form-field"><label>' + escapeHTML(f.label) + '</label><input type="' + (f.type === 'number' ? 'number' : 'text') + '" data-field="' + f.key + '" value="' + escapeHTML(val) + '"' + (f.required ? ' required' : '') + '></div>';
  }).join('');

  document.getElementById('crud-form-wrap').hidden = false;
  const wrapEl = document.getElementById('crud-form-wrap');
  if (typeof wrapEl.scrollIntoView === 'function') wrapEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ============================================
// FILE UPLOADS (board photos, form documents)
// ============================================
document.getElementById('crud-form-fields').addEventListener('change', async function (e) {
  const input = e.target.closest('input[type="file"][data-upload-for]');
  if (!input || !input.files || !input.files[0]) return;
  const file = input.files[0];
  const fieldKey = input.dataset.uploadFor;
  const widget = input.closest('.file-widget');
  const bucket = widget.dataset.bucket;
  const maxMB = Number(widget.dataset.maxMb || 10);
  const statusEl = widget.querySelector('[data-status-for="' + fieldKey + '"]');
  const previewEl = widget.querySelector('[data-preview-for="' + fieldKey + '"]');
  const hiddenInput = document.querySelector('#crud-form-fields [data-field="' + fieldKey + '"]');
  const fieldMeta = tableConfigs[currentSection].fields.find(function (fl) { return fl.key === fieldKey; });

  if (file.size > maxMB * 1024 * 1024) {
    statusEl.textContent = 'That file is too large — max ' + maxMB + 'MB.';
    statusEl.className = 'upload-status error';
    input.value = '';
    return;
  }

  statusEl.textContent = 'Uploading…';
  statusEl.className = 'upload-status';

  const safeExt = (file.name.split('.').pop() || 'bin').toLowerCase().replace(/[^a-z0-9]/g, '') || 'bin';
  const path = fieldKey + '/' + Date.now() + '-' + Math.random().toString(36).slice(2, 8) + '.' + safeExt;

  const { error: upErr } = await db.storage.from(bucket).upload(path, file, { upsert: false, contentType: file.type || undefined });
  if (upErr) {
    statusEl.textContent = 'Upload failed: ' + upErr.message;
    statusEl.className = 'upload-status error';
    input.value = '';
    return;
  }

  const { data: urlData } = db.storage.from(bucket).getPublicUrl(path);
  hiddenInput.value = urlData.publicUrl;
  statusEl.textContent = 'Uploaded — click Save to keep it.';
  statusEl.className = 'upload-status success';
  previewEl.innerHTML = filePreviewHTML(fieldMeta, urlData.publicUrl);

  if (!widget.querySelector('[data-clear-for="' + fieldKey + '"]')) {
    const clearBtn = document.createElement('button');
    clearBtn.type = 'button';
    clearBtn.className = 'btn btn-outline btn-sm';
    clearBtn.dataset.clearFor = fieldKey;
    clearBtn.textContent = 'Remove';
    widget.querySelector('.file-widget-actions').appendChild(clearBtn);
  }
});

document.getElementById('crud-form-fields').addEventListener('click', function (e) {
  const btn = e.target.closest('[data-clear-for]');
  if (!btn) return;
  const fieldKey = btn.dataset.clearFor;
  const widget = btn.closest('.file-widget');
  document.querySelector('#crud-form-fields [data-field="' + fieldKey + '"]').value = '';
  widget.querySelector('[data-preview-for="' + fieldKey + '"]').innerHTML = '<span class="file-empty">No file uploaded yet</span>';
  widget.querySelector('[data-status-for="' + fieldKey + '"]').textContent = 'Will be removed when you click Save.';
  btn.remove();
});

document.getElementById('saveBtn').addEventListener('click', async function () {
  const cfg = tableConfigs[currentSection];
  const inputs = Array.from(document.querySelectorAll('#crud-form-fields [data-field]'));
  const payload = {};
  let missing = false;
  cfg.fields.forEach(function (f, i) {
    const el = inputs[i];
    let v = el.value;
    if (f.type === 'number') v = v === '' ? (f.default || 0) : Number(v);
    if (f.asBoolean) v = (v === 'true');
    if (f.asNumber) v = v === '' ? (f.default ? Number(f.default) : 0) : Number(v);
    if (f.required && (v === '' || v === null)) missing = true;
    payload[f.key] = (v === '' && f.type !== 'number' && !f.asBoolean && !f.asNumber) ? null : v;
  });
  if (missing) { showToast('Please fill in all required fields.', true); return; }

  const btn = document.getElementById('saveBtn');
  btn.disabled = true;
  const query = editingId
    ? db.from(cfg.table).update(payload).eq('id', editingId)
    : db.from(cfg.table).insert(payload);
  const { error } = await query;
  btn.disabled = false;
  if (error) { showToast('Save failed: ' + error.message, true); return; }
  showToast('Saved.');
  document.getElementById('crud-form-wrap').hidden = true;
  loadTable(currentSection);
});

async function deleteRow(id) {
  if (!confirm('Delete this entry? This cannot be undone.')) return;
  const cfg = tableConfigs[currentSection];
  const { error } = await db.from(cfg.table).delete().eq('id', id);
  if (error) { showToast('Delete failed: ' + error.message, true); return; }
  showToast('Deleted.');
  document.getElementById('crud-form-wrap').hidden = true;
  loadTable(currentSection);
}

// ============================================
// SITE CONTENT (key/value)
// ============================================
async function loadSiteContent() {
  const wrap = document.getElementById('siteContentGroups');
  wrap.innerHTML = '<p style="color:var(--muted); font-size:0.88rem;">Loading…</p>';
  const { data, error } = await db.from('site_content').select('*');
  if (error) { showToast('Could not load site content: ' + error.message, true); wrap.innerHTML = ''; return; }
  const values = {};
  (data || []).forEach(function (row) { values[row.key] = row.value; });

  wrap.innerHTML = siteContentGroups.map(function (group) {
    const rows = group.fields.map(function (f) {
      const key = f[0], label = f[1], type = f[2];
      const val = values[key] !== undefined ? values[key] : '';
      if (type === 'image' || type === 'video') {
        const bucket = f[3], accept = f[4], maxMB = f[5];
        const fakeField = { key: key, preview: type };
        return '<div class="form-field" style="grid-column:1/-1;">' +
          '<label>' + escapeHTML(label) + '</label>' +
          '<div class="file-widget" data-bucket="' + bucket + '" data-max-mb="' + maxMB + '" data-preview-type="' + type + '">' +
            '<div class="file-preview" data-preview-for="' + key + '">' + filePreviewHTML(fakeField, val) + '</div>' +
            '<div class="file-widget-actions">' +
              '<input type="file" accept="' + accept + '" data-upload-for="' + key + '">' +
              (val ? '<button type="button" class="btn btn-outline btn-sm" data-clear-for="' + key + '">Remove</button>' : '') +
            '</div>' +
            '<p class="upload-status" data-status-for="' + key + '"></p>' +
          '</div>' +
          '<input type="hidden" data-sc-field="' + key + '" value="' + escapeHTML(val) + '">' +
        '</div>';
      }
      if (type === 'textarea' || type === 'textarea-lg') {
        return '<div class="form-field" style="grid-column:1/-1;"><label>' + escapeHTML(label) + '</label><textarea class="' + (type === 'textarea-lg' ? 'lg' : '') + '" data-sc-field="' + key + '">' + escapeHTML(val) + '</textarea></div>';
      }
      return '<div class="form-field"><label>' + escapeHTML(label) + '</label><input type="text" data-sc-field="' + key + '" value="' + escapeHTML(val) + '"></div>';
    }).join('');
    return '<div class="sc-group"><h3>' + escapeHTML(group.title) + '</h3><div class="sc-row">' + rows + '</div></div>';
  }).join('');
}

// Image upload inside the Site Content panel reuses the same
// upload/remove listeners as the CRUD forms, just scoped to this container.
document.getElementById('siteContentGroups').addEventListener('change', async function (e) {
  const input = e.target.closest('input[type="file"][data-upload-for]');
  if (!input || !input.files || !input.files[0]) return;
  const file = input.files[0];
  const fieldKey = input.dataset.uploadFor;
  const widget = input.closest('.file-widget');
  const bucket = widget.dataset.bucket;
  const maxMB = Number(widget.dataset.maxMb || 8);
  const statusEl = widget.querySelector('[data-status-for="' + fieldKey + '"]');
  const previewEl = widget.querySelector('[data-preview-for="' + fieldKey + '"]');
  const hiddenInput = document.querySelector('[data-sc-field="' + fieldKey + '"]');

  if (file.size > maxMB * 1024 * 1024) {
    statusEl.textContent = 'That file is too large — max ' + maxMB + 'MB.';
    statusEl.className = 'upload-status error';
    input.value = '';
    return;
  }
  statusEl.textContent = 'Uploading…';
  statusEl.className = 'upload-status';

  const safeExt = (file.name.split('.').pop() || 'bin').toLowerCase().replace(/[^a-z0-9]/g, '') || 'bin';
  const path = fieldKey + '/' + Date.now() + '-' + Math.random().toString(36).slice(2, 8) + '.' + safeExt;
  const { error: upErr } = await db.storage.from(bucket).upload(path, file, { upsert: false, contentType: file.type || undefined });
  if (upErr) {
    statusEl.textContent = 'Upload failed: ' + upErr.message;
    statusEl.className = 'upload-status error';
    input.value = '';
    return;
  }
  const { data: urlData } = db.storage.from(bucket).getPublicUrl(path);
  hiddenInput.value = urlData.publicUrl;
  statusEl.textContent = 'Uploaded — click "Save All Changes" to keep it.';
  statusEl.className = 'upload-status success';
  previewEl.innerHTML = filePreviewHTML({ preview: widget.dataset.previewType || 'image' }, urlData.publicUrl);

  if (!widget.querySelector('[data-clear-for="' + fieldKey + '"]')) {
    const clearBtn = document.createElement('button');
    clearBtn.type = 'button';
    clearBtn.className = 'btn btn-outline btn-sm';
    clearBtn.dataset.clearFor = fieldKey;
    clearBtn.textContent = 'Remove';
    widget.querySelector('.file-widget-actions').appendChild(clearBtn);
  }
});

document.getElementById('siteContentGroups').addEventListener('click', function (e) {
  const btn = e.target.closest('[data-clear-for]');
  if (!btn) return;
  const fieldKey = btn.dataset.clearFor;
  const widget = btn.closest('.file-widget');
  document.querySelector('[data-sc-field="' + fieldKey + '"]').value = '';
  widget.querySelector('[data-preview-for="' + fieldKey + '"]').innerHTML = '<span class="file-empty">No file uploaded yet</span>';
  widget.querySelector('[data-status-for="' + fieldKey + '"]').textContent = 'Will be removed when you click "Save All Changes".';
  btn.remove();
});


document.getElementById('saveSiteContentBtn').addEventListener('click', async function () {
  const inputs = Array.from(document.querySelectorAll('[data-sc-field]'));
  const rows = inputs.map(function (el) { return { key: el.dataset.scField, value: el.value }; });
  const btn = this;
  btn.disabled = true;
  const { error } = await db.from('site_content').upsert(rows, { onConflict: 'key' });
  btn.disabled = false;
  if (error) { showToast('Save failed: ' + error.message, true); return; }
  showToast('Site content saved.');
});

// ============================================
// ACCOUNT — change password
// ============================================
document.getElementById('passwordForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const p1 = document.getElementById('newPassword').value;
  const p2 = document.getElementById('confirmPassword').value;
  if (p1 !== p2) { showToast('Passwords do not match.', true); return; }
  if (p1.length < 8) { showToast('Password must be at least 8 characters.', true); return; }
  const { error } = await db.auth.updateUser({ password: p1 });
  if (error) { showToast('Could not update password: ' + error.message, true); return; }
  showToast('Password updated.');
  e.target.reset();
});
