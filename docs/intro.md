# Introduction

**YetiFramework** is a lightweight Java testing framework for writing **scenario-based API tests**.

Instead of testing endpoints in isolation, you describe real workflows like:

*Create user → Fetch user → Update user → Delete user*

YetiFramework makes it simple to:
- Register endpoints once and reuse them
- Define reusable input data
- Write scenarios composed of ordered steps
- Pass variables between steps (e.g. `${userId}`)
- Extract values from responses (`$.id`)
- Verify expectations like HTTP status codes

## Why Yeti?

- **Readable** → scenarios describe real workflows
- **Reusable** → data and endpoints are defined once
- **Flexible** → works with any HTTP API, powered by Spring WebClient