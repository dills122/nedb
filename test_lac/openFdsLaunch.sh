#!/usr/bin/env bash

ulimit -n 128
node ./test_lac/openFds.test.js
