let nextId = parseInt(localStorage.getItem('nextId') || '1');

function randomHsl() {
    return `hsl(${Math.floor(Math.random() * 360)}, 70%, 75%)`;
}

function zapisz() {
    const tablica = [];

    document.querySelectorAll('.kartki').forEach((col) => {
        const cards = Array.from(col.querySelectorAll('.kartka')).map(
            (card) => ({
                id: card.dataset.id,
                text: card.querySelector('textarea').value,
                color: card.style.backgroundColor,
            })
        );
        tablica.push(cards);
    });

    localStorage.setItem('tablica', JSON.stringify(tablica));
    localStorage.setItem('nextId', nextId);
    updateCounters();
}

function odczyt() {
    const saved = JSON.parse(localStorage.getItem('tablica') || '[]');
    const columns = document.querySelectorAll('.kartki');

    saved.forEach((cards, i) => {
        const col = columns[i];
        cards.forEach((data) => {
            notatka(col, data.text, data.color, data.id);
        });
    });
    updateCounters();
}

function notatka(
    column,
    text = '',
    color = randomHsl(),
    id = `card-${nextId++}`
) {
    const k = document.createElement('div');
    k.className = 'kartka';
    k.style.backgroundColor = color;
    k.dataset.id = id;

    const not = document.createElement('div');
    not.className = 'notatkaMenu';

    const x = document.createElement('button');
    x.className = 'usun';
    x.textContent = 'X';

    const p = document.createElement('textarea');
    p.className = 'tekst';
    p.placeholder = 'Napisz notatke...';
    p.setAttribute('contenteditable', 'true');
    p.value = text;
    p.addEventListener('input', zapisz);

    const cont = document.createElement('div');
    cont.className = 'kartkaMenu';

    const l = document.createElement('button');
    l.id = 'Left';
    l.className = 'arrow left';
    l.textContent = '<<';

    const kolor = document.createElement('button');
    kolor.className = 'koloruj';
    kolor.textContent = 'Koloruj kartę';

    const r = document.createElement('button');
    r.id = 'Right';
    r.className = 'arrow right';
    r.textContent = '>>';

    k.appendChild(not);

    not.appendChild(p);
    not.appendChild(x);
    k.appendChild(cont);

    cont.appendChild(l);
    cont.appendChild(kolor);
    cont.appendChild(r);

    x.addEventListener('click', (event) => {
        event.stopPropagation();
        k.remove();
        zapisz();
    });

    kolor.addEventListener('click', () => {
        k.style.backgroundColor = randomHsl();
        zapisz();
    });

    column.appendChild(k);
}

document.querySelectorAll('.dodaj').forEach((button) => {
    button.addEventListener('click', () => {
        const column = button.closest('.col').querySelector('.kartki');
        notatka(column);
        zapisz();
    });
});

function randomHsl() {
    return `hsl(${Math.floor(Math.random() * 360)}, 70%, 75%)`;
}

function move(card, direction) {
    const columns = Array.from(document.querySelectorAll('.kartki'));
    const currentColumn = card.parentElement;
    const id = columns.indexOf(currentColumn);

    const nowyID = id + direction;
    if (nowyID >= 0 && nowyID < columns.length) {
        columns[nowyID].appendChild(card);
    }
    zapisz();
}

document.querySelectorAll('.kartki').forEach((col) => {
    col.addEventListener('click', (event) => {
        const strzalka = event.target;

        if (strzalka.classList.contains('arrow')) {
            const card = strzalka.closest('.kartka');
            let direction = 0;

            if (strzalka.classList.contains('left')) {
                direction = -1;
            } else if (strzalka.classList.contains('right')) {
                direction = 1;
            }

            move(card, direction);
        }
    });
});

function updateCounters() {
    document.querySelectorAll('.kartki').forEach((col, index) => {
        const count = col.querySelectorAll('.kartka').length;
        const counter = document.querySelector(`#counter${index + 1}`);
        if (counter) counter.textContent = `${count}`;
    });
}

document.querySelectorAll('.kolorujKoumne').forEach((btn) => {
    btn.addEventListener('click', () => {
        const column = btn.closest('.col').querySelector('.kartki');
        column.querySelectorAll('.kartka').forEach((card) => {
            card.style.backgroundColor = randomHsl();
        });
        zapisz();
    });
});

document.querySelectorAll('.sort').forEach((button) => {
    button.addEventListener('click', () => {
        const column = button.closest('.col').querySelector('.kartki');
        const cards = Array.from(column.querySelectorAll('.kartka'));

        cards.sort((a, b) => {
            return (
                parseInt(a.dataset.id.split('-')[1]) -
                parseInt(b.dataset.id.split('-')[1])
            );
        });

        cards.forEach((card) => column.appendChild(card));
        zapisz();
    });
});

window.addEventListener('DOMContentLoaded', odczyt);
