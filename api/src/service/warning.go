package service

import (
	"crypto/rand"
	"encoding/base64"
	"github.com/jmoiron/sqlx"
	"github.com/pkg/errors"
	"github.com/voyagegroup/treasure2019-group-c/dbutil"
	"github.com/voyagegroup/treasure2019-group-c/model"
	"github.com/voyagegroup/treasure2019-group-c/repository"
	"math/big"
	"strings"
)

type WarningService struct {
	db *sqlx.DB
}

func NewWarningService(db *sqlx.DB) *WarningService {
	return &WarningService{db}
}

//TODO ハッシュの衝突を避けるようにする
func newHashId(length int) string {
	runes := make([]byte, length)

	for i := 0; i < length; i++ {
		num, _ := rand.Int(rand.Reader, big.NewInt(255))
		runes[i] = byte(num.Int64())
	}
	hash := base64.RawStdEncoding.EncodeToString(runes)
	hash = strings.Replace(hash, "/", "-", -1)
	hash = strings.Replace(hash, "+", "_", -1)

	return hash
}

func (warningService *WarningService) Create(newWarningRequest *model.WarningRequest) (int64, error) {
	var createdId int64
	if err := dbutil.TXHandler(warningService.db, func(tx *sqlx.Tx) error {
		newWarningRequest.Warning.HashId = newHashId(32)
		result, err := repository.CreateWarning(tx, &newWarningRequest.Warning)
		id, err := result.LastInsertId()
		if err != nil {
			return err
		}
		createdId = id

		for i := 0; i < len(newWarningRequest.Evidences); i++ {
			newWarningRequest.Evidences[i].WarningId = createdId
		}
		_, err = repository.CreateEvidences(tx, &newWarningRequest.Evidences)
		if err != nil {
			return err
		}
		guiltWarningList := make([]model.GuiltWarning, 0, len(newWarningRequest.GuiltIds))
		for _, guiltId := range newWarningRequest.GuiltIds {
			guiltWarning := model.GuiltWarning{}
			guiltWarning.WarningId = createdId
			guiltWarning.GuiltId = guiltId
			guiltWarningList = append(guiltWarningList, guiltWarning)
		}
		_, err = repository.CreateMultiGuiltWarning(tx, &guiltWarningList)
		if err != nil {
			return err
		}

		if err := tx.Commit(); err != nil {
			return err
		}
		return err
	}); err != nil {
		return 0, errors.Wrap(err, "failed warning insert transaction")
	}
	return createdId, nil
}
