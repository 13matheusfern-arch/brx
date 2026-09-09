document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       HEADER
    ====================================================== */

    const header = document.querySelector(".header");

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", updateHeader);

    updateHeader();



    /* =====================================================
       MENU MOBILE
    ====================================================== */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const nav =
        document.querySelector(".nav");


    if (menuToggle && nav) {

        menuToggle.addEventListener("click", () => {

            nav.classList.toggle("active");

            const isOpen =
                nav.classList.contains("active");


            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );


            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Fechar menu"
                    : "Abrir menu"
            );

        });


        const navLinks =
            nav.querySelectorAll(".nav-link");


        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Abrir menu"
                );

            });

        });

    }



    /* =====================================================
       ROLAGEM SUAVE
    ====================================================== */

    const internalLinks =
        document.querySelectorAll('a[href^="#"]');


    internalLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);


            if (!target) {
                return;
            }


            event.preventDefault();


            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;


            const targetPosition =
                target.getBoundingClientRect().top
                +
                window.scrollY
                -
                headerHeight;


            window.scrollTo({

                top: targetPosition,

                behavior: "smooth"

            });

        });

    });



    /* =====================================================
       GALERIA
    ====================================================== */

    const galleryCategories =
        document.querySelector("#galleryCategories");


    const galleryViewer =
        document.querySelector("#galleryViewer");


    const galleryBack =
        document.querySelector("#galleryBack");


    const categoryButtons =
        document.querySelectorAll(
            ".gallery-category-card"
        );


    const categoryPanels =
        document.querySelectorAll(
            ".gallery-category-panel"
        );


    /*
       Fotos da categoria atualmente aberta.
    */

    let activeGalleryItems = [];


    /*
       Índice da foto atualmente aberta.
    */

    let currentImage = 0;



    /* =====================================================
       LIGHTBOX - ELEMENTOS
    ====================================================== */

    const lightbox =
        document.querySelector(".lightbox");


    const lightboxImage =
        document.querySelector(".lightbox-content");


    const lightboxClose =
        document.querySelector(".lightbox-close");


    const lightboxPrev =
        document.querySelector(".lightbox-prev");


    const lightboxNext =
        document.querySelector(".lightbox-next");



    /* =====================================================
       FECHAR TODOS OS PAINÉIS
    ====================================================== */

    function closeAllGalleryPanels() {

        categoryPanels.forEach(panel => {

            panel.hidden = true;

            panel.classList.remove("active");

        });

    }



    /* =====================================================
       ABRIR CATEGORIA
    ====================================================== */

    function openGalleryCategory(categoryName) {

        if (
            !galleryCategories ||
            !galleryViewer
        ) {
            return;
        }


        const panel =
            document.querySelector(
                `.gallery-category-panel[data-gallery-panel="${categoryName}"]`
            );


        if (!panel) {

            console.error(
                "Painel da galeria não encontrado:",
                categoryName
            );

            return;
        }


        /*
           Fecha qualquer lightbox aberto.
        */

        closeLightbox();


        /*
           Esconde as categorias.
        */

        galleryCategories.hidden = true;


        /*
           Mostra o visualizador.
        */

        galleryViewer.hidden = false;


        /*
           Fecha todos os painéis.
        */

        closeAllGalleryPanels();


        /*
           Abre somente a categoria escolhida.
        */

        panel.hidden = false;

        panel.classList.add("active");


        /*
           Pega todas as fotos
           SOMENTE desta categoria.
        */

        activeGalleryItems =
            Array.from(
                panel.querySelectorAll(".gallery-item")
            );


        currentImage = 0;


        /*
           Rola até o início do visualizador.
        */

        const headerHeight =
            header
                ? header.offsetHeight
                : 0;


        const viewerPosition =
            galleryViewer.getBoundingClientRect().top
            +
            window.scrollY
            -
            headerHeight
            -
            25;


        window.scrollTo({

            top: viewerPosition,

            behavior: "smooth"

        });

    }



    /* =====================================================
       CLIQUE NAS CATEGORIAS
    ====================================================== */

    categoryButtons.forEach(button => {

        button.addEventListener("click", event => {

            /*
               Se o clique foi especificamente no
               "Ver produtos", também funciona.
            */

            const category =
                button.getAttribute(
                    "data-gallery-category"
                );


            if (!category) {
                return;
            }


            openGalleryCategory(category);

        });

    });



    /* =====================================================
       CLIQUE DIRETO EM "VER PRODUTOS"
    ====================================================== */

    const galleryCategoryLinks =
        document.querySelectorAll(
            ".gallery-category-link"
        );


    galleryCategoryLinks.forEach(link => {

        link.addEventListener("click", event => {

            /*
               Impede qualquer comportamento
               inesperado do elemento pai.
            */

            event.preventDefault();

            event.stopPropagation();


            /*
               Encontra o card correspondente.
            */

            const categoryCard =
                link.closest(
                    ".gallery-category-card"
                );


            if (!categoryCard) {
                return;
            }


            /*
               Descobre qual categoria
               deve ser aberta.
            */

            const category =
                categoryCard.getAttribute(
                    "data-gallery-category"
                );


            if (!category) {
                return;
            }


            /*
               Abre a categoria.
            */

            openGalleryCategory(category);

        });

    });



    /* =====================================================
       VOLTAR PARA CATEGORIAS
    ====================================================== */

    if (galleryBack) {

        galleryBack.addEventListener("click", () => {

            closeLightbox();


            activeGalleryItems = [];

            currentImage = 0;


            closeAllGalleryPanels();


            if (galleryViewer) {

                galleryViewer.hidden = true;

            }


            if (galleryCategories) {

                galleryCategories.hidden = false;

            }


            /*
               Volta para o início da seção Galeria.
            */

            const gallerySection =
                document.querySelector("#galeria");


            if (gallerySection) {

                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;


                const position =
                    gallerySection.getBoundingClientRect().top
                    +
                    window.scrollY
                    -
                    headerHeight;


                window.scrollTo({

                    top: position,

                    behavior: "smooth"

                });

            }

        });

    }



    /* =====================================================
       ABRIR LIGHTBOX
    ====================================================== */

    function openLightbox(index) {

        if (
            !lightbox ||
            !lightboxImage
        ) {
            return;
        }


        if (
            !activeGalleryItems.length
        ) {
            return;
        }


        /*
           Proteção contra índice inválido.
        */

        if (
            index < 0 ||
            index >= activeGalleryItems.length
        ) {
            return;
        }


        currentImage = index;


        const item =
            activeGalleryItems[currentImage];


        const image =
            item.querySelector("img");


        if (!image) {
            return;
        }


        const imageSrc =
            image.getAttribute("src");


        if (!imageSrc) {
            return;
        }


        lightboxImage.src = imageSrc;


        lightboxImage.alt =
            image.getAttribute("alt") ||
            "Imagem BRX Postes";


        lightbox.classList.add("active");


        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.style.overflow = "hidden";

    }



    /* =====================================================
       FECHAR LIGHTBOX
    ====================================================== */

    function closeLightbox() {

        if (!lightbox) {
            return;
        }


        lightbox.classList.remove("active");


        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        if (lightboxImage) {

            lightboxImage.src = "";

            lightboxImage.alt = "";

        }


        document.body.style.overflow = "";

    }



    /* =====================================================
       FOTO ANTERIOR
    ====================================================== */

    function showPrevious() {

        if (
            !activeGalleryItems.length
        ) {
            return;
        }


        currentImage--;


        /*
           Se estiver na primeira,
           volta para a última.
        */

        if (currentImage < 0) {

            currentImage =
                activeGalleryItems.length - 1;

        }


        openLightbox(currentImage);

    }



    /* =====================================================
       PRÓXIMA FOTO
    ====================================================== */

    function showNext() {

        if (
            !activeGalleryItems.length
        ) {
            return;
        }


        currentImage++;


        /*
           Se estiver na última,
           volta para a primeira.
        */

        if (
            currentImage >=
            activeGalleryItems.length
        ) {

            currentImage = 0;

        }


        openLightbox(currentImage);

    }



    /* =====================================================
       CLIQUE NAS FOTOS
    ====================================================== */

    const galleryItems =
        document.querySelectorAll(
            ".gallery-item"
        );


    galleryItems.forEach(item => {

        item.addEventListener("click", () => {

            const panel =
                item.closest(
                    ".gallery-category-panel"
                );


            if (!panel) {
                return;
            }


            const category =
                panel.getAttribute(
                    "data-gallery-panel"
                );


            /*
               Garante que estamos trabalhando
               com a categoria correta.
            */

            if (
                !panel.classList.contains("active")
            ) {

                openGalleryCategory(category);

            }


            /*
               Atualiza a lista da categoria.
            */

            activeGalleryItems =
                Array.from(
                    panel.querySelectorAll(
                        ".gallery-item"
                    )
                );


            /*
               Descobre exatamente qual
               foto foi clicada.
            */

            const clickedIndex =
                activeGalleryItems.indexOf(item);


            if (clickedIndex === -1) {
                return;
            }


            currentImage = clickedIndex;


            openLightbox(currentImage);

        });

    });



    /* =====================================================
       BOTÃO FECHAR LIGHTBOX
    ====================================================== */

    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }



    /* =====================================================
       BOTÃO ANTERIOR
    ====================================================== */

    if (lightboxPrev) {

        lightboxPrev.addEventListener(
            "click",
            showPrevious
        );

    }



    /* =====================================================
       BOTÃO PRÓXIMO
    ====================================================== */

    if (lightboxNext) {

        lightboxNext.addEventListener(
            "click",
            showNext
        );

    }



    /* =====================================================
       FECHAR CLICANDO FORA DA FOTO
    ====================================================== */

    if (lightbox) {

        lightbox.addEventListener("click", event => {

            if (
                event.target === lightbox
            ) {

                closeLightbox();

            }

        });

    }



    /* =====================================================
       TECLADO
    ====================================================== */

    document.addEventListener("keydown", event => {

        /*
           Só responde se o lightbox estiver aberto.
        */

        if (
            !lightbox ||
            !lightbox.classList.contains("active")
        ) {
            return;
        }


        /*
           ESC = fechar
        */

        if (event.key === "Escape") {

            closeLightbox();

            return;

        }


        /*
           ← = anterior
        */

        if (event.key === "ArrowLeft") {

            showPrevious();

            return;

        }


        /*
           → = próxima
        */

        if (event.key === "ArrowRight") {

            showNext();

            return;

        }

    });



    /* =====================================================
       ANIMAÇÕES
    ====================================================== */

    const animatedElements =
        document.querySelectorAll(
            ".animate-on-scroll"
        );


    if (
        "IntersectionObserver" in window &&
        animatedElements.length
    ) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        animatedElements.forEach(element => {

            observer.observe(element);

        });

    } else {

        animatedElements.forEach(element => {

            element.classList.add("visible");

        });

    }



    /* =====================================================
       COMEÇAR NO TOPO
    ====================================================== */

    if (
        window.location.hash === ""
    ) {

        window.scrollTo(
            0,
            0
        );

    }

});