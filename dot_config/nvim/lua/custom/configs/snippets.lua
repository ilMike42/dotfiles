-- ********** TESTING SNIPPETS **********
local ls = require 'luasnip'
-- some shorthands...
local snip = ls.snippet
local node = ls.snippet_node
local text = ls.text_node
local insert = ls.insert_node
local func = ls.function_node
local choice = ls.choice_node
local dynamicn = ls.dynamic_node

local get_commentstring = function()
  local commentstring = vim.api.nvim_eval '&commentstring'
  commentstring = commentstring:gsub('%%s', '')
  return commentstring
end

-- Adding keymaps to move between snippet arguments
local keymap = vim.api.nvim_set_keymap
local opts = { noremap = true, silent = true }
keymap('i', '<c-j>', "<cmd>lua require'luasnip'.jump(1)<CR>", opts)
keymap('s', '<c-j>', "<cmd>lua require'luasnip'.jump(1)<CR>", opts)
keymap('i', '<c-k>', "<cmd>lua require'luasnip'.jump(-1)<CR>", opts)
keymap('s', '<c-k>', "<cmd>lua require'luasnip'.jump(-1)<CR>", opts)

ls.add_snippets(nil, {
  all = {
    snip({
      trig = 'section',
      namr = 'Add section',
      dscr = 'Adds new section header',
    }, {
      func(get_commentstring, {}),
      text { '********** ' },
      insert(1, 'SECTION NAME'),
      text { ' **********' },
      insert(0),
    }),
  },
})
