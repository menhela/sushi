GROUP               = treasure2019-group-c
FRONTEND_SRC_DIR    = ui/src/
BACKEND_SRC_DIR     = api/src/
DATABASE_SRC_DIR    = database/src/
SRC_REPOSITORY      = git@github.com:voyagegroup/treasure-app.git
SRC_REPOSITORY_DIR  = treasure-app/
DOCKER_CACHE_DIR   :=
ORIGIN_REPO_NAME_APP    := treasure-app
ORIGIN_REPO_NAME_INFRA  := treasure2019-group-x

.PHONY: src src/* save/* load/* build/*

# treasure-appの変更を取り込む
src: src/clean src/clone src/cp src/rename

src/cp:
	cp -a ${SRC_REPOSITORY_DIR}frontend/. ${FRONTEND_SRC_DIR}
	cp -a ${SRC_REPOSITORY_DIR}backend/. ${BACKEND_SRC_DIR}
	cp -a ${SRC_REPOSITORY_DIR}database/. ${DATABASE_SRC_DIR}
	cp -a ${SRC_REPOSITORY_DIR}.gitignore .gitignore
	rm -rf ${SRC_REPOSITORY_DIR}

src/rename:
	find ./api/src -type f -name "*.go" -o -name "go.mod" | xargs sed -i '' -e 's#github.com/voyagegroup/${ORIGIN_REPO_NAME_APP}#github.com/voyagegroup/${GROUP}#g'
	sed -i '' -e 's#${ORIGIN_REPO_NAME_INFRA}#${GROUP}#g' README.md

src/clone:
	mkdir -p ${SRC_REPOSITORY_DIR}
	git $(@F) ${SRC_REPOSITORY} ./${SRC_REPOSITORY_DIR}/

src/clean:
	rm -rf ${FRONTEND_SRC_DIR}
	rm -rf ${BACKEND_SRC_DIR}
	rm -rf ${DATABASE_SRC_DIR}

# CIで実行する docker build のラッパー
save/treasure2019-gateway save/treasure2019-ui save/treasure2019-api:
	docker $(@D) $(@F) -o ${DOCKER_CACHE_DIR}$(@F).tar

load/treasure2019-gateway load/treasure2019-ui load/treasure2019-api:
	if [ -e ${DOCKER_CACHE_DIR}$(@F).tar ]; then \
		docker $(@D) -i ${DOCKER_CACHE_DIR}$(@F).tar; fi

build/treasure2019-ui build/treasure2019-api build/treasure2019-gateway:
	docker $(@D) $(shell echo $(@F) | cut -d"-" -f2) -t $(@F) --cache-from $(@F)
