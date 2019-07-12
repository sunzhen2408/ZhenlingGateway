#!/bin/bash -e

[ "$NVM_VERSION" != "" ] || NVM_VERSION="v0.33.8"
[ "$NODE_VERSION" != "" ] || NODE_VERSION="--lts=carbon"
[ "$USER" != "" ] || USER="pi"
[ "$HOME" != "" ] || HOME="/home/${USER}"
cd "${HOME}"

# Update the base packages that come with the system. This is required
# so that we can install git

sudo apt update
sudo apt upgrade -y
sudo apt install -y \
    build-essential \
    curl \
    git \
    libcap2-bin \
    python \
    #eol

mkdir -p zhenling-iot
cd zhenling-iot

# Install and configure nvm
[ -e "${HOME}/.bashrc" ] || touch "${HOME}/.bashrc"
curl -o- https://raw.githubusercontent.com/creationix/nvm/${NVM_VERSION}/install.sh | bash
# The following 2 lines are installed into ~/.bashrc by the above,
# but on the target, sourcing ~/.bashrc winds up being a no-op (when sourced
# from a script), so we just run it here.
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh"  # This loads nvm
nvm install ${NODE_VERSION}
nvm use ${NODE_VERSION}

# Allow node to use the Bluetooth adapter
sudo setcap cap_net_raw+eip $(eval readlink -f `which node`)

# Download and install the required node modules
if [ ! -d "zhenlingGateway" ]; then
    
#    git clone repo@121.43.151.237:/home/repo/aiot.git 
    git clone https://github.com/sunzhen2408/zhenlingGateway.git
 #    git clone https://sunzhen2408:SUNzhenGIT123@github.com/sunzhen2408/zhenlingFramework.git
fi
cd zhenlingGateway
npm install .

# Create a self-signed cert. This is temporary (for development).
#if [ ! -f "certificate.pem" ]; then
#    ./tools/make-self-signed-cert.sh
#fi

echo "###################################################################"
echo "#"
echo "# Please reboot to properly activate NVM and the iptables rules."
echo "#"
echo "###################################################################"
