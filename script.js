
// Section switching functionality
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('#main-content > div').forEach(div => {
        div.classList.add('hidden');
    });

    // Show selected section
    document.getElementById(`${sectionId}-section`).classList.remove('hidden');

    // Highlight active sidebar link
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.remove('bg-blue-50', 'dark:bg-gray-700', 'text-blue-600', 'dark:text-blue-400');
        link.classList.add('hover:bg-gray-100', 'dark:hover:bg-gray-700', 'text-current');
    });

    // Add active class to clicked link
    const activeLink = document.querySelector(`[onclick="showSection('${sectionId}')"]`);
    if (activeLink) {
        activeLink.classList.remove('hover:bg-gray-100', 'dark:hover:bg-gray-700', 'text-current');
        activeLink.classList.add('bg-blue-50', 'dark:bg-gray-700', 'text-blue-600', 'dark:text-blue-400');
    }

    return false; // Prevent default anchor behavior
}

// Initialize charts when the DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Show dashboard by default
    showSection('dashboard');
    // Earnings Chart
    const earningsCtx = document.getElementById('earningsChart').getContext('2d');
    const earningsChart = new Chart(earningsCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Earnings',
                data: [8500, 12000, 9800, 11000, 12800, 15000],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#ffffff',
                pointBorderColor: '#3b82f6',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        animations: {
            tension: {
                duration: 1000,
                easing: 'easeInOutQuart',
                from: 1,
                to: 0.4,
                loop: false
            }
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // Occupancy Chart
    const occupancyCtx = document.getElementById('occupancyChart').getContext('2d');
    const occupancyChart = new Chart(occupancyCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Occupancy Rate',
                data: [65, 78, 72, 80, 87, 82],
                backgroundColor: '#10b981',
                borderRadius: 6
            }]
        },
        options: {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
});

// Toggle sidebar on mobile
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('-translate-x-full');
}

// Show profile dropdown
function toggleProfileDropdown() {
    document.getElementById('profile-dropdown').classList.toggle('hidden');
}

// Theme toggle functionality
document.getElementById('theme-toggle').addEventListener('click', function () {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        localStorage.theme = 'light';
        document.documentElement.classList.remove('dark');
    } else {
        localStorage.theme = 'dark';
        document.documentElement.classList.add('dark');
    }
    // Trigger a toast notification
    showToast('Theme changed successfully!');
});

// Show toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    toastMessage.textContent = message;
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

// Hide toast notification
function hideToast() {
    document.getElementById('toast').classList.add('hidden');
}

// Logout functionality
function logout() {
    document.getElementById('logout-modal').classList.remove('hidden');
}

function hideLogoutModal() {
    document.getElementById('logout-modal').classList.add('hidden');
}

function confirmLogout() {
    // In a real app, you would handle the logout process here
    showToast('You have been logged out successfully.');
    hideLogoutModal();
    // Redirect to login page after 1 second
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1000);
}

// Close dropdown when clicking outside
document.addEventListener('click', function (event) {
    const profileBtn = document.querySelector('.relative button');
    const dropdown = document.getElementById('profile-dropdown');
    if (!event.target.closest('.relative') && !dropdown.classList.contains('hidden')) {
        dropdown.classList.add('hidden');
    }
});