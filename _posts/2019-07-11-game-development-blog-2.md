---
title: "DevBlog #2 : Setting Up A Simple Project Using LuaPreprocess"
date: 2019-07-11
description: "setting up the project + LuaPreprocess"
tags: [gamedev, tutorial]
---

# UPDATE

You can now use the [love2d-template](https://github.com/flamendless/love2d-template) to easily setup the project (but a little modification is still needed if you want)

---

I suggest you read the previous post for context [here](https://flamendless.github.io/2019/06/11/game-development-blog-1/) before continuing.

For this post, we are going to continue and learn how to use the awesome [Luapreprocess](https://github.com/ReFreezed/LuaPreprocess/) library by setting up a simple LOVE game project.

The purpose of this is to show how I use and setup my project with luapreprocessing as a tool.

---

(NOTE: I am using Linux so mostly are commands.)

# STEP #1 - Setting up the base folder

* Open a terminal.
* Go to your project folder with `cd $HOME/Projects/`
* Create the folder `SimpleGame` with `mkdir SimpleGame`.
* Go to the newly created folder with `cd SimpleGame`. (Remember this is the base project directory)
* Create the following file: `Makefile` and `handler.lua` with `touch Makefile handler.lua`
* Create a the `simplegame` folder with `mkdir simplegame`
* Create the folder `modules` and `assets` with `mkdir modules assets`
* Clone the `Luapreprocess` repository using `git clone https://github.com/ReFreezed/LuaPreprocess luapreprocess`
* List the contents of the current folder you are in with the command `ls`. You should see the following:
	```
	handler.lua
	Makefile
	assets/
	modules/
	luapreprocess/
	simplegame/
	```

---

## OPTIONAL:

* If you are going to use submodules (lua/love libraries), you have to `git submodule add` from the base project directory. For example:
	`git submodule add https://github.com/flamendless/log.lua modules/log`
	`git submodule add https://github.com/rxi/classic modules/classic`

---

# STEP #2 - Creating the Makefile

* Now open `Makefile` with your favourite text editor. In my case I use `vim` so the command is `vim Makefile`.
* Type/paste the following: ( I will put comment for explanations, comments in Makefile is the string after the syntax `#` )
	```Make
	define search #(1 path, 2 pattern) -> list
		$(wildcard $1$2) $(foreach d,$(wildcard $1*),$(call search,$d/,$2))
	endef

	# the following are the variables we are going to use
	PROJECT_NAME := simplegame # this is the same 
	OUTPUT_DIRECTORY := output # this is where all the preprocessed lua files will go.
	
	# this is important because the modules folder will contain other lua libraries
	# which usually containes examples and test folders. Preprocessing those will lead to errors.
	EXCLUDES := modules

	# the following will contain the list of lua files that are going to be preprocessed
	# NOTE: follow the whitespaces carefully.
	# extra whitespace inside the parenthesis will affect the result of the commands
	SOURCE_PATH := ./$(PROJECT_NAME)
	SOURCE_FILES := $(strip $(call search,$(SOURCE_PATH),*.lua2p))
	SOURCE_OBJECTS := $(SOURCE_FILES:$(SOURCE_PATH)/%.lua2p=./$(OUTPUT_DIRECTORY)/%.lua)

	# this variable will hold the folders to be copied to the output directory
	# they are usually the dependencies of your program
	DIRECTORIES_TO_COPY := ecs assets states objects

	# these are the folders that are also in the root project directory
	MODULES_DIR = modules
	ASSETS_DIR = assets

	# this variable is the path to the LuaPreprocess library, mainly the command line version of the library
	LPP_PATH := ./luapreprocess/preprocess-cl.lua

	# these are the recipes to be run when we run make
	# NOTE: there should be a "tab" in the body of the recipe
	process: init $(SOURCE_OBJECTS)
		@echo preprocessing finished # just print something
		love $(OUTPUT_DIRECTORY) # this will launch the game after preprocessing

	# this recipe is where the magic happens
	./$(OUTPUT_DIRECTORY)/%.lua: ./$(PROJECT_NAME)/%.lua2p
		@echo processing input: $< # print the current lua2p file to be processed
		@echo processing output: $@ # print the preprocessed lua2p file, now a lua file
		# this will run the command to preprocess the current file
		# using the handler.lua (variable definitions), and output them accordingly
		lua $(LPP_PATH) --hander=handler.lua --outputpaths $< $@


	# this recipe is the initializer:
	# create the OUTPUT_DIRECTORY if it does not exist
	# copy the DIRECTORIES_TO_COPY to the OUTPUT_DIRECTORY if does not exist
	# NOTE, the whitespace inside the brackets are necessary
	# NOTE, the \ is also important, they allow multiple lines
	init:
		@if [ ! -d  $(OUTPUT_DIRECTORY) ]; \
			then mkdir -p $(OUTPUT_DIRECTORY); \
		else \
			echo "$(OUTPUT_DIRECTORY) directory already exists"; \
		fi
		@for x ($(DIRECTORIES_TO_COPY)); do \
			if [ ! -d $(OUTPUT_DIRECTORY)/$$x ]; then \
				cp -rf $(PROJECT_NAME)/$$x $(OUTPUT_DIRECTORY)/; \
			else \
				echo "$$x already exists"; \
			fi; \
		done
		@if [ ! -d $(OUTPUT_DIRECTORY)/$(DIR_MODULES) ]; then \
			cp -rf $(DIR_MODULES) $(OUTPUT_DIRECTORY)/; \
		else \
			echo "$(DIR_MODULES) already exists in $(OUTPUT_DIRECTORY)"; \
		fi
		@if [ ! -d $(OUTPUT_DIRECTORY)/$(DIR_ASSETS) ]; then \
			cp -rf $(DIR_ASSETS) $(OUTPUT_DIRECTORY)/; \
		else \
			echo "$(DIR_ASSETS) already exists in $(OUTPUT_DIRECTORY)"; \
		fi


	# this recipe will clean the output folder, necessary for rebuilding the project
	clean:
		@if [ -d $(OUTPUT_DIRECTORY) ]; then \
			rm -rf $(OUTPUT_DIRECTORY); \
		else \
			echo "$(OUTPUT_DIRECTORY) directory does not exist"; \
		fi
	```

* Take a break. Drink water.

---

# STEP #3 - Creating the handler.lua

* Now open `handler.lua` with your favourite text editor. In my case I use `vim` so the command is `vim handler.lua`.
* Type/paste the following:
```lua
_DEBUG = true
_GAME_TITLE = "Simple Game"
_GAME_SIZE = { x = 1024, y = 512 }
return {} --this is needed according to the developer of Luapreprocess
```
* Save and exit the file.

---

# STEP #4 - Creating the SimpleGame

* Go to the `simplegame` folder with `cd simplegame`
* Create the following files: main.lua2p and conf.lua2p with `touch main.lua2p conf.lua2p`
(Note: You need to use the extension `lua2p` instead of `lua` for your files inside the `simplegame` directory.)
* Open `conf.lua2p` with your text editor and type/paste the following:
```lua
function love.conf(t)
	--Remember, _GAME_NAME and _GAME_SIZE are defined in the handler.lua file
	local title = !(_GAME_TITLE) --this is how to use the luapreprocessor as a one-liner
	local size = !(_GAME_SIZE) --_GAME_SIZE is a table as defined in the handler.lua file
	t.window.title = title
	t.window.width = size.x
	t.window.height = size.y
end
```
* Save and exit the `conf.lua2p` file.
* Now open the `main.lua2p` file, we are going to show just a simple rectangle on the screen. Also, if the `_DEBUG` variable in the `handler.lua` file is `true` we will show a text, if `false` we will show not show the text. Type/paste the following:
```lua
function love.draw()
	love.graphics.setColor(1, 1, 1, 1)
	love.graphics.rectangle("fill", 64, 6, 128, 128)

	--mind the ! syntax
	!if _DEBUG then
	love.graphics.print("_DEBUG is true!", 8, 8)
	!end
end
```

---

# STEP #5 - Running the game

Now here is the moment of truth, make sure you are in the base project directory. To check, run the command `pwd`, you should NOT see `$HOME/Projects/SimpleGame/simplegame`, rather it should be `$HOME/Projects/SimpleGame`
* Run `make init`
* Run `make`. It should launch the game. You should see a printed text in the top-left corner of the game.

---

## STEP #5.5 - Analyzing

To know what just happened, look at the `main.lua` and `conf.lua` files inside the `output` folder, you should see: (P.S. the comments are not to be regarded)
```lua
--in conf.lua file
function love.conf(t)
	local title = "Simple Game"
	local size = {x=1024,y=512}
	t.window.title = title
	t.window.width = size.x
	t.window.height = size.y
end

--in main.lua file
function love.draw()
	love.graphics.setColor(1, 1, 1, 1)
	love.graphics.rectangle("fill", 64, 6, 128, 128)

	love.graphics.print("_DEBUG is true!", 8, 8)
end
```

---


## STEP #6 - Testing the LuaPreprocess

Now, let us test and see the output if we turn off the `_DEBUG` variable in `handler.lua`. To do that, just change `_DEBUG = true` to `_DEBUG = false`

* Run `make` again, you should NOT see any printed line at the top-left corner of the game.

Now open the `main.lua` file in the `output` folder. You should see:

```lua
function love.draw()
	love.graphics.setColor(1, 1, 1, 1)
	love.graphics.rectangle("fill", 64, 6, 128, 128)
end
```

See? The line inside the `!if _DEBUG` and `!end` is gone.

Do you now know why preprocessing is good? This will be the case if we DO NOT use preprocessing:

```lua
--in main.lua
_DEBUG = true --a global variable

function love.draw()
	love.graphics.setColor(1, 1, 1, 1)
	love.graphics.rectangle("fill", 64, 6, 128, 128)

	--this is an extra check!
	--extra check = extra memory access and extra processing
	--extra lines of code = extra filesize
	if _DEBUG then
		love.graphics.print("_DEBUG is true!", 8, 8)
	end
end
```

---

I hope you understand and followed through this guide. Next blog post will be about more advanced usage of the library and continue our SimpleGame to be an actual game, a simple game that is. Stay tuned!
