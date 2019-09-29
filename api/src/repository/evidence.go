package repository

import (
	"database/sql"
	"fmt"
	"github.com/jmoiron/sqlx"
	"github.com/voyagegroup/treasure2019-group-c/model"
	"strings"
)

func CreateEvidence(db *sqlx.Tx, evidence *model.Evidence) (sql.Result, error) {
	stmt, err := db.Prepare(`
INSERT INTO evidence (warning_id, content, evidence_url) VALUES (?, ?, ?)
`)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()
	return stmt.Exec(evidence.WarningId, evidence.Content, evidence.EvidenceUrl)
}

func CreateEvidences(db *sqlx.Tx, evidences *[]model.Evidence) (sql.Result, error) {
	const numberOfColumn = 3
	var variables []string
	for i := 0; i < numberOfColumn; i++ {
		variables = append(variables, "?")
	}
	valueStrings := make([]string, 0, len(*evidences))
	valueArgs := make([]interface{}, 0, len(*evidences)*numberOfColumn)
	variablesStatement := "(" + strings.Join(variables, ", ") + ")"
	for _, evidence := range *evidences {
		valueStrings = append(valueStrings, variablesStatement)
		valueArgs = append(valueArgs, evidence.WarningId)
		valueArgs = append(valueArgs, evidence.Content)
		valueArgs = append(valueArgs, evidence.EvidenceUrl)
	}
	insertQuery := fmt.Sprintf("INSERT INTO evidence (warning_id, content, evidence_url) VALUES %s", strings.Join(valueStrings, ","))

	stmt, err := db.Prepare(insertQuery)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()
	return stmt.Exec(valueArgs...)
}

func FindEvidenceListByWarningId(db *sqlx.DB, warningId int64) ([]model.Evidence, error) {
	evidenceList := make([]model.Evidence, 0)
	if err := db.Select(&evidenceList, `
SELECT id, warning_id, content, evidence_url FROM evidence WHERE warning_id = ?
`, warningId); err != nil {
		return nil, err
	}
	return evidenceList, nil
}
