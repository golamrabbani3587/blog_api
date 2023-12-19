# Define the DigitalOcean provider
provider "digitalocean" {
  token = "dop_v1_9ba2628ece364a2cf0ce1c413850b1db1cc6b17659797a1e710954e13f450073"
}
terraform {
  backend "local" {}
}
resource "digitalocean_droplet" "blue_server" {
  name    = "blue-server"
  region  = "nyc1" # Replace with your desired region
  size    = "s-1vcpu-1gb" # Replace with your desired size
  image   = "ubuntu-22-04-x64" # Replace with your desired image
  ssh_keys = ["mykey"] # Replace with your SSH key name

  user_data = <<-EOF
              #!/bin/bash
              apt-get update
              apt-get install -y software-properties-common
              apt-add-repository --yes --update ppa:ansible/ansible
              apt-get update
              apt-get install -y ansible

              # Configure firewall rules for ports 8701 to 8710
              for port in {8701..8710}; do
                sudo ufw allow $port
              done
              EOF
}
output "droplet_ip" {
  value = digitalocean_droplet.blue_server.ipv4_address
}