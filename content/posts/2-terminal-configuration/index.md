---
title: "Terminal Configuration :rocket:"
draft: false
date: 2025-06-14
description: "Terminal configuration post"
summary: "This article will guide you on how to set your terminal like mine"
slug: "terminal-configuration"
tags: ["CLI", "personal"]
toc: false
---

# 🚀 Terminal Configuration: My Dev Playground

Hey there, fellow dev! 👋 If you love a terminal that’s not just functional but also a joy to use, you’re in the right place. Here’s how I set up my own minimalist, productive, and good-looking terminal on a fresh `Arch Linux` (yep, running on WSL—because why not? 😏). Let’s get your shell feeling awesome!

---

## 🛠️ Pre-setup

I’m starting with a **fresh** Arch Linux install on WSL. If you’re on something else, don’t worry—most steps still work, just swap out the package manager as needed.

---

## 🐚 ZSH: The Shell I Can’t Live Without

Arch is super minimal out of the box, so first things first—let’s get Zsh:

```sh
sudo pacman -Syu zsh
```

Change your default shell to Zsh:

```sh
chsh -s /bin/zsh
```

---

## 💥 Oh My Zsh: The (Not-So) Bloated Framework

Yeah, some say it’s bloated, but honestly? I’m used to it and it just works for me. 😅

First, make sure you have `git` and `curl`:

```sh
sudo pacman -S git curl
```

Then, install Oh My Zsh with this one-liner:

```sh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

You’ll see some fancy ASCII art and a new `.zshrc` will be created for you. Don’t forget to check it out and tweak plugins/themes!

---

## 🔌 Plugins: Supercharge Your Zsh

Zsh is great, but plugins make it *amazing*. By default, Zsh doesn’t understand `plugins=(...)`—that’s an Oh My Zsh thing.

### ✨ zsh-autosuggestions & zsh-syntax-highlighting

These two are a must for productivity and eye-candy:

```sh
git clone https://github.com/zsh-users/zsh-autosuggestions.git $ZSH_CUSTOM/plugins/zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git $ZSH_CUSTOM/plugins/zsh-syntax-highlighting
```

---

## 🌟 Starship: The Prompt of the Future

Starship is a blazingly fast, minimal, and *super* customizable shell prompt. It works with Zsh, Bash, Fish, and more. It shows:

- 🌲 Git branch/status
- 📦 Language versions (Node, Python, Rust, etc.)
- 🕒 Time
- ⚙️ Exit status
- 💻 Hostname, username, path

To install:

```sh
sudo pacman -S starship
```

### 🛠️ My Starship Config

Just edit `~/.config/starship.toml` (create it if it doesn’t exist):

```toml
# Don't print a new line at the start of the prompt
add_newline = false

[line_break]
disabled = false

[hostname]
ssh_only = false
format =  "[TIM](bold blue) "
trim_at = ".companyname.com"
disabled = false

[git_branch]
format = " [$symbol$branch]($style) "
symbol = "🍣 "
style = "bold purple"

[git_commit]
commit_hash_length = 8
style = "bold white"
disabled = false

[git_status]
ahead = "⇡${count}"
diverged = "⇕⇡${ahead_count}⇣${behind_count}"
behind = "⇣${count}"

[git_state]
format = '[\($state( $progress_current of $progress_total)\)]($style) '
cherry_pick = "[🍒 PICKING](bold red)"

[directory]
truncation_length = 3
truncation_symbol = "…/"

# Replace the "❯" symbol in the prompt with "➜"
[character]                            # The name of the module we are configuring is "character"
success_symbol = "[➜](bold green)"     # The "success_symbol" segment is being set to "➜" with the color "bold green"

# Disable the package module, hiding it from the prompt completely
[package]
disabled = true

[nodejs]
symbol = "🍏 "
```

---

## 📁 eza: Modern Replacement for `ls`

Remember `exa`? It’s archived now, but `eza` is here to save the day! It’s a drop-in replacement, written in Rust, and just as pretty (if not prettier).

Install it:

```sh
sudo pacman -S eza
```

---

## ⚙️ My `.zshrc` (Copy-Paste Friendly!)

Here’s my current `.zshrc`—feel free to steal, tweak, and make it your own:

```sh
# Path to your oh-my-zsh installation.
export ZSH="$HOME/.oh-my-zsh"

# See https://github.com/ohmyzsh/ohmyzsh/wiki/Themes
ZSH_THEME="robbyrussell"

# Which plugins would you like to load?
# Standard plugins can be found in $ZSH/plugins/
# Custom plugins may be added to $ZSH_CUSTOM/plugins/
plugins=(git zsh-autosuggestions zsh-syntax-highlighting ssh-agent)

source $ZSH/oh-my-zsh.sh

# User configuration

# You may need to manually set your language environment
# Please configure your locale, for my case Arch Linux WSL need to configure it manually
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8

# Set personal aliases, overriding those provided by oh-my-zsh libs,
# plugins, and themes. Aliases can be placed here, though oh-my-zsh
# users are encouraged to define aliases within the ZSH_CUSTOM folder.
# For a full list of active aliases, run `alias`.
#
# Example aliases
# alias zshconfig="mate ~/.zshrc"
# alias ohmyzsh="mate ~/.oh-my-zsh"

# starship init
eval "$(starship init zsh)"

# use eza instead of ls
alias ls="eza -F -s=name --long -S -h --group-directories-first -G"
alias la="ls -a"
alias ld="eza -F -s=name --long -S -h -D -G"

# fancy weather
alias weather="curl wttr.in"

# set default vim as nvim
alias vim="nvim"
```

---

## 🔄 Reload & Enjoy!

Once you’ve set everything up, reload your shell:

```sh
zsh
```

That’s it! You now have a slick, modern, and *developer-centric* terminal setup. If you have tweaks or plugin suggestions, let me know! Happy hacking! 😎