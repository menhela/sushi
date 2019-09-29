package repository

import (
	"database/sql"
	"github.com/jmoiron/sqlx"
	"github.com/voyagegroup/treasure2019-group-c/model"
)

func CreateWarning(db *sqlx.Tx, warning *model.Warning) (sql.Result, error) {
	stmt, err := db.Prepare(`
INSERT INTO warning (victim_name, victim_account_id, assaulter_name, assaulter_account_id, hash_id) VALUES (?, ?, ?, ?, ?)
`)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()
	return stmt.Exec(warning.VictimName, warning.VictimAccountId, warning.AssaulterName, warning.AssaulterAccountId, warning.HashId)
}

func GetWarning(db *sqlx.DB, hashId string) (*model.Warning, error) {
	warning := model.Warning{}
	if err := db.Get(&warning, `
SELECT id, victim_name, victim_account_id, assaulter_name, assaulter_account_id, hash_id FROM warning WHERE hash_id = ?
`, hashId); err != nil {
		return nil, err
	}
	return &warning, nil
}
