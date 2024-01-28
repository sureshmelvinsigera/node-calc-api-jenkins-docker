pipeline {
    agent none // No global agent is defined

    stages {
        stage('Install and Test') {
            agent {
                docker {
                    image 'node:lts-buster-slim'
                    args '-p 3001:3001 -u root'
                }
            }
            steps {
                // Use Node.js in Jenkins
                // Install dependencies
                sh 'npm install'
                // Run unit tests
                sh 'npm test'
            }
        }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}