#!/usr/bin/env node

// inquirer
import inquirer from 'inquirer';

//variables
class Student {
    constructor(public name: string, public id: number, public grade: string) {}
}

//array
class StudentManagementSystem {
    private students: Student[] = [];

  // function of adding students  
    async addStudent() {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter student name:',
            },
            {
                type: 'number',
                name: 'id',
                message: 'Enter student ID:',
            },
            {
                type: 'input',
                name: 'grade',
                message: 'Enter student grade:',
            }
        ]);
        const newStudent = new Student(answers.name, answers.id, answers.grade);
        this.students.push(newStudent);
    }

    //function for removing students
    async removeStudent() {
        const answers = await inquirer.prompt({
            type: 'number',
            name: 'id',
            message: 'Enter student ID to remove:',
        });
        this.students = this.students.filter(student => student.id !== answers.id);
    }

 // displaying students   
    displayStudents() {
        console.log("List of Students:");
        this.students.forEach(student => {
            console.log(`Name: ${student.name}, ID: ${student.id}, Grade: ${student.grade}`);
        });
    }
}

// Usage
async function main() {
    const studentSystem = new StudentManagementSystem();
    let exit = false;

    while (!exit) {
        const action = await inquirer.prompt({
            type: 'list',
            name: 'action',
            message: 'Choose an action:',
            choices: ['Add Student', 'Remove Student', 'Display Students', 'Exit']
        });

// cases of adding, removing, displaying students and exit        
        switch (action.action) {
            case 'Add Student':
                await studentSystem.addStudent();
                break;
            case 'Remove Student':
                await studentSystem.removeStudent();
                break;
            case 'Display Students':
                studentSystem.displayStudents();
                break;
            case 'Exit':
                exit = true;
                break;
        }
    }
}

main();
