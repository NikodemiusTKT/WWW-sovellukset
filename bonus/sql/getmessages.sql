SELECT
users.id           AS 'sender_id',
users.phone_number AS 'sender_number',
messages.id        AS 'messages_id',
messages.message,
messages.time_to_show
FROM users JOIN messages ON (users.id = messages.sender_id) WHERE messages.receiver_id = ?;
