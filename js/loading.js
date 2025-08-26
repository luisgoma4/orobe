// Loading screen functionality for OROBE website

class LoadingScreen {
    constructor() {
        this.loadingScreen = document.getElementById('loadingScreen');
        this.init();
    }

    init() {
        // Hide loading screen when page is fully loaded
        window.addEventListener('load', () => {
            this.hideLoadingScreen();
        });

        // Fallback: hide loading screen after maximum time
        setTimeout(() => {
            this.hideLoadingScreen();
        }, 5000); // 5 seconds maximum
    }

    hideLoadingScreen() {
        if (this.loadingScreen) {
            this.loadingScreen.classList.add('hidden');
            
            // Remove from DOM after transition completes
            setTimeout(() => {
                if (this.loadingScreen && this.loadingScreen.parentNode) {
                    this.loadingScreen.parentNode.removeChild(this.loadingScreen);
                }
            }, 500); // Match CSS transition duration
        }
    }

    // Method to show loading screen (for SPA navigation if needed)
    showLoadingScreen() {
        if (this.loadingScreen) {
            this.loadingScreen.classList.remove('hidden');
        }
    }
}

// Initialize loading screen when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new LoadingScreen();
});

// Export for use in other files if needed
window.LoadingScreen = LoadingScreen;
