let courseCodeData = [];

fetch('scripts/codigo_nombre_materias.json')
    .then(response => response.json())
    .then(data => {
        courseCodeData = data.map(course => ({
            codigo_materia: course.codigo_materia.trim().toUpperCase(),
            nombre_materia: course.nombre_materia.trim()
        }));
    })
    .catch(error => console.error("Error loading course data:", error));

function showSuggestions(event, inputId, suggestionsListId) {
    const input = document.getElementById(inputId);
    const query = input.value.toUpperCase().trim();
    const suggestionsList = document.getElementById(suggestionsListId);

    suggestionsList.innerHTML = '';
    suggestionsList.style.display = 'none';

    if (query.length > 0) {
        const suggestions = courseCodeData.filter(course =>
            course.codigo_materia.startsWith(query) || course.nombre_materia.toUpperCase().includes(query)
        );

        suggestions.forEach(course => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item list-group-item-action';
            listItem.textContent = `${course.codigo_materia} - ${course.nombre_materia}`;
            listItem.onclick = () => {
                input.value = course.codigo_materia;
                input.dispatchEvent(new Event('input')); // Simula el evento "input"
                suggestionsList.style.display = 'none';
            };
            suggestionsList.appendChild(listItem);
        });

        if (suggestions.length > 0) {
            suggestionsList.style.display = 'block';
        }
    }
}
