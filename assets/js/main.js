document.addEventListener('DOMContentLoaded', () => {

    // 1. Navigation & Tab Switching
    const navLinks = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-content');
    const pageTitle = document.getElementById('page-title');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Deactivate all links and tabs
            navLinks.forEach(l => l.classList.remove('active'));
            tabContents.forEach(t => t.classList.remove('active'));

            // Activate clicked link and corresponding tab
            link.classList.add('active');
            const selectedTab = link.getAttribute('data-tab');
            document.getElementById(`tab-${selectedTab}`).classList.add('active');

            // Update page header title
            pageTitle.textContent = link.textContent;
        });
    });

    // 2. Real-Time System Clock
    function updateClock() {
        const now = new Date();
        document.getElementById('clock').textContent = now.toLocaleTimeString();
    }
    setInterval(updateClock, 1000);
    updateClock();

    // 3. Notification Toast Handler
    function showToast(message) {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        container.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    // 4. Patient Registration Form Handling (Receptionist)
    const patientForm = document.getElementById('patient-form');
    if (patientForm) {
        patientForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const firstName = document.getElementById('first-name').value;
            const lastName = document.getElementById('last-name').value;

            // In production, send data via fetch() to your PHP API script
            showToast(`Patient ${firstName} ${lastName} registered successfully!`);
            patientForm.reset();
        });
    }

    // 5. Consultation Form Handling (Doctor)
    const consultationForm = document.getElementById('consultation-form');
    if (consultationForm) {
        consultationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Consultation record and diagnosis saved!');
            consultationForm.reset();
        });
    }

    // 6. Payment Handler (Cashier)
    const paymentBtn = document.getElementById('process-payment-btn');
    if (paymentBtn) {
        paymentBtn.addEventListener('click', () => {
            showToast('Payment processed. Receipt printed successfully!');
        });
    }

    // 7. Render Mock Audit Log Table (Admin)
    const auditBody = document.getElementById('audit-log-body');
    const mockLogs = [
        { time: '2026-11-09 10:15:22', user: 'User 1 (Admin)', action: 'LOGIN_SUCCESS', ip: '127.0.0.1' },
        { time: '2026-11-09 10:18:40', user: 'User 3 (Receptionist)', action: 'PATIENT_REGISTERED', ip: '192.168.1.15' }
    ];

    if (auditBody) {
        mockLogs.forEach(log => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${log.time}</td>
                <td>${log.user}</td>
                <td>${log.action}</td>
                <td>${log.ip}</td>
            `;
            auditBody.appendChild(row);
        });
    }

    // 8. Security Inactivity Auto-Logout Timer (15 Minutes)
    let idleTimer;
    function resetIdleTimer() {
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
            alert('Session expired due to inactivity. Logging out...');
            window.location.reload();
        }, 15 * 60 * 1000); // 15 Minutes
    }
    window.addEventListener('mousemove', resetIdleTimer);
    window.addEventListener('keypress', resetIdleTimer);
    resetIdleTimer();
});