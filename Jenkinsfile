pipeline {
    agent any
    stages {
        stage('Packages Install') {
            steps {
                sh "chmod ../json-script 777"
                echo "Npm Packages Installing"
                sh "npm install"
                echo "Npm Packages Installed"
            }
        }
        stage('ESLint') {
            steps {
                echo 'EsLint checking'
                sh "npm run eslint"
                echo "EsLint Passed"
            }
        }
        stage('Compile') {
            steps {
                echo 'Babel Compiling Started...'
                sh "npm run compile"
                echo 'Babel Compile Completed'
            }
        }
        stage('PreDeploy') {
            steps {
                sh 'cp -r static/ dist/static/'
                sh 'cp package.json ./dist/package.json'
                sh 'cp .npmrc ./dist/.npmrc'
                sh 'rm .npmrc'
                sh 'cp .npmignore ./dist/.npmignore'
                sh 'cd ./dist || exit'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploy to Github Packages...'
                sh "npm publish"
                echo 'Deploy Successfully!'
            }
        }
    }
}
