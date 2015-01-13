#!/bin/bash

bundle install --retry 3
bundle exec rake jasmine:ci
bundle exec rake site:generate\[staging\]
bundle exec rake site:test
bundle exec rake artifact:generate\[staging\]
bundle exec rake site:generate\[production\]
bundle exec rake site:test
bundle exec rake artifact:generate\[production\]
