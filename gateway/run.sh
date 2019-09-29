#!/bin/sh
RESOLVER=`cat /etc/resolv.conf | grep nameserver | awk '{print $2}'`
export RESOLVER
envsubst ' \
      $$GROUP_NAME
      $$DOMAIN
      $$RESOLVER
      '< /etc/nginx/conf.d/default.conf.tmpl \
      > /etc/nginx/conf.d/default.conf

exec nginx -g 'daemon off;'
