document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Function to update the icon based on the current mode
    const updateIcon = () => {
        if (body.classList.contains('dark-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';  // Sun icon for dark mode
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';  // Moon icon for light mode
        }
    };

    // Apply dark mode if previously enabled (based on localStorage)
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        updateIcon(); // Set the correct icon on page load
    } else {
        updateIcon(); // Set the correct icon for light mode on page load
    }

    // Toggle dark mode and switch icons
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }

        updateIcon(); // Update the icon based on the new mode
    });
});
