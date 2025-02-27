document.addEventListener('DOMContentLoaded', function() {
    // Load the syllabus data
    fetch('syllabus.json')
        .then(response => response.json())
        .then(data => {
            // Store the data globally for use
            window.syllabusData = data;
            
            // Populate grade dropdown
            populateGradeDropdown(data.grades);
            
            // Add event listener for grade selection
            document.getElementById('grade-select').addEventListener('change', handleGradeSelection);
        })
        .catch(error => {
            console.error('Error loading syllabus data:', error);
            alert('Failed to load the syllabus data. Please try again later.');
        });
});

// Populate the grade dropdown with available grades
function populateGradeDropdown(grades) {
    const gradeSelect = document.getElementById('grade-select');
    
    // Sort the grades numerically
    const sortedGrades = Object.keys(grades).sort((a, b) => parseInt(a) - parseInt(b));
    
    sortedGrades.forEach(grade => {
        const option = document.createElement('option');
        option.value = grade;
        option.textContent = `Grade ${grade}`;
        gradeSelect.appendChild(option);
    });
}

// Handle grade selection from dropdown
function handleGradeSelection() {
    const gradeSelect = document.getElementById('grade-select');
    const selectedGrade = gradeSelect.value;
    
    // Clear any previous subject and topic selections
    document.getElementById('subject-buttons').innerHTML = '';
    document.getElementById('topic-list').innerHTML = '';
    document.getElementById('practice-content').innerHTML = '<p>Select a subject and topic to see practice materials.</p>';
    
    // Hide topic area and content area
    document.getElementById('topic-area').style.display = 'none';
    document.getElementById('content-area').style.display = 'none';
    
    // Show subject area if a grade is selected
    if (selectedGrade) {
        document.getElementById('subject-area').style.display = 'block';
        populateSubjects(selectedGrade);
    } else {
        document.getElementById('subject-area').style.display = 'none';
    }
}

// Populate subject buttons based on selected grade
function populateSubjects(grade) {
    const subjectButtonsContainer = document.getElementById('subject-buttons');
    const subjects = window.syllabusData.grades[grade].subjects;
    
    // Create a button for each subject
    Object.keys(subjects).forEach(subject => {
        const button = document.createElement('button');
        button.className = 'subject-button';
        button.textContent = subject;
        button.addEventListener('click', () => handleSubjectSelection(grade, subject));
        subjectButtonsContainer.appendChild(button);
    });
}

// Handle subject selection
function handleSubjectSelection(grade, subject) {
    // Highlight the selected subject button
    const buttons = document.querySelectorAll('.subject-button');
    buttons.forEach(btn => {
        if (btn.textContent === subject) {
            btn.style.backgroundColor = '#ff5555';
        } else {
            btn.style.backgroundColor = '#ff9999';
        }
    });
    
    // Show topic area
    document.getElementById('topic-area').style.display = 'block';
    document.getElementById('content-area').style.display = 'none';
    
    // Populate topics
    populateTopics(grade, subject);
}

// Populate topic list based on selected grade and subject
function populateTopics(grade, subject) {
    const topicList = document.getElementById('topic-list');
    topicList.innerHTML = '';
    
    const topics = window.syllabusData.grades[grade].subjects[subject].topics;
    
    // Create a list item for each topic
    topics.forEach(topic => {
        const li = document.createElement('li');
        li.textContent = topic;
        li.addEventListener('click', () => handleTopicSelection(grade, subject, topic));
        topicList.appendChild(li);
    });
}

// Handle topic selection
function handleTopicSelection(grade, subject, topic) {
    // Show content area
    document.getElementById('content-area').style.display = 'block';
    
    // Set content title
    document.getElementById('content-title').textContent = topic;
    
    // Generate placeholder content for now
    const practiceContent = document.getElementById('practice-content');
    practiceContent.innerHTML = `
        <div class="practice-intro">
            <p>Practice materials for <strong>${topic}</strong> (Grade ${grade} ${subject})</p>
            <p>Choose what you'd like to practice:</p>
        </div>
        
        <div class="practice-options">
            <button class="practice-option">Quiz</button>
            <button class="practice-option">Flashcards</button>
            <button class="practice-option">Practice Problems</button>
        </div>
        
        <div class="practice-placeholder">
            <p>These practice materials are under development. Check back soon!</p>
            <div class="tip-box">
                <h3>Quick Tip:</h3>
                <p>Regular practice of ${grade < 6 ? 'concepts' : 'chapters'} helps improve understanding and retention.</p>
            </div>
        </div>
    `;
    
    // Add styling for the new elements
    const style = document.createElement('style');
    style.textContent = `
        .practice-intro {
            margin-bottom: 20px;
        }
        
        .practice-options {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            margin-bottom: 30px;
        }
        
        .practice-option {
            padding: 12px 20px;
            background-color: #4285f4;
            border: none;
            border-radius: 10px;
            color: white;
            font-size: 1.1rem;
            cursor: pointer;
            font-family: 'Comic Neue', cursive;
            font-weight: bold;
            transition: transform 0.2s, background-color 0.2s;
        }
        
        .practice-option:hover {
            background-color: #3b78e7;
            transform: scale(1.05);
        }
        
        .practice-placeholder {
            background-color: #f9f9f9;
            border-radius: 10px;
            padding: 20px;
            text-align: center;
        }
        
        .tip-box {
            margin-top: 20px;
            background-color: #ffcc00;
            border-radius: 10px;
            padding: 15px;
            text-align: left;
        }
        
        .tip-box h3 {
            color: #333;
            margin-bottom: 10px;
        }
        
        @media (max-width: 768px) {
            .practice-options {
                flex-direction: column;
                gap: 10px;
            }
            
            .practice-option {
                width: 100%;
            }
        }
    `;
    document.head.appendChild(style);
}

