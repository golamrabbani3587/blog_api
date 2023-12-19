terraform {
  backend "s3" {
    # bucket         = var.tf_state_bucket
    # key            = "terraform.tfstate"  # Name for the state file
    # region         = "us-east-1"         # AWS region of your bucket
    AccessKeyId=AKIA4USLMRNXYYRKTBNH
    SecretAccessKey=jBawfEr5kKAA40d8L3753INqpYSADxkBGUGmJHrB
    Region=us-east-1
    Bucket=car-service-dynam
    key            = "terraform.tfstate"
    encrypt        = true
  }
}