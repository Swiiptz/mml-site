(function () {
    const languages = {
        fr: {
            page: "assets/pages/fr.html",
            contentScript: "assets/js/content-fr.js",
            title: "Milan Müller Lieberherr | Portfolio Cybersécurité & Développement",
            description: "Portfolio de Milan Müller Lieberherr, étudiant EPITA à la recherche d'une alternance en cybersécurité.",
            locale: "fr_FR",
        },
        en: {
            page: "assets/pages/en.html",
            contentScript: "assets/js/content-en.js",
            title: "Milan Müller Lieberherr | Cybersecurity & Development Portfolio",
            description: "Portfolio of Milan Müller Lieberherr, EPITA student looking for a cybersecurity work-study program.",
            locale: "en_US",
        },
    };

    function getRequestedLanguage() {
        const params = new URLSearchParams(window.location.search);
        const requested = params.get("lang");

        if (requested && languages[requested]) {
            return requested;
        }

        const saved = window.localStorage.getItem("mml-language");
        if (saved && languages[saved]) {
            return saved;
        }

        return "fr";
    }

    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const previousScript = document.querySelector("script[data-content-script]");
            if (previousScript) {
                previousScript.remove();
            }

            window.MML_SITE = undefined;

            const script = document.createElement("script");
            script.src = src;
            script.dataset.contentScript = "true";
            script.onload = resolve;
            script.onerror = reject;
            document.body.appendChild(script);
        });
    }

    function updateHead(lang, config) {
        document.documentElement.lang = lang;
        document.title = config.title;

        const description = document.querySelector('meta[name="description"]');
        if (description) {
            description.setAttribute("content", config.description);
        }

        setMeta("property", "og:title", config.title);
        setMeta("property", "og:description", config.description);
        setMeta("property", "og:locale", config.locale);
        setMeta("property", "og:url", window.location.href);
        setMeta("name", "twitter:title", config.title);
        setMeta("name", "twitter:description", config.description);
        setLink("canonical", `index.html?lang=${lang}`);
    }

    function setMeta(attribute, key, content) {
        let meta = document.querySelector(`meta[${attribute}="${key}"]`);
        if (!meta) {
            meta = document.createElement("meta");
            meta.setAttribute(attribute, key);
            document.head.appendChild(meta);
        }

        meta.setAttribute("content", content);
    }

    function setLink(rel, href) {
        const link = document.querySelector(`link[rel="${rel}"]`);
        if (link) {
            link.setAttribute("href", href);
        }
    }

    function scrollToHash() {
        if (!window.location.hash) {
            return;
        }

        const target = document.querySelector(window.location.hash);
        if (target) {
            requestAnimationFrame(() => target.scrollIntoView());
        }
    }

    async function loadLanguage(lang) {
        const config = languages[lang] || languages.fr;
        const root = document.getElementById("site-root");

        updateHead(lang, config);
        window.localStorage.setItem("mml-language", lang);

        await loadScript(config.contentScript);

        const response = await fetch(config.page);
        if (!response.ok) {
            throw new Error(`Unable to load ${config.page}`);
        }

        root.innerHTML = await response.text();
        window.MMLApp.init();
        scrollToHash();
    }

    document.addEventListener("DOMContentLoaded", () => {
        loadLanguage(getRequestedLanguage()).catch((error) => {
            const root = document.getElementById("site-root");
            root.innerHTML = '<div class="min-h-screen flex items-center justify-center px-6 text-center"><p>Impossible de charger le portfolio local.</p></div>';
            console.error(error);
        });
    });
})();
