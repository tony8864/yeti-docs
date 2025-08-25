# Scenario Executor

The **ScenarioExecutor** is the engine that runs a full scenario.  
It takes the list of steps defined in a `Scenario`, runs them in order, and applies hooks and error-handling rules.

## Running a Scenario

To run a scenario, you create a `ScenarioExecutor` and pass it a `StepRunner`:

```javascript
StepRunner runner = new HttpStepRunner(new WebClientHttpExecutor("http://localhost:8080"));
ScenarioExecutor executor = new ScenarioExecutor(runner);

executor.run(scenario);
```

- `StepRunner` → knows how to execute one step (e.g. by making an HTTP call)
- `ScenarioExecutor` → orchestrates the whole scenario from start to finish

# LifeCycle

When you call `executor.run(scenario)`, the following happens:

1. **Before hook** (if defined) is executed
2. Each step is executed in order
    - Delegates to the configured `StepRunner`
    - Catches errors and applies error strategy
3. **After hook** (if defined) is executed

## Error handling

if a step throws an error, `ScenarioExecutor` checks if the sceario has an error handler:

```javascript
scenario.onError(error -> ErrorStrategy.RETRY);
```

Supported strategies:
- **CONTINUE** → skip the failing step and move on
- **RETRY** → re-run the step once
- **ABORT** → stop the scenario immediately

## Example

```javascript
Scenario scenario = Scenario.of("User CRUD")
    .before(() -> System.out.println("Starting scenario"))
    .after(() -> System.out.println("Scenario complete"))
    .onError(error -> ErrorStrategy.ABORT)
    .step(Step.of("Create user", "CREATE_USER", "Alice").expectStatus(201))
    .step(Step.of("Fetch user", "GET_USER", null).withPathParam("id", "${userId}").expectStatus(200));

ScenarioExecutor executor = new ScenarioExecutor(new HttpStepRunner(new WebClientHttpExecutor("http://localhost:8080")));
executor.run(scenario);
```

## Summary

- The **ScenarioExecutor** drives the execution of a scenario.
- It runs hooks, executes steps in order, and applies error strategies.
- Powered by a pluggable `StepRunner`, which defines how each step is executed.