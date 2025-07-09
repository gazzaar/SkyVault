## usr design

| COLUMN     | TYPE      |
| ---------- | --------- |
| id         | int       |
| username   | varchar() |
| password   | varchar() |
| created_at | TIMESTAMP |

## Folder design

| COLUMN     | TYPE      |
| ---------- | --------- |
| id         | int       |
| name       | varchar() |
| created_at | TIMESTAMP |
| updated_at | timestamp |
| user_id    | user.id   |

## File design

| COLUMN      | TYPE      |
| ----------- | --------- |
| id          | int       |
| name        | varchar() |
| link        | varchar() |
| folder_id   | folder.id |
| size        | BIGINT    |
| upload_time | timestamp |
| mime_type   | varchar() |
