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

//         stage('SonarQubeScanner-5.0.1.3006') {
//             agent any // Specify the agent for this stage
//             steps {
//                 withCredentials([string(credentialsId: 'sonarqube_token', variable: 'SONAR_TOKEN'),
//                                  string(credentialsId: 'sonarqube_project_key', variable: 'SONAR_PROJECT_KEY')]) {
//                     script {
//                         // Run SonarQube analysis with the token and project key
//                         sh "sonar-scanner -Dsonar.projectKey=${SONAR_PROJECT_KEY} -Dsonar.host.url=http://3.14.132.177:9000/ -Dsonar.login=${SONAR_TOKEN}"
//                     }
//                 }
//             }
//         }

        stage('Build and Push Docker Image') {
            agent any // This stage will run on any available agent
            steps {
                script {
                    // Building the Docker image
                    sh 'docker build -t calc-api-image .'

                    // Using credentials from Jenkins store
                    withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_HUB_USER', passwordVariable: 'DOCKER_HUB_PASS')]) {
                        // Logging into Docker Hub
                        sh 'echo $DOCKER_HUB_PASS | docker login -u $DOCKER_HUB_USER --password-stdin'

                        // Tagging the image
                        sh 'docker tag calc-api-image $DOCKER_HUB_USER/calc-api-image:latest'

                        // Pushing the image to Docker Hub
                        sh 'docker push $DOCKER_HUB_USER/calc-api-image:latest'
                    }
                }
            }
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