const educationData = {
    "1": {
        "subjects": [
            {
                "name": "English",
                "topics": ["Reading", "Writing", "Grammar", "Vocabulary", "Stories"]
            },
            {
                "name": "Mathematics",
                "topics": ["Numbers", "Addition", "Subtraction", "Shapes", "Patterns"]
            },
            {
                "name": "Environmental Studies",
                "topics": ["Family", "Plants", "Animals", "Food", "Weather"]
            }
        ]
    },
    "2": {
        "subjects": [
            {
                "name": "English",
                "topics": ["Reading Comprehension", "Writing Skills", "Grammar", "Vocabulary", "Stories"]
            },
            {
                "name": "Mathematics",
                "topics": ["Numbers up to 1000", "Addition", "Subtraction", "Multiplication", "Shapes and Patterns"]
            },
            {
                "name": "Environmental Studies",
                "topics": ["Family and Friends", "Plants", "Animals", "Food and Water", "Travel"]
            }
        ]
    },
    "3": {
        "subjects": [
            {
                "name": "English",
                "topics": ["Reading", "Writing", "Grammar", "Literature", "Composition"]
            },
            {
                "name": "Mathematics",
                "topics": ["Numbers", "Fractions", "Geometry", "Measurement", "Data Handling"]
            },
            {
                "name": "Environmental Studies",
                "topics": ["Family", "Plants", "Animals", "Water", "Travel and Transport"]
            },
            {
                "name": "Hindi",
                "topics": ["Reading", "Writing", "Grammar", "Literature"]
            }
        ]
    },
    "4": {
        "subjects": [
            {
                "name": "English",
                "topics": ["Literature", "Grammar", "Writing", "Vocabulary", "Comprehension"]
            },
            {
                "name": "Mathematics",
                "topics": ["Numbers", "Fractions", "Decimals", "Geometry", "Measurement"]
            },
            {
                "name": "Environmental Studies",
                "topics": ["Family and Friends", "Food", "Water", "Travel", "Animals"]
            },
            {
                "name": "Hindi",
                "topics": ["Reading", "Writing", "Grammar", "Literature"]
            }
        ]
    },
    "5": {
        "subjects": [
            {
                "name": "English",
                "topics": ["Literature", "Grammar", "Writing", "Speaking", "Listening"]
            },
            {
                "name": "Mathematics",
                "topics": ["Numbers", "Geometry", "Patterns", "Data Handling", "Measurement"]
            },
            {
                "name": "Environmental Studies",
                "topics": ["Family", "Food", "Water", "Travel", "Environment"]
            },
            {
                "name": "Hindi",
                "topics": ["Reading", "Writing", "Grammar", "Literature"]
            }
        ]
    },
    "6": {
        "subjects": [
            {
                "name": "English",
                "topics": ["Literature", "Grammar", "Writing", "Speaking", "Reading"]
            },
            {
                "name": "Mathematics",
                "topics": ["Integers", "Fractions", "Decimals", "Algebra", "Geometry"]
            },
            {
                "name": "Science",
                "topics": ["Food", "Materials", "Living World", "Moving Things", "Natural Phenomena"]
            },
            {
                "name": "Social Science",
                "topics": ["History", "Geography", "Civics"]
            },
            {
                "name": "Hindi",
                "topics": ["Prose", "Poetry", "Grammar", "Writing"]
            }
        ]
    },
    "7": {
        "subjects": [
            {
                "name": "English",
                "topics": ["Literature", "Grammar", "Writing", "Speaking", "Reading"]
            },
            {
                "name": "Mathematics",
                "topics": ["Integers", "Fractions", "Algebra", "Geometry", "Data Handling"]
            },
            {
                "name": "Science",
                "topics": ["Plants", "Animals", "Matter", "Motion", "Energy"]
            },
            {
                "name": "Social Science",
                "topics": ["History", "Geography", "Civics", "Economics"]
            },
            {
                "name": "Hindi",
                "topics": ["Prose", "Poetry", "Grammar", "Writing"]
            }
        ]
    },
    "8": {
        "subjects": [
            {
                "name": "English",
                "topics": ["Literature", "Grammar", "Writing", "Speaking", "Reading"]
            },
            {
                "name": "Mathematics",
                "topics": ["Rational Numbers", "Algebra", "Geometry", "Data Handling", "Mensuration"]
            },
            {
                "name": "Science",
                "topics": ["Crop Production", "Microorganisms", "Synthetic Fibres", "Metals", "Force and Pressure"]
            },
            {
                "name": "Social Science",
                "topics": ["History", "Geography", "Civics", "Economics"]
            },
            {
                "name": "Hindi",
                "topics": ["Prose", "Poetry", "Grammar", "Writing"]
            }
        ]
    },
    "9": {
        "subjects": [
            {
                "name": "English",
                "topics": ["Literature", "Grammar", "Writing", "Speaking", "Reading"]
            },
            {
                "name": "Mathematics",
                "topics": ["Number Systems", "Algebra", "Geometry", "Statistics", "Probability"]
            },
            {
                "name": "Science",
                "topics": ["Matter", "Living World", "Motion", "Force and Laws", "Natural Resources"]
            },
            {
                "name": "Social Science",
                "topics": ["History", "Geography", "Economics", "Political Science"]
            },
            {
                "name": "Hindi",
                "topics": ["Prose", "Poetry", "Grammar", "Writing"]
            }
        ]
    },
    "10": {
        "subjects": [
            {
                "name": "English",
                "topics": ["Literature", "Grammar", "Writing", "Speaking", "Reading"]
            },
            {
                "name": "Mathematics",
                "topics": ["Real Numbers", "Polynomials", "Coordinate Geometry", "Trigonometry", "Statistics"]
            },
            {
                "name": "Science",
                "topics": ["Chemical Reactions", "Life Processes", "Electricity", "Magnetic Effects", "Environment"]
            },
            {
                "name": "Social Science",
                "topics": ["History", "Geography", "Economics", "Political Science"]
            },
            {
                "name": "Hindi",
                "topics": ["Prose", "Poetry", "Grammar", "Writing"]
            }
        ]
    }
};

