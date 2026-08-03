document.addEventListener('DOMContentLoaded', () => {
    // ---- 1. PASSCODE LOGIC ----
    const MASTER_PASSCODE = "kelvin123";

    const passcodeModal = document.getElementById('passcode-modal');
    const passcodeInput = document.getElementById('passcode-input');
    const submitPasscodeBtn = document.getElementById('submit-passcode-btn');
    const closePasscodeBtn = document.querySelector('.close-passcode-btn');

    let pendingAction = null;

    function requestPasscode(actionCallback) {
        pendingAction = actionCallback;
        passcodeInput.value = '';
        passcodeModal.classList.add('show-modal');
        passcodeInput.focus();
    }

    function verifyAndExecute() {
        if (passcodeInput.value === MASTER_PASSCODE) {
            passcodeModal.classList.remove('show-modal');
            if (pendingAction) {
                pendingAction();
                pendingAction = null;
            }
        } else {
            alert('Incorrect passcode!');
            passcodeInput.value = '';
        }
    }

    if (submitPasscodeBtn) submitPasscodeBtn.addEventListener('click', verifyAndExecute);
    if (passcodeInput) {
        passcodeInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') verifyAndExecute();
        });
    }

    if (closePasscodeBtn) {
        closePasscodeBtn.addEventListener('click', () => {
            passcodeModal.classList.remove('show-modal');
            pendingAction = null;
        });
    }

    // ---- 2. NAVIGATION SWAP ----
    const menuItems = document.querySelectorAll('.sidebar-menu .menu-item');
    const tabPanels = document.querySelectorAll('.tab-panel');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetId = item.getAttribute('data-target');
            const currentActivePanel = document.querySelector('.tab-panel.active-panel');
            const targetPanel = document.getElementById(targetId);

            if (!currentActivePanel || currentActivePanel.id === targetId) return;

            menuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            currentActivePanel.classList.remove('active-panel', 'slide-right');
            currentActivePanel.classList.add('slide-left');

            targetPanel.classList.remove('slide-left');
            targetPanel.classList.add('slide-right');
            
            void targetPanel.offsetWidth; 

            targetPanel.classList.remove('slide-right');
            targetPanel.classList.add('active-panel');
        });
    });

    // ---- 3. REPORT MANAGEMENT ENGINE ----
    const addReportBtn = document.querySelector('.add-report-btn');
    const reportAlert = document.querySelector('.report-alert');
    const reportsContainer = document.querySelector('.reports-container');
    const pdfModal = document.getElementById('pdf-modal');
    const pdfFrame = document.getElementById('pdf-frame');
    const modalTitle = document.getElementById('modal-title');
    const closeModalBtn = document.querySelector('.close-modal-btn');

    let weekCount = 1;

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            pdfModal.classList.remove('show-modal');
            pdfFrame.src = '';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === pdfModal) {
            pdfModal.classList.remove('show-modal');
            pdfFrame.src = '';
        }
        if (e.target === passcodeModal) {
            passcodeModal.classList.remove('show-modal');
            pendingAction = null;
        }
    });

    if (addReportBtn) {
        addReportBtn.addEventListener('click', () => {
            requestPasscode(() => {
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.accept = 'application/pdf';

                fileInput.onchange = (e) => {
                    const file = e.target.files[0];
                    if (!file) return;

                    if (file.type !== 'application/pdf') {
                        alert('Please select a valid PDF file.');
                        return;
                    }

                    const reportText = prompt(`Enter brief remarks for Week ${weekCount}:`, `Weekly log for ${file.name}`);
                    if (reportText === null) return;

                    if (reportAlert) reportAlert.style.display = 'none';

                    const fileURL = URL.createObjectURL(file);

                    const reportCard = document.createElement('div');
                    reportCard.className = 'report-card';
                    reportCard.setAttribute('data-week', weekCount);

                    reportCard.innerHTML = `
                        <div class="card-header-row">
                            <h4 class="report-card-title">Week ${weekCount} Progress Report</h4>
                            <div class="card-actions">
                                <button class="action-btn view-btn"><i class="fa-solid fa-eye"></i> View PDF</button>
                                <button class="action-btn edit-btn"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
                                <button class="action-btn delete-btn"><i class="fa-solid fa-trash"></i> Delete</button>
                            </div>
                        </div>
                        <p class="report-card-text">${reportText}</p>
                        <span class="file-name-badge"><i class="fa-solid fa-file-pdf"></i> ${file.name}</span>
                    `;

                    reportCard.querySelector('.view-btn').addEventListener('click', () => {
                        modalTitle.textContent = `Preview: Week ${reportCard.getAttribute('data-week')} Report (${file.name})`;
                        pdfFrame.src = fileURL;
                        pdfModal.classList.add('show-modal');
                    });

                    reportCard.querySelector('.edit-btn').addEventListener('click', () => {
                        requestPasscode(() => {
                            const currentRemarks = reportCard.querySelector('.report-card-text').textContent;
                            const updatedRemarks = prompt('Edit your report remarks:', currentRemarks);
                            if (updatedRemarks !== null && updatedRemarks.trim() !== '') {
                                reportCard.querySelector('.report-card-text').textContent = updatedRemarks;
                            }
                        });
                    });

                    reportCard.querySelector('.delete-btn').addEventListener('click', () => {
                        requestPasscode(() => {
                            if (confirm('Are you sure you want to delete this weekly report entry?')) {
                                reportCard.remove();
                                if (reportsContainer.children.length === 0 && reportAlert) {
                                    reportAlert.style.display = 'block';
                                }
                            }
                        });
                    });

                    reportsContainer.appendChild(reportCard);
                    weekCount++;
                };

                fileInput.click();
            });
        });
    }
});