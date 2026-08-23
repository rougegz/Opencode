---
name: data-science
description: >
  Data science and machine learning engineering patterns: data pipelines,
  feature engineering, model serving, experiment tracking, and MLOps
  for production AI/ML systems.
---

# Data Science Engineering Standards

## Project Structure

```
project/
├── data/              # Raw and processed data (gitignored)
│   ├── raw/
│   └── processed/
├── notebooks/         # Jupyter notebooks for exploration
├── src/
│   ├── features/      # Feature engineering
│   ├── models/        # Model definitions
│   ├── pipelines/     # Training/inference pipelines
│   ├── evaluation/    # Metrics and validation
│   └── serving/       # Model serving (API/gRPC)
├── tests/             # Unit and integration tests
├── configs/           # Hyperparameter/config files
├── Dockerfile
└── requirements.txt
```

## Data Pipeline Patterns

- Extract → Validate → Transform → Load (EVTL)
- Immutable data: never modify raw data
- Data versioning (DVC or similar)
- Pipeline monitoring (data drift, missing values)
- Reproducible: same code + data → same result

## Model Development

- Experiment tracking (MLflow, Weights & Biases)
- Hyperparameter sweeps (Optuna, Ray Tune)
- Cross-validation strategy documented
- Feature importance analysis
- Bias/fairness evaluation

## Model Serving

- REST API for synchronous inference
- Batch prediction for async/large-scale
- Model versioning in production
- A/B testing framework for model comparison
- Monitoring: prediction drift, feature drift, latency

## Testing for ML

- Data quality tests (schema, distribution, missing values)
- Model accuracy tests (regression suite)
- Feature engineering tests (correct computation)
- Pipeline integration tests
- Serving performance tests (latency, throughput)

## MLOps

- CI/CD for model training and deployment
- Automated retraining triggers (schedule, drift detection)
- Model registry with versioning
- Approval workflow for production deployment
- Monitoring and alerting for model degradation
