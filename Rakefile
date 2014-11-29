namespace :site do
  desc 'Generate site'
  task :generate do
    require 'jekyll'
    Jekyll::Site.new(
      Jekyll.configuration({
        'source' => '.',
        'destination' => '_site'
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
  desc 'Generate the deployable artifact'
  task :generate do
    _artifact_dir = './_artifact'
    rm_rf _artifact_dir if Dir.exist?(_artifact_dir)
    mkdir _artifact_dir
    [
      '_site',
      '_config.yml',
      'Gemfile',
      'Gemfile.lock'
    ].each { |source| cp_r source,"#{_artifact_dir}/." }
  end
end
