package model

type Evidence struct {
	ID          int64  `db:"id" json:"id" `
	WarningId   int64  `db:"warning_id" json:"warning_id"`
	Content     string `db:"content" json:"content" validate:"required,min=1,max=500"`
	EvidenceUrl string `db:"evidence_url" json:"evidence_url" validate:"contains=http"`
}
