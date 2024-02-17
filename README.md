# Motivation
I often find myself having too many tabs open. Many of them are Working Tree diffs. I needed a simple way to close them.

![](many-tabs.jpg)

# Usage
Either use the `Close Tabs via Regex` command or better yet, create a shortcut and pass your regex as an argument.

# Example
```json
// keybindings.json
[
  {
    "key": "ctrl+alt+c",
    "command": "close-tabs-via-regex.close",
    "args": "\\(", // Close all tabs that contain an opening bracket
  }
]
```
