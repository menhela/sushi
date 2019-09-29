-- +goose Up
ALTER TABLE evidence
    ADD
        screenshot_url TEXT;

-- +goose Down
ALTER TABLE evidence DROP screenshot_url;
