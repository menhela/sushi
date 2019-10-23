-- +goose Up
ALTER TABLE warning
    ADD
        hash_id TEXT;

-- +goose Down
ALTER TABLE warning DROP hash_id;
