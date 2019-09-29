-- +goose Up
ALTER TABLE evidence DROP screenshot_url;

-- +goose Down
ALTER TABLE evidence
    ADD
        screenshot_url TEXT;
