let coursesData = {
    simple_courses: [],
    course_bundles: {}
};

function addSimpleCourse() {
    const courseCodeInput = document.getElementById('simple_course_code');
    const courseCode = courseCodeInput.value.trim().toUpperCase();

    if (courseCode && !coursesData.simple_courses.some(course => course.code === courseCode)) {
        const course = courseCodeData.find(c => c.codigo_materia === courseCode);
        coursesData.simple_courses.push({
            code: courseCode,
            name: course ? course.nombre_materia : "Course not found"
        });

        courseCodeInput.value = '';
        document.getElementById('simple_course_label').textContent = 'Course name will appear here';
        updateAddedCoursesList();
    } else {
        alert("Course code is either empty or already exists.");
    }
}

function addCourseToBundle() {
    const container = document.getElementById('bundle_courses_container');
    const courseCounter = Date.now();
    const courseDiv = document.createElement('div');
    courseDiv.className = 'bundle-course-item mb-3 position-relative';
    courseDiv.innerHTML = `
        <div class="row align-items-center">
            <div class="col-md-6">
                <input type="text" id="course_code_${courseCounter}" class="form-control course-code"
                    placeholder="Course Code"
                    oninput="handleInput(event, 'course_label_${courseCounter}', 'suggestions_list_${courseCounter}')">
                <ul id="suggestions_list_${courseCounter}" class="list-group position-absolute suggestions-list"></ul>
            </div>
            <span id="course_label_${courseCounter}" class="col-md-3 text-black fw-bold">Course name will appear here</span>
            <div class="col-md-2">
                <label>
                    <input type="radio" class="type" name="type_${courseCounter}" value="REQUIRED" checked> Required
                </label>
                <label>
                    <input type="radio" class="type" name="type_${courseCounter}" value="OPTIONAL"> Optional
                </label>
            </div>
            <div class="col-md-1">
                <button type="button" class="btn btn-danger btn-sm" onclick="this.closest('.bundle-course-item').remove()">X</button>
            </div>
        </div>
    `;
    container.appendChild(courseDiv);
}

function addCourseBundle() {
    const bundleName = document.getElementById('bundle_name').value.trim();
    const minCredits = parseInt(document.getElementById('min_credits').value);
    const relatedBundles = document.getElementById('related_bundles').value.split(',').map(b => b.trim());
    const bundleCourses = {};

    document.querySelectorAll('#bundle_courses_container .bundle-course-item').forEach(item => {
        const courseCode = item.querySelector('.course-code').value.trim().toUpperCase();
        const courseType = item.querySelector('.type:checked')?.value;
        const course = courseCodeData.find(c => c.codigo_materia === courseCode);

        if (courseCode && courseType) {
            bundleCourses[courseCode] = {
                type: courseType,
                name: course ? course.nombre_materia : "Course not found"
            };
        }
    });

    if (!bundleName) {
        alert("Bundle name is required.");
        return;
    }

    if (isNaN(minCredits) || minCredits < 0) {
        alert("Minimum credits must be a positive number.");
        return;
    }

    if (Object.keys(bundleCourses).length === 0) {
        alert("You must add at least one course to the bundle.");
        return;
    }

    coursesData.course_bundles[bundleName] = {
        minimum_credits_to_pass: minCredits,
        related_bundles: relatedBundles,
        courses: bundleCourses,
    };

    document.getElementById('bundle_name').value = '';
    document.getElementById('min_credits').value = '';
    document.getElementById('related_bundles').value = '';
    document.getElementById('bundle_courses_container').innerHTML = '';
    updateAddedCoursesList();
}

function updateAddedCoursesList() {
    const listContainer = document.getElementById('added_courses_list');
    listContainer.innerHTML = '';

    // Agregar Simple Courses
    if (coursesData.simple_courses.length > 0) {
        const simpleCoursesSection = document.createElement('div');
        simpleCoursesSection.innerHTML = '<h4>Simple Courses</h4>';
        coursesData.simple_courses.forEach((course, index) => {
            const courseItem = document.createElement('div');
            courseItem.className = 'd-flex justify-content-between align-items-center';
            courseItem.innerHTML = `
                <p>${course.code}: ${course.name}</p>
                <button class="btn btn-danger btn-sm" onclick="removeSimpleCourse(${index})">Delete</button>
            `;
            simpleCoursesSection.appendChild(courseItem);
        });
        listContainer.appendChild(simpleCoursesSection);
    }

    // Agregar Course Bundles
    if (Object.keys(coursesData.course_bundles).length > 0) {
        const bundlesSection = document.createElement('div');
        bundlesSection.innerHTML = '<h4>Course Bundles</h4>';
        Object.entries(coursesData.course_bundles).forEach(([bundleName, bundleData]) => {
            const bundleItem = document.createElement('div');
            bundleItem.className = 'mb-3 border p-2 rounded';
            bundleItem.innerHTML = `
                <div class="d-flex justify-content-between align-items-center">
                    <h5>${bundleName}</h5>
                    <button class="btn btn-danger btn-sm" onclick="removeCourseBundle('${bundleName}')">Delete Bundle</button>
                </div>
                <p>Minimum Credits: ${bundleData.minimum_credits_to_pass}</p>
                <p>Related Bundles: ${bundleData.related_bundles.join(', ') || 'None'}</p>
                <p>Courses:</p>
            `;
            const coursesList = document.createElement('ul');
            Object.entries(bundleData.courses).forEach(([courseCode, courseData]) => {
                const listItem = document.createElement('li');
                listItem.className = 'd-flex justify-content-between align-items-center';
                listItem.innerHTML = `
                    <span>${courseCode}: ${courseData.name} (${courseData.type})</span>
                    <button class="btn btn-danger btn-sm" onclick="removeCourseFromBundle('${bundleName}', '${courseCode}')">Delete Course</button>
                `;
                coursesList.appendChild(listItem);
            });
            bundleItem.appendChild(coursesList);
            bundlesSection.appendChild(bundleItem);
        });
        listContainer.appendChild(bundlesSection);
    }
}

function removeSimpleCourse(index) {
    coursesData.simple_courses.splice(index, 1);
    updateAddedCoursesList();
}

function removeCourseBundle(bundleName) {
    delete coursesData.course_bundles[bundleName];
    updateAddedCoursesList();
}

function removeCourseFromBundle(bundleName, courseCode) {
    delete coursesData.course_bundles[bundleName].courses[courseCode];
    updateAddedCoursesList();
}

function downloadCourseStructure() {
    // Convertir los datos actuales en un archivo JSON
    const jsonData = JSON.stringify(coursesData, null, 4); // Espaciado de 4 para legibilidad
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonData);
    const downloadAnchorNode = document.createElement('a');

    // Configurar el enlace para descargar
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "course-structure.json");
    document.body.appendChild(downloadAnchorNode);

    // Simular el clic para iniciar la descarga
    downloadAnchorNode.click();

    // Eliminar el enlace después de la descarga
    downloadAnchorNode.remove();
}

function loadCourseStructure(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            try {
                const jsonData = JSON.parse(e.target.result);

                // Validar que el JSON contenga la estructura esperada
                if (jsonData.simple_courses && jsonData.course_bundles) {
                    coursesData = jsonData; // Actualizar los datos globales
                    updateAddedCoursesList(); // Actualizar la interfaz
                    alert("Course structure loaded successfully!");
                } else {
                    alert("Invalid course-structure.json format.");
                }
            } catch (error) {
                alert("Error reading the JSON file.");
                console.error("Error parsing JSON:", error);
            }
        };

        reader.readAsText(file);
    } else {
        alert("No file selected.");
    }
}

