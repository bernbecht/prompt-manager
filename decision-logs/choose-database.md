## 29.06.2022

### Using SQLite at the start of the project

**Why**

- **easy to use and setup**: it doesn't require a separate database server. It can be embedded within the app. Also, eliminates configurations;

**Considerations**

- **concurrency limitations**: it operates with file-lock level, so it allows only one write operation at time. Concurrent applications should not use SQLite;
- **scability**: SQLite wasn't designed for heavy load;
