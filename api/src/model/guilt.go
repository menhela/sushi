package model

type Guilt struct {
	ID          int64  `db:"id" json:"id"`
	Name        string `db:"name" json:"name"`
	Code        string `db:"code" json:"code"`
	Description string `db:"description" json:"description"`
	Example     string `db:"example" json:"example"`
}
