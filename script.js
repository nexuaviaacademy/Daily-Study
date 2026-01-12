let currentPackage = 'literasi'; 
let currentTeacherPhone = "";

const tutors = [
    { subject: "Pengetahuan Kuantitatif", teacher: "Salman", phone: "6285890554900" },
    { subject: "Penalaran Matematika", teacher: "Salman", phone: "6285890554900" },
    { subject: "Penalaran Umum", teacher: "Pani", phone: "6285727250422" },
    { subject: "Literasi B. Indonesia", teacher: "Anin", phone: "6283897444106" },
    { subject: "Pemahaman Bacaan", teacher: "Anin", phone: "6283897444106" },
    { subject: "Pengetahuan Umum", teacher: "Anin", phone: "6283897444106" }
];

const historyData = [
    { title: "Fundamental Matematika", teacher: "Salman", date: "Sabtu, 11 Jan 2026", link: "https://us06web.zoom.us/rec/share/N9_pHVWjpyltOfwJ8MAaWa45gprMEY6c41Pp0uNVatqWknnU8Fv02ADwVgeK2VMO.418nK7FQsPqLtXIY", time: "19:00" },
    { title: "Pengetahuan Umum", teacher: "Anin", date: "Sabtu, 10 Jan 2026", link: "#", time: "19:00" },
    { title: "Pengetahuan Kuantitatif", teacher: "Salman", date: "Rabu, 07 Jan 2026", link: "https://us06web.zoom.us/rec/share/cHiECTh2wrvmYBKNcg1cIcgDomVFkqwQkVV41MdJGeZo7ZwZsHhKvjXrfyG7iXGW.rDZq5dliQpJY-TWl", time: "19:00" }
];

document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Check
    if(localStorage.getItem('theme') === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.querySelector('.theme-btn i').classList.replace('fa-moon', 'fa-sun');
    }

    // 2. Load Package
    const savedPkg = localStorage.getItem('daily_study_package');
    if (savedPkg) {
        currentPackage = savedPkg;
        updateHeaderText(savedPkg);
    }
    
    // 3. Render
    renderMenu();
    renderTutors();
    renderHistory();

    // 4. Draft
    const savedMsg = localStorage.getItem('tutor_draft_msg');
    if(savedMsg) document.getElementById('form-msg').value = savedMsg;

    // 5. Splash
    setTimeout(() => {
        document.getElementById('splash-screen').style.opacity = '0';
        setTimeout(() => document.getElementById('splash-screen').style.display = 'none', 500);
    }, 1500);

    // 6. Listener
    document.getElementById('form-msg').addEventListener('input', (e) => localStorage.setItem('tutor_draft_msg', e.target.value));
});

// --- THEME ---
function toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    document.querySelector('.theme-btn i').className = isDark ? 'fas fa-moon' : 'fas fa-sun';
}

// --- RENDERERS ---
function renderMenu() {
    const container = document.getElementById('main-grid-menu');
    let items = [];

    if(currentPackage === 'skolastik') {
        items = [
            { icon: 'brain', color: 'indigo', label: 'Pen. Umum', action: '' },
            { icon: 'lightbulb', color: 'teal', label: 'Peng. Umum', action: '' },
            { icon: 'calculator', color: 'blue', label: 'Kuantitatif', action: '' },
            { icon: 'th-large', color: 'slate', label: 'Semua', action: 'openSubjectsModal()' }
        ];
    } else {
        items = [
            { icon: 'book-open', color: 'blue', label: 'Lit. Indo', action: '' },
            { icon: 'language', color: 'indigo', label: 'Lit. Ing', action: '' },
            { icon: 'chart-pie', color: 'teal', label: 'Penalaran', action: '' },
            { icon: 'th-large', color: 'slate', label: 'Semua', action: 'openSubjectsModal()' }
        ];
    }

    container.innerHTML = items.map(i => `
        <div class="menu-item" onclick="${i.action ? i.action : 'showComingSoon()'}">
            <div class="icon-box" style="color:var(--${i.color === 'slate' ? 'text' : 'primary'})">
                <i class="fas fa-${i.icon}"></i>
            </div>
            <div class="menu-text">${i.label}</div>
        </div>
    `).join('');
}

function renderTutors() {
    document.getElementById('tutor-list').innerHTML = tutors.map(t => `
        <div class="card">
            <h3>${t.subject}</h3>
            <div class="tag">Setiap Hari</div>
            <div class="card-row"><i class="far fa-clock"></i> 07:00 - 20:45</div>
            <div class="card-row"><i class="fas fa-chalkboard-teacher"></i> ${t.teacher}</div>
            <button class="btn-full" onclick="openForm('${t.subject}', '${t.teacher}', '${t.phone}')">Pesan Sesi</button>
        </div>
    `).join('');
}

function renderHistory() {
    document.getElementById('history-list').innerHTML = historyData.map(h => `
        <div class="card">
            <h3>${h.title}</h3>
            <div class="tag" style="background:#dcfce7; color:#16a34a">Selesai</div>
            <div class="card-row"><i class="far fa-calendar"></i> ${h.date}</div>
            <div class="card-row"><i class="fas fa-chalkboard-teacher"></i> ${h.teacher}</div>
            <a href="${h.link}" target="_blank"><button class="btn-outline">Tonton Ulang</button></a>
        </div>
    `).join('');
}

// --- NAV ---
function switchTab(pageId) {
    document.querySelectorAll('.page-view').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.header-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));

    if(pageId === 'home') {
        document.getElementById('page-home').classList.add('active');
        document.getElementById('header-home').classList.add('active');
        document.querySelectorAll('.nav-item')[0].classList.add('active');
    } else {
        document.getElementById('page-live').classList.add('active');
        document.getElementById('header-live').classList.add('active');
        document.querySelectorAll('.nav-item')[1].classList.add('active');
    }
}

