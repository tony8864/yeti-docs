# Extractors

An **Extractor** is what makes it possible to capture data from one API response
and reuse it in later steps.

You never create an `Extractor` directly, instead you use the `.saveAs(...)` method on `Step`.

## Saving a Value

When you write:

```javascript
Step.of("create user", "USER_DATA", "Alice")
    .expectedStatus(201)
    .saveAs("userId", "$.id");
```

YetiFramework creates an **Extractor** behind the scenes with:

- `variableName = "userId"`
- `expression  = "$.id"` (a JSONPath expression)

After the step executes:

- The response body is evaluated with JSONPath.
- The result is stored in the scenario's `VariableContext`.

## Reusing the Value

Later steps can use the extracted variable as a placeholder:

```javascript
Step.of("Fetch user", "GET_USER", null)
    .wtithPathParam("id", "${userId}")
    .expectStatus(200);
```

## JSONPath Support

Extractors use [JSONPath](https://github.com/json-path/JsonPath) to navigate the response body.

Examples:

- `$.id` → extract the top-level `id` field  
- `$.user.email` → nested fields  
- `$.items[0].name` → first element in an array


## Summary

- **Extractors** are created by calling `.saveAs(variable, jsonPath)` on a step.
- They pull values out of the response body with JSONPath.
- Results are stored in scenario's `VariableContext`.
- Variables can then be referenced with `${variable}` in later steps.