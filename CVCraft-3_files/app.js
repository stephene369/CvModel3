
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
    infoDiv.onclick = function() { makeEditable(this, 'span'); };

    const icon = document.createElement('i');
    icon.className = `bx ${iconClass}`;
    infoDiv.appendChild(icon);

    const span = document.createElement('span');
    span.textContent = value;
    infoDiv.appendChild(span);

    const input = document.createElement('input');
    input.type = 'text';
    input.style.display = 'none';
    input.onblur = function() { updateEdit(this); };
    infoDiv.appendChild(input);
    const bar = document.createTextNode('|')


    const minusIcon = document.createElement('i');
    minusIcon.onclick = function() {
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







function addSkills(){
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
    paragraph.contentEditable = 'true'
    paragraph.textContent = 'skill-1 - skill-2 '

    skillsDiv.appendChild(trashIcon)
    skillsDiv.appendChild(heading)
    skillsDiv.appendChild(paragraph)

    trashIcon.onclick = function() {
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
    description.contentEditable = 'true';
    description.className = 'description';
    description.textContent = '(Descripion the work)';

    titleFirmDiv.appendChild(jobTitle);
    titleFirmDiv.appendChild(company);

    titleTimeDiv.appendChild(titleFirmDiv);
    titleTimeDiv.appendChild(timeSpan);

    experienceDiv.appendChild(trashIcon);
    experienceDiv.appendChild(titleTimeDiv);
    experienceDiv.appendChild(description);

    trashIcon.onclick = function() {
        experienceDiv.remove();
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
    description.contentEditable = 'true';
    description.className = 'description-education';
    description.textContent = 'Short Descripion (optional)';

    titleFirmDiv.appendChild(studiesField);
    titleFirmDiv.appendChild(schoolName);

    titleTimeDiv.appendChild(titleFirmDiv);
    titleTimeDiv.appendChild(timeSpan);

    educationDiv.appendChild(trashIcon);
    educationDiv.appendChild(titleTimeDiv);
    educationDiv.appendChild(description);

    trashIcon.onclick = function() {
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
    description.contentEditable = 'true';
    description.className = 'description-education';
    description.textContent = 'Short Descripion (optional)';

    titleFirmDiv.appendChild(studiesField);
    titleTimeDiv.appendChild(titleFirmDiv);

    interestDiv.appendChild(trashIcon);
    interestDiv.appendChild(titleTimeDiv);
    interestDiv.appendChild(description);

    trashIcon.onclick = function() {
        interestDiv.remove();
    };

    const interestsSection = document.getElementById('interests');
    interestsSection.appendChild(interestDiv);
}
