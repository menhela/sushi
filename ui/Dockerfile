FROM nginx:alpine

RUN set -x \
    && apk upgrade --no-cache \
    && apk --update add tzdata make curl python py-pip less groff jq \
    && cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime \
    && pip install awscli \
    && apk --purge del tzdata py-pip \
    && rm -rf /var/cache/apk/*

COPY ./src/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
CMD ["/entrypoint.sh"]
