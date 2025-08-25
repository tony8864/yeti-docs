# HttpExecutor

The **HttpExecutor** is the low-level interface that actually sends HTTP requests.  
It is used internally by `HttpStepRunner` to execute steps against your API.

## Interface

```javascript
public interface HttpExecutor {
    Response execute(Endpoint endpoint,
                     Object body,
                     Map<String, String> pathParams,
                     Map<String, String> queryParams,
                     Map<String, String> headers);
}
```

Parameters:

- **endpoint** → the target API endpoint (method + URL template)
- **body** → the request body (may come from the `DataRegistry`)
- **pathParams** → values to substitute into `{placeholders}` in the URL
- **queryParams** → key/value query parameters
- **headers** → HTTP headers

Returns:

- A `Response` object (status code + response body)

## Built-in Implementation

YetiFramework ships with a default implementation based on **Spring WebClient**:

```javascript
HttpExecutor executor = new WebClientHttpExecutor("http://localhost:8080");
StepRunner runner = new HttpStepRunner(executor);
ScenarioExecutor scenarioExecutor = new ScenarioExecutor(runner);
```

This setup allows you to run HTTP scenarios against any REST API.

## Custom Implementations

Because HttpExecutor is an interface, you can replace the HTTP layer with your own.

Examples:

- Using OkHttp instead of Spring WebClient
- Adding custom logging or metrics before/after each call
- Mocking responses for offline testing

## Summary

- **HttpExecutor** is the lowest-level HTTP abstraction in YetiFramework.
- Default implementation: `WebClientHttpExecutor`.
- You can plug in a custom executor to use another HTTP client or extend functionality.
- Steps and scenarios don’t care which executor you use — they just rely on the abstraction.