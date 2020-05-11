#!/bin/sh

curl -d @testdata/expertise.json localhost:8080/apis/core.favorgiver.io/v1alpha1/expertises
curl -d @testdata/favortype.json localhost:8080/apis/core.favorgiver.io/v1alpha1/favortypes
curl -d @testdata/helper.json localhost:8080/apis/core.favorgiver.io/v1alpha1/helpers
curl -d @testdata/helpsession.json localhost:8080/apis/core.favorgiver.io/v1alpha1/helpsessions
curl -d @testdata/seeker.json localhost:8080/apis/core.favorgiver.io/v1alpha1/seekers
curl -d @testdata/task.json localhost:8080/apis/core.favorgiver.io/v1alpha1/tasks
