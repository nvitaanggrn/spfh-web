FROM nginx:1.19.10

WORKDIR /workdir

RUN apt-get update -y \
  && apt-get install -y curl \
  && curl -fsSL https://deb.nodesource.com/setup_14.x | bash - \
  && apt-get install -y nodejs \
  && apt-get autoremove -y