#!/bin/sh -x

#Define cleanup procedure
cleanup() {
    echo "Container stopped, performing cleanup..."
    APP=$(curl -s ${ECS_CONTAINER_METADATA_URI} | jq '.Name' -r)
    SERVICE_ID=$(aws servicediscovery list-services --query="Services[?Name==\`${APP}\`].Id" --output text --region ap-northeast-1)
    INSTANCE_ID=$(curl -s ${ECS_CONTAINER_METADATA_URI} | jq '.Labels."com.amazonaws.ecs.task-arn"' -r | cut -d '/' -f2)
    aws servicediscovery deregister-instance --service-id $SERVICE_ID --instance-id $INSTANCE_ID --region ap-northeast-1
    sleep 25
    echo "done"
}

#Trap SIGTERM
trap 'true' SIGTERM

/usr/sbin/nginx -g "daemon off;" &

#Wait
wait $!

#Cleanup
cleanup
