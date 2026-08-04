# AI Provider Benchmarking and Routing

CineLoom should route each job to the best provider by customer promise, plan, genre, quality requirement, budget, privacy requirement, and provider health.

## Routing strategies

- Best quality
- Fastest
- Cheapest
- Most consistent
- Private enterprise endpoint
- Open-source only
- Watermarked preview mode
- Premium flagship mode

## Benchmark dimensions

- Quality score
- Speed score
- Cost score
- Consistency score
- Safety pass rate
- Rights/IP compliance pass rate
- Failure rate
- Retry success rate
- Average token/provider cost

## Circuit breaker behavior

If a provider fails or latency exceeds threshold:

1. Stop routing new jobs to the provider.
2. Mark provider as degraded.
3. Route eligible jobs to fallback provider.
4. Notify Super Admin.
5. Re-enable only after health checks pass.
