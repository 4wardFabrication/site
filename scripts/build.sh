#!/bin/bash

bundle exec rake site:generate
bundle exec rake site:test
