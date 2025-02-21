FROM python:3.13.2-slim

WORKDIR /app/

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV PATH="/root/.local/bin:${PATH}"

RUN apt-get update && \
    apt-get install -y libpq-dev gcc python3-dev && \
    rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip && \
    pip install pipx && \
    pipx install poetry

COPY . /app/

COPY pyproject.toml poetry.lock /app/

RUN poetry install

EXPOSE 8000

CMD [ "poetry", "run", "python", "src/manage.py", "runserver", "0.0.0.0:8000"]

