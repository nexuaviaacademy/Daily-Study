let currentPackage = 'literasi'; 
let currentTeacherPhone = "";

// DATA TUTOR (Pani, Anin, Salman)
const tutors = [
    { id: 1, subject: "Pengetahuan Kuantitatif", teacher: "Salman", phone: "6285890554900" },
    { id: 2, subject: "Penalaran Matematika", teacher: "Salman", phone: "6285890554900" },
    { id: 3, subject: "Penalaran Umum", teacher: "Pani", phone: "6285727250422" },
    { id: 4, subject: "Literasi Bahasa Indonesia", teacher: "Anin", phone: "6283897444106" },
    { id: 5, subject: "Pemahaman Bacaan dan Menulis", teacher: "Anin", phone: "6283897444106" },
    { id: 6, subject: "Pengetahuan dan Pemahaman Umum", teacher: "Anin", phone: "6283897444106" }
];

// DATA RIWAYAT (Sorted by latest)
const historyData = [
    { title: "Fundamental Matematika", teacher: "Salman", date: "Sabtu, 11 Jan 2026", dateISO: "2026-01-11", link: "https://us06web.zoom.us/rec/share/N9_pHVWjpyltOfwJ8MAaWa45gprMEY6c41Pp0uNVatqWknnU8Fv02ADwVgeK2VMO.418nK7FQsPqLtXIY", time: "19:00 - 20:10 WIB" },
    { title: "UTBK: Pengetahuan dan Pemahaman Umum", teacher: "Anin", date: "Sabtu, 10 Jan 2026", dateISO: "2026-01-10", link: "#", time: "19:00 - 20:10 WIB" },
    { title: "Pengetahuan Kuantitatif", teacher: "Salman", date: "Rabu, 07 Jan 2026", dateISO: "2026-01-07", link: "https://us06web.zoom.us/rec/share/cHiECTh2wrvmYBKNcg1cIcgDomVFkqwQkVV41MdJGeZo7ZwZsHhKvjXrfyG7iXGW.rDZq5dliQpJY-TWl", time: "19:00 - 20:10 WIB" }
];

document.addEventListener('DOMContentLoaded', () => {
    const savedPkg = localStorage.getItem('daily_study_package');
    if (savedPkg) currentPackage = savedPkg;
    
    renderMainMenu();
    renderTutorList();
    renderHistory(); // Initial render for all history

    const savedMsg = localStorage.getItem('tutor_draft_msg');
    if(savedMsg) document.getElementById('tutor-msg').value = savedMsg;

    // Splash Screen
    setTimeout(() => {
        document.getElementById('splash-screen').style.opacity = '0';
        setTimeout(() => { 
            document.getElementById('splash-screen').style.display = 'none'; 
            document.getElementById('main-app').style.display = 'block'; 
        }, 600);
    }, 2000);

    document.getElementById('tutor-msg').addEventListener('input', (e) => {
        localStorage.setItem('tutor_draft_msg', e.target.value);
    });
});

// --- RENDER TUTORS ---
function renderTutorList() {
    const container = document.getElementById('tutor-list-container');
    container.innerHTML = tutors.map(t => `
        <div class="info-card">
            <div class="card-header-clean">
                <h3>${t.subject}</h3>
                <i class="fas fa-chevron-right" style="color:var(--text-sec); font-size:0.8rem;"></i>
            </div>
            <div class="card-body-clean">
                <div style="margin-bottom:12px;">
                    <span class="tag-pill tag-blue">Setiap Hari</span>
                    <span class="tag-pill tag-green">Tersedia</span>
                </div>
                <div class="info-row"><i class="far fa-clock"></i> 07:00 - 20:45 WIB</div>
                <div class="info-row"><i class="fas fa-chalkboard-teacher"></i> ${t.teacher}</div>
                <button class="btn-full btn-accent" onclick="openTutorForm('${t.subject}', '${t.teacher}', '07:00 - 20:45 WIB', '${t.phone}')">
                    Pesan Sesi
                </button>
            </div>
        </div>
    `).join('');
}

