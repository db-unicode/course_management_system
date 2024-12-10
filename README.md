# Course Management System

This project is a web-based Course Management System that allows users to manage courses and course bundles. It includes features for adding, updating, and removing courses, as well as downloading and loading course structures in JSON format.



## Features

- **Add Simple Course**: Add individual courses by entering the course code.
- **Add Course Bundle**: Create bundles of courses with a minimum credit requirement and related bundles.
- **Autocomplete**: Provides suggestions for course codes as you type.
- **Update Course Name**: Displays the course name based on the entered course code.
- **Download Course Structure**: Download the current course structure as a JSON file.
- **Load Course Structure**: Load a course structure from a JSON file.

## Usage

1. **Load Initial JSON File**: Click on the "Load Initial JSON File" button to load a JSON file containing the initial course structure.
2. **Add Simple Course**: Enter the course code in the "Add Simple Course" section and click "Add Simple Course".
3. **Add Course Bundle**: Fill in the bundle details in the "Add Course Bundle" section and click "Add Course Bundle".
4. **Download Course Structure**: Click the "Download course-structure.json" button to download the current course structure.
5. **Autocomplete**: Start typing a course code to see suggestions.
6. **Update Course Name**: The course name will be displayed based on the entered course code.

## Files

- **index.html**: The main HTML file that contains the structure of the web application.
- **scripts/autocomplete.js**: Handles the autocomplete functionality for course codes.
- **scripts/codigo_nombre_materias.json**: Contains the course data with course codes and names.
- **scripts/course-management.js**: Manages the addition, removal, and updating of courses and course bundles.
- **scripts/update-course-name.js**: Updates the course name based on the entered course code.
- **styles/main.css**: Contains the CSS styles for the web application.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/db-unicode/course_management_system.git
    ```
2. Open `index.html` in your web browser.

