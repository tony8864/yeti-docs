# Step

A **Step** represents a single API call within a scenario. It ties together:

- An **endpoint** (from the `EndpointRegistry`)
- Optional **data** (from the `DataRegistry`)
- Excpectations on the response (status, extracted values, etc.)

## Creating a Step

Steps are created with the `Step.of()` factory:

```javascript
Step step = Step.of("Create user", "CREATE_USER", "Alice");
```

- **description** → human-readable text (for reporting)
- **endpointName** → must match a registered endpoint
- **dataName** → optional, matches a registered input payload

## Customizing the Request

Steps can be customized fluently with `with*` methods:

```javascript
Step.of("Fetch user", "GET_USER", null)
    .withPathParam("id", "${userId}")               // Path params
    .withQueryParam("verbose", "true")              // Query params
    .withHeader("Authorization", "Bearer token")    // Headers
    .withBodyOverride("email", "new@mail.com");     // Override JSON body field
```

## Setting Expectations

Each step can define the expected response status:

```javascript
Step.of("Delete user", "DELETE_USER", null)
    .withPathParam("id", "${userId}")
    .expectStatus(204);
```

If the API responds with anything other than the expected status, the step fails.

## Extracting Values

Steps can **save values from the response** into the scenario's `VariableContext`:

```javascript
Step.of("Create user", "CREATE_USER", "Alice")
    .expectStatus(201)
    .saveAs("userId", "$.id");
```

- `saveAs("userId", "$.id")` → extracts the field `id` from the JSON response and stores it under `{userId}`

Later steps can reuse it:

```javascript
Step.of("Fetch user", "GET_USER", null)
    .withPathParam("id", "${userId}")
    .expectStatus(200);
```

## Summary

- A **Step** = one API call in a scenario
- Configurable with path params, query params, headers, body overrides
- Can set **expectations** (status code)
- Can **extract values** for later reuse

Together with `Scenario`, steps make your API workflows **expressive**, **reusable** and **easy to read**.