// --- RENDER HISTORY ---
function renderHistory() {
    const filterDate = document.getElementById('liveDateInput').value;
    const container = document.getElementById('history-card-container');
    const filtered = filterDate ? historyData.filter(h => h.dateISO === filterDate) : historyData;

    if (filtered.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding:40px; color:#94a3b8;"><i class="fas fa-history" style="font-size:2rem; margin-bottom:10px;"></i><p>Tidak ada riwayat.</p></div>`;
    } else {
        container.innerHTML = filtered.map(h => `
            <div class="info-card">
                <div class="card-body-clean">
                    <div style="margin-bottom:10px;">
                        <span class="tag-pill tag-green">Hadir</span>
                        <span class="tag-pill tag-blue">Selesai</span>
                    </div>
                    <h3 style="margin-bottom:10px;">${h.title}</h3>
                    <div class="info-row"><i class="far fa-calendar"></i> ${h.date}</div>
                    <div class="info-row"><i class="far fa-clock"></i> ${h.time}</div>
                    <div class="info-row"><i class="fas fa-chalkboard-teacher"></i> ${h.teacher}</div>
                    <a href="${h.link}" target="_blank" class="btn-full btn-outline" style="color:var(--primary); border-color:var(--primary); text-decoration:none;" onclick="${h.link === '#' ? "alert('Rekaman belum tersedia'); return false;" : ''}">
                        <i class="fas fa-play"></i> Tonton Ulang
                    </a>
                </div>
            </div>
        `).join('');
    }
}

// --- RENDER MENU ---
function renderMainMenu() {
    const gridContainer = document.getElementById('main-grid-menu');
    const filterText = document.getElementById('filter-btn-text');
    const modalGrid = document.getElementById('modal-grid-content');

    let items = [];
    
    if(currentPackage === 'skolastik') {
        filterText.innerText = "UTBK - Tes Potensi";
        items = [
            { icon: 'brain', color: 'icon-indigo', label: 'Penalaran<br>Umum' },
            { icon: 'lightbulb', color: 'icon-teal', label: 'Pengetahuan<br>Umum' },
            { icon: 'chart-pie', color: 'icon-blue', label: 'Kuantitatif' },
            { icon: 'th-large', color: 'icon-slate', label: 'Semua', action: 'openSubjectsModal()' }
        ];
    } else {
        filterText.innerText = "UTBK - Tes Literasi";
        items = [
            { icon: 'book-open', color: 'icon-indigo', label: 'Literasi<br>B.Indo' },
            { icon: 'language', color: 'icon-blue', label: 'Literasi<br>Inggris' },
            { icon: 'chart-pie', color: 'icon-teal', label: 'Penalaran<br>MTK' },
            { icon: 'th-large', color: 'icon-slate', label: 'Semua', action: 'openSubjectsModal()' }
        ];
    }

    gridContainer.innerHTML = items.map(i => `
        <div class="menu-item" ${i.action ? `onclick="${i.action}"` : ''}>
            <div class="icon-box ${i.color}"><i class="fas fa-${i.icon}"></i></div>
            <span class="menu-label">${i.label}</span>
        </div>
    `).join('');

    const allItems = [
        { icon: 'book-open', color: 'icon-indigo', label: 'Literasi B.Indo' },
        { icon: 'language', color: 'icon-blue', label: 'Literasi Inggris' },
        { icon: 'chart-pie', color: 'icon-teal', label: 'Penalaran MTK' },
        { icon: 'brain', color: 'icon-indigo', label: 'Penalaran Umum' },
        { icon: 'lightbulb', color: 'icon-teal', label: 'Pengetahuan Umum' },
        { icon: 'book', color: 'icon-blue', label: 'Pemahaman Bacaan' },
        { icon: 'calculator', color: 'icon-indigo', label: 'Kuantitatif' },
        { icon: 'th-large', color: 'icon-slate', label: 'Semua' }
    ];

    modalGrid.innerHTML = allItems.map(i => `
        <div class="menu-item" onclick="alert('Membuka ${i.label}')">
            <div class="icon-box ${i.color}"><i class="fas fa-${i.icon}"></i></div>
            <span class="menu-label">${i.label}</span>
        </div>
    `).join('');
}

