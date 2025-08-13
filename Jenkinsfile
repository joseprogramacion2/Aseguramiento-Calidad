pipeline {
  agent any
  tools { nodejs 'node20' }
  options { timestamps(); ansiColor('xterm') }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
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
        dir('backend') {
          bat 'npm test'
        }
      }
      post {
        always {
          junit 'backend/reports/junit.xml'
          publishHTML(target: [
            reportName: 'Jest Report',
            reportDir: 'backend/reports/html',
            reportFiles: 'report.html',
            keepAll: true,
            alwaysLinkToLastBuild: true,
            allowMissing: true
          ])
          archiveArtifacts artifacts: 'backend/reports/**, backend/coverage/**', fingerprint: true
        }
      }
    }
  }
}
