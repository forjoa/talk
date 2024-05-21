@echo off
REM This works for next.js projects currently
REM Put this in your root folder of your project
REM then run get_code_context.bat

REM Use the current directory as the project directory
set project_dir=%cd%

REM Use a fixed name for the output file in the current directory
set output_file=%project_dir%\code_context.txt

REM Check if the output file exists and remove it if it does
if exist "%output_file%" del "%output_file%"

REM List of directories to look for
set directories=components pages app api styles utils hooks constants services types

REM List of file types to ignore
set ignore_files=ico png jpg jpeg gif svg

REM Function to read files and append their content
:read_files
for /r "%~1" %%f in (*) do (
    REM Check if the file type should be ignored
    set "should_ignore=false"
    for %%e in (%ignore_files%) do (
        if /i "%%~xe" == ".%%e" set "should_ignore=true"
    )

    REM If the file type should not be ignored, append its relative path and content to the output file
    if "!should_ignore!"=="false" (
        set "relative_path=%%f"
        set "relative_path=!relative_path:%project_dir%\=!"
        echo // File: !relative_path! >> "%output_file%"
        type "%%f" >> "%output_file%"
        echo. >> "%output_file%"
    )
)
exit /b

REM Enable delayed expansion for handling variables inside loops
setlocal EnableDelayedExpansion

REM Call the recursive function for each specified directory in the project directory
for %%d in (%directories%) do (
    if exist "%project_dir%\%%d" (
        call :read_files "%project_dir%\%%d"
    )
)

endlocal
