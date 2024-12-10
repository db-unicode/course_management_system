function handleInput(event, labelId, suggestionsListId) {
    const input = event.target;
    const value = input.value.trim().toUpperCase();
    const label = document.getElementById(labelId);

    // Mostrar el nombre del curso correspondiente
    const course = courseCodeData.find(c => c.codigo_materia === value);
    if (course) {
        label.textContent = course.nombre_materia;
    } else {
        label.textContent = "Curso no encontrado";
    }

    // Llamar al autocompletado
    showSuggestions(event, input.id, suggestionsListId);
}
