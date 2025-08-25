# Variable Context

The **VariableContext** is the shared state for a scenario.
It stores values extracted from responses and makes them available to later steps using
placeholders like `{userId}`.

## Extracting Values

When a step saves a value with `.saveAs(...)`, it is saved in the scenario's `VariableContext`.

```javascript
Step.of("Create user", "CREATE_USER", "Alice")
    .expectStatus(201)
    .saveAs("userId", "$.id");
```

After the step runs, the variable context contains:

```javascript
userId = 123 // extracted from response JSON
```

## Using Placeholders

Later steps can reference these values with `{variableName}`

```javascript
Step.of("Fetch user", "GET_USER", null)
    .withPathParam("id", "${userId}")
    .expectStatus(200);
```

At runtime, `{userId}` is automatically replaced with the extacted value.

## Behind the Scenes

- Variables are stored as key / value pairs per scenario.
- Placeholders are resolved dynamically before each request is executed.
- If a placeholder is missing, the scenario fails with an error.

## Summary

- **You don't create `VariableContext` yourself**, it is managed by `Scenario`.
- Use `saveAs("name", "$.jsonPath")` to store values.
- Use `${name}` placeholders in later steps to substitute values automatically.