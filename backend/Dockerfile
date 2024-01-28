# Use an official Python runtime as base image
FROM python:3.10-slim

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages specified in requirements.txt
RUN	pip install --upgrade pip
RUN	pip install -r requirements.txt

# Create a directory to host the data rooms and uploaded files
RUN	mkdir -p uploads

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Run app.py when the container launches
ENTRYPOINT ["gunicorn", "--bind", ":8000", "--workers", "2", "--threads", "8", "--timeout", "0", "--keep-alive", "2000", "--capture-output", "--log-level", "info", "app:app"]
