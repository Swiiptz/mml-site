(function () {
    let currentCategory = "all";
    let scrollListenerReady = false;

    function openTab(evt, tabName) {
        const tabcontent = document.getElementsByClassName("tab-content");
        for (let i = 0; i < tabcontent.length; i++) {
            tabcontent[i].classList.remove("active");
            tabcontent[i].style.opacity = 0;
        }

        const tablinks = document.getElementsByClassName("tab-btn");
        for (let i = 0; i < tablinks.length; i++) {
            tablinks[i].setAttribute("data-active", "false");
            tablinks[i].setAttribute("aria-selected", "false");
        }

        const activeTab = document.getElementById(tabName);
        if (!activeTab) {
            return;
        }

        activeTab.classList.add("active");

        setTimeout(() => {
            activeTab.style.opacity = 1;
        }, 10);

        evt.currentTarget.setAttribute("data-active", "true");
        evt.currentTarget.setAttribute("aria-selected", "true");
    }

    function setMobileMenuState(isOpen) {
        const mobileBtn = document.getElementById("mobile-menu-btn");
        const mobileMenu = document.getElementById("mobile-menu");

        if (!mobileBtn || !mobileMenu) {
            return;
        }

        if (isOpen) {
            mobileMenu.classList.remove("hidden");
            mobileMenu.classList.add("flex");
            mobileBtn.innerHTML = '<span class="material-symbols-outlined">close</span>';
        } else {
            mobileMenu.classList.add("hidden");
            mobileMenu.classList.remove("flex");
            mobileBtn.innerHTML = '<span class="material-symbols-outlined">menu</span>';
        }

        mobileBtn.setAttribute("aria-expanded", String(isOpen));
    }

    function initMobileMenu() {
        const mobileBtn = document.getElementById("mobile-menu-btn");
        const mobileMenu = document.getElementById("mobile-menu");

        if (!mobileBtn || !mobileMenu) {
            return;
        }

        mobileBtn.setAttribute("aria-expanded", "false");

        let isMenuOpen = false;
        mobileBtn.addEventListener("click", () => {
            isMenuOpen = !isMenuOpen;
            setMobileMenuState(isMenuOpen);
        });

        mobileMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                isMenuOpen = false;
                setMobileMenuState(false);
            });
        });
    }

    function handleScrollButton() {
        const scrollBtn = document.getElementById("scrollToTop");
        if (!scrollBtn) {
            return;
        }

        if (window.scrollY > 300) {
            scrollBtn.classList.remove("translate-y-20", "opacity-0");
        } else {
            scrollBtn.classList.add("translate-y-20", "opacity-0");
        }
    }

    function initScrollButton() {
        handleScrollButton();

        if (scrollListenerReady) {
            return;
        }

        window.addEventListener("scroll", handleScrollButton);
        scrollListenerReady = true;
    }

    function downloadCV() {
        const config = window.MML_SITE || {};
        const link = document.createElement("a");
        link.href = config.cvPath || "rsrc/FR_CV_Milan MULLER-LIEBRHERR.pdf";
        link.download = config.cvDownloadName || "Milan_Muller_Lieberherr_CV.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function filterProjects(category, btn) {
        currentCategory = category;

        document.querySelectorAll(".project-filter-btn").forEach((button) => {
            button.classList.remove("text-white", "bg-white/10", "shadow-sm");
            button.classList.add("text-gray-400", "hover:text-white");
            button.setAttribute("aria-pressed", "false");
        });

        btn.classList.remove("text-gray-400", "hover:text-white");
        btn.classList.add("text-white", "bg-white/10", "shadow-sm");
        btn.setAttribute("aria-pressed", "true");

        applyFiltersAndSort();
    }

    function sortProjects(order) {
        const container = document.getElementById("projects-grid");
        if (!container) {
            return;
        }

        const cards = Array.from(container.querySelectorAll(".project-card"));
        cards.sort((a, b) => {
            const yearA = parseInt(a.dataset.year);
            const yearB = parseInt(b.dataset.year);

            return order === "newest" ? yearB - yearA : yearA - yearB;
        });

        cards.forEach((card) => container.appendChild(card));
        applyFiltersAndSort();
    }

    function applyFiltersAndSort() {
        const projects = document.querySelectorAll(".project-card");
        projects.forEach((card) => {
            if (currentCategory === "all" || card.dataset.category === currentCategory) {
                card.classList.remove("hidden");
                card.classList.add("flex");
                card.style.opacity = "0";
                card.style.transform = "translateY(10px)";
                setTimeout(() => {
                    card.style.opacity = "1";
                    card.style.transform = "translateY(0)";
                }, 50);
            } else {
                card.classList.add("hidden");
                card.classList.remove("flex");
            }
        });
    }

    function switchSkillTab(category, btn) {
        if (!window.MML_SITE || !window.MML_SITE.skillsData) {
            return;
        }

        document.querySelectorAll(".skill-tab").forEach((tab) => {
            tab.classList.remove("active", "border-primary/50", "bg-primary/10", "text-white", "shadow-[0_0_15px_rgba(99,102,241,0.3)]");
            tab.classList.add("border-white/5", "bg-surface", "text-gray-400");
            tab.setAttribute("aria-pressed", "false");
        });

        btn.classList.remove("border-white/5", "bg-surface", "text-gray-400");
        btn.classList.add("active", "border-primary/50", "bg-primary/10", "text-white", "shadow-[0_0_15px_rgba(99,102,241,0.3)]");
        btn.setAttribute("aria-pressed", "true");

        const data = window.MML_SITE.skillsData[category];
        const listContainer = document.getElementById("skills-list");
        const snippetContainer = document.getElementById("code-snippet");

        if (!data || !listContainer || !snippetContainer) {
            return;
        }

        listContainer.style.opacity = "0";
        listContainer.style.transform = "translateX(-10px)";

        setTimeout(() => {
            const iconContainer = document.getElementById("skill-icon-container");
            const title = document.getElementById("skill-category-title");
            const desc = document.getElementById("skill-category-desc");
            const icon = document.getElementById("skill-category-icon");

            title.textContent = data.title;
            desc.textContent = data.desc;
            icon.textContent = data.icon;
            snippetContainer.textContent = data.snippet;

            iconContainer.className = `w-12 h-12 rounded-xl flex items-center justify-center border transition-colors duration-300 ${data.bgClass} ${data.colorClass} border-${data.colorClass.split("-")[1]}/20`;

            listContainer.innerHTML = data.skills.map((skill) => {
                const iconHTML = skill.icon.startsWith("material")
                    ? `<span class="material-symbols-outlined text-sm">${skill.icon.split(":")[1]}</span>`
                    : `<i class="${skill.icon} ${data.colorClass}"></i>`;

                return `
                    <div class="space-y-2 group/skill">
                        <div class="flex justify-between items-end">
                            <span class="font-medium text-white flex items-center gap-2">${iconHTML} ${skill.name}</span>
                            <div class="flex items-center gap-3">
                                ${skill.hours ? `<span class="text-[10px] text-gray-500 font-mono bg-white/5 px-1.5 py-0.5 rounded">${skill.hours}</span>` : ""}
                                <span class="text-xs ${data.colorClass} font-mono ${data.bgClass} px-2 py-0.5 rounded border border-${data.colorClass.split("-")[1]}/20">${skill.label}</span>
                            </div>
                        </div>
                        <div class="h-2 bg-white/5 rounded-full overflow-hidden">
                            <div class="h-full bg-gradient-to-r from-${data.colorClass.split("-")[1]} to-white/50 w-[0%] transition-all duration-1000 ease-out relative group-hover/skill:brightness-125" style="width: ${skill.level}"></div>
                        </div>
                    </div>
                `;
            }).join("");

            listContainer.style.opacity = "1";
            listContainer.style.transform = "translateX(0)";
        }, 200);
    }

    function initSite() {
        currentCategory = "all";
        initMobileMenu();
        initScrollButton();

        const activeSkillBtn = document.querySelector(".skill-tab.active");
        if (activeSkillBtn) {
            switchSkillTab("dev", activeSkillBtn);
        }
    }

    window.openTab = openTab;
    window.downloadCV = downloadCV;
    window.filterProjects = filterProjects;
    window.sortProjects = sortProjects;
    window.switchSkillTab = switchSkillTab;
    window.MMLApp = { init: initSite };
})();
