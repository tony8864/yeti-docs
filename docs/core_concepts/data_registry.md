# DataRegistry

The **DataRegistry** is where you register reusable request payloads for your steps.  
Instead of hardcoding JSON bodies in every scenario, you define them once and reuse them by name.

## Registering Data

Data is registered with a name and a value:

```javascript
DataRegistry.register("Alice", Map.of(
    "name", "Alice",
    "email", "alice@example.com"
));

DataRegistry.register("Bob", Map.of(
    "name", "Bob",
    "email", "bob@example.com"
));
```

Under the hood, each entry is wrapped in a small `DataRef` record containing the name and value.

## Using Data in Steps

Steps can reference registered data by name:

```javascript
Step.of("Create user", "CREATE_USER", "Alice")
    .expectStatus(201)
    .saveAs("userId", "$.id");
```

Here:
- "CREATE_USER" → endpoint (from the `EndpointRegistry`)
- "Alice" → data payload (from the `DataRegistry`)

When the step runs, YetiFramework automatically looks up the "Alice" payload and sends it as the request body.

## Clearing the Registry

For test isolation, you can clear the registry between runs:

```javascript
DataRegistry.clear();
```

## Sumarry

- The **DataRegistry** holds reusable request payloads.
- Each payload is registered once and accessed by name.
- Steps reference data by name instead of duplicating JSON.
- Keeps scenarios **clean**, **consistent**, and **DRY**.