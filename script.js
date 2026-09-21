document.addEventListener('DOMContentLoaded', () => {
    // ---- TAB NAVIGATION ENGINE ----
    const menuItems = document.querySelectorAll('.sidebar-menu .menu-item');
    const tabPanels = document.querySelectorAll('.tab-panel');

    function switchTab(targetId) {
        if (!targetId) return;

        // 1. Update sidebar navigation active state
        menuItems.forEach(item => {
            if (item.getAttribute('data-target') === targetId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // 2. Hide all tab panels
        tabPanels.forEach(panel => {
            panel.classList.remove('active-panel');
        });

        // 3. Reveal targeted panel
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
            targetPanel.classList.add('active-panel');
        }
    }

    // Attach click handlers to menu links
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetId = item.getAttribute('data-target');
            if (targetId) {
                switchTab(targetId);
            }
        });
    });

    // Handle hash change for URL navigation
    function handleHashChange() {
        const hash = window.location.hash.replace('#', '');
        if (hash && document.getElementById(hash)) {
            switchTab(hash);
        } else {
            switchTab('home');
        }
    }

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
});