{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    nix-vscode-extensions = {
      url = "github:nix-community/nix-vscode-extensions";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = inputs@{
    self,
    nixpkgs,
    flake-utils,
    nix-vscode-extensions
  }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
          overlays = [ nix-vscode-extensions.overlays.default ];
        };

        inherit (pkgs) vscode-with-extensions vscodium;
        
        nodejs = pkgs.nodejs_20;

        packages.default = vscode-with-extensions.override {
          vscode = vscodium;
          vscodeExtensions = [
            pkgs.open-vsx.eseom.nunjucks-template
          ];
        };

        devShells.default = pkgs.mkShell {
          buildInputs = [
            nodejs
            packages.default
          ];

          shellHook = ''
            echo "Node.js $(node --version) development environment"
          '';
        };
      in
      {
        inherit packages devShells;
      });
}
