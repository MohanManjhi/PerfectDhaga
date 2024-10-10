document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const notificationItems = document.querySelectorAll(".notification-item");
    const markAllReadButton = document.getElementById("mark-all-read");

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            const filter = this.getAttribute("data-filter");

            // Remove active class from all buttons and add to clicked button
            filterButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            // Show/hide notifications based on filter
            notificationItems.forEach(item => {
                if (filter === "all" || item.classList.contains(filter)) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
        });
    });

    // Delete notification functionality
    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach(button => {
        button.addEventListener("click", function () {
            const notificationItem = this.closest(".notification-item");
            notificationItem.remove();
        });
    });

    // Mark all as read functionality
    markAllReadButton.addEventListener("click", function () {
        notificationItems.forEach(item => {
            item.classList.remove("unread");
            item.classList.add("read");
        });
    });
});
