@ECHO OFF

set SERVICE_NAME=NHSOSecureSmartCardAgent
set NHSOSSMC_FILE_NAME=NHSOSecureSmartCardAgent.exe
set NHSOSSMC_LOCATION="%~dp0%NHSOSSMC_FILE_NAME%"

echo ---------------------------------------------------
echo service path %NHSOSSMC_LOCATION%
echo ---------------------------------------------------

REM  Check for permissions
IF "%PROCESSOR_ARCHITECTURE%" EQU "amd64" (
    >nul 2>&1 "%SYSTEMROOT%\SysWOW64\cacls.exe" "%SYSTEMROOT%\SysWOW64\config\system"
) ELSE (
    >nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"
)

if '%errorlevel%' NEQ '0' (
    echo Does not have Administrator permission for run the service.
    echo Run As Administrator required.
    pause
    exit /B
) else (
    goto UninstallService
)

:UninstallService
    echo ---------------------------------------------------
    echo List all file in the directory...
    echo ---------------------------------------------------
    
    dir "%~dp0"
    
    if exist %NHSOSSMC_LOCATION% (
        echo file %NHSOSSMC_LOCATION% exists.
        echo uninstalling NHSO Secure SmartCard Agent service...
        echo ---------------------------------------------------

        sc query %SERVICE_NAME% > nul
        if errorlevel 1060 (
            echo no service %SERVICE_NAME% installed on this machine.
            echo Done.
        ) else (
            echo found. service %SERVICE_NAME% was installed on this machine.
            net stop NHSOSecureSmartCardAgent
            %NHSOSSMC_LOCATION% uninstall
            echo Done.
        )
        @REM services.msc
        pause
    ) else (
        echo file %NHSOSSMC_LOCATION% does not exists.
        pause
    )
