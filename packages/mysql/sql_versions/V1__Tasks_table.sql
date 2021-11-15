CREATE TABLE IF NOT EXISTS `tasks` (
  `id` varchar(36) PRIMARY KEY default (UUID()),
  `ownerId` varchar(36) NOT NULL,
  `summary` text,
  `date` timestamp NOT NULL
);
CREATE INDEX task_by_onwer ON tasks (ownerId);


CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(36) PRIMARY KEY default (UUID()),
  `role` ENUM('manager', 'technician'),
  `managerId` varchar(36)
);
CREATE INDEX user_by_managerId ON users (managerId);
