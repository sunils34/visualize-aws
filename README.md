# visualize-aws
A locally hosted tool to manage AWS services


## Configuration

Before you start, you'll want to set up these environment variables in your .bashrc, .zshrc etc.

```bash
export AWS_ACCESS_KEY_ID=<access key>
export AWS_SECRET_ACCESS_KEY=<Secret key>
export AWS_EC2_SSH_USER=<ssh user, root or ec2-user?>
export AWS_EC2_SSH_PEMFILE=/path/to/ssh/pemfile.pem
```

## Running the server

```bash
npm install
node server.js
```
Once this is started head over to your browser and enter
```
localhost:7076
```
