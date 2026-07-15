document.addEventListener('DOMContentLoaded', () => {
    // ---- PART 1: TAB CLICK SWITCH ROUTING ----
    const menuItems = document.querySelectorAll('.sidebar-menu .menu-item');
    const tabPanels = document.querySelectorAll('.tab-panel');

    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Remove active highlighting from all menu choices
            menuItems.forEach(i => i.classList.remove('active'));
            
            // Add highlighting indicator to clicked choice
            item.classList.add('active');

            // Find the panel target ID data
            const targetId = item.getAttribute('data-target');

            // Toggle visibility across sections
            tabPanels.forEach(panel => {
                if (panel.id === targetId) {
                    panel.classList.add('active-panel');
                } else {
                    panel.classList.remove('active-panel');
                }
            });
        });
    });

    // ---- PART 2: WEEKLY PROGRESS REPORT GENERATOR ----
    const addReportBtn = document.querySelector('.add-report-btn');
    const reportAlert = document.querySelector('.report-alert');
    const reportsContainer = document.querySelector('.reports-container');

    let weekCount = 1;

    if (addReportBtn) {
        addReportBtn.addEventListener('click', () => {
            const reportText = prompt(`Enter progress details for Week ${weekCount}:`);
            
            if (!reportText || reportText.trim() === "") return;

            if (reportAlert) {
                reportAlert.style.display = 'none';
            }

            const reportCard = document.createElement('div');
            reportCard.style.backgroundColor = '#fdfdfd';
            reportCard.style.border = '1px solid #e6dfd3';
            reportCard.style.padding = '15px 20px';
            reportCard.style.marginTop = '15px';
            reportCard.style.borderRadius = '8px';
            reportCard.style.boxShadow = '0 2px 6px rgba(0,0,0,0.02)';

            reportCard.innerHTML = `
                <h4 style="color: #800000; margin-bottom: 5px;">Week ${weekCount} Progress Report</h4>
                <p style="color: #444444; font-size: 14px; line-height: 1.5;">${reportText}</p>
            `;

            reportsContainer.appendChild(reportCard);
            weekCount++;
        });
    }
});