pipeline {
    agent {
        docker { image 'node:18-buster' }
    }
    environment {
        DOCKER_COMPOSE_PATH = 'awesome-localstack'
    }
    stages {
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Setup Chrome and Run Cypress tests') {
            steps {
                sh 'npx cypress run --spec "cypress/e2e/isolation/*"'
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