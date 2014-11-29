#!/bin/bash

bundle install
bundle exec rake site:generate
bundle exec rake site:test
