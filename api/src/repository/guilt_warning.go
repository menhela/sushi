package repository

import (
	"database/sql"
	"fmt"
	"github.com/jmoiron/sqlx"
	"github.com/voyagegroup/treasure2019-group-c/model"
	"strings"
)

func CreateGuiltWarning(db *sqlx.Tx, guiltWarning *model.GuiltWarning) (sql.Result, error) {
	stmt, err := db.Prepare(`
INSERT INTO guilt_warning (guilt_id, warning_id) VALUES (?, ?)
`)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()
	return stmt.Exec(guiltWarning.GuiltId, guiltWarning.WarningId)
}

func CreateMultiGuiltWarning(db *sqlx.Tx, guiltWarningList *[]model.GuiltWarning) (sql.Result, error) {
	const numberOfColumn = 2
	var variables []string
	for i := 0; i < numberOfColumn; i++ {
		variables = append(variables, "?")
	}
	valueStrings := make([]string, 0, len(*guiltWarningList))
	valueArgs := make([]interface{}, 0, len(*guiltWarningList)*numberOfColumn)
	variablesStatement := "(" + strings.Join(variables, ", ") + ")"
	for _, evidence := range *guiltWarningList {
		valueStrings = append(valueStrings, variablesStatement)
		valueArgs = append(valueArgs, evidence.GuiltId)
		valueArgs = append(valueArgs, evidence.WarningId)
	}
	insertQuery := fmt.Sprintf("INSERT INTO guilt_warning (guilt_id, warning_id) VALUES %s", strings.Join(valueStrings, ","))

	stmt, err := db.Prepare(insertQuery)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()
	return stmt.Exec(valueArgs...)
}

func FindGuiltWarningListByWarningId(db *sqlx.DB, warningId int64) ([]model.GuiltWarning, error) {
	guiltWarningList := make([]model.GuiltWarning, 0)
	if err := db.Select(&guiltWarningList, `
SELECT id, guilt_id, warning_id FROM guilt_warning WHERE warning_id = ?
`, warningId); err != nil {
		return nil, err
	}
	return guiltWarningList, nil
}
