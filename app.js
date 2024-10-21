
function makeEditable(element, type) {
    const input = element.querySelector('input');
    const display = element.querySelector(type);
    display.style.display = 'none';
    input.style.display = 'inline-block';
    input.value = display.textContent;
    input.focus();
}

function updateEdit(input) {
    const display = input.previousElementSibling;
    display.textContent = input.value;
    display.style.display = 'inline-block';
    input.style.display = 'none';
}

function openRichTextEditor(description) {
    const editor = document.createElement('div');
    editor.className = 'rich-text-editor';
    editor.style.position = 'fixed';
    editor.style.top = '50%';
    editor.style.left = '50%';
    editor.style.transform = 'translate(-50%, -50%)';
    editor.style.zIndex = '1000';
    editor.style.backgroundColor = 'white';
    editor.style.padding = '30px';
    editor.style.boxShadow = '0 0 20px rgba(0,0,0,0.2)';
    editor.style.borderRadius = '10px';
    editor.style.maxWidth = '80%';
    editor.style.maxHeight = '80%';
    editor.style.overflow = 'auto';

    const toolbar = document.createElement('div');
    toolbar.className = 'editor-toolbar';
    toolbar.style.marginBottom = '15px';
    toolbar.style.display = 'flex';
    toolbar.style.flexWrap = 'wrap';
    toolbar.style.gap = '5px';

    const buttons = [
        { command: 'bold', icon: 'format_bold', description: 'B: Bold' },
        { command: 'italic', icon: 'format_italic', description: 'I: Italic' },
        { command: 'underline', icon: 'format_underlined', description: 'U: Underline' },
        { command: 'strikeThrough', icon: 'strikethrough_s', description: 'S: Strikethrough' },
        { command: 'insertUnorderedList', icon: 'format_list_bulleted', description: '•: Unordered List' },
        { command: 'insertOrderedList', icon: 'format_list_numbered', description: '1.: Ordered List' },
        { command: 'justifyLeft', icon: 'format_align_left', description: '←: Align Left' },
        { command: 'justifyCenter', icon: 'format_align_center', description: '↔: Align Center' },
        { command: 'justifyRight', icon: 'format_align_right', description: '→: Align Right' },
        { command: 'justifyFull', icon: 'format_align_justify', description: '↔↔: Justify' },
        { command: 'indent', icon: 'format_indent_increase', description: '→|: Indent' },
        { command: 'outdent', icon: 'format_indent_decrease', description: '|←: Outdent' },
        { command: 'createLink', icon: 'insert_link', description: '🔗: Insert Link' },
        { command: 'unlink', icon: 'link_off', description: '🚫🔗: Remove Link' },
        { command: 'undo', icon: 'undo', description: '↩: Undo' },
        { command: 'redo', icon: 'redo', description: '↪: Redo' }
    ];

    buttons.forEach(btn => {
        const button = document.createElement('button');
        button.innerHTML = `<i class="material-icons" title="${btn.description}">${btn.icon}</i>`;
        button.style.padding = '8px';
        button.style.backgroundColor = '#f0f0f0';
        button.style.border = 'none';
        button.style.borderRadius = '4px';
        button.style.cursor = 'pointer';
        button.style.transition = 'all 0.3s ease';
        button.onmouseover = function() { this.style.backgroundColor = '#e0e0e0'; };
        button.onmouseout = function() { this.style.backgroundColor = '#f0f0f0'; };
        button.onclick = () => {
            if (btn.command === 'createLink') {
                const url = prompt('Enter the URL:');
                if (url) document.execCommand(btn.command, false, url);
            } else {
                document.execCommand(btn.command, false, null);
            }
        };
        toolbar.appendChild(button);
    });

    const fontSizeSelect = document.createElement('select');
    fontSizeSelect.innerHTML = `
    <option value="1">Small</option>
    <option value="3" selected>Normal</option>
    <option value="5">Large</option>
    <option value="7">Huge</option>
`;
    fontSizeSelect.style.padding = '8px';
    fontSizeSelect.style.borderRadius = '4px';
    fontSizeSelect.style.border = '1px solid #ccc';
    fontSizeSelect.onchange = () => document.execCommand('fontSize', false, fontSizeSelect.value);
    toolbar.appendChild(fontSizeSelect);

    const colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.style.width = '40px';
    colorPicker.style.height = '40px';
    colorPicker.style.padding = '0';
    colorPicker.style.border = 'none';
    colorPicker.style.borderRadius = '4px';
    colorPicker.style.cursor = 'pointer';
    colorPicker.onchange = () => document.execCommand('foreColor', false, colorPicker.value);
    toolbar.appendChild(colorPicker);

    const contentArea = document.createElement('div');
    contentArea.contentEditable = true;
    contentArea.innerHTML = description.textContent;
    contentArea.style.width = '100%';
    contentArea.style.minHeight = '200px';
    contentArea.style.border = '1px solid #ccc';
    contentArea.style.borderRadius = '4px';
    contentArea.style.padding = '15px';
    contentArea.style.overflowY = 'auto';
    contentArea.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.1)';

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.style.marginTop = '15px';
    saveButton.style.backgroundColor = '#3498db';
    saveButton.style.color = 'white';
    saveButton.style.border = 'none';
    saveButton.style.padding = '12px 24px';
    saveButton.style.borderRadius = '5px';
    saveButton.style.cursor = 'pointer';
    saveButton.style.transition = 'background-color 0.3s ease';
    saveButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    saveButton.onmouseover = function() { this.style.backgroundColor = '#2980b9'; this.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)'; };
    saveButton.onmouseout = function() { this.style.backgroundColor = '#3498db'; this.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)'; };
    saveButton.onclick = function () {
        description.innerHTML = contentArea.innerHTML;
        document.body.removeChild(editor);
    };

    editor.appendChild(toolbar);
    editor.appendChild(contentArea);
    editor.appendChild(saveButton);
    document.body.appendChild(editor);

    // Add Material Icons font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
}

