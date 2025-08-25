# Scenario

A **Scenario** represents a workflow test in YetiFramework.
It is an **ordered collection of steps** that describe how an API should behave across multiple requests.

## Creating a Scenario

Scenarios are created with the `Scenario.of()` factory method:

```java
Scenario scenario = Scenario.of("User CRUD flow");
```

Every scenario has:
- A **name** (for reporting/logging)
- A list of **steps** (executed in order)
- An internal **VariableContext** (to store and reuse values across steps)

## Adding steps

You can add steps in several ways:

```js
// Add step inline
scenario.step("Ping API", "PING", null);

// Add an existing Step object
Step deleteStep = Step.of("Delete user", "DELETE_USER", null);
scenario.step(deleteStep);

// Add multiple at once
scenario.step(step1, step2, step3);
```

Each step references:
- an endpoint name (registered in `EndpointRegistry`)
- optional **data name** (registered in `DataRegistry`)

## Hooks

Scenarios support **before** and **after** hooks:

```javascript
scenario.before(() -> System.out.println("Starting test..."))
        .after(() -> System.out.println("Done!"));
```

Useful for setup / teardown logic.

## Error handling

You can define a custom error strategy for failures:

```javascript
scenario.onError(error -> ErrorStrategy.RETRY);
```

Possible strategies:
- **CONTINUE** → skip the failing step and continue
- **RETRY** → rerun he failing step once
- **ABORT** → stop the entire scenario

## VariableContext

Each scenario has a built-in `VariableContext` that stores values extracted from responses.
Steps can then reference these values with placeholders like `{userId}`.

Example:

```javascript
scenario.step(Step.of("Create user", "CREATE_USER", "Alice")
        .extract("$.id", "userId"));

scenario.step(Step.of("Fetch user", "GET_USER", null)
        .withPathParam("id", "${userId}"));
```

## Summary

- A **Scenario** ties multiple steps into a coherent workflow.
- Supports hooks, error handling, and variable context.
- Keeps your API tests **readable** and **reusable**.