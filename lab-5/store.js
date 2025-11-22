class Store {
    #status = {
        ksztalty: [],
    };

    #subscribers = new Set();

    read_saved() {
        const odczyt_zapisu = localStorage.getItem('zapis');
        if (odczyt_zapisu) {
            this.#status = JSON.parse(odczyt_zapisu);
        }
        this.#notify();
    }

    subscribe(callback) {
        this.#subscribers.add(callback);
        callback(this.#status);
        return () => this.#subscribers.delete(callback);
    }

    #notify() {
        localStorage.setItem('zapis', JSON.stringify(this.#status));
        for (const callback of this.#subscribers) callback(this.#status);
    }

    dodaj(typ, color) {
        this.#status.ksztalty.push({
            id: Date.now(),
            typ,
            color,
        });
        this.#notify();
    }
    usun(id) {
        const ind = this.#status.ksztalty.findIndex((s) => s.id === id);
        if (ind !== -1) {
            this.#status.ksztalty.splice(ind, 1);
            this.#notify();
        }
    }

    koloruj(typ) {
        this.#status.ksztalty.forEach((s) => {
            if (s.typ === typ)
                s.color = `hsl(${Math.floor(Math.random() * 360)}, 70%, 75%)`;
        });
        this.#notify();
    }

    get ksztalty() {
        return this.#status.ksztalty;
    }
    get sqrtCount() {
        return this.#status.ksztalty.filter((s) => s.typ === 'sqrt').length;
    }
    get circlesCount() {
        return this.#status.ksztalty.filter((s) => s.typ === 'circle').length;
    }
}

export const store = new Store();
