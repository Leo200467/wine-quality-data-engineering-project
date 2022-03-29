# First-time build can take upto 10 mins.

FROM apache/airflow:2.2.3

ENV AIRFLOW_HOME=/opt/airflow

USER root
# git gcc g++ -qqq

# Ref: https://airflow.apache.org/docs/docker-stack/recipes.html

SHELL ["/bin/bash", "-o", "pipefail", "-e", "-u", "-x", "-c"]

WORKDIR $AIRFLOW_HOME

RUN sudo /usr/local/bin/python -m pip install --upgrade pip
RUN curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
# RUN pip uninstall  --yes azure-storage && pip install -U azure-storage-blob apache-airflow-providers-microsoft-azure==1.1.0
# RUN pip install --no-cache-dir -r requirements.txt
# RUN pip install azure-storage-file-datalake
# RUN export PATH=/Users/<you>/Library/Python/3.8/bin:$PATH

COPY scripts scripts
RUN chmod +x scripts

USER $AIRFLOW_UID