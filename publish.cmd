REM @echo off 
set level=%1

for /f %%I in ('git tag') do set latestVersion=%%I

for /f %%I in ('call node_modules\.bin\semver %latestVersion% --increment %level%') do set newVersion=%%I

echo %newVersion%

git diff-index --quiet HEAD
IF ERRORLEVEL 1 (
  echo commit your work first
  exit /b -2
)

call yarn build
xcopy /s /e /y build\* ..\raid-calculators-gh-pages
pushd ..\raid-calculators-gh-pages
git add .
git commit -m"deploy %newVersion%"
git push
popd

git tag "%newVersion%"
git push
