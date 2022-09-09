pipeline {
    agent any
    stages {
        stage('Cleanup Workspace') {
            cleanWs()
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
                sh 'sudo rm -r ./dist'
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
                sh 'sudo cp .npmrc ./dist/.npmrc'
                sh 'sudo cp LICENSE ./dist/LICENSE'
                sh 'npm login --registry=https://npm.pkg.github.com | (echo thezoot3; echo ${GHP_THEZOOT3_TOKEN}; echo thezoot3@gmail.com;)'
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
