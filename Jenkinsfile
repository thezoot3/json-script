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
                sh 'sudo cp .npmrc ./dist/.npmrc'
                sh 'sudo rm .npmrc'
                sh 'sudo cp .npmignore ./dist/.npmignore'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploy to Github Packages...'
                dir('./dist') {
                    sh 'better-vsts-npm-auth config set refresh_token eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im9PdmN6NU1fN3AtSGpJS2xGWHo5M3VfVjBabyJ9.eyJuYW1laWQiOiIyOTllNzg3Zi1iNjVkLTY3ZmEtYTY1MS1iMzg4MGFkNzQ2NjkiLCJhY2kiOiIyM2FhN2EyYy02OTIxLTQzY2ItYWJhMC03MjE3MzYxNGUxZDgiLCJzY3AiOiJ2c28ucGFja2FnaW5nX3dyaXRlIiwiaXNzIjoiYXBwLnZzdG9rZW4udmlzdWFsc3R1ZGlvLmNvbSIsImF1ZCI6ImFwcC52c3Rva2VuLnZpc3VhbHN0dWRpby5jb20iLCJuYmYiOjE2NjI1NDg2NjAsImV4cCI6MTY5NDA4NDY2MH0.y6-oiNYQXP5KNei7-7Gs8BwCEDqKjU3LFAxI2BLfjjwxM_YmQ2eUjwhBGO6cQj0AIYNXGjBEQ1M0euFUxaDc5LwGSEEENlkhP7QUy_3P_F2IvmxNjkY8KSZsMxv6nCF4Vr8Z0YGpNuJYZD6LAkfAWD3crCjwnmoKpcAsU5XBvEtOwg3jodQ7v1Jot5CfdC0UvZWlpve9i7Otsz15Niz9LWrxxq-ohmeVB99D8qSSZ3nfZmdQuzG2ZGegswy6vVKkCIuzmy8tiOO6moQU-tP9n96y8U1fZnDtGF3U6AXbVx6Tqghk4If9aDJAuUbXBz4vy49mXZtuzqFMNaIGeUFCxQ'
                    sh 'npx better-vsts-npm-auth -config .npmrc'
                    sh "npm publish"
                }
                echo 'Deploy Successfully!'
            }
        }
    }
}
