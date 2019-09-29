package model

type Warning struct {
	ID                 int64  `db:"id" json:"id"`
	VictimName         string `db:"victim_name" json:"victim_name" validate:"required,min=1,max=50"`
	VictimAccountId    string `db:"victim_account_id" json:"victim_account_id" validate:"required,min=1,max=15"`
	AssaulterName      string `db:"assaulter_name" json:"assaulter_name" validate:"required,min=1,max=50"`
	AssaulterAccountId string `db:"assaulter_account_id" json:"assaulter_account_id" validate:"required,min=1,max=15"`
	HashId             string `db:"hash_id" json:"hash_id"`
}
