# --------------------------------------------------------------------------
# Lambda container image for the Accounts microservice
# Uses the official AWS Lambda Python base image (Python 3.13)
# --------------------------------------------------------------------------
FROM public.ecr.aws/lambda/python:3.13

# Copy requirements first (better Docker layer caching)
COPY requirements.txt ${LAMBDA_TASK_ROOT}/

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY app/ ${LAMBDA_TASK_ROOT}/app/
COPY migrations/ ${LAMBDA_TASK_ROOT}/migrations/
COPY alembic.ini ${LAMBDA_TASK_ROOT}/

# Lambda handler: app.main.handler (Mangum wrapper)
CMD ["app.main.handler"]
