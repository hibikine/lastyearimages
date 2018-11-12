FROM php:7.2-apache
WORKDIR /var/www/html
RUN apt-get update && apt-get install -y \
  git unzip
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
