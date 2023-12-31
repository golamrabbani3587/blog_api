pipeline {
    agent any
    environment {
        TEST_PORT = 5483
        PROD_PORT = 2013
    }
    
    stages {
        stage('Check Test Docker Image And Remove If Exist') {
            steps {
                script {
                    def containerExistsOutput = sh(script: "docker ps -a --filter name=blog_api --format '{{.Names}}'", returnStdout: true).trim()
                    def imageExistsOutput = sh(script: 'docker images -q blog_api', returnStdout: true).trim()
                    if (containerExistsOutput) {
                        echo 'Container exists. Stopping and removing...'
                        sh 'docker stop blog_api'
                        sh 'docker rm blog_api'
                    }
                    else {
                        echo 'Container does not exist.'
                    }
                    if (imageExistsOutput) {
                        echo 'Image exists. Removing...'
                        sh """docker rmi -f \$(docker images 'blog_api' -a -q)"""
                    }
                    else {
                        echo 'Image does not exist.'
                    }
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    echo '==>Building Test Container....'
                    sh 'docker build -t blog_api .'
                    echo '==>Test Container Build Success.'
                }
            }
        }
        stage('Run Tag Docker Image') {
            steps {
                script {
                    echo '==>Adding Tag Test Container....'
                    sh 'docker tag blog_api blog_api:test'
                    echo '==>Tag Added Test Container.'
                }
            }
        }
        stage('Run Test Docker Image') {
            steps {
                script {
                    echo '==>Running Test Container....'
                    sh "docker run -d -p $TEST_PORT:$TEST_PORT --name blog_api --env-file .env blog_api:test"
                    echo '==>Test Container Running.'
                }
            }
        }
        stage('Test Docker Image') {
            steps {
                script {
                    echo '==>Running Test Cases....'
                    sh 'docker exec blog_api npm test'
                }
            }
        }
        stage('Remove test docker image') {
            steps {
                script {
                    echo '==>Removing Test Container And Image....'
                    sh 'docker stop blog_api'
                    sh 'docker rm blog_api'
                    sh """docker rmi -f \$(docker images 'blog_api:test' -a -q)"""
                    echo '==>Removed Test Container And Image'
                }
            }
        }
        
        stage('Check Production Docker Image And Remove If Exist') {
            steps {
                script {
                      
                    def containerExistsOutput = sh(script: "docker ps -a --filter name=blog_api --format '{{.Names}}'", returnStdout: true).trim()
                    def imageExistsOutput = sh(script: 'docker images -q golamrabbani3587/blog_api', returnStdout: true).trim()

                    if (containerExistsOutput) {
                        echo 'Container exists. Stopping and removing...'
                        sh 'docker stop golamrabbani3587/blog_api:v1'
                        sh 'docker rm golamrabbani3587/blog_api:v1'
                    }
                    else {
                        echo 'Container does not exist.'
                    }
                    if (imageExistsOutput) {
                        echo 'Image exists. Removing...'
                        sh """docker rmi -f \$(docker images 'golamrabbani3587/blog_api:v1' -a -q)"""
                    }
                    else {
                        echo 'Image does not exist.'
                    }
                }
            }
        }
        stage('Build Production Docker Image') {
            steps {
                echo '==>Building Production Container...'
                sh 'docker build -t golamrabbani3587/blog_api:v1 .'
                echo '==>Successfully Build.'
            }
        }
        stage('Run Docker Image') {
            steps {
                echo '==>Running Production Container...'
                sh "docker run -d -p $PROD_PORT:$PROD_PORT --name blog_api --env-file .env golamrabbani3587/blog_api:v1"
                echo '==>Successfully Running.'
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    def commitMessage = sh(script: "git log --format=%s -n 1", returnStdout: true).trim()
                    def imageTag = "golamrabbani3587/blog_api:${commitMessage}"
                    echo "==>Pushing $imageTag Container to Docker Hub"
                    sh "echo 'Programming123#' | docker login -u golamrabbani3587 --password-stdin"
                    sh "docker tag golamrabbani3587/blog_api:v1 $imageTag"
                    sh "docker push $imageTag"
                }
            }
        }
        // stage('Update Blue Servers') {
        //     when {
        //         expression { currentBuild.resultIsBetterOrEqualTo('SUCCESS') }
        //     }
        //     steps {
        //         // Use Terraform to update all blue servers according to the new Docker image
        //         sh 'terraform apply -auto-approve'
        //     }
        // }
        // stage('Provision Blue Servers') {
        //     steps {
        //         // Use Terraform to check if blue servers exist and provision them if they don't
        //         sh 'terraform init'
        //         sh 'terraform init -backend-config=backend.tfvars'
        //         sh 'terraform apply -auto-approve'
        //     }
        // }

stage('Provision Blue Servers') {
            steps {
                // Use Terraform to check if blue servers exist and provision them if they don't
                sh 'terraform init -backend-config=backend.tfvars'
                sh 'terraform apply -auto-approve'
            }
        }

        stage('Update Blue Servers') {
            when {
                expression { currentBuild.resultIsBetterOrEqualTo('SUCCESS') }
            }
            steps {
                // Use Terraform to update all blue servers according to the new Docker image
                sh 'terraform apply -auto-approve'
            }
        }

    }
}