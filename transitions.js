if (document.startViewTransition) {
    document.addEventListener("click", (e) => {
        const link = e.target.closest("a[href]");
        if (!link) return;

        if (link.origin !== location.origin) return;
        if (link.target === "_blank") return;
        if (link.pathname === location.pathname) return;

        e.preventDefault();
        document.startViewTransition(() => {
            window.location.href = link.href;
        });
    });
}
