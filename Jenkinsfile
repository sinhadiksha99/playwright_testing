pipeline {
    agent any

    environment {
        // Ensure your Node path is included so npm/npx work
        PATH = "/Users/dikshasinha/.nvm/versions/node/v24.11.1/bin:${env.PATH}"
        CI = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
                // Clones your repo from the main branch
                git branch: 'main', url: 'https://github.com/sinhadiksha99/'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Matches your 'npm ci' step
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                // Matches 'npx playwright install --with-deps'
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Sanity Tests') {
            steps {
                // Matches your exact run command: 'npm run test:sanity'
                sh 'npm run test:sanity'
            }
        }
    }

    post {
        always {
            // Matches your 'Upload Playwright HTML Report' step
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
    }
}
