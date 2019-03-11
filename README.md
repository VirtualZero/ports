# Ports (Port Checker)
Powered by [Virtualzero](https://virtualzero.net)

A quick and easy solution for determining if a port is open on a web server. Simply enter the URL or IP address of the server and the port to scan. Ports leverages the power of the network mapping utility, Nmap, to scan and determine the target's port status.

#### Installation
Clone the repository:
```bash
git clone https://github.com/VirtualZero/ports.git
```

#### Environment

Install Miniconda
```bash
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
```

```bash
chmod +x Miniconda3-latest-Linux-x86_64.sh
```

```bash
./Miniconda3-latest-Linux-x86_64.sh
```

Create Environment
```bash
conda create --name 'ports' python=3.7
```

Activate Environment
```bash
source activate ports
```

Install Dependencies
```bash
cd ports && pip install -r requirements.txt
```

#### Execution
It is bad practice to store passwords in applications. For this reason, sensitive information like account passwords, secret keys, and API keys are stored in environment variables. For simplicity, use the included bash script, env.sh, to create the environment variables before executing the application. With the 'ports' virtual environment activated, update env.sh with a secure password and execute the following command:

```bash
chmod +x env.sh && . env.sh
```
To run Ports on your local machine, make sure the 'ports' virtual environment is activated and that you are in the root ports directory. Enter the following command to start the app:

```bash
python run.py
```

Then, open a browser and go to the following URL:

```bash
http://127.0.0.1:5000
```

To use Ports in a production environment, it is recommended to deploy the app using Gunicorn and Nginx. An example Nginx host file is included, as well as an example systemd service file.

