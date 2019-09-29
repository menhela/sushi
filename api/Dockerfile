FROM alpine:3.10

RUN set -x \
    && apk upgrade --no-cache \
    && apk --update add tzdata make curl python py-pip less groff jq \
    && cp /usr/share/zoneinfo/Asia/Tokyo /etc/localtime \
    && pip install awscli \
    && apk --purge del tzdata py-pip \
    && rm -rf /var/cache/apk/*

COPY ./src/.env /.env
COPY ./src/.google_app_cred /.google_app_cred
COPY ./src/main main
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh /main
CMD ["/entrypoint.sh"]
