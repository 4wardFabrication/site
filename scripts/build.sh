#!/bin/bash

bundle install --retry 3
bundle exec rake site:generate
bundle exec rake site:test
