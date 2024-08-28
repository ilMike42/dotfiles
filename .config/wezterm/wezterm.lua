-- Pull in the wezterm API
local wezterm = require("wezterm")

-- This will hold the configuration.
local config = wezterm.config_builder()

-- This is where you actually apply your config choices

-- For example, changing the color scheme:i
config.color_scheme = "Catppuccin Macchiato"

-- config.use_fancy_tab_bar = false
config.enable_tab_bar = false

-- config.window_decorations = "NONE"

-- ********** Background **********
config.window_background_opacity = 0.9

config.automatically_reload_config = true

-- and finally, return the configuration to wezterm
return config
