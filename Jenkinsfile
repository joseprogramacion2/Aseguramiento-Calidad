pipeline {
  agent any
  tools { nodejs 'node20' }
  options { timestamps() }   // <- quitamos ansiColor

  stages {
    stage('Checkout') {
      steps { checkout scm }
    }

    stage('Backend: instalar') {
      steps {
        dir('backend') {
          bat '''
          if exist package-lock.json (
            npm ci
          ) else (
            npm install
          )
          '''
        }
      }
    }

    stage('Backend: pruebas') {
      steps {
        dir('backend') { bat 'npm test' }
      }
      post {
        always {
          junit 'backend/reports/junit.xml'
          archiveArtifacts artifacts: 'backend/reports/**, backend/coverage/**', fingerprint: true
        }
      }
    }
  }
}
