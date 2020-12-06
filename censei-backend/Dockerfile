FROM python:3.8.6-slim

ENV PYTHONUNBUFFERED True
ENV PORT 8080
ENV APP_HOME /app

WORKDIR $APP_HOME
COPY . ./

RUN apt-get -y update
RUN apt-get -y upgrade

RUN pip install -r requirements.txt

CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 app:app
