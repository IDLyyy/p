@echo off
title Auto Update ke GitHub - Marver
color 0A
echo.
echo  ============================================
echo    AUTO UPDATE KE GITHUB - MARVER
echo    https://github.com/IDLyyy/p
echo  ============================================
echo.

cd /d "%~dp0"

echo  [1/4] Menyimpan semua perubahan...
git add -A
echo       Selesai!
echo.

echo  [2/4] Membuat commit otomatis...
set DATETIME=%date:~6,4%-%date:~3,2%-%date:~0,2% %time:~0,5%
git commit -m "auto-update: %DATETIME%"
echo       Selesai!
echo.

echo  [3/4] Sinkronisasi dengan GitHub...
git pull origin main --rebase
if errorlevel 1 (
  git pull origin master --rebase
)
echo       Selesai!
echo.

echo  [4/4] Mengirim ke GitHub...
git push origin main
if errorlevel 1 (
  git push origin master
)
echo       Selesai!
echo.

echo  ============================================
echo    BERHASIL! Kode sudah di-update ke GitHub
echo    https://github.com/IDLyyy/p
echo  ============================================
echo.
pause
