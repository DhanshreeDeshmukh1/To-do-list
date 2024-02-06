let listContainer = document.getElementById('list-container');
let inputBox = document.getElementById('input-box');

function addTask() {
    if (inputBox.value === '') {
        alert('Please Enter the Text');
    } else {
        const task = document.createElement('li');
        task.textContent = inputBox.value;
        listContainer.appendChild(task);

        let span = document.createElement('span');
        span.textContent = '\u00d7';
        task.appendChild(span);
        span.style.right = '0px';

        inputBox.value = '';
        saveData();
    }
}

listContainer.addEventListener('click', (e) => {
    const targetElement = e.target;
    if (targetElement.tagName === 'LI') {
        targetElement.classList.toggle('checked');
        saveData();
    } else if (targetElement.tagName === 'SPAN') {
        if (!targetElement.parentElement.classList.contains('editing')) {
            targetElement.parentElement.remove();
            saveData();
        }
    }
});

listContainer.addEventListener('dblclick', (e) => {
    if (e.target.tagName === 'LI') {
        const task = e.target;
        const originalText = task.textContent.trim();
        const input = document.createElement('input');
        input.type = 'text';
        input.value = originalText;
        task.textContent = '';
        task.appendChild(input);

        let span = document.createElement('span');
        span.textContent = '\u00d7';
        task.appendChild(span);
        span.style.right = '0px';

        input.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                const newText = input.value.trim();
                if (newText !== '') {
                    task.textContent = newText;
                    task.appendChild(span);
                    saveData();
                } else {
                    task.textContent = originalText;
                    task.appendChild(span);
                    saveData();
                }
                input.remove(); 
            }
        });

        input.addEventListener('blur', () => {
            const newText = input.value.trim();
            if (newText !== '') {
                task.textContent = newText;
                task.appendChild(span); 
                saveData();
            } else {
                task.textContent = originalText;
                task.appendChild(span); 
                saveData();
            }
            input.remove(); 
        });

        input.focus(); 
    }
});

function saveData() {
    localStorage.setItem('data', listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem('data');
}

showTask();

