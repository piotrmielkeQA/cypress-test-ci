pipeline {
    agent {
        docker { image 'node:18-buster' }
    }
    environment {
        DOCKER_COMPOSE_PATH = 'awesome-localstack'
    }
    stages {
        stage('Checkout code') {
            steps {
                git 'https://github.com/slawekradzyminski/test-secure-frontend.git'
                dir('awesome-localstack') {
                    git 'https://github.com/slawekradzyminski/awesome-localstack.git'
                }
            }
        }
        stage('Prepare Docker Compose') {
            steps {
                dir('awesome-localstack') {
                    sh '''
                        chmod +x run-docker-compose-ci.sh
                        ./run-docker-compose-ci.sh
                    '''
                }
            }
        }
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Setup Chrome and Run Cypress tests') {
            steps {
                sh 'npx cypress run'
            }
        }
        stage('Upload Artifacts on Failure') {
            when {
                failure()
            }
            steps {
                archiveArtifacts artifacts: 'cypress/screenshots/**, cypress/videos/**', onlyIfSuccessful: false
            }
        }
    }
    post {
        always {
            sh 'docker-compose -f ${DOCKER_COMPOSE_PATH}/docker-compose-ci.yml down'
        }
    }
}