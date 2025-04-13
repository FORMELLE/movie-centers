{ pkgs, ... }:

{
  # Enable devenv shell features
  packages = with pkgs; [
    nodejs_20
    yarn
    nodePackages.pnpm
  ];

  # Project languages
  languages.javascript = {
    enable = true;
    package = pkgs.nodejs_20;
  };
  
  languages.typescript.enable = true;

  # Environment variables
  env = {
    NODE_ENV = "development";
  };

  # Scripts that can be run with devenv processes
  scripts.dev.exec = "next dev";
  scripts.build.exec = "next build";
  scripts.start.exec = "next start";
  scripts.lint.exec = "next lint";

  # Pre-commit hooks
  # pre-commit.hooks = {
  #   prettier.enable = true;
  #   eslint.enable = true;
  # };

  # Enter the environment
  enterShell = ''
    echo "Next.js development environment loaded!"
    echo "Available commands:"
    echo "  dev    - Start the development server"
    echo "  build  - Build the application"
    echo "  start  - Start the production server"
    echo "  lint   - Run linting"
  '';

  # Process management
  processes = {
    next-dev.exec = "next dev";
  };
}
