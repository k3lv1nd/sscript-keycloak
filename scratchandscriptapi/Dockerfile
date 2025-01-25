FROM python:3.8
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /app
COPY Pipfile Pipfile.lock /app/
RUN pip install pipenv && pipenv install --system
RUN pip install httpx==0.27.2
RUN pip install django-cors-headers
RUN pip install pymongo
COPY . /app/
EXPOSE 8000
CMD ["python", "scratchandscript/manage.py", "runserver", "0.0.0.0:8000"]