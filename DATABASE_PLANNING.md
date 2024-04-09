# users
- PK | id
- username
- email

# ingredients
- PK | id
- FK | user_id
- name

# recipes
- PK | id
- FK | saved_by
- title
- tags
- ingredients
- steps
