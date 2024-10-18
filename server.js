const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from 'public' folder

// Sample data - you can replace this with your JSON file or database
let studentData = {
    "2020": [
        { "name": "Alice", "academic": 3.8, "core_courses": 3.9, "hackathons": 5, "papers": 2, "contributions": 3 },
        { "name": "Bob", "academic": 3.6, "core_courses": 3.7, "hackathons": 3, "papers": 1, "contributions": 4 },
        { "name": "Charlie", "academic": 3.7, "core_courses": 3.8, "hackathons": 4, "papers": 2, "contributions": 2 },
        { "name": "Diana", "academic": 3.9, "core_courses": 4.0, "hackathons": 6, "papers": 3, "contributions": 5 },
        { "name": "Edward", "academic": 3.5, "core_courses": 3.6, "hackathons": 2, "papers": 1, "contributions": 4 },
        { "name": "Fiona", "academic": 3.4, "core_courses": 3.3, "hackathons": 1, "papers": 0, "contributions": 2 },
        { "name": "George", "academic": 3.6, "core_courses": 3.5, "hackathons": 3, "papers": 2, "contributions": 3 },
        { "name": "Hannah", "academic": 3.8, "core_courses": 3.9, "hackathons": 5, "papers": 3, "contributions": 4 }
    ],
    "2021": [
        { "name": "David", "academic": 3.9, "core_courses": 3.8, "hackathons": 6, "papers": 3, "contributions": 5 },
        { "name": "Eva", "academic": 3.5, "core_courses": 3.6, "hackathons": 2, "papers": 1, "contributions": 4 },
        { "name": "Frank", "academic": 3.8, "core_courses": 4.0, "hackathons": 7, "papers": 3, "contributions": 3 },
        { "name": "Grace", "academic": 3.6, "core_courses": 3.7, "hackathons": 4, "papers": 2, "contributions": 2 },
        { "name": "Hannah", "academic": 3.8, "core_courses": 3.9, "hackathons": 6, "papers": 3, "contributions": 4 },
        { "name": "Ian", "academic": 3.7, "core_courses": 3.5, "hackathons": 5, "papers": 3, "contributions": 2 },
        { "name": "Jack", "academic": 3.4, "core_courses": 3.5, "hackathons": 2, "papers": 1, "contributions": 1 },
        { "name": "Kate", "academic": 3.5, "core_courses": 3.6, "hackathons": 2, "papers": 1, "contributions": 4 }
    ],
    "2022": [
        { "name": "Liam", "academic": 3.7, "core_courses": 3.5, "hackathons": 2, "papers": 1, "contributions": 3 },
        { "name": "Mia", "academic": 3.6, "core_courses": 3.8, "hackathons": 5, "papers": 2, "contributions": 4 },
        { "name": "Noah", "academic": 3.9, "core_courses": 3.7, "hackathons": 4, "papers": 3, "contributions": 2 },
        { "name": "Olivia", "academic": 3.5, "core_courses": 3.6, "hackathons": 3, "papers": 1, "contributions": 5 },
        { "name": "Paul", "academic": 3.8, "core_courses": 3.9, "hackathons": 6, "papers": 2, "contributions": 3 },
        { "name": "Quinn", "academic": 3.7, "core_courses": 3.6, "hackathons": 5, "papers": 4, "contributions": 1 },
        { "name": "Rachel", "academic": 3.8, "core_courses": 4.0, "hackathons": 7, "papers": 3, "contributions": 4 },
        { "name": "Sam", "academic": 3.6, "core_courses": 3.5, "hackathons": 2, "papers": 2, "contributions": 2 }
    ],
    "2023": [
        { "name": "Tina", "academic": 4.0, "core_courses": 3.9, "hackathons": 8, "papers": 4, "contributions": 5 },
        { "name": "Ursula", "academic": 3.8, "core_courses": 3.6, "hackathons": 3, "papers": 1, "contributions": 3 },
        { "name": "Victor", "academic": 3.7, "core_courses": 3.8, "hackathons": 6, "papers": 2, "contributions": 4 },
        { "name": "Wendy", "academic": 3.9, "core_courses": 3.7, "hackathons": 5, "papers": 3, "contributions": 2 },
        { "name": "Xander", "academic": 3.5, "core_courses": 3.6, "hackathons": 4, "papers": 1, "contributions": 3 },
        { "name": "Yara", "academic": 3.8, "core_courses": 4.0, "hackathons": 7, "papers": 4, "contributions": 5 },
        { "name": "Zach", "academic": 3.6, "core_courses": 3.5, "hackathons": 2, "papers": 1, "contributions": 1 },
        { "name": "Anya", "academic": 3.9, "core_courses": 3.8, "hackathons": 5, "papers": 3, "contributions": 4 }
    ]
};


// Function to calculate the score for a student
function calculateScore(student) {
    // You can adjust the weights as necessary
    return (student.academic * 0.4) + (student.core_courses * 0.3) + (student.hackathons * 0.2) + (student.papers * 0.05) + (student.contributions * 0.05);
}

// Route to fetch top students for a specific batch
app.get('/top_students', (req, res) => {
    const batch = req.query.batch;
    if (!studentData[batch]) {
        return res.status(404).json({ message: 'Batch not found' });
    }

    // Calculate scores and sort students
    const topStudents = studentData[batch]
        .map(student => ({ ...student, score: calculateScore(student) }))
        .sort((a, b) => b.score - a.score) // Sort by score in descending order
        .slice(0, 3); // Get top 3

    res.json({ top_students: topStudents });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