function getContactIcon(contact) {
    switch (contact.toLowerCase()) {
        case 'phone':
            return 'bx-phone'
        case 'email':
            return 'bx-envelope'
        case 'location':
            return 'bx-map'
        case 'website':
            return 'bx-globe'
        case 'github':
            return 'bxl-github'
        case 'linkedin':
            return 'bxl-linkedin'
        case 'portfolio':
            return 'bx-briefcase'
        default:
            return 'bx-info-circle'
    }
}
function createContactElement(contact, value) {
    const iconClass = getContactIcon(contact);

    const infoDiv = document.createElement('div');
    infoDiv.className = 'info';
    infoDiv.onclick = function () { makeEditable(this, 'span'); };

    const icon = document.createElement('i');
    icon.className = `bx ${iconClass}`;
    infoDiv.appendChild(icon);

    const span = document.createElement('span');
    span.textContent = value;
    infoDiv.appendChild(span);

    const input = document.createElement('input');
    input.type = 'text';
    input.style.display = 'none';
    input.onblur = function () { updateEdit(this); };
    infoDiv.appendChild(input);
    const bar = document.createTextNode('|')


    const minusIcon = document.createElement('i');
    minusIcon.onclick = function () {
        infoDiv.remove();
        bar.remove();
    };
    minusIcon.className = 'bx bx-trash';
    infoDiv.appendChild(minusIcon);

    document.getElementById('infos').appendChild(bar)
    document.getElementById('infos').appendChild(infoDiv);

    return infoDiv;
}







function dropdownContact() {
    document.getElementById("contactList").classList.toggle("show");

}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropContactBtn')) {
        var dropdowns = document.getElementsByClassName("contactList");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}






// Drag and drop section 
drageArea = document.getElementById("resume");
new Sortable(drageArea, {
    animation: 400,
    ghostClass: "blue-background-class",
    filter: '.line, #head'
});







function addSkills() {
    const skills = document.getElementById('skills')

    const skillsDiv = document.createElement('div')
    skillsDiv.className = 'skills'

    const trashIcon = document.createElement('i')
    trashIcon.className = 'bx bx-trash'
    trashIcon.setAttribute('data-toggle', 'tooltip')
    trashIcon.setAttribute('title', 'Delete Skills group')

    const heading = document.createElement('h3')
    heading.contentEditable = 'true'
    heading.textContent = 'Skill Name  : '

    const paragraph = document.createElement('p')
    paragraph.textContent = 'skill-1 - skill-2 '

    paragraph.onclick = function () {
        openRichTextEditor(this);
    };

    skillsDiv.appendChild(trashIcon)
    skillsDiv.appendChild(heading)
    skillsDiv.appendChild(paragraph)

    trashIcon.onclick = function () {
        skillsDiv.remove();
    };

    skills.appendChild(skillsDiv)
}



