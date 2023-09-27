FROM python:3.8-slim

WORKDIR /cozycanvas

COPY . .
RUN pip install -r requirements.txt

CMD ["flask", "--app", "cozycanvas", "--debug", "run", "--host", "0.0.0.0", "--port", "8000"]

