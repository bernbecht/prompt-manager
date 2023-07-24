## 24.07.2022

### Authentication

Stopped with passwordless authenticantion and going to something easier for now, like email/password

**Why**

- need to learn normal authentication
- the tutorial I was using uses different server than Express (Hapi)

In the future, we could implement passwordless authentication to make the app safer and easier to manage;

## 29.06.2022

### Using SQLite at the start of the project

**Why**

- **easy to use and setup**: it doesn't require a separate database server. It can be embedded within the app. Also, eliminates configurations;

**Considerations**

- **concurrency limitations**: it operates with file-lock level, so it allows only one write operation at time. Concurrent applications should not use SQLite;
- **scability**: SQLite wasn't designed for heavy load;

## 28.06.2022

### Uses Yarn with node_modules

Prisma doesn't work with PnP yet
