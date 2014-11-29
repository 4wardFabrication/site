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

  desc 'Test site'
  task :test do
    require 'html/proofer'
    HTML::Proofer.new('./_site').run
  end
end
