# StepRunner

The **StepRunner** is an abstraction for executing a single step in a scenario.  
It defines *how* a `Step` is run against its target system (HTTP, gRPC, Kafka, etc.).

## Interface

```javascript
public interface StepRunner {
    void runStep(Step step, VariableContext context);
}
```

- **step** → the step to execute (with endpoint, data, expectations, extractors)
- **context** → the scenario’s variable context, used for resolving `${placeholders}` and saving extracted values

## Built-in Implementation

YetiFramework provides an HTTP-based implementation:

```javascript
StepRunner runner = new HttpStepRunner(new WebClientHttpExecutor("http://localhost:8080"));
```

- `HttpStepRunner` → runs steps that target HTTP endpoints
- Uses an `HttpExecutor` internally to send requests

## Custom Implementations

Because StepRunner is just an interface, you can create your own runner for non-HTTP workflows.
Examples:

- **KafkaStepRunner** → publish and consume Kafka messages
- **GrpcStepRunner** → call gRPC services
- **DatabaseStepRunner** → run SQL queries

This makes YetiFramework extensible for many types of system testing.

## Example Usage

```javascript
ScenarioExecutor executor = new ScenarioExecutor(runner);
executor.run(scenario);
```

Here:
- The `ScenarioExecutor` orchestrates the workflow
- The `StepRunner` defines how each individual step is executed

## Summary

- **StepRunner** executes one step at a time
- It’s pluggable: you can swap in different implementations
- YetiFramework ships with an HttpStepRunner by default
- Custom runners let you extend the framework to new domains