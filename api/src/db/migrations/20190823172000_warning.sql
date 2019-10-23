-- +goose Up
CREATE TABLE warning
(
    id                   int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    victim_name          VARCHAR(255)     NOT NULL COMMENT '被害者の名前',
    victim_account_id    VARCHAR(255) COMMENT 'SNS上での被害者のID',
    assaulter_name       VARCHAR(255)     NOT NULL COMMENT '加害者の名前',
    assaulter_account_id VARCHAR(255) COMMENT 'SNS上での加害者のID',
    created_at           DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at           DATETIME                  DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

-- +goose Down
DROP TABLE warning;
