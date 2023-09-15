const iziToast = require("izitoast")

const toast = {
    // Function to create a toast notification
    createToast : (type, title, message, color) => {
        const toastOptions = {
            title: title,
            message: message,
            position: "topRight",
            timeout: 3000,
            progressBarColor: color,
        };

        switch (type) {
            case "info":
                return iziToast.info(toastOptions);
            case "success":
                return iziToast.success(toastOptions);
            case "error":
                return iziToast.error(toastOptions);
            case "loading":
                return iziToast.info({
                    id: "loading-toast",
                    title: "Processing donation...",
                    message: "Don't close this window!",
                    position: "topRight",
                    timeout: false,
                    close: false,
                    progressBar: false,
                    overlay: true,
                    zindex: 9999,
                });
            default:
                return;
        }
    }
}
module.exports = toast