FROM python:3.8.6-slim

ENV PYTHONUNBUFFERED True

ENV APP_HOME /app
WORKDIR $APP_HOME
COPY . ./

RUN apt-get -y update
RUN apt-get -y upgrade

RUN pip install -r requirements.txt

CMD exec gunicorn --bind :8080 --workers 1 --threads 8 --timeout 0 app:app
