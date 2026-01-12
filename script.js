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
    if(localStorage.getItem('theme') === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.querySelector('.theme-btn i').classList.replace('fa-moon', 'fa-sun');
    }

    const savedPkg = localStorage.getItem('daily_study_package');
    if (savedPkg) {
        currentPackage = savedPkg;
        updateHeaderText(savedPkg);
    }
    
    renderMenu();
    renderTutors();
    renderHistory();

    const savedMsg = localStorage.getItem('tutor_draft_msg');
    if(savedMsg) document.getElementById('form-msg').value = savedMsg;

    setTimeout(() => {
        document.getElementById('splash-screen').style.opacity = '0';
        setTimeout(() => document.getElementById('splash-screen').style.display = 'none', 500);
    }, 1500);

    document.getElementById('form-msg').addEventListener('input', (e) => localStorage.setItem('tutor_draft_msg', e.target.value));
});

function toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    document.querySelector('.theme-btn i').className = isDark ? 'fas fa-moon' : 'fas fa-sun';
}

function renderMenu() {
    const container = document.getElementById('main-grid-menu');
    let items = [];

    if(currentPackage === 'skolastik') {
        items = [
            { icon: 'brain', color: 'indigo', label: 'Pen. Umum' },
            { icon: 'lightbulb', color: 'teal', label: 'Peng. Umum' },
            { icon: 'calculator', color: 'blue', label: 'Kuantitatif' },
            { icon: 'th-large', color: 'slate', label: 'Semua', action: 'openSubjectsModal()' }
        ];
    } else {
        items = [
            { icon: 'book-open', color: 'blue', label: 'Lit. Indo' },
            { icon: 'language', color: 'indigo', label: 'Lit. Ing' },
            { icon: 'chart-pie', color: 'teal', label: 'Penalaran' },
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
    document.getElementById('tutor-container').innerHTML = tutors.map(t => `
        <div class="info-card">
            <h3>${t.subject}</h3>
            <div style="font-size:0.8rem; color:var(--text-light); margin-bottom:10px;"><i class="far fa-clock"></i> 07:00 - 20:45</div>
            <div style="font-size:0.8rem; color:var(--text-light); margin-bottom:15px;"><i class="fas fa-chalkboard-teacher"></i> ${t.teacher}</div>
            <button class="btn-primary" style="width:100%; padding:10px; border-radius:100px;" onclick="openForm('${t.subject}', '${t.teacher}', '${t.phone}')">Pesan Sesi</button>
        </div>
    `).join('');
}

function renderHistory() {
    document.getElementById('history-container').innerHTML = historyData.map(h => `
        <div class="info-card">
            <h3 style="margin-bottom:5px;">${h.title}</h3>
            <div style="font-size:0.8rem; color:var(--text-light);"><i class="far fa-calendar"></i> ${h.date}</div>
            <a href="${h.link}" target="_blank" class="btn-outline">Tonton Ulang</a>
        </div>
    `).join('');
}

function switchTab(pageId) {
    document.querySelectorAll('.page-section').forEach(el => el.classList.remove('active'));
    document.getElementById('page-' + pageId).classList.add('active');
    
    document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));
    if(pageId === 'home') document.querySelectorAll('.nav-btn')[0].classList.add('active');
    else if(pageId === 'live') document.querySelectorAll('.nav-btn')[1].classList.add('active');
}

function switchSubMenu(viewId) {
    document.querySelectorAll('.chip').forEach(el => el.classList.remove('active'));
    document.getElementById('chip-' + viewId).classList.add('active');
    
    ['kelas', 'tutor', 'tryout'].forEach(id => document.getElementById('view-' + id).style.display = 'none');
    document.getElementById('view-' + viewId).style.display = 'block';
}

function switchLiveTab(tabId, el) {
    document.querySelectorAll('.seg-item').forEach(e => e.classList.remove('active'));
    el.classList.add('active');
    document.getElementById('tab-upcoming').style.display = tabId === 'upcoming' ? 'block' : 'none';
    document.getElementById('tab-history').style.display = tabId === 'history' ? 'block' : 'none';
}

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

function showComingSoon() {
    const modal = document.getElementById('modal-body');
    document.getElementById('modal-overlay').classList.add('active');
    modal.innerHTML = `
        <div style="text-align:center">
            <i class="fas fa-rocket" style="font-size:3rem; color:var(--primary); margin-bottom:15px;"></i>
            <h3 style="color:var(--text); margin-bottom:10px;">Coming Soon!</h3>
            <button class="btn-primary" style="width:100%; border-radius:100px; padding:12px;" onclick="closeModal()">Oke</button>
        </div>
    `;
}

function openClassModal() {
    const modal = document.getElementById('modal-body');
    document.getElementById('modal-overlay').classList.add('active');
    modal.innerHTML = `
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
        <h3 style="text-align:center; color:var(--text); margin-bottom:20px;">Semua Pelajaran</h3>
        <div class="grid-menu" style="padding:0;">
            <div class="menu-item"><div class="icon-box" style="color:var(--primary)"><i class="fas fa-book-open"></i></div><span class="menu-text">Lit. Indo</span></div>
            <div class="menu-item"><div class="icon-box" style="color:#6366f1"><i class="fas fa-language"></i></div><span class="menu-text">Lit. Ing</span></div>
            <div class="menu-item"><div class="icon-box" style="color:#14b8a6"><i class="fas fa-chart-pie"></i></div><span class="menu-text">Penalaran</span></div>
            <div class="menu-item"><div class="icon-box" style="color:#6366f1"><i class="fas fa-brain"></i></div><span class="menu-text">Pen. Umum</span></div>
            <div class="menu-item"><div class="icon-box" style="color:#14b8a6"><i class="fas fa-lightbulb"></i></div><span class="menu-text">Peng. Umum</span></div>
            <div class="menu-item"><div class="icon-box" style="color:var(--primary)"><i class="fas fa-book"></i></div><span class="menu-text">Pemahaman</span></div>
            <div class="menu-item"><div class="icon-box" style="color:#64748b"><i class="fas fa-calculator"></i></div><span class="menu-text">Kuantitatif</span></div>
        </div>
        <button class="btn-primary" style="width:100%; border-radius:100px; padding:12px; margin-top:15px;" onclick="closeModal()">Tutup</button>
    `;
}

function closeModal() {
    document.getElementById('modal-overlay').classList.remove('active');
}