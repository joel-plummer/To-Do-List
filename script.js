document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    addTaskButton.addEventListener('click', function() {
        const taskText = taskInput.value;
        if (taskText.trim() !== '') {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span class="task-text">${taskText}</span>
                <button class="edit-button">Edit</button>
                <button class="delete-button">Delete</button>`;
            taskList.appendChild(listItem);
            taskInput.value = '';

            // Event Listener for delete button
            const deleteButton = listItem.querySelector('.delete-button');
            deleteButton.addEventListener('click', function() {
                // Remove the task item when the "Delete" button is clicked
                taskList.removeChild(listItem);
            });
            // Event Listener for edit button
            const editButton = listItem.querySelector('.edit-button');
            editButton.addEventListener('click', function() {
                const taskTextElement = listItem.querySelector('.task-text');
                const currentText = taskTextElement.textContent;

                // Replace the task text with an editable input field
                const inputField = document.createElement('input');
                inputField.type = 'text';
                inputField.value = currentText;

                // Replace the task text element with the input field
                listItem.replaceChild(inputField, taskTextElement);
                listItem.removeChild(editButton);

                // Add a "Update" button to confirm changes
                const updateButton = document.createElement('button');
                updateButton.textContent = 'Update';

                // Function to save changes
                function update() {
                    const updatedText = inputField.value;
                    if (updatedText.trim() !== '') {
                        taskTextElement.textContent = updatedText;
                    }
                    // Remove the input field, and update button
                    listItem.removeChild(inputField);
                    listItem.removeChild(updateButton);

                    // Replace with edited text
                    listItem.appendChild(taskTextElement);
                    listItem.appendChild(editButton);
                }

                // Event listener to the "Update" button
                updateButton.addEventListener('click', update);

                // Event listener to save changes when pressing Enter
                inputField.addEventListener('keydown', function(event) {
                    if (event.key === 'Enter') {
                        update();
                    }
                });

                listItem.appendChild(updateButton);

                // Focus on the input field when entering edit mode
                inputField.focus();
            });
            
        }
    });
});
