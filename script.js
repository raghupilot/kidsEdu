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
        option.textContent = `Class ${grade}`;
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
            <p>Practice materials for <strong>${topic}</strong> (Class ${grade} ${subject})</p>
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
