document.addEventListener('DOMContentLoaded', () => {
    const addReportBtn = document.querySelector('.add-report-btn');
    const reportAlert = document.querySelector('.report-alert');
    const reportsSection = document.querySelector('.reports-section');

    // Counter to track the week number automatically
    let weekCount = 1;

    addReportBtn.addEventListener('click', () => {
        // 1. Hide the yellow "No reports submitted yet" alert box if it's visible
        if (reportAlert) {
            reportAlert.style.display = 'none';
        }

        // 2. Prompt the user to enter their progress text
        const reportText = prompt(`Enter progress details for Week ${weekCount}:`);
        
        // If the user cancels the prompt or types nothing, exit early
        if (!reportText || reportText.trim() === "") return;

        // 3. Create a container box for the new week entry
        const reportCard = document.createElement('div');
        reportCard.style.backgroundColor = '#ffffff';
        reportCard.style.border = '1px solid #e6dfd3';
        reportCard.style.padding = '15px 20px';
        reportCard.style.marginTop = '15px';
        reportCard.style.borderRadius = '8px';
        reportCard.style.boxShadow = '0 2px 6px rgba(0,0,0,0.02)';

        // 4. Fill the card structure with the week title and user input
        reportCard.innerHTML = `
            <h4 style="color: #800000; margin-bottom: 5px;">Week ${weekCount} Progress Report</h4>
            <p style="color: #444444; font-size: 14px; line-height: 1.5;">${reportText}</p>
        `;

        // 5. Append the card entry to the bottom of the reports section
        reportsSection.appendChild(reportCard);

        // 6. Increment our week counter for the next click
        weekCount++;
    });
});