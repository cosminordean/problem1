# Coding Challenge: Imports in Domain Specific Language

This is a coding challenge from Keysight Technologies Deutschland GmbH.


## Context

We develop domain specific programming languages (DSL). As part of these languages, we need to parse and process text files that contain programs written in these languages.

This challenge contains a boiled down version of the challenges we face daily - in this case, parsing the imported files from DSL files.

For this challenge, these programs and libraries contain only lines that import libraries.

These have the form

    import path/to/library.lib;

Examples are shown in the examples folder. These always contain a `root.prog` file, which is the program we want to analyze.


## Challenge

Write a tool in a programming language of your choice that takes as input a path to a root program. Your tool should then parse the program and display the structure of the imports, for example, in the following format:

    root.prog
        library1.lib
        library2.lib
            library3.lib

Please note that the examples do not cover all edge cases. You may also make reasonable simplifying assumptions, but please document and communicate them. You can also contact us if you have questions regarding the challenge.


## Copyright

You are free to upload this coding challenge and your solution to it to a public profile (e.g., Github), provided you include this file alongside it.