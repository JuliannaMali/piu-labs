export function randomHsl() {
    return `hsl(${Math.floor(Math.random() * 360)}, 70%, 75%)`;
}

export function create(ksztalt) {
    const nowy = document.createElement('div');
    nowy.dataset.id = ksztalt.id;
    nowy.classList.add('shape', ksztalt.typ);
    nowy.style.backgroundColor = ksztalt.color;

    return nowy;
}
