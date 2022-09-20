pipeline {
    agent any
    options {
        skipDefaultCheckout(true)
    }
    stages {
        stage('Checkout SCM') {
            steps {
                cleanWs()
                checkout scm
            }
        }
        stage('NPM Packages Install') {
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
        stage('Babel Compile') {
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
                sh 'sudo cp LICENSE ./dist/LICENSE'
                dir('./dist') {
                    sh 'npx npm-cli-adduser -u thezoot3 -p ${GHP_THEZOOT3_TOKEN} -e thezoot3@gmail.com -r https://npm.pkg.github.com/ -s thezoot3'
                }
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploy to Github Packages...'
                dir('./dist') {
                    sh 'npm publish'
                }
                echo 'Deploy Complete'
            }
        }
    }
}
