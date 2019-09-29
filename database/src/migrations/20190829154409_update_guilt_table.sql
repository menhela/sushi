-- +goose Up
UPDATE guilt set code='刑法第二百三十三条' WHERE id = 4;

-- +goose Down
UPDATE guilt set code='第二百三十三条' WHERE id = 4;