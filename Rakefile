namespace :site do
  desc 'Generate site for designated environment'
  task :generate, :environment do |t, args|
    require 'jekyll'
    Jekyll::Site.new(
      Jekyll.configuration({
        'source' => '.',
        'destination' => '_site',
        'config' => ['_config/general.yml', "_config/#{args[:environment]}.yml"]
      })
    ).process
  end

  desc 'Test site with html proofer'
  task :test do
    require 'html/proofer'
    HTML::Proofer.new('./_site').run
  end
end

namespace :artifact do
  desc 'Generate the deployable artifact in the designated directory'
  task :generate, :environment do |t, args|
    _artifact_dir = "./_#{args[:environment]}_artifact"
    rm_rf _artifact_dir if Dir.exist?(_artifact_dir)
    mkdir _artifact_dir
    [
      '_site',
      '_config.yml',
      'config.ru',
      'Gemfile',
      'Gemfile.lock'
    ].each { |source| cp_r source,"#{_artifact_dir}/." }
  end
end
require 'jasmine'
ENV['JASMINE_CONFIG_PATH'] = '_test/js/support/jasmine.yml'
load 'jasmine/tasks/jasmine.rake'
