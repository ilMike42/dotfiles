-- Pull in the wezterm API
local wezterm = require("wezterm")

local config = wezterm.config_builder()

config.font_size = 14

config.color_scheme = "catppuccin-macchiato"

-- window padding
config.window_background_opacity = 0.9
config.enable_tab_bar = false
config.window_padding = {
	left = 0,
	right = 0,
	top = 0,
	bottom = 0,
}

-- config.window_decorations = "RESIZE"

-- and finally, return the configuration to wezterm
return config
