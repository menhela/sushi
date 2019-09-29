package model

type WarningResponse struct {
	Warning Warning `json:"warning"`
	Evidences []Evidence `json:"evidences"`
	Guilts []Guilt `json:"guilts"`
}