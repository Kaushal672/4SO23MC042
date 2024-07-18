const WINDOW_SIZE = 10;

class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

class List {
    constructor() {
        this.root = null;
        this.size = 0;
        this.tail = null;
    }

    insert(val) {
        if (this.size === WINDOW_SIZE) {
            this.root = this.root.next;
            this.size--;
        }

        if (this.size === 0) {
            this.root = new Node(val);
            this.tail = this.root;
            this.size++;
            return;
        }

        const node = new Node(val);

        this.tail.next = node;
        this.tail = this.tail.next;
        this.size++;
    }

    getArray() {
        if (!this.root) return [];
        const res = [];
        let cur = this.root;
        while (cur.next) {
            res.push(cur.val);
            cur = cur.next;
        }

        return res;
    }
}

module.exports = List;
