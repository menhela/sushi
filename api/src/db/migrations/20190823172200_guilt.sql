-- +goose Up
CREATE TABLE guilt
(
    id          int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    name        VARCHAR(255)     NOT NULL COMMENT '罪の名前',
    code        VARCHAR(255)     NOT NULL COMMENT '罪が何条か',
    description VARCHAR(255)     NOT NULL COMMENT 'どういう罪なのかの説明',
    example     VARCHAR(500)     NOT NULL COMMENT 'どういうケースが当てはまるかの説明',
    created_at  DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME                  DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;


-- +goose Down
DROP TABLE guilt;
