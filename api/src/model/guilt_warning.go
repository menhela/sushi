package model

type GuiltWarning struct {
	ID    int64  `db:"id" json:"id"`
	GuiltId int64 `db:"guilt_id" json:"guilt_id"`
	WarningId int64 `db:"warning_id" json:"warning_id"`
}
