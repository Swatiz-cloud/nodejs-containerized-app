pipeline {
    agent any

    stages {
        stage('Clone Repo') {
            steps {
                git 'https://github.com/Swatiz-cloud/nodejs-containerized-app.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker-compose build'
            }
        }

        stage('Deploy App') {
            steps {
                sh 'docker-compose up -d'
            }
        }
    }
}