function switchSubMenu(viewId) {
    // 1. Ganti Chip Aktif
    document.querySelectorAll('.chip').forEach(el => el.classList.remove('active'));
    document.getElementById('chip-' + viewId).classList.add('active');
    
    // 2. Sembunyikan Semua View
    ['kelas', 'tutor', 'tryout'].forEach(id => document.getElementById('view-' + id).style.display = 'none');
    
    // 3. Tampilkan View yang dipilih
    document.getElementById('view-' + viewId).style.display = 'block';

    // 4. LOGIKA PENTING: Sembunyikan "Jadwal/Riwayat" kalau bukan di Kelas Online
    const tabContainer = document.querySelector('.live-tabs');
    if(viewId === 'kelas') {
        tabContainer.style.display = 'flex';
    } else {
        tabContainer.style.display = 'none';
    }
}

function switchLiveTab(tabId, el) {
    document.querySelectorAll('.tab-item').forEach(e => e.classList.remove('active'));
    el.classList.add('active');
    document.getElementById('tab-upcoming').style.display = tabId === 'upcoming' ? 'block' : 'none';
    document.getElementById('tab-history').style.display = tabId === 'history' ? 'block' : 'none';
}

// --- FORM ---
function openForm(sub, teach, phone) {
    document.getElementById('page-live').classList.remove('active');
    document.getElementById('page-form').classList.add('active');
    document.getElementById('form-subject').innerText = sub;
    document.getElementById('form-teacher').innerText = teach;
    document.getElementById('form-time').innerText = "07:00 - 20:45";
    currentTeacherPhone = phone;
}

function closeForm() {
    document.getElementById('page-form').classList.remove('active');
    document.getElementById('page-live').classList.add('active');
}

function updateFile() {
    const input = document.getElementById('file-up');
    if(input.files.length) document.getElementById('file-name').innerText = input.files[0].name;
}

function sendWA() {
    const msg = document.getElementById('form-msg').value;
    const sub = document.getElementById('form-subject').innerText;
    const teach = document.getElementById('form-teacher').innerText;
    const text = `Halo Kak ${teach}, saya mau diskusi tentang ${sub}.\n\n*Pertanyaan:* ${msg}`;
    window.open(`https://wa.me/${currentTeacherPhone}?text=${encodeURIComponent(text)}`, '_blank');
}

// --- MODALS ---
function showComingSoon() {
    const modal = document.getElementById('modal-body');
    document.getElementById('modal-overlay').classList.add('active');
    modal.innerHTML = `
        <div style="text-align:center">
            <i class="fas fa-rocket" style="font-size:3rem; color:var(--primary); margin-bottom:15px;"></i>
            <h3 style="color:var(--text); margin-bottom:10px;">Coming Soon!</h3>
            <p style="color:var(--text-light); margin-bottom:20px;">Fitur sedang disiapkan.</p>
            <button class="btn-full" onclick="closeModal()" style="margin:0">Oke</button>
        </div>
    `;
}

function openClassModal() {
    const modal = document.getElementById('modal-body');
    document.getElementById('modal-overlay').classList.add('active');
    modal.innerHTML = `
        <div style="width:40px; height:5px; background:var(--border); border-radius:10px; margin:0 auto 20px;"></div>
        <h3 style="text-align:center; color:var(--text); margin-bottom:20px;">Pilih Paket</h3>
        <div class="modal-opt ${currentPackage==='literasi'?'active':''}" onclick="setPkg('literasi')">Tes Literasi</div>
        <div class="modal-opt ${currentPackage==='skolastik'?'active':''}" onclick="setPkg('skolastik')">Tes Potensi Skolastik</div>
    `;
}

function setPkg(pkg) {
    currentPackage = pkg;
    localStorage.setItem('daily_study_package', pkg);
    updateHeaderText(pkg);
    renderMenu();
    closeModal();
}

function updateHeaderText(pkg) {
    const el = document.getElementById('filter-btn-text');
    if(el) el.innerText = pkg === 'literasi' ? 'UTBK - Tes Literasi' : 'UTBK - Tes Potensi';
}

function openSubjectsModal() {
    const modal = document.getElementById('modal-body');
    document.getElementById('modal-overlay').classList.add('active');
    modal.innerHTML = `
        <div style="width:40px; height:5px; background:var(--border); border-radius:10px; margin:0 auto 20px;"></div>
        <h3 style="text-align:center; color:var(--text); margin-bottom:20px;">Semua Pelajaran</h3>
        <div class="grid-menu" style="padding:0;">
            ${getAllSubjectsHTML()}
        </div>
        <button class="btn-full" onclick="closeModal()" style="margin-top:20px">Tutup</button>
    `;
}

function getAllSubjectsHTML() {
    const allItems = [
        { icon: 'book-open', color: 'blue', label: 'Lit. Indo' },
        { icon: 'language', color: 'indigo', label: 'Lit. Ing' },
        { icon: 'chart-pie', color: 'teal', label: 'Penalaran' },
        { icon: 'brain', color: 'indigo', label: 'Pen. Umum' },
        { icon: 'lightbulb', color: 'teal', label: 'Peng. Umum' },
        { icon: 'book', color: 'blue', label: 'Pemahaman' },
        { icon: 'calculator', color: 'slate', label: 'Kuantitatif' }
    ];
    
    return allItems.map(i => `
        <div class="menu-item">
            <div class="icon-box" style="color:var(--${i.color === 'slate' ? 'text' : 'primary'})">
                <i class="fas fa-${i.icon}"></i>
            </div>
            <div class="menu-text">${i.label}</div>
        </div>
    `).join('');
}

function closeModal() {
    document.getElementById('modal-overlay').classList.remove('active');
}