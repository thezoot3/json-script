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
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploy to Github Packages...'
                dir('./dist') {
                    sh '(echo thezoot3 echo ${GHP_THEZOOT3_TOKEN} echo thezoot3@gmail.com) | npm login --scope=@thezoot3 --registry=https://npm.pkg.github.com'
                }
            }
        }
    }
}
