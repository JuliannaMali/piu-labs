import { store } from './store.js';
import { randomHsl, create } from './helpers.js';

const board = document.getElementById('board');
const countSqrt = document.getElementById('countSqrt');
const countCircle = document.getElementById('countCircle');

function liczniki() {
    countSqrt.textContent = store.sqrtCount;
    countCircle.textContent = store.circlesCount;
}

store.subscribe((status) => {
    status.ksztalty.forEach((s) => {
        let el = board.querySelector(`[data-id='${s.id}']`);
        if (!el) {
            board.appendChild(create(s));
        } else {
            el.style.backgroundColor = s.color;
        }
    });
    liczniki();
});

board.addEventListener('click', (e) => {
    const element = e.target.closest('.shape');
    if (!element) return;
    store.usun(Number(element.dataset.id));
    element.remove();
});

export function UI() {
    document.getElementById('addSqrt').onclick = () =>
        store.dodaj('sqrt', randomHsl());
    document.getElementById('addCircle').onclick = () =>
        store.dodaj('circle', randomHsl());

    document.getElementById('colorSqrt').onclick = () => store.koloruj('sqrt');
    document.getElementById('colorCircle').onclick = () =>
        store.koloruj('circle');
}
