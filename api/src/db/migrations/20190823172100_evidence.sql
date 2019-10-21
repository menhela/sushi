-- +goose Up
CREATE TABLE evidence
(
    id           int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    warning_id   int(10) UNSIGNED NOT NULL,
    content      VARCHAR(500)     NOT NULL COMMENT 'SNS上での投稿内容',
    evidence_url TEXT COMMENT 'SNS上の投稿のURL',
    created_at   DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at   DATETIME                  DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (warning_id) REFERENCES warning (id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

-- +goose Down
DROP TABLE evidence;