// DOM Elements
const gradeSelect = document.getElementById('grade-select');
const subjectArea = document.getElementById('subject-area');
const subjectButtons = document.getElementById('subject-buttons');
const topicArea = document.getElementById('topic-area');
const topicList = document.getElementById('topic-list');
const contentArea = document.getElementById('content-area');
const contentTitle = document.getElementById('content-title');
const practiceContent = document.getElementById('practice-content');

// Populate grade select
function populateGrades() {
    for (let grade = 1; grade <= 10; grade++) {
        const option = document.createElement('option');
        option.value = grade;
        option.textContent = `Grade ${grade}`;
        gradeSelect.appendChild(option);
    }
}

// Event Listeners
gradeSelect.addEventListener('change', function() {
    const grade = this.value;
    if (grade) {
        showSubjects(grade);
        subjectArea.style.display = 'block';
        topicArea.style.display = 'none';
        contentArea.style.display = 'none';
    } else {
        subjectArea.style.display = 'none';
        topicArea.style.display = 'none';
        contentArea.style.display = 'none';
    }
});

function showSubjects(grade) {
    subjectButtons.innerHTML = '';
    const subjects = educationData[grade].subjects;
    
    subjects.forEach(subject => {
        const button = document.createElement('button');
        button.textContent = subject.name;
        button.classList.add('subject-button');
        button.addEventListener('click', () => {
            showTopics(subject.topics);
            highlightSelectedButton(button);
        });
        subjectButtons.appendChild(button);
    });
}

function showTopics(topics) {
    topicList.innerHTML = '';
    topicArea.style.display = 'block';
    
    topics.forEach(topic => {
        const li = document.createElement('li');
        li.textContent = topic;
        li.addEventListener('click', () => {
            showContent(topic);
            highlightSelectedTopic(li);
        });
        topicList.appendChild(li);
    });
}

function showContent(topic) {
    contentArea.style.display = 'block';
    contentTitle.textContent = topic;
    practiceContent.innerHTML = `<p>Practice content for ${topic} will be displayed here.</p>`;
}

function highlightSelectedButton(selectedButton) {
    const buttons = subjectButtons.getElementsByClassName('subject-button');
    Array.from(buttons).forEach(button => {
        button.classList.remove('selected');
    });
    selectedButton.classList.add('selected');
}

function highlightSelectedTopic(selectedTopic) {
    const topics = topicList.getElementsByTagName('li');
    Array.from(topics).forEach(topic => {
        topic.classList.remove('selected');
    });
    selectedTopic.classList.add('selected');
}

// Initialize the page
populateGrades();
