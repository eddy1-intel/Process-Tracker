
const processList = document.getElementById('processList');

// Load data from localStorage on page load
window.onload = function() {
    const storedProcesses = JSON.parse(localStorage.getItem('processes')) || [];
    storedProcesses.forEach(process => renderProcess(process));
};

function addProcess() {
    const processName = document.getElementById('process').value;
    const toolName = document.getElementById('tool').value;
    const progress = document.getElementById('progress').value;

    if (!processName || !toolName || progress === "") {
        alert('Please fill out all fields.');
        return;
    }

    const process = {
        id: Date.now(),
        name: processName,
        tool: toolName,
        progress: parseInt(progress, 10)
    };

    renderProcess(process);
    saveProcess(process);

    document.getElementById('process').value = '';
    document.getElementById('tool').value = '';
    document.getElementById('progress').value = '';
}

function renderProcess(process) {
    const processItem = document.createElement('div');
    processItem.className = 'process-item';
    processItem.dataset.id = process.id;

    processItem.innerHTML = `
        <strong>Process:</strong> <span class="process-name">${process.name}</span><br>
        <strong>Tool:</strong> <span class="tool-name">${process.tool}</span><br>
        <strong>Progress:</strong> <span class="progress-value">${process.progress}</span>%
        <div class="progress-bar">
            <div class="progress-bar-inner" style="width: ${process.progress}%">${process.progress}%</div>
        </div>
        <button class="edit-btn" onclick="editProcess(this)">Edit</button>
        <button class="delete-btn" onclick="deleteProcess(this)">Delete</button>
    `;

    processList.appendChild(processItem);
}

function saveProcess(process) {
    const processes = JSON.parse(localStorage.getItem('processes')) || [];
    processes.push(process);
    localStorage.setItem('processes', JSON.stringify(processes));
}

function deleteProcess(button) {
    const processItem = button.parentElement;
    const processId = processItem.dataset.id;

    processItem.remove();

    let processes = JSON.parse(localStorage.getItem('processes')) || [];
    processes = processes.filter(process => process.id !== parseInt(processId, 10));
    localStorage.setItem('processes', JSON.stringify(processes));
}

function editProcess(button) {
    const processItem = button.parentElement;
    const processId = processItem.dataset.id;

    const processName = processItem.querySelector('.process-name').textContent;
    const toolName = processItem.querySelector('.tool-name').textContent;
    const progress = processItem.querySelector('.progress-value').textContent;

    document.getElementById('process').value = processName;
    document.getElementById('tool').value = toolName;
    document.getElementById('progress').value = progress;

    deleteProcess(button);
}

