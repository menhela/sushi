package controller

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"

	"github.com/jmoiron/sqlx"
	"github.com/voyagegroup/treasure2019-group-c/httputil"
	"github.com/voyagegroup/treasure2019-group-c/model"
	"github.com/voyagegroup/treasure2019-group-c/repository"
	"github.com/voyagegroup/treasure2019-group-c/service"
)

type WarningController struct {
	db *sqlx.DB
}

func NewWarningController(db *sqlx.DB) *WarningController {
	return &WarningController{db: db}
}

func (warningController *WarningController) Create(w http.ResponseWriter, r *http.Request) (int, interface{}, error) {
	newWarningRequest := &model.WarningRequest{}
	if err := json.NewDecoder(r.Body).Decode(&newWarningRequest); err != nil {
		return http.StatusBadRequest, nil, err
	}

	if err := newWarningRequest.Validate(); err != nil {
		fmt.Println(err)
		return http.StatusBadRequest, nil, err
	}

	warningRequestService := service.NewWarningService(warningController.db)
	id, err := warningRequestService.Create(newWarningRequest)
	if err != nil {
		return http.StatusInternalServerError, nil, err
	}
	newWarningRequest.Warning.ID = id

	return http.StatusCreated, newWarningRequest, nil
}

func (warningController *WarningController) Show(w http.ResponseWriter, r *http.Request) (int, interface{}, error) {
	vars := mux.Vars(r)
	hashId, ok := vars["hashId"]
	if !ok {
		return http.StatusBadRequest, nil, &httputil.HTTPError{Message: "invalid path parameter"}
	}

	warning, err := repository.GetWarning(warningController.db, hashId)
	if err != nil && err == sql.ErrNoRows {
		return http.StatusNotFound, nil, err
	} else if err != nil {
		return http.StatusInternalServerError, nil, err
	}

	evidenceList, err := repository.FindEvidenceListByWarningId(warningController.db, warning.ID)
	if err != nil && err == sql.ErrNoRows {
		return http.StatusNotFound, nil, err
	} else if err != nil {
		return http.StatusInternalServerError, nil, err
	}

	guiltWarningList, err := repository.FindGuiltWarningListByWarningId(warningController.db, warning.ID)
	if err != nil && err == sql.ErrNoRows {
		return http.StatusNotFound, nil, err
	} else if err != nil {
		return http.StatusInternalServerError, nil, err
	}

	guiltList := []model.Guilt{}
	for _, guiltWarning := range guiltWarningList {
		guilt, err := repository.GetGuilt(warningController.db, guiltWarning.GuiltId)
		if err != nil && err == sql.ErrNoRows {
			return http.StatusNotFound, nil, err
		} else if err != nil {
			return http.StatusInternalServerError, nil, err
		}
		guiltList = append(guiltList, *guilt)
	}

	warningResponse := model.WarningResponse{}
	warningResponse.Warning = *warning
	warningResponse.Evidences = evidenceList
	warningResponse.Guilts = guiltList

	return http.StatusCreated, warningResponse, nil
}
