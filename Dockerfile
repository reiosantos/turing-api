FROM node:12.4.0
ARG environment=docker
ENV APP_PATH=/usr/src/app NPM_CONFIG_LOGLEVEL=warn PORT=3000 HOME=/root NODE_ENV=development

RUN echo "Acquire::By-Hash \"yes\"; ">/etc/apt/apt.conf.d/01byhash

RUN apt-get update -y && \
apt-get upgrade -y && \
apt-get install -y nano lsof nmap

RUN mkdir -p $HOME/.ssh && \
echo $VC_MACHINE_KEY | base64 -d >> $HOME/.ssh/key_machine && \
echo "Host github.com\n               HostName github.com\n   IdentityFile ~/.ssh/key_machine\n               IdentitiesOnly yes\n    UserKnownHostsFile=/dev/null\n    StrictHostKeyChecking no\n" >> $HOME/.ssh/config && \
ssh-keyscan -H github.com >> $HOME/.ssh/known_hosts && \
chmod 600 $HOME/.ssh/*

WORKDIR $APP_PATH
COPY . $APP_PATH

RUN rm -rf node_modules

RUN npm set progress=false && npm i  && npm run build

EXPOSE 3000

CMD ["./docker/run.sh"]
