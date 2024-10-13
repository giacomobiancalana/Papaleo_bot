sudo apt-get update
sudo apt-get install -y ca-certificates curl gnupg lsb-release
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo groupadd docker
sudo usermod -aG docker $USER
sudo chmod 666 /var/run/docker.sock
echo '-'
docker -v

# E quello su github di repo scripts? Vedilo qua sotto:

# sudo apt-get update
# sudo apt-get install -y ca-certificates curl gnupg
# sudo install -m 0755 -d /etc/apt/keyrings
# curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
# sudo chmod a+r /etc/apt/keyrings/docker.gpg
# echo "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
# sudo apt-get update
# sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
# # sudo apt install -y docker-compose

# ## Linux post-installation steps for Docker Engine  ## https://docs.docker.com/engine/install/linux-postinstall/
# sudo groupadd docker
# sudo usermod -aG docker $USER
# # sudo chmod 666 /var/run/docker.sock  ## da vedere: https://stackoverflow.com/questions/48957195/how-to-fix-docker-got-permission-denied-issue , vedi la seconda soluzione, che porta a un link dove sono presenti: https://github.com/jgsqware/clairctl/issues/60#issuecomment-358698788 e https://github.com/jgsqware/clairctl/issues/60#issuecomment-403620205
# # Qui, se non esegui il chmode del socket Unix (credo si dica così), allora devi fare il logout/reboot della macchina in cui stai installando Docker, quindi ogni successivo comando è inutile.
# echo 'Installazione finita. Controlla se Docker funziona con il comando docker ps, e se così non fosse, riesegui sudo usermod -aG docker $USER e esegui il logout e login dalla macchina in cui sei.'
# # echo 'Ecco le versioni '
# # docker -v
# # docker-compose -v