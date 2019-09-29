FROM nginx:alpine
COPY default.conf.tmpl /etc/nginx/conf.d/default.conf.tmpl
COPY run.sh /run.sh
RUN chmod +x /run.sh

RUN set -x \
    && apk upgrade --no-cache \
    && apk --update add tzdata make curl \
    && cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime \
    && apk del tzdata \
    && rm -rf /var/cache/apk/*

CMD [ "/run.sh" ]
