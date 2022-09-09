pipeline {
    agent any
    stages {
        stage('Packages Install') {
            steps {
                echo "Npm Packages Installing"
                sh "sudo npm install"
                echo "Npm Packages Installed"
            }
        }
        stage('ESLint') {
            steps {
                echo 'EsLint checking'
                sh "sudo npm run eslint"
                echo "EsLint Passed"
            }
        }
        stage('Compile') {
            steps {
                echo 'Babel Compiling Started...'
                sh "sudo npm run compile"
                echo 'Babel Compile Completed'
            }
        }
        stage('PreDeploy') {
            steps {
                sh 'sudo cp -r static/ dist/static/'
                sh 'sudo cp package.json ./dist/package.json'

                sh 'sudo cp .npmignore ./dist/.npmignore'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploy to Github Packages...'
                dir('./dist') {
                    withNPM(npmrcConfig:'thezoot3-npmrc') {
                        sh "npm publish"
                    }
                }
            }
        }
    }
}
