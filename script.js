document.addEventListener('DOMContentLoaded', () => {
    const functionSpan = document.querySelector('.function');
    const text = " Designer";
    let index = 0;
    const typeEffect = () => {
        if (index < text.length) {
            functionSpan.textContent += text[index];
            index++;
            setTimeout(typeEffect, 100);
        } else {
            functionSpan.style.borderRight = 'none';
        }
    };
    functionSpan.textContent = "";
    typeEffect();
});

document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.carousel > div[class^="carousel-inner"]');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const indicatorDots = document.getElementById('indicatorDots');

    const popupOverlay = document.getElementById('popupOverlay');
    const popupClose = document.getElementById('popupClose');
    const popupImg = document.getElementById('popupImg');
    const popupTitle = document.getElementById('popupTitle');
    const popupDescription = document.getElementById('popupDescription');
    const downloadBtn = document.getElementById('downloadBtn');

    const descriptions = [
        "Voor Graphic Skills mocht ik een eigen logo maken rond het thema kunstenaar. Ik koos voor Vincent Van Gogh waar ik dan een Mock-up van heb gemaakt.",
        "Voor Graphic Skills maakte ik een Poster rond een film namelijk “The Joker”. Ik wou graag een cool effect maken binnen mijn poster en koos voor de rode kleuren en de lach van de Joker te verwerken.",
        "In Photoshop maakte ik met verschillende foto’s een compositie in Photoshop. Zo koos ik er voor om het surrealistisch te maken.",
        "Voor deze opdracht kreeg ik de taak om posters te maken rond een tropisch thema. Ik vond dit een hele leuke opdracht en kreeg voldoende vrijheid om veel uit te proberen.",
        "In mijn middelbaar kreeg ik vaak de kans om panelen te ontwerpen en te bestickeren. Ik vond dit heel leuk en leerrijk."
    ];

    let currentIndex = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });

        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    slides.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            currentIndex = i;
            showSlide(currentIndex);
        });
        indicatorDots.appendChild(dot);
    });

    slides.forEach((slide, i) => {
        const img = slide.querySelector('img');
        img.addEventListener('click', () => {
            popupImg.src = img.src;
            popupTitle.textContent = img.alt;
            popupDescription.textContent = descriptions[i];

            downloadBtn.onclick = () => {
                const a = document.createElement('a');
                a.href = img.src;
                a.download = img.alt.replace(/\s+/g, '_') + '.png';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            };

            popupOverlay.classList.add('active');
        });
    });

    popupClose.addEventListener('click', () => {
        popupOverlay.classList.remove('active');
    });

    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            popupOverlay.classList.remove('active');
        }
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
        if (e.key === 'Escape') popupOverlay.classList.remove('active');
    });

    let autoRotate = setInterval(() => {
        nextBtn.click();
    }, 5000);

    document.querySelector('.carousel').addEventListener('mouseenter', () => {
        clearInterval(autoRotate);
    });

    document.querySelector('.carousel').addEventListener('mouseleave', () => {
        autoRotate = setInterval(() => {
            nextBtn.click();
        }, 5000);
    });

    showSlide(currentIndex);
});
