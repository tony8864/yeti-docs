# EndpointRegistry

The **EndpointRegistry** is where you register all the API endpoints your scenario will use.
Each endpoint is registered once with a unique name, and can then be referenced from multiple steps.

## Registering an Endpoint

Endpoints are defined with the `Endpoint.of(...)` factory:

```javascript
EndpointRegistry.register(Endpoint.of(
    "GET_USER",
    HttpMethod.GET,
    "/users/{id}",
    null,           // request body type (none for GET)
    String.class    // response type
));
```

Parameters:

- **name** → unique name used in steps (e.g "GET_USER")
- **method** → HTTP method (GET, POST, PUT, DELETE, ...)
- **urlTemplate** → path template, can include `{placeholders}`
- **requestType** → expected Java type of request body (or `null`)
- **responseType** → expected Java type of response body

## Clearing the Registry

For test isolation, you can clear the registry:

```javascript
EndpointRegistry.clear();
```
This is useful when running multiple independent test suites.

## Summary

- Endpoints define *what* API calls are available.
- The registry is a **global store** of endpoints, keyed by name.
- Steps reference endpoints by name, keeping scenarions clean and readable.