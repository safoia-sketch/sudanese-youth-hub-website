document.addEventListener("DOMContentLoaded", () => {
    const revealElements = document.querySelectorAll(".reveal");

    // Show everything normally if the browser does not support IntersectionObserver.
    if (!("IntersectionObserver" in window)) {
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });

        return;
    }

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.15
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
});