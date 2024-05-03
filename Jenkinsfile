pipeline {
    agent {
        docker { image 'cypress/included:cypress-13.8.1-node-20.12.2-chrome-124.0.6367.60-1-ff-125.0.2-edge-124.0.2478.51-1' }
    }
    stages {
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Start Application') {
            steps {
                // Start the server in the background
                sh 'npm start &'
            }
        }
        stage('Wait for Application to Start') {
            steps {
                sh 'npx wait-on tcp:8081'
            }
        }
        stage('Setup Chrome and Run tests') {
            steps {
                sh 'npx cypress run --browser chrome --spec "cypress/e2e/isolation/*"'
            }
        }
        stage('Upload Artifacts on Failure') {
            when {
                expression {
                    currentBuild.currentResult == 'FAILURE'
                }
            }
            steps {
                archiveArtifacts artifacts: 'cypress/screenshots/**, cypress/videos/**', onlyIfSuccessful: false
            }
        }
    }
}