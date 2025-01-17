let lists = document.getElementsByClassName('list');
let rightBox = document.getElementById('right');
let leftBox = document.getElementById('left');
const todoContainer = document.getElementById('left');
const doneContainer = document.getElementById('right');
const addButton = document.getElementById('addButton');
const titleInput = document.getElementById('todoTitle');
const descriptionInput = document.getElementById('todoDescription');


for (lists of lists) {
    lists.addEventListener('dragstart', function (e) {
        let selected = e.target;

        rightBox.addEventListener('dragover', function (e) {
            e.preventDefault();
        });

        rightBox.addEventListener('drop', function (e) {
            e.preventDefault();
            rightBox.appendChild(selected);
            selected = null;
        });
        leftBox.addEventListener('dragover', function (e) {
            e.preventDefault();
        });

        leftBox.addEventListener('drop', function (e) {
            e.preventDefault();
            leftBox.appendChild(selected);
            selected = null;
        });
    });

}


todoContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
});

todoContainer.addEventListener('drop', (e) => {
    e.preventDefault();

    const draggableElement = document.getElementById(id);

    if (draggableElement) {
        todoContainer.appendChild(draggableElement);
    }
});

const addDragAndDropEvents = (item) => {
    item.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', e.target.id);
        e.target.classList.add('dragging');
    });

    item.addEventListener('dragend', (e) => {
        e.target.classList.remove('dragging');
    });
};
doneContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
});

doneContainer.addEventListener('drop', (e) => {
    e.preventDefault();

    const draggableElement = document.getElementById(id);

    if (draggableElement) {
        doneContainer.appendChild(draggableElement);
    }
});

todoContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
});

todoContainer.addEventListener('drop', (e) => {
    e.preventDefault();

    const draggableElement = document.getElementById(id);
    if (draggableElement) {
        todoContainer.appendChild(draggableElement);
    }
});

addButton.addEventListener('click', () => {
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    if (title && description) {
        const newTodo = document.createElement('div');
        newTodo.classList.add('list');
        newTodo.setAttribute('draggable', 'true');
        newTodo.innerHTML = `
            <div class="item_circle"></div>
            <div>
                <h4>${title}</h4>
                <p>${description}</p>
            </div>
        `;
        newTodo.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.id);
            newTodo.classList.add('dragging');
        });
        newTodo.addEventListener('dragend', () => {
            newTodo.classList.remove('dragging');
        });
        todoContainer.appendChild(newTodo);
        titleInput.value = '';
        descriptionInput.value = '';
    } else {
        alert('nma qilsihingizni yozing');
    }
});
