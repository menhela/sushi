-- +goose Up
CREATE TABLE guilt_warning
(
    id         int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    guilt_id   int(10) UNSIGNED NOT NULL,
    warning_id int(10) UNSIGNED NOT NULL,
    created_at DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME                  DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (guilt_id) REFERENCES guilt (id),
    FOREIGN KEY (warning_id) REFERENCES warning (id)
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;
-- +goose Down
DROP TABLE guilt_warning;