//  Experiences 
// 
function addExperience() {
    const experiences = document.getElementById('experiences');

    const experienceDiv = document.createElement('div');
    experienceDiv.className = 'experience';

    const trashIcon = document.createElement('i');
    trashIcon.className = 'bx bx-trash';

    const titleTimeDiv = document.createElement('div');
    titleTimeDiv.className = 'title-time';

    const titleFirmDiv = document.createElement('div');
    titleFirmDiv.className = 'title-firm';

    const jobTitle = document.createElement('h3');
    jobTitle.contentEditable = 'true';
    jobTitle.className = 'foc';
    jobTitle.textContent = '(Work Title)';

    const company = document.createElement('span');
    company.contentEditable = 'true';
    company.textContent = '(Firm name and location)';

    const timeSpan = document.createElement('span');
    timeSpan.className = 'time';
    timeSpan.contentEditable = 'true';
    timeSpan.textContent = 'Date (from - to )';

    const description = document.createElement('p');
    description.className = 'description';
    description.textContent = '(Descripion the work)';

    titleFirmDiv.appendChild(jobTitle);
    titleFirmDiv.appendChild(company);

    titleTimeDiv.appendChild(titleFirmDiv);
    titleTimeDiv.appendChild(timeSpan);

    experienceDiv.appendChild(trashIcon);
    experienceDiv.appendChild(titleTimeDiv);
    experienceDiv.appendChild(description);

    trashIcon.onclick = function () {
        experienceDiv.remove();
    };

    description.onclick = function () {
        openRichTextEditor(this);
    };



    experiences.appendChild(experienceDiv);
}



function addEducation() {
    const educationDiv = document.createElement('div');
    educationDiv.className = 'experience';

    const trashIcon = document.createElement('i');
    trashIcon.className = 'bx bx-trash';

    const titleTimeDiv = document.createElement('div');
    titleTimeDiv.className = 'title-time';

    const titleFirmDiv = document.createElement('div');
    titleFirmDiv.className = 'title-firm';

    const studiesField = document.createElement('h3');
    studiesField.contentEditable = 'true';
    studiesField.className = 'foc';
    studiesField.textContent = 'Studies Field';

    const schoolName = document.createElement('span');
    schoolName.contentEditable = 'true';
    schoolName.textContent = '(School name)';

    const timeSpan = document.createElement('span');
    timeSpan.className = 'time';
    timeSpan.contentEditable = 'true';
    timeSpan.textContent = 'Date (graduation date )';

    const description = document.createElement('p');
    description.className = 'description-education';
    description.textContent = 'Short Descripion (optional)';

    titleFirmDiv.appendChild(studiesField);
    titleFirmDiv.appendChild(schoolName);

    titleTimeDiv.appendChild(titleFirmDiv);
    titleTimeDiv.appendChild(timeSpan);

    educationDiv.appendChild(trashIcon);
    educationDiv.appendChild(titleTimeDiv);
    educationDiv.appendChild(description);

    description.onclick = function () {
        openRichTextEditor(this);
    };

    trashIcon.onclick = function () {
        educationDiv.remove();
    };

    const educationSection = document.getElementById('education');
    educationSection.appendChild(educationDiv);
}




function addInterest() {
    const interestDiv = document.createElement('div');
    interestDiv.className = 'experience';

    const trashIcon = document.createElement('i');
    trashIcon.className = 'bx bx-trash';

    const titleTimeDiv = document.createElement('div');
    titleTimeDiv.className = 'title-time';

    const titleFirmDiv = document.createElement('div');
    titleFirmDiv.className = 'title-firm';

    const studiesField = document.createElement('h3');
    studiesField.contentEditable = 'true';
    studiesField.className = 'foc';
    studiesField.textContent = 'Studies Field';

    const description = document.createElement('p');
    description.className = 'description-education';
    description.textContent = 'Short Descripion (optional)';

    titleFirmDiv.appendChild(studiesField);
    titleTimeDiv.appendChild(titleFirmDiv);

    interestDiv.appendChild(trashIcon);
    interestDiv.appendChild(titleTimeDiv);
    interestDiv.appendChild(description);

    description.onclick = function () {
        openRichTextEditor(this);
    };

    trashIcon.onclick = function () {
        interestDiv.remove();
    };

    const interestsSection = document.getElementById('interests');
    interestsSection.appendChild(interestDiv);
}