// --- NAVIGATION ---
function switchTab(page) {
    document.querySelectorAll('.page-content').forEach(el => el.style.display = 'none');
    document.getElementById(page + '-page').style.display = 'block';
    
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    const navIndex = page === 'home' ? 0 : 1;
    document.querySelectorAll('.nav-item')[navIndex].classList.add('active');
}

function switchSubMenu(menu) {
    document.querySelectorAll('.sub-menu-item').forEach(el => el.classList.remove('active'));
    document.getElementById('sub-' + menu).classList.add('active');
    
    document.getElementById('content-kelas-online').style.display = 'none';
    document.getElementById('content-sesi-tutor').style.display = 'none';
    document.getElementById('content-tryout').style.display = 'none';
    document.getElementById('tab-selector-container').style.display = 'none';

    if(menu === 'kelas') {
        document.getElementById('content-kelas-online').style.display = 'block';
        document.getElementById('tab-selector-container').style.display = 'flex';
        switchLiveTab('upcoming', document.querySelector('.live-tab-item'));
    } else if(menu === 'tutor') {
        document.getElementById('content-sesi-tutor').style.display = 'block';
    } else if(menu === 'tryout') {
        document.getElementById('content-tryout').style.display = 'block';
    }
}

function switchLiveTab(tabName, element) {
    document.querySelectorAll('.live-tab-item').forEach(t => t.classList.remove('active'));
    if(element) element.classList.add('active');
    
    document.getElementById('tab-upcoming').style.display = tabName === 'upcoming' ? 'block' : 'none';
    document.getElementById('tab-history').style.display = tabName === 'history' ? 'block' : 'none';
}

// --- TUTOR FORM ---
function openTutorForm(subject, teacher, time, phone) {
    document.querySelectorAll('.page-content').forEach(el => el.style.display = 'none');
    document.getElementById('tutor-form-page').style.display = 'block';
    document.getElementById('form-subject-title').innerText = subject;
    document.getElementById('form-teacher-name').innerText = teacher;
    document.getElementById('form-time').innerText = time;
    currentTeacherPhone = phone;
}
function closeTutorForm() {
    document.getElementById('tutor-form-page').style.display = 'none';
    document.getElementById('live-page').style.display = 'block';
}
function updateFileName() {
    const input = document.getElementById('tutor-file');
    if(input.files.length > 0) document.getElementById('file-name-display').innerText = input.files[0].name;
}
function sendToWA() {
    const msg = document.getElementById('tutor-msg').value;
    const file = document.getElementById('tutor-file').files[0];
    const teacher = document.getElementById('form-teacher-name').innerText;
    const subject = document.getElementById('form-subject-title').innerText;
    
    let finalMsg = `Halo Kak ${teacher}, saya ingin diskusi tentang ${subject}.\n\nPertanyaan: ${msg}`;
    if(file) finalMsg += `\n\n[Melampirkan file: ${file.name}]`;
    
    window.open(`https://wa.me/${currentTeacherPhone}?text=${encodeURIComponent(finalMsg)}`, '_blank');
}

// --- MODALS ---
function showComingSoon() { document.getElementById('coming-soon-modal').style.display = 'flex'; }
function closeComingSoon() { document.getElementById('coming-soon-modal').style.display = 'none'; }
function openClassModal() { document.getElementById('class-modal').style.display = 'flex'; }
function closeClassModal() { document.getElementById('class-modal').style.display = 'none'; }
function openSubjectsModal() { document.getElementById('subjects-modal').style.display = 'flex'; }
function closeSubjectsModal() { document.getElementById('subjects-modal').style.display = 'none'; }

function selectPackage(pkg) {
    currentPackage = pkg;
    document.querySelectorAll('.class-option').forEach(el => el.classList.remove('active'));
    document.getElementById(pkg === 'skolastik' ? 'btn-skolastik' : 'btn-literasi').classList.add('active');
}

function saveClassSettings() {
    localStorage.setItem('daily_study_package', currentPackage);
    renderMainMenu();
    closeClassModal();
}