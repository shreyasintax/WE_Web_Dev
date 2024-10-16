document.querySelectorAll('section > h1, section > h2, section > h3').forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        if (content.style.display === 'none') {
            content.style.display = 'block';
        } else {
            content.style.display = 'none';
        }
    });
});

function generateTOC() {
    const tocList = document.getElementById('toc-list');
    const headings = document.querySelectorAll('section h1, section h2, section h3');
    const toc = {};

    headings.forEach(heading => {
        const level = parseInt(heading.tagName.substring(1));
        const text = heading.textContent;
        const id = text.toLowerCase().replace(/\s+/g, '-');

        heading.id = id;

        if (level === 1) {
            toc[id] = { text: text, children: {} };
            var current = toc[id];
        } else if (level === 2 && current) {
            current.children[id] = { text: text, children: {} };
        }
    });


    function buildList(items) {
        const ul = document.createElement('ul');
        for (let key in items) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `#${key}`;
            a.textContent = items[key].text;
            li.appendChild(a);
            if (Object.keys(items[key].children).length > 0) {
                li.appendChild(buildList(items[key].children));
            }
            ul.appendChild(li);
        }
        return ul;
    }

    tocList.appendChild(buildList(toc));
}

document.addEventListener('DOMContentLoaded', () => {
    generateTOC();
});