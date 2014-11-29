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
end
