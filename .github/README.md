## My Dotfiles

### Installation
#### Generic linux
```bash
sh -c "$(curl -fsLS get.chezmoi.io)" -- init --apply ilMike42
```

#### NixOS
##### Add chezmoi to packages in nixOS configuration
```nix
  ...
  
  environment.systemPackages = with pkgs; [
    ...
    chezmoi
  ]

  ...
```

##### Apply changes
`nixos-rebuild switch`

##### Get this dotfiles for nixOS
`chezmoi init ilMike42`

##### Apply dotfiles
`chezmoi apply`